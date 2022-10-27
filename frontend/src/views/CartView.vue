<template>
    <div>
        <NavbarComponent/>
        <h2 class="text-4xl text-gray-200 font-bold p-5 pb-0 text-center">Your Cart</h2>
        <span class="flex justify-center">
            <Transition name="fade" mode="out-in">
            <div class="alert alert-warning w-fit shadow-lg mt-5 mx-3 md:mx-0" v-if="changesMade">
            <div class="flex flex-col justify-center items-center sm:flex-row">
                <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                <span> Warning: You've made changes to your cart</span><button class="btn btn-sm" @click="UpdateCart">Save Changes</button>
            </div>
            </div>
            </Transition>
        </span>
        <span class="flex justify-between flex-col lg:flex-row p-5 h-fit">
            <div class="rounded-lg shadow-xl w-full grow mr-5 bg-gray-800 p-3  flex justify-center items-center" style="height: 500px">
                <svg v-if="false" class="animate-spin -ml-1 mr-3 h-12 w-12 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span v-if="true" class="w-full h-full overflow-y-scroll scroll-style">
                    <div class="card card-side bg-gray-300 text-black shadow-xl h-36 min-w-max mb-3" v-for="(item,index) in cart.cartItems" :key="index">
                    <figure>
                        <svg v-if="!imgLoad" class="animate-spin m-10 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="grey" stroke-width="4"></circle>
                        <path class="opacity-75" fill="black" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        <img :class="`${imgLoad ? '' : 'hidden'}`" src="https://api.lorem.space/image/house?w=200&h=280" @load="imgLoad = true"/>
                        </figure>
                    <div class="card-body p-3">
                        <h2 class="card-title flex justify-between">{{item.product.name}}<span>${{ Math.round(((item.product.price * item.quantity) + Number.EPSILON) * 100) / 100}}</span> </h2>
                        <p>Unit Price: ${{item.product.price}}</p>
                        <div class="card-actions justify-between">
                        <div class="btn-group font-bold">
                        <label class="mr-3 font-thin">Qty</label>     
                        <button class="btn-xs btn-primary" @click="item.quantity--; calculateBill(); changesMade = true;">-</button>
                        <button class="btn-xs btn-primary">{{item.quantity}}</button>
                        <button class="btn-xs btn-primary" @click="item.quantity++; calculateBill(); changesMade = true;">+</button>
                        </div>
                        <button class="btn-sm btn-error rounded" @click="deleteItem(index)">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                        </button>
                        </div>
                    </div>
                    </div>
                </span>
                
            </div>

            <div class="rounded-lg mt-5 lg:mt-0 bg-gray-800 h-60 py-6 px-4 sm:px-6">
              <div class="flex justify-between text-xl text-white font-medium">
                <p>Subtotal</p>
                <p>${{total}}</p>
              </div>
              <p class="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
              <button class="btn-success btn rounded w-full font-bold mt-5" @click="DataService.emptyCurrentCart(currentUserStore().user.id)" :disabled="currentCart.getProductCount() == 0 ? true : false">Proceed To Checkout</button>
              <div class="mt-6 flex justify-center text-center text-sm text-gray-500">
                <p>
                  or <button type="button" class="font-medium text-indigo-600 hover:text-indigo-500" @click="">Continue Shopping<span aria-hidden="true"> &rarr;</span></button>
                </p>
              </div>
            </div>
        </span>

         <div class="h-fit py-3 rounded mx-5 my-12">
            <h2 class="text-gray-200 text-3xl font-bold">Drop in your cart for under $1000</h2>
            <div class="grow px-2 py-4 gap-x-5 flex justify-start overflow-x-scroll scroll-style">
                <ProductComponent width="64" :product="prods" v-for="prods in cheapAdditionProducts" :key="prods.id" class="flex-none"/>
            </div>
        </div>
        <FooterComponent/>
    </div>
</template>
<script setup lang="ts">
import NavbarComponent from '@/components/NavbarComponent.vue'
import DataService from '../DataService';
import FooterComponent from '@/components/FooterComponent.vue'
import ProductComponent from '@/components/ProductComponent.vue';
import { Product } from '@prisma/client';
import { onMounted, ref } from 'vue';
import {currentCartStore} from '../stores/cartStore';
import { currentUserStore } from '../stores/userStore';
import {Cart} from '../types/betterTypes';

