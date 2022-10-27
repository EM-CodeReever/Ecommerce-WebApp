<template>
  <div>
    <NavbarComponent/>
    <h2 class="text-4xl text-gray-200 text-center my-5 font-bold">About</h2>
    <span class="sm:flex sm:justify-center">
    <img class="w-1/1" src="https://i.ibb.co/LzRs7gN/Whats-App-Image-2022-07-06-at-11-58-51-AM-1.jpg" alt="About Us">
    </span>
    <h2 class="text-3xl text-gray-200 text-left my-5 font-bold mx-10 lg:mx-24 ">Who are we?</h2>
    <p class="lg:mx-24 mx-10 font-medium text-gray-200 mb-10">Short introductory paragraph about the business</p>
    <FooterComponent/>
  </div>
</template>
<script setup lang="ts">
import NavbarComponent from '@/components/NavbarComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'

</script>
