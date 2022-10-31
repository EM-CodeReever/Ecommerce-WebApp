<template>
    <div class="rounded bg-gray-800 h-fit p-4 w-1/1 m-5 lg:m-12 min-height-600" v-if="true">
        <span class="flex justify-between mb-5">
            <p class="text-2xl sm:text-4xl m-2 text-gray-200 font-bold">Orders</p>
            <select name="" id="ordersFilter" class="select sm:select-lg" @change="getOrdersOption()">
                <option value="ALL">All (26)</option>
                <option value="INCOMING">Incoming (18)</option>
                <option value="COMPLETED">Delivered (8)</option>
            </select>
        </span>
        <div class="overflow-x-auto w-full max-height-500">
        <table class="table w-full">
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
            <!-- <OrderRowComponent :allOrders="displayedOrders" :Admin="this.$checkForAdmin()" /> -->
            </tbody>           
        </table>
        </div>
    </div>
</template>
<script setup lang="ts">
function getOrdersOption() {
    // const ordersFilter = document.getElementById("ordersFilter") as HTMLSelectElement;
    // const selectedOption = ordersFilter.options[ordersFilter.selectedIndex].value;
    // if (selectedOption === "ALL") {
    //     displayedOrders = allOrders;
    // } else if (selectedOption === "INCOMING") {
    //     displayedOrders = incomingOrders;
    // } else if (selectedOption === "COMPLETED") {
    //     displayedOrders = completedOrders;
    // }
}
</script>