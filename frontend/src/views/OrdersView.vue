<template>
    <section>
        <NavbarComponent/>
        <div class="text-white my-10">
            <h1 class="text-4xl font-extrabold text-center">Your Orders</h1>
            <p class="text-center font-medium">Displays all the orders you have made</p>
        </div>
        <div class="flex justify-center">
            <div class="overflow-x-auto w-full max-w-6xl max-height-500">
            <table class="table  w-full">
                <!-- head -->
                <thead class="relative">
                <tr class="sticky top-0">
                    <th></th>
                    <th>Order</th>
                    <th>Date of purchase</th>
                    <th>Order Total</th>
                    <th>Status</th>
                    <th>view</th>
                </tr>
                </thead>
                <tbody>
                <!-- row 1 -->
                <OrderRowComponent :allOrders="orderList" :Admin="this.$checkForAdmin()" />
                </tbody>           
            </table>
            </div>
        </div>
        <OrderDetailsComponent :order="selectedOrder"/>
        <FooterComponent class="mt-20"/>
    </section>
</template>
<script>
import { defineComponent } from "vue";
import NavbarComponent from "@/components/NavbarComponent.vue";
import DataService from "@/dataService";
import OrderRowComponent from "@/components/OrderRowComponent.vue";
import OrderDetailsComponent from "@/components/OrderDetailsComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
export default defineComponent({
    name:'OrdersView',
    components:{
        NavbarComponent,
        OrderRowComponent,
        OrderDetailsComponent,
        FooterComponent,
    },
    data(){
        return{
            orderList : [],
            selectedOrder : {}
        }
    },
    async created(){
        this.orderList = await DataService.getOrders(this.$getCurrentUserId())
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
</style>