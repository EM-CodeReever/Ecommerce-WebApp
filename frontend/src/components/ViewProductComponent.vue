<template>
    <div class="flex justify-start flex-col mt-10">
    <div class="flex flex-col justify-start lg:flex-row lg:justify-center px-5 lg:px-24  py-3 ">
        <CarouselComponent :hideOnMobile="true" :itemId="1" :images="product.images"/>
        <div class="product-card-container w-full xl:w-2/3">
            <div class="card w-full h-full rounded bg-gray-800 text-white">
            <div class="card-body p-5 justify-between">
                <h2 class="card-title">{{ product.name }}</h2>

                <details class="relative group">
                <summary class="block">
                    <div>
                    <div class="prose max-w-none group-open:hidden">
                        <p>
                            {{product?.description}}
                        </p>
                    </div>
                    </div>
                </summary>
                </details>
                    <!-- <span v-if="hasOptions">
                     <AltProductOptionsComponent :option="product.options[i-1]" v-for="i in product.options.length" :key="i"/>
                    </span> -->

                <div class="divider"></div> 
                <div class=" w-full flex justify-between items-center">
                    <span class="max-w-xs">
                        <label class="label p-0">
                        <span class="label-text text-gray-400">Rating</span>
                    </label>
                    <StarRatingComponent :editable="false" :rating="product.rating" :radioId="`productRating`" />
                    </span>
                <label for="my-modal-3" class="btn modal-button btn-primary xl:hidden">View Images</label>
                </div>
                <div class="w-full flex justify-between items-end">
                    <span class="max-w-fit">
                        <label class="label">
                            <span class="label-text text-gray-400">Qty.</span>
                        </label>
                        <input type="number" min="1" v-model="quantity" class="input bg-gray-800 input-bordered border-gray-400 w-24" />
                    </span>
                    <span class="max-w-fit"><label class="badge font-bold py-5 px-3 mb-2">In Stock: {{product.stock}}</label></span>
                    
                </div>
                <div class="card-actions justify-between items-center">
                    
                <h2 class="card-title">$ {{product.price}} JMD</h2>
                <button class="btn btn-success" @click="UpdateCart">Add To Cart</button>
                </div>
            </div>
            </div>
        </div>
         </div>

         <div class="mx-5 mt-12 mb-5 w-auto rounded-box bg-none lg:mx-24 h-fit pb-5">
            <h2 class="my-5 text text-2xl font-bold text-black">Similar Products</h2>
            <div class="grow mx-3 px-2 py-4 flex gap-x-5 justify-start overflow-x-scroll scroll-style">
                <ProductComponent width="64" :product="prods" v-for="prods in CategorizedProducts" :key="prods.id" class="flex-none"/>
            </div>
         </div>

         <div class="reviews mx-5 mb-5 w-auto lg:mx-24 h-fit py-5">
            <div class="review-header flex justify-between items-center pb-5">
                <h2 class="text-left text-2xl font-bold text-black my-3">Reviews</h2>
                <label :for="`${currentUser.loggedIn ? 'my-modal-6':''}`" class="btn" v-if="currentUser.loggedIn">Write a review</label>
            </div>
            <div class="h-52 flex justify-start gap-x-5 pb-5 overflow-x-scroll scroll-style">
                <div class="card w-96 h-full flex-none bg-gray-800 text-white shadow-lg" v-for="(review,index) in productReviews" :key="index">
                <div class="card-body p-5">
                    <h2 class="card-title flex justify-between"><span>{{review.userId}}</span><span class="badge font-thin">{{review.createdAt}}</span></h2>
                    <p>{{review.comment}}</p>
                </div>
                <span class="flex justify-end pr-3 mb-5">
                    <StarRatingComponent :editable="false" :rating="review.rating" class="pb-5" :radioId="`review_${index}`"/>
                </span>
                </div>
            </div>
         </div>
         
         <!-- first modal -->
        <input type="checkbox" id="my-modal-3" class="modal-toggle" />
        <div class="modal">
        <div class="modal-box rounded relative p-3 pt-12 h-fit w-fit">
            <label for="my-modal-3" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
           <CarouselComponent :hideOnMobile="false" :itemId="5" :images="product?.images"/>
        </div>
        </div>
        <!-- second modal -->
        <input type="checkbox" id="my-modal-6" class="modal-toggle" />
        <div class="modal modal-bottom sm:modal-middle">
        <div class="modal-box">
            <label for="my-modal-6" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
            <div class="form-control">
            <label class="label">
                <span class="label-text font-bold">Comments</span>
            </label> 
            <textarea v-model="newReview.comment" class="textarea textarea-bordered h-24" placeholder="type here..."></textarea>
            <label class="label">
            </label> 
            </div>
            <div class="form-control">
                <label class="label">
                    <span class="label-text font-bold">Rating</span>
                </label> 
                <StarRatingComponent :editable="true" :rating="1" :radioId="`createReview`"/>
            </div>
            <div class="modal-action">
            <label for="my-modal-6" class="btn" @click="getReview">Submit</label>
            </div>
        </div>
        </div>
    </div>

