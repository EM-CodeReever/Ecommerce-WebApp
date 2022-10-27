<template>
    <tr v-for="(order,index) in allOrders" :key="index" class="hover">
            <td>{{index+1}}</td>
                <td v-if="Admin">
                <div class="flex items-center space-x-3">
                    <div class="flex justify-center items-center w-12 h-12">
                        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                    </div>
                    <div>
                    <div class="font-bold">{{order.payeeName}}</div>
                    <div class="text-sm opacity-50">#ID: {{order.payeeID}}</div>
                    </div>
                </div>
                </td>
                <td>
                <div class="font-medium">OrderID: {{order.orderID}}</div>
                <div class="text-sm opacity-50">[{{order.cartItems.length}}] Item(s)</div>
                <span class="badge badge-success font-semibold" v-if="order.shipping">Shipping Requested</span>
                <span class="badge badge-error font-semibold" v-if="!order.shipping">No Shipping</span>
                </td>
                <td>{{order.date}}</td>
                <td>${{order.total}} USD</td>
                <td>
                    <span class="badge badge-lg badge-error rounded" v-if="order.shipping && !order.shippingCompleted">Not yet shipped</span>
                    <span class="badge badge-lg badge-success rounded" v-if="order.shipping && order.shippingCompleted">Delivered</span>
                    <span class="badge badge-lg badge-ghost rounded" v-if="!order.shipping">N/A</span>
                </td>
                <th>
                <label for="orderDetailsModal" class="btn btn-xs modal-button" @click="this.$emitter.emit('order-selected',order)">details</label>
                </th>
                <th v-if="Admin">
                <label for="deliveryConfirmation" :class="`btn btn-sm modal-button ${(order.shippingCompleted || !order.shipping) ? 'btn-disabled' : ''}`" @click="this.$emitter.emit('order-selected',order)">mark as Delivered</label>
                </th>
            </tr>
</template>
<script>
import { defineComponent } from "vue";
export default defineComponent({
    name:'OrderRowComponent',
    props:['allOrders','Admin'],

})
</script>