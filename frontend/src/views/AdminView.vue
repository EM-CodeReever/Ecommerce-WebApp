<template>
<section>
    <AdminNavbarComponent @page-change="transitionHandler"/>
    <Transition name="slide-fade" mode="out-in">
            <component :is="component"/>
    </Transition>
    <!-- <NavbarComponent/>
    <LoginComponent :forAdmin="true" v-if="true"/> -->
        <!-- <OrderComponent/>  -->
    <!-- <OrderDetailsComponent :order="selectedOrder" />

    <input type="checkbox" id="deliveryConfirmation" class="modal-toggle" />
    <div class="modal">
    <div class="modal-box">
        <h3 class="font-bold text-lg">Shipping Confirmation</h3>
        <p class="py-4">This order has been successfully delivered to the customer?</p>
        <div class="modal-action">
        <label for="deliveryConfirmation" class="btn" @click="updateSelectedOrder">Confirm</label>
        </div>
    </div>
    </div> -->
    <FooterComponent/>
</section>
</template>
<script setup lang="ts">
import AdminNavbarComponent from "@/components/AdminNavbarComponent.vue";
import OrderRowComponent from "@/components/OrderRowComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";

import DataService from "../DataService";
import OrderComponent from "../components/OrderComponent.vue";
import UserCRUD from "../components/UserCRUD.vue";
import productCRUD from "../components/ProductCRUD.vue";
import { ref, shallowRef } from 'vue';

function transitionHandler(e:any) {
    console.log("transitionHandler");
    console.log(e);
    switch(e.target) {
        case "Orders":
            component.value = OrderComponent;
            break;
        case "Products":
            component.value = productCRUD;
            break;
        case "Users":
            component.value = UserCRUD;
            break;
    }
}

let component = shallowRef(OrderComponent);
// export default defineComponent({
//     name:'AdminView',
//     components:{
//         NavbarComponent,
//         OrderRowComponent,
//         FooterComponent,
//         LoginComponent,
//         OrderDetailsComponent
//     },
//     data(){
//         return{
//             allOrders : [],
//             incomingOrders : [],
//             completedOrders : [],
//             displayedOrders : [],
//             validated : false,
//             selectedOrder : {}
//         }
//     },
//     methods:{
//         getOrdersOption(){
//             let option = document.getElementById('ordersFilter').value;
//             if(option == 'INCOMING'){
//                 this.displayedOrders = this.incomingOrders
//             }else if(option == 'COMPLETED'){
//                 this.displayedOrders = this.completedOrders
//             }else{
//                 this.displayedOrders = this.allOrders
//             }
//         },
//         async updateSelectedOrder(){
//             this.selectedOrder.shippingCompleted = true;
//             let response = await DataService.updateOrder(this.selectedOrder)
//             console.log(response);
//         }
//     },
//     async created(){
//         let res = await DataService.getOrders('ALL')
//         this.allOrders = res
//         this.incomingOrders = this.allOrders.filter(order => order.shipping && !order.shippingCompleted)
//         this.completedOrders = this.allOrders.filter(order => order.shipping && order.shippingCompleted)
//         this.displayedOrders = this.allOrders
//         this.$emitter.on('order-selected',async (order)=>{
//             this.selectedOrder = order
//         })
//     }
// })
</script>
<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
  transition-delay: 0.3s;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(-20px);
  opacity: 0;
}
</style>