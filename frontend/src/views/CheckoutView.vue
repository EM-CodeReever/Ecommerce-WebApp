<template>
  <div>
    <NavbarComponent/>
    <p class="text-2xl md:text-3xl font-bold text-gray-200 text-center mt-3">Checkout</p>
    <span class="flex justify-center">
        <StepsComponent class="custom-max-width" :stateNum="stateNum"/>
    </span>
    <div class="overflow-x-auto flex flex-col">
        
    <OrderSummaryComponent  v-if="stateNum == 0"/>

    <AddressComponent v-show="stateNum == 1" />

    <PayPalComponent v-if="stateNum == 2" :finalPrice="grandTotal" class="mb-16"/>

    <span class="flex justify-center mx-3">
         <div class="border-gray-200 py-6 px-4 sm:px-6 custom-max-width rounded bg-gray-800">
            <div class="flex justify-between text-base font-medium text-white">
                <p>Subtotal</p>
                <p>$ {{total}}</p>
            </div>
            <div class="divider m-0"></div> 
            <div class="flex justify-between text-base font-medium text-white">
                <p>Tax</p>
                <p>$ {{tax}}</p>
            </div>
            <div class="divider m-0"></div> 
            <div class="flex justify-between text-base font-medium text-white">
                <p>Shipping Fee</p>
                <p>$ {{shipFee}}</p>
            </div>
            <div class="divider m-0"></div> 
            <div class="flex justify-between text-xl font-bold text-white">
                <p>Grand Total</p>
                <p>${{grandTotal}}</p>
            </div>
        </div>   
    </span>
    
    </div>

    <span class="flex justify-center my-5 mx-3">
        <span class="custom-max-width flex justify-between">
            <button :class="`btn btn-sm ${stateNum == 0 ? 'btn-disabled':'' }`" @click="stateNum--;">back</button>
            <button :class="`btn btn-sm ${stateNum == 2 ? 'btn-disabled':'' }`" @click="stateNum++;">continue</button>
        </span>
    </span>
    <FooterComponent/>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import NavbarComponent from '../components/NavbarComponent.vue';
import FooterComponent from '../components/FooterComponent.vue';
import StepsComponent from '../components/StepsComponent.vue';
import AddressComponent from '../components/AddressComponent.vue';
import OrderSummaryComponent from '../components/OrderSummaryComponent.vue';
import PayPalComponent from '../components/PayPalComponent.vue';
import {currentCartStore} from '../stores/cartStore';
const currentCart = currentCartStore();

let stateNum = ref(0);
let total = ref(currentCart.cart.total);
let tax = ref(total.value * 0.1);
let shipFee = ref(total.value * 0.05);
let grandTotal = ref(total.value + tax.value + shipFee.value);



</script>
<style>
.fullPage{
  min-height: 100vh;
}
.custom-max-width{
    width: 100%;
    max-width: 1000px;
}
</style>