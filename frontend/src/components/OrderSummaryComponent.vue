<template>
<div class="flex justify-center m-3">
    <perfect-scrollbar :class="`divide-y divide-gray-200 rounded p-3 bg-white text-black custom-max-width md:mx-12 h-96 overflow-y-scroll ${!cartLoaded ? 'flex justify-center items-center' : ''}`">
            <h2 v-if="cartLoaded" class="text-2xl font-bold text-center mt-5 mb-7">Order Summary</h2>
            <svg v-if="!cartLoaded" class="animate-spin -ml-1 mr-3 h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="gray" stroke-width="4"></circle>
                    <path class="opacity-75" fill="black" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            <li class="flex items-center justify-between p-4" v-for="(item,index) in checkOutCart?.cartItems " :key="index" v-if="cartLoaded">
                <div class="flex items-start">
                    <img
                      class="flex-shrink-0 object-cover w-20 aspect-auto rounded-lg"
                      :src="item.product.thumbnail"
                      alt=""
                    />
                    <div class="ml-4">
                      <p class="text-sm font-bold">{{item.product.name}}</p>
                      <dl class="mt-1 space-y-1 text-xs text-gray-500">
                        <div>
                          <dt class="inline">Quantity: </dt>
                          <dd class="inline font-bold">{{item.quantity}}</dd>
                        </div>
                        <div>
                          <dt class="inline">Individual Price: </dt>
                          <dd class="inline font-bold">${{item.product.price}}</dd>
                        </div>
                      </dl>
                    </div>
                </div>
                <div>
                    <p class="text-sm font-bold">
                        ${{ Math.round((item.product.price * item.quantity + Number.EPSILON) * 100) / 100 }}
                    </p>
                </div>
            </li>
            
      </perfect-scrollbar>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import DataService from '../DataService';
import { currentUserStore } from '../stores/userStore';
import { Cart } from '../types/betterTypes';

const currentUser = currentUserStore();
let cartLoaded = ref(false);
let checkOutCart = ref<Cart>();
async function getUserCart(userId:number) {
    checkOutCart.value = await DataService.getUserCart(userId) as Cart;
    console.log(checkOutCart);
    cartLoaded.value = true;
}
getUserCart(currentUser.user.id);
</script>