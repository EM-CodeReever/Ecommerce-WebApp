<template>
<section>
    <NavbarComponent/>
    <LoginComponent :forAdmin="true" v-if="true"/>
    <div class="rounded bg-gray-800 h-fit p-4 w-1/1 m-5 lg:m-12 min-height-600" v-if="true">
        <span class="flex justify-between mb-5">
            <p class="text-2xl sm:text-4xl m-2 text-gray-200 font-bold">Orders</p>
            <select name="" id="ordersFilter" class="select sm:select-lg" @change="getOrdersOption()">
                <option value="ALL">All ({{allOrders.length}})</option>
                <option value="INCOMING">Incoming ({{incomingOrders.length}})</option>
                <option value="COMPLETED">Delivered ({{completedOrders.length}})</option>
            </select>
        </span>
        <div class="overflow-x-auto w-full max-height-500">
        <table class="table w-full">
            <!-- head -->
            <thead class="relative">
            <tr class="sticky top-0">
                <th></th>
                <th>Customer</th>
                <th>Order</th>
                <th>Date of purchase</th>
                <th>Order Total</th>
                <th>Status</th>
                <th>view</th>
                <th>transaction</th>
            </tr>
            </thead>
            <tbody>
            <!-- row 1 -->
            <OrderRowComponent :allOrders="displayedOrders" :Admin="this.$checkForAdmin()" />
            </tbody>           
        </table>
        </div>
    </div>
    <OrderDetailsComponent :order="selectedOrder" />

    <input type="checkbox" id="deliveryConfirmation" class="modal-toggle" />
    <div class="modal">
    <div class="modal-box">
        <h3 class="font-bold text-lg">Shipping Confirmation</h3>
        <p class="py-4">This order has been successfully delivered to the customer?</p>
        <div class="modal-action">
        <label for="deliveryConfirmation" class="btn" @click="updateSelectedOrder">Confirm</label>
        </div>
    </div>
    </div>
    <FooterComponent/>
</section>
</template>
<script>
import NavbarComponent from "@/components/NavbarComponent.vue";
import OrderRowComponent from "@/components/OrderRowComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import LoginComponent from "@/components/LoginComponent.vue";
import OrderDetailsComponent from "@/components/OrderDetailsComponent.vue";
import DataService from "@/dataService";
import { defineComponent } from "vue";

export default defineComponent({
    name:'AdminView',
    components:{
        NavbarComponent,
        OrderRowComponent,
        FooterComponent,
        LoginComponent,
        OrderDetailsComponent
    },
    data(){
        return{
            allOrders : [],
            incomingOrders : [],
            completedOrders : [],
            displayedOrders : [],
            validated : false,
            selectedOrder : {}
        }
    },
    methods:{
        getOrdersOption(){
            let option = document.getElementById('ordersFilter').value;
            if(option == 'INCOMING'){
                this.displayedOrders = this.incomingOrders
            }else if(option == 'COMPLETED'){
                this.displayedOrders = this.completedOrders
            }else{
                this.displayedOrders = this.allOrders
            }
        },
        async updateSelectedOrder(){
            this.selectedOrder.shippingCompleted = true;
            let response = await DataService.updateOrder(this.selectedOrder)
            console.log(response);
        }
    },
    async created(){
        let res = await DataService.getOrders('ALL')
        this.allOrders = res
        this.incomingOrders = this.allOrders.filter(order => order.shipping && !order.shippingCompleted)
        this.completedOrders = this.allOrders.filter(order => order.shipping && order.shippingCompleted)
        this.displayedOrders = this.allOrders
        this.$emitter.on('order-selected',async (order)=>{
            this.selectedOrder = order
        })
    }
})
</script>
<style>
.max-height-500{
    max-height: 500px;
}
.min-height-600{
    min-height: 600px;
}
</style>