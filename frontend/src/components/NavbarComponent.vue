<template>
  <div class="navbar border-black border-b-4 text-black sticky top-0 z-index-above-all" style="background-color: white">
    <div class="navbar-start">
      <div class="dropdown">
        <label tabindex="0" class="btn btn-ghost text-black xl:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
        </label>
        <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-gray-200 rounded-box w-52 text-black">
          <li class="hover:text-rose-500"><router-link to="/">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
            Home</router-link></li>
          <li class="hover:text-rose-500"><router-link to="/categories">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
            Shop</router-link></li>
          <li class="hover:text-rose-500"><router-link to="/contact">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path></svg>
            Contact us</router-link></li>
          <li class="hover:text-rose-500"><router-link to="/about">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
            About</router-link></li>
          <li v-if="true" class="hover:text-rose-500"><router-link to="/admin">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            Admin Section</router-link></li>
        </ul>
      </div>
      <router-link to="/" class="text-white btn btn-ghost normal-case  text-xl hover:text-rose-500 font-bold flex">
        <!-- LOGO GOES HERE -->
        <img src="../assets/vue.svg" alt="Default Logo" class="h-12 mx-2 -mt-1">
      </router-link>
    </div>
    <div class="navbar-center hidden xl:flex">
      <ul class="menu menu-horizontal p-0">
        <li class="hover:text-rose-500 font-bold"><router-link to="/" class="justify-between">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
          Home</router-link></li>
        <li class="hover:text-rose-500 font-bold"><router-link to="/categories">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
          Store
          </router-link>
          </li>
				<li class="hover:text-rose-500 font-bold"><router-link to="/contact">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path></svg>
          Contact us</router-link></li>
				<li class="hover:text-rose-500 font-bold"><router-link to="/about">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
          About</router-link></li>
        <li v-if="true" class="hover:text-rose-500 font-bold"><router-link to="/admin">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
          Admin Section</router-link></li>
      </ul>
    </div>
    <div class="navbar-end text-black">
       
      <div class="dropdown dropdown-end">
      <Transition name="bounce">
      <div class="tooltip tooltip-open tooltip-bottom -mr-9" v-if="tooltip" data-tip="Added to cart!"></div>
    </Transition>
        <label tabindex="0" class="btn btn-ghost btn-outline btn-circle mx-3 text-black">
          <div class="indicator">
             <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            <span class="badge badge-sm bg-rose-600  text-white indicator-item -mr-2 -mt-2" v-if="true">{{cartNum}}</span>
          </div>
        </label>
       
        
        <div tabindex="0" class="mt-3 card card-compact dropdown-content w-52 bg-gray-200 shadow text-black">
          <div class="card-body">
            <span class="font-bold text-lg">{{cartNum}} Items</span>
            <span class="text-blue-800 font-medium">Subtotal: ${{subTotal}}</span>
            <div class="card-actions">
              <button class="btn btn-error btn-block" @click="goToCart">View cart</button>
            </div>
            
          </div>
        </div>
      </div>
      <div v-if="!currentUser.loggedIn" @click="register">
        <label tabindex="0" class="btn btn-ghost p-2">
          <span class="hidden sm:block">Register</span> 
          <div class="indicator sm:ml-2">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
          </div>
        </label>
      </div>
      <div v-if="!currentUser.loggedIn" @click="signIn">
        <label tabindex="0" class="btn btn-ghost p-2">
          <span class="hidden sm:block">Sign In</span> 
          <div class="indicator sm:ml-2">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path></svg>
          </div>
        </label>
      </div>
      <div class="dropdown dropdown-end text-black" v-if="currentUser.loggedIn">
        <label tabindex="0" class="btn btn-ghost p-2 w-fit px-2">
          <span class="hidden md:block">{{ currentUser.fullName }}</span> 
          <div class="indicator md:ml-2">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
        </label>
        <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-gray-200 rounded-box w-52 text-black">
          <li class="md:hidden"><a class="bg-rose-500">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            {{ currentUser.fullName }}</a></li>
          <li><router-link to="/profile">Profile</router-link></li>
          <li><router-link to="/orderhistory">Order History</router-link></li>
          <li @click="signOut"><a>Logout</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { currentUserStore } from '../stores/userStore';