const currentCart = currentCartStore();

// currentCart.resetCart();
let cart = ref<Cart>(currentCart.cart);
// if (currentUserStore().loggedIn) {
//     cart.value = currentCart.cart;
// }
console.log(currentCart.cart);

let total = ref(0);
let tax = ref<number>();
let shipFee = ref<number>();
let grandTotal = ref<number>();
let changesMade = ref<boolean>();
let cartLoaded = ref<boolean>();
let cheapAdditionProducts = ref<Product[]>([]);
let stringOptions = ref<string>();
let imgLoad = ref<boolean>();

function deleteItem(index: number) {
    // cart.value.products.splice(index, 1);
    // changesMade.value = true;
    // calculateBill();
}

function calculateBill() {
    cart.value.cartItems.forEach((cartItem) => {
        total.value += cartItem.product.price * cartItem.quantity;
    });
    tax.value = total.value * 0.1;
    shipFee.value = total.value * 0.05;
    grandTotal.value = total.value + tax.value + shipFee.value;
}
calculateBill();
function UpdateCart() {
    changesMade.value = false;
}
// export default {
//     name: 'CartView',
//     components: {
//         NavbarComponent,
//         ProductComponent,
//         FooterComponent
//     },
//     data() {
//         return {
//             num:0,
//             imgLoad: false,
//             cart:[],
//             total:0,
//             tax : 0,
//             shipFee: 0,
//             grandTotal: 0,
//             changesMade : false,
//             cartLoaded : false,
//             cheapAdditionProducts: [],
//             stringOptions : ''
//         }
//     },
//     methods:{
//         calculateBill(){
//             this.total = 0;
//             for(var prod of this.cart){
//                 this.total += prod.price * prod.quantity
//             }
//             this.tax = 0.05 * this.total;
//             this.shipFee = 0.08 * this.total;
//             this.grandTotal = this.tax + this.total + this.shipFee


//             this.total = Math.round((this.total + Number.EPSILON) * 100) / 100;
//             this.shipFee = Math.round((this.shipFee + Number.EPSILON) * 100) / 100;
//             this.tax = Math.round((this.tax + Number.EPSILON) * 100) / 100;
//             this.grandTotal = Math.round((this.grandTotal + Number.EPSILON) * 100) / 100;
//         },
//         async deleteItem(index) {
//             this.changesMade = true;
//             this.cart.splice(index,1)
//             this.calculateBill()
//         },
//         async UpdateCart(){
//             let res = await DataService.updateUserCart(this.$getCurrentUserId(), this.cart)
//             if(res.message == 'updated cart'){
//                 this.$emitter.emit("up-cart",false);//triggers event twice for some reason
//             }else{
//                 console.log(res)
//             }
//             this.changesMade = false;
//         },
//         async getAdditionProducts(){
//             this.cheapAdditionProducts = await DataService.getProductCategory('all')
//             this.cheapAdditionProducts = this.cheapAdditionProducts.filter(e=>{
//                 if(e.price < 1000){
//                     return e
//                 }
//             })
//         },
//         getProductOptions(){
//             this.cart.forEach((e)=>{
//                 for(var i = 0; i < Object.values(e.options).length; i++){
//                     e.title += ` (${Object.values(e.options)[i]})`
//                 }
//             })
//         }
//     },
//     async created(){
//         this.cart = await DataService.getUserCart(JSON.parse(localStorage.currentUser).id)
//         this.cartLoaded = true;
//         this.getAdditionProducts()
//         this.calculateBill()
//         this.getProductOptions()
//     }
// }
</script>
<style scoped>
.scroll-style::-webkit-scrollbar {
  background-color: transparent;
  width: 3px;
  height: 3px;
}
.scroll-style::-webkit-scrollbar-thumb {
  background-color: aliceblue;
  border-radius: 10px;
}
.space_between_children:first-of-type{
    margin-left: 0px;
}
.space_between_children{
    margin-left: 15px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>