</template>
<script setup lang="ts">
import DataService from '../DataService';
import StarRatingComponent from '@/components/StarRatingComponent.vue';
import CarouselComponent from '@/components/CarouselComponent.vue';
import ProductComponent from './ProductComponent.vue';
import AltProductOptionsComponent from './AltProductOptionsComponent.vue';
import { Review, Images } from '@prisma/client';
import {Product, CartItem} from '../types/betterTypes';
import { onMounted, ref } from 'vue';
import { currentCartStore } from '../stores/cartStore';
import { currentUserStore } from '../stores/userStore';
import mitt from 'mitt';
const emitter = mitt();
let currentCart = currentCartStore();
let currentUser = currentUserStore();
let props = defineProps<{
    productId: string;
}>()

let newReview = ref<Review>({
    comment: '',
    rating: 1,
    productId: 0,
    userId: 0,
    createdAt: new Date(),
    id: 0,
})
let images = ref<Images[]>([
    {
        id: 0,
        url: '',
        productId: 0,
    }
]);
let product = ref<Product>({
    id: 0,
    name: '',
    description: '',
    price: 0,
    stock: 0,
    categoryId: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    rating: 0,
    thumbnail: '',
    images: images.value,
});

let productReviews = ref<Review[]>([]);
let CategorizedProducts = ref<Product[]>([]);
let quantity = ref(1);

onMounted(async () => {
    product.value = await DataService.getProduct(props.productId);
    CategorizedProducts.value = await DataService.getAllProductsFromCategory(product.value.categoryId);
    console.log(CategorizedProducts.value);
    
    // productReviews.value = await DataService.getReviews(props.productId);
})

function getReview() {
    
}

function UpdateCart() {
    console.log("Product ID:" + product.value.id);
    
    let cartItem: CartItem = {
        productId: product.value.id,
        quantity: quantity.value,
        product : product.value,
        cartId: currentCart.cart.id,
        id: 0,//do not include id when writing to db, I REPEAT DO NOT INCLUDE ID WHEN WRITING TO DB
    }
    // console.log(cartItem);
    currentCart.addCartItem(cartItem);
}
// export default {
//     props: ['productId'],
//     name: 'NavbarComponent',
//     components: {
//         StarRatingComponent,
//         CarouselComponent,
//         ProductComponent,
//         AltProductOptionsComponent,
//     },
//     data() {
//         return {
//             product : {},
//             productReviews : [],
//             quantity : 1,
//             CategorizedProducts: [],
//             reviewComments: '',
//             hasOptions : false,
//             selectedOptions : {}
            
//         }
//     },
//     methods: {
//          async UpdateCart() {
//             this.getSelectedOptions()
//             let cartItem = {
//                 id : this.product._id,
//                 title : this.product.title,
//                 price : this.product.price,
//                 quantity : this.quantity,
//                 total : this.quantity * this.product.price,
//                 options : this.selectedOptions
//             }
//             // console.log(cartItem);
//             // console.log('------------------');
//             // console.log(JSON.parse(localStorage.currentUser).id)
//             let res = await DataService.addToUserCart(JSON.parse(localStorage.currentUser).id, cartItem)
//             if(res.message == 'added to cart'){
//                 this.$emitter.emit("up-cart",true)
//             }else{
//                 console.log(res)
//             }
//         },
//         async getReview(){
//             let reviewCreatedDate = new Date()
//             let starray = document.getElementsByName('rating-createReview')
//             let rating
//             starray.forEach((e,i)=>{
//                 if(e.checked){
//                     rating = i+1
//                 }
//             })
//             let review = {
//                 productId : this.productId,
//                 authorId : JSON.parse(localStorage.currentUser).id,
//                 author : JSON.parse(localStorage.currentUser).first_name + " " + JSON.parse(localStorage.currentUser).last_name,
//                 comments : this.reviewComments,
//                 rating,
//                 date : reviewCreatedDate.toLocaleDateString()
//             }
//             let res = await DataService.addReview(review)
//             if(res.status){
//                 this.getAllReviews()
//             }
//             console.log(res);
//         },
//         getSelectedOptions(){
//             for(var opt of this.product.options){
//                 for(var prop_name in opt){
//                     document.getElementsByName(prop_name).forEach((e) => {
//                         if(e.checked){
//                             this.selectedOptions[prop_name] = e.value
//                         }
//                     })
//                 }
//             }
//         },
//         getAllReviews(){
//             DataService.getReviews(this.product._id).then(response => {
//                 this.productReviews = response.reverse()
//             })
//         }
//     },
//     async created() {
//         DataService.getProduct(this.productId).then(response => {
//             this.product = response
//             this.product.options.length != 0 ? this.hasOptions = true : this.hasOptions = false
//             DataService.getProductCategory(this.product.category).then(response => {
//                 this.CategorizedProducts = response
//             });
//             this.getAllReviews()
//         });
        
//     },
// }
</script>
<style>
.scroll-style::-webkit-scrollbar {
  background-color: transparent;
  height: 4px;
}
.scroll-style::-webkit-scrollbar-thumb {
  background-color: #7c69ef;
  border-radius: 10px;
}
.space_between_children:first-of-type{
    margin-left: 0px;
}
.space_between_children{
    margin-left: 15px;
}
</style>
<!-- {
    "id": "62d09fb7c50f4575d4149768",
    "title": "Nail Polish",
    "price": 440,
    "quantity": 1,
    "total": 440,
    "options": {
        "Size": "medium",
        "Color": "Gold"
    }
} -->