import { currentCartStore } from '../stores/cartStore';
import {useEventStore} from '../stores/eventStore';
import DataService from '../DataService';
import { Category } from '@prisma/client';
import {Logger} from 'tslog';
const logger = new Logger();
let eventStore = useEventStore();
eventStore.emitter.on('sample', (data) => {
    console.log(data);    
});

let tooltip = ref(false);
let categoriesLoaded = ref(false);
const router = useRouter();
const currentUser = currentUserStore();
let currentCart = currentCartStore();
let categoryList = ref([] as Category[]);


// getCart();

// async function getCart(){
//     currentCart.setCurrentCart(await DataService.getUserCart(currentUser.user.id) as Cart);
// }
currentCart.$subscribe(async (data) => {
    logger.info("Data: " + data)
    await currentCart.writeToDatabase();
    logger.info('Cart changed and written to database')
    cartNum.value = currentCart.getProductCount();
    subTotal.value = currentCart.getTotal();
    toggleTooltip(currentUser.loggedIn);
    // console.log(currentCart);
});

let cartNum = ref(0);
cartNum.value = currentCart.getProductCount();
let subTotal = ref(0);
subTotal.value = currentCart.getTotal();

function signOut() {
  currentUser.$reset();
  currentCart.resetCart();
  router.push('/');
}

function signIn() {
  router.push('/login');
}

function register() {
  router.push('/signup');
}

function goToCart() {
  router.push('/cart');
}


function toggleTooltip(bool:boolean){
  if(bool){
    tooltip.value = true
    setTimeout(()=>{tooltip.value = false},1000)
    }
  }
let cartLoaded = false;

// export default defineComponent({
//   name: 'NavbarComponent',
//   data() {
//     return {
//       login: false,
//       currentUser: {},
//       cartLoaded: false,
//       cart: [],
//       cartNum: 0,
//       subTotal: 0,
//       tooltip : false,
//     }
//   },
//    methods:{
//       goToCart(){
//         // this.$router.push('/cart'); 
//         },
//         signIn(){
//           // this.$router.push('/login');
//           // this.checkForUser();
//         },
//         register(){
//           // this.$router.push('/signup');
//         },
//         signOut(){
//           // localStorage.removeItem('currentUser')
//           // this.checkForUser();
//           // this.$router.push('/'); 
//         },
//         checkForUser(){
//           // if(localStorage.currentUser){
//           //   this.login = true;
//           // }else{
//           //   this.login = false;
//           // }
//         },
//         getUserFullName(){
//             return 'test user'; 
//         },
//         calculateBill(){
//           // this.subTotal = 0;
//           //   for(var prod of this.cart){
//           //       this.subTotal += prod.total
//           //   }
//           //   this.subTotal = Math.round((this.subTotal + Number.EPSILON) * 100) / 100;
//         },
//         toggleTooltip(){
//           // this.tooltip = true
//           // setTimeout(()=>{this.tooltip = false},1000)
//         }
//   },
//   async created(){
//     // this.checkForUser()
//     // try{
//     //   this.currentUser = JSON.parse(localStorage.currentUser)
//     //   this.cart = await DataService.getUserCart(this.currentUser.id)
//     //   this.cartNum = this.cart.length
//     //   this.cartLoaded = true;
//     //   this.calculateBill()
//     //   this.$emitter.on("up-cart",async (showtooltipAnimation) => {
//     //     this.cart = await DataService.getUserCart(this.currentUser.id)
//     //     console.log('triggered\nAnimation : ' + showtooltipAnimation);
//     //     if(showtooltipAnimation){
//     //       this.toggleTooltip()
//     //     }
//     //     this.calculateBill()
//     //     this.cartNum = this.cart.length
//     //   });
//     // }catch(err){
//     //   this.cartNum = 0
//     // }
//   }
// })
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bounce-enter-active {
  animation: bounce-in .3s;
}
.bounce-leave-active {
  animation: bounce-in .3s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
.z-index-above-all{
  z-index: 99999;
}
</style>
