<template>
    <div class="w-full h-fit min-h-96 flex flex-col justify-start items-center my-24">
        <div class="w-full max-w-xl md:max-w-3xl lg:max-w-6xl xl:max-w-7xl py-5 px-4 h-fit min-h-fit flex flex-col md:flex-row justify-between items-center bg-gray-700 rounded">
            <div class="h-fit xs-v2:h-full flex flex-col xs-v2:flex-row justify-between w-fit">
                    <perfect-scrollbar class="hidden overflow-y-scroll h-fit w-28 xs-v2:grid grid-cols-1 gap-2 grid-flow-row">
                        <div class="aspect-auto w-24 cursor-pointer rounded hover:opacity-75" v-for="i in product.images" @click="changeCurrentDisplayImage(i.url)">
                            <img :src="i.url" alt="">
                        </div>
                    </perfect-scrollbar>
                    <span class="xs-v2:hidden w-full h-fit flex justify-center gap-x-5 my-5">
                        <div class="w-8 h-8 bg-white rounded cursor-pointer flex justify-center items-center" v-for="(i,index) in product.images" @click="changeCurrentDisplayImage(i.url)">{{index+1}}</div>
                    </span>
                <figure class="w-80 h-80 bg-gray-200 rounded flex justify-center">
                    <img :src="currentDisplayImage" alt="" class="aspect-auto h-80">
                </figure>
            </div>
            <div class="h-80 w-full rounded p-5 relative">
                <h2 class="text-2xl font-bold text-white">{{product.name}}</h2>
                <p class="text-gray-400 mb-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.</p>
                <StarRatingComponent :editable="false" :rating="product.rating" class="" :radioId="`review_${1}`"/>
                <label>
                    <p class="mt-5 text-md font-semibold text-white mr-3">Quantity</p>
                    <input class="input input-sm text-white w-20 input-ghost" type="number" min="1" v-model="quantity">
                </label>
                
                <button class="absolute btn right-2 bottom-2 btn-success" @click="UpdateCart()">Add to Cart</button>
                <h2 class="text-2xl font-bold text-white absolute left-5 bottom-2">$ {{product.price}}</h2>
            </div>
        </div>
        <h2 class="text-2xl lg:text-4xl font-extrabold text-center text-gray-200 my-10">You Might Also Like</h2>
        <perfect-scrollbar class="w-full max-w-xl md:max-w-3xl lg:max-w-6xl xl:max-w-7xl py-5 px-4 h-fit min-h-fit gap-x-5 grid grid-flow-col grid-rows-1 bg-gray-700 rounded overflow-x-scroll">
            <ProductComponent :width="64" :product="product" v-for="i in 10" class="flex-none"/>
        </perfect-scrollbar>
        <div class="flex flex-col-reverse lg:flex-row justify-between w-full max-w-xl md:max-w-3xl lg:max-w-6xl xl:max-w-7xl h-fit mt-20 gap-5">
            <perfect-scrollbar class="bg-red-200 w-full lg:max-w-md h-80 relative" v-if="!questionSent">
                <span class="bg-gray-700 text-white h-14 flex justify-center items-center sticky top-0"> 
                    <h2 class="text-xl font-semibold">Ask a Question</h2>
                </span>
                <form action="" @submit.prevent class="grid grid-cols-5 grid-rows-2 relative">
                    <div class="form-control px-5 col-span-full row-span-1">
                        <label for="question" class="label font-semibold">Question</label>
                        <textarea name="question" id="question"  class="textarea"  placeholder="Types here..."></textarea>
                    </div>
                    <div class="form-control px-5 col-span-2 row-span-1">
                        <label for="name" class="label font-semibold">Name</label>
                        <input type="text" name="name" id="name" class="input">
                    </div>
                    <div class="form-control px-5 col-span-3 row-span-1">
                        <label for="email" class="label font-semibold">Email</label>
                        <input type="email" name="email" id="email" class="input">
                    </div>
                    <button class="absolute btn btn-sm -bottom-7 right-5" @click="questionSent = true">submit</button>
                </form>
            </perfect-scrollbar>
            <perfect-scrollbar v-if="questionSent" class="h-80 w-full lg:max-w-md bg-red-200 flex justify-center items-center">
                <h2 class="text-2xl font-bold">Your question has been sent!</h2>
            </perfect-scrollbar>
            <div class="w-full max-w-xl md:max-w-3xl lg:max-w-6xl xl:max-w-7xl h-80 min-h-fit gap-x-5 flex flex-col justify-between bg-gray-200 rounded">
                <span class="bg-gray-700 text-white h-14 flex justify-between items-center w-full py-3 px-5"> 
                    <h2 class="text-xl font-semibold">Reviews</h2>
                    <button class="btn btn-info btn-sm">Add Review</button>
                </span>
                <perfect-scrollbar>
                    <!-- review components to go here -->
                </perfect-scrollbar>
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
import { Product, CartItem } from '../types/betterTypes';
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

let currentDisplayImage = ref('');
let questionSent = ref(false);

function changeCurrentDisplayImage(image: string) {
    currentDisplayImage.value = image;
}

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
    currentDisplayImage.value = product.value.thumbnail;
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

</script>
<style>
textarea {
    resize: none;
}
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
.ps{
    height: 320px;
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