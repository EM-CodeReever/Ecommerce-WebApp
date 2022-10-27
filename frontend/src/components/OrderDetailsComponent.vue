<template>
<input type="checkbox" id="orderDetailsModal" class="modal-toggle" />
<label for="orderDetailsModal"  class="modal sm:items-center text-black modal-bottom cursor-pointer">
  <label class="modal-box sm:w-11/12 scroll-style rounded bg-gray-200 sm:max-w-5xl m-h-48-rem">
    <span class="flex justify-between items-center flex-col sm:flex-row">
        <img src="../assets/ik-logo.png" alt="Ishmael Klassic logo" class="h-12 ">
        <h3 class="font-bold text-center my-5 text-2xl">OrderID# {{order.orderID}}</h3>
    </span>
    <span class="flex justify-between py-1 text-lg">
        <p>Date placed</p>
        <p class="font-bold badge badge-lg rounded text-black bg-gray-200">{{order.date}}</p>
    </span>
    <span class="flex justify-between py-1 text-lg">
        <p>Order Total</p>
        <p class="font-bold badge badge-lg rounded text-black bg-gray-200">$ {{order.total}} USD</p>
    </span>
    <span class="flex justify-between py-1 text-lg">
        <p>Unique key</p>
        <p class="font-bold badge badge-lg rounded text-black bg-gray-200">{{order._id}}</p>
    </span>
    <span class="flex justify-between py-1 text-lg">
        <p>Status</p>
        <p class="font-bold badge badge-lg rounded text-black bg-success" v-if="order.shipping && order.shippingCompleted">Completed & Delivered</p>
        <p class="font-bold badge badge-lg rounded text-black bg-error" v-if="order.shipping && !order.shippingCompleted">Not Yet Shipped</p>
        <p class="font-bold badge badge-lg rounded text-black bg-gray-400" v-if="!order.shipping">Transaction Only</p>
    </span>
    <h3 class="font-bold text-center my-5 text-2xl">Items Ordered</h3>
    <div class="overflow-x-auto">
    <table class="table rounded-lg bg-gray-300 w-full mb-5">
        <!-- head -->
        <thead class="rounded-none">
        <tr>
            <th class="bg-gray-500 rounded-none">Qty</th>
            <th class="bg-gray-500">Name</th>
            <th class="bg-gray-500">Price(USD)</th>
        </tr>
        </thead>
        <tbody>
        <!-- row 1 -->
        <tr v-for="(item,index) in order.cartItems" :key="index">
            <th class="bg-gray-300">{{item.quantity}}x</th>
            <td class="bg-gray-300">
                <div class="font-medium">{{item.title}}</div>
                <div class="text-sm" v-for="(value,prop_name) in item.options" :key="prop_name">{{ prop_name.charAt(0).toUpperCase() + prop_name.slice(1) }} : {{ value.charAt(0).toUpperCase() + value.slice(1) }}</div>
                <!-- craziest code ive ever written ^ -->
            </td>
            <td class="bg-gray-300">$ {{item.price}}</td>
        </tr>
        </tbody>
    </table>
    <span class="flex justify-between py-1 text-lg">
        <p>Item(s) Subtotal</p>
        <p class="font-bold badge badge-lg rounded text-black bg-gray-200">$ {{order.total - (order.shippingFee + order.tax)}} USD</p>
    </span>
    </div>
    <h3 class="font-bold text-center my-5 text-2xl">Shipping</h3>
    <span class="flex justify-between items-center py-1">
        <p class="text-lg">Shipping Requested</p>
        <div class="bg-success rounded-full aspect-square w-8 flex justify-center items-center" v-if="order.shipping">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        </div>
        <div class="bg-error rounded-full aspect-square w-8 flex justify-center items-center" v-if="!order.shipping">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        </div>
    </span>
    <span class="flex justify-between py-1 text-lg" v-if="order.shipping">
        <p>Shipping Address</p>
        <p class="font-bold badge badge-lg rounded text-black bg-gray-200 max-w-lg h-fit">{{order.shippingAddress}}</p>
    </span>
    <span class="flex justify-between py-1 text-lg">
        <p>Customer Name</p>
        <p class=" font-bold badge badge-lg rounded text-black bg-gray-200">{{order.payeeName}}</p>
    </span>
    <span class="flex justify-between py-1 text-lg">
        <p>Customer Contact No.</p>
        <p class="font-bold badge badge-lg rounded text-black bg-gray-200">{{order.payeeContactNumber}}</p>
    </span>
    <span class="flex justify-between py-1 text-lg">
        <p>Shipping fee</p>
        <p class="font-bold badge badge-lg rounded text-black bg-gray-200">$ {{order.shippingFee}} USD</p>
    </span>
    <h3 class="font-bold text-center my-3 text-2xl">Payment</h3>
    <span class="flex justify-between py-1 text-lg">
        <p>Total before tax</p>
        <p class="font-bold badge badge-lg rounded text-black bg-gray-200">$ {{order.total - (order.shippingFee + order.tax)}} USD</p>
    </span>
    <span class="flex justify-between py-1 text-lg">
        <p>Total + tax</p>
        <p class="font-bold badge badge-lg rounded text-black bg-gray-200">$ {{order.total + order.tax}} USD</p>
    </span>
    <span class="flex justify-between py-1 text-lg">
        <p class="font-medium">GrandTotal <span class="font-thin text-sm">incl. shipping</span></p>
        <p class="font-bold badge badge-lg rounded text-black bg-gray-200">$ {{order.total}} USD</p>
    </span>
    <!-- modal button -->
    <div class="modal-action">
      <label for="orderDetailsModal" class="btn">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
      </label>
    </div>
  </label>
</label>
</template>
<script>
import { defineComponent } from "vue";
export default defineComponent({
    name:'OrderDetailsComponent',
    props:['order'],
    data(){
        return {
            optionArray : []
        }
    },
    methods:{
    },
    mounted(){
    }
})
</script>
<style>
.scroll-style::-webkit-scrollbar {
  background-color: transparent;
  width: 3px;
  height: 3px;
}
.scroll-style::-webkit-scrollbar-thumb {
  background-color: rgb(0, 0, 0);
  border-radius: 10px;
}
.m-h-48-rem { max-height: 45rem; }

@media (max-width: 600px) {
    .m-h-48-rem  { max-height: 80vh; }
}

</style>
