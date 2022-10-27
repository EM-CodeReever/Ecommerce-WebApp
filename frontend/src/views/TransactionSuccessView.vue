<template>
<div>
    <NavbarComponent/>
    <div class="hero bg-gray-200 text-gray-800 py-10">
    <div class="hero-content text-center">
        <div class="max-w-md flex flex-col items-center">
            <svg class="w-24 h-24 text-green-600 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path></svg>
            <h1 class="text-5xl font-bold text-gray-800">Payment Successful</h1>
            <p class="py-6">Thank you for shopping with us!</p>
            <button class="btn btn-primary" @click="this.$router.push('/categories')">Return to store</button>
        </div>
    </div>
    </div>
    <FooterComponent/>
</div>
</template>
<script>
import NavbarComponent from '../components/NavbarComponent.vue'
import FooterComponent from '../components/FooterComponent.vue'
export default {
    name:'TransactionSuccessView',
    components: {
        NavbarComponent,
        FooterComponent
    }
}
</script>
