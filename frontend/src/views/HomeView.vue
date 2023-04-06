<template>
  <div>
    <NavbarComponent/>
    <HeadBannerComponent v-if="true"/>
  <vueper-slides
    class="hidden lg:block"
    ref="myVueperSlides"
    :autoplay="true"
    :arrows="false"
    :bullets="false"
    >
    <vueper-slide
      v-for="(slide) in slides"
      :key="slide.id"
      :title="slide.title"
      :content="slide.content"
      :image="`${slide.link}`" 
      />
  </vueper-slides>

  <vueper-slides
    class="lg:hidden"
    ref="myVueperSlides"
    :autoplay="true"
    :arrows="false"
    :bullets="false"
    :slide-ratio="1/ 2">
    <vueper-slide
      v-for="(slide) in slides"
      :key="slide.id"
      :title="slide.title"
      :content="slide.content"
      :image="slide.link" 
      />
  </vueper-slides>

  <transition name="in">
  <div class="bg-none" v-if="true">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-2xl mx-auto py-5 sm:py-24 lg:py-10 lg:max-w-none">
        <h2 class="text-2xl lg:text-4xl font-extrabold text-center text-gray-200">Collections</h2>
        <button type="button" class="font-medium underline text-white hover:text-indigo-500 w-full text-center md:text-left" @click="">View all categories<span aria-hidden="true"> &rarr;</span></button>
        <div class="mt-6 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-6 ">

          <div class="group relative slideanim delay-0">
            <div class="relative w-full h-40 bg-white rounded-lg overflow-hidden transition ease-in-out delay-100 duration-300 group-hover:scale-105 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
              <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" class="w-full h-full object-center object-cover">
              <button class="btn btn-error absolute bottom-4 right-4">shop now</button>
            </div>
            <h3 class="mt-6 text-sm font-bold text-gray-200">
              <a href="/store/3">
                <span class="absolute inset-0"></span>
                Shoes
              </a>
            </h3>
            <p class="text-base italic text-gray-200">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
          </div>

          <div class="group relative slideanim delay-150">
            <div class="relative w-full h-40 bg-white rounded-lg overflow-hidden transition ease-in-out delay-100 duration-300 group-hover:scale-105 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
              <img src="https://images.unsplash.com/photo-1627384113743-6bd5a479fffd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" class="w-full h-full object-center object-cover">
              <button class="btn btn-error absolute bottom-4 right-4">shop now</button>
            </div>
            <h3 class="mt-6 text-sm font-bold text-gray-200">
              <a href="/store/2">
                <span class="absolute inset-0"></span>
                Beauty
              </a>
            </h3>
            <p class="text-base italic text-gray-200">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
          </div>

          <div class="group relative slideanim delay-300">
            <div class="relative w-full h-40 bg-white rounded-lg overflow-hidden transition ease-in-out delay-100 duration-300 group-hover:scale-105 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1 ">
              <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1099&q=80" class="w-full h-full object-center object-cover">
              <button class="btn btn-error absolute bottom-4 right-4">shop now</button>
            </div>
            <h3 class="mt-6 text-sm font-bold text-gray-200">
              <a href="/store/7">
                <span class="absolute inset-0"></span>
                Electronics
              </a>
            </h3>
            <p class="text-base italic text-gray-200">Lorem ipsum dolor sit amet, consectetur adipiscing elit,</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  </transition>


  <div class="bg-none slideanim">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-xl mx-auto py-5 lg:py-10 lg:max-w-none">
        <h2 class="text-2xl lg:text-4xl font-extrabold text-gray-200 text-center">New Additions</h2>
        <div class="grid md:grid-cols-3 lg:grid-row-2 xs:grid-cols-2 grid-cols-1 grid-flow-rows gap-3 sm:gap-3 lg:gap-5 mt-6">
          <ProductComponent :minWidth="1" :product="product" v-for="index in 6" :key="index"/>
        </div>
      </div>
    </div>
  </div>

    <div class="bg-none slideanim">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-2xl mx-auto py-5 lg:py-10 lg:max-w-none">
          <h2 class="text-2xl lg:text-4xl font-extrabold text-gray-200 text-center">Featured Products</h2>
          <div class="flex justify-center mt-6">
            <CustomVueperSlide class="sm:hidden" :slides_to_show="1" />
            <CustomVueperSlide class="hidden sm:block md:hidden" :slides_to_show="2" />
            <CustomVueperSlide class="hidden md:block lg:hidden" :slides_to_show="3" />
            <CustomVueperSlide class="hidden lg:block xl:hidden" :slides_to_show="3" />
            <CustomVueperSlide class="hidden xl:block" :slides_to_show="3" />
          </div>
        </div>
      </div>
    </div>
    
    <FooterComponent class="mt-5"/>
  </div>
</template>

<script setup lang="ts">

import NavbarComponent from '../components/NavbarComponent.vue'
import CustomVueperSlide from '../components/CustomVueperSlide.vue'
import FooterComponent from '../components/FooterComponent.vue'
import ProductComponent from '../components/ProductComponent.vue'
import HeadBannerComponent from '../components/HeadBannerComponent.vue'
import { Product, Images } from '.prisma/client'
//ignore next line
import { VueperSlides, VueperSlide } from 'vueperslides' 
import 'vueperslides/dist/vueperslides.css';

let bool = false;
let pauseOnHover = true;
let autoPlaying = true;
let internalAutoPlaying = true;

let product: Product = {
  id: 0,
  name: 'Example Product',
  description: 'test',
  price: 1,
  categoryId: 1,
  rating: 1,
  stock: 1,
  thumbnail: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
  createdAt: new Date(),
  updatedAt: new Date()
}
let slides = [
        {
          id: 'slide-1',
          title: '',
          content: `<div class="hero lg:glass rounded-lg">
          <div class="hero-content text-center">
            <div class="">
              <h1 class=" text-2xl xs:text-4xl sm:text-6xl font-bold text-white lg:text-gray-800">Ecommerce Web Solution | EM-CodeReever</h1>
              <p class=" py-1 lg:py-6 text-white text-sm xs:text-md md:text-lg lg:text-gray-800">We sell a variety of products</p>
              <a class="btn btn-sm sm:btn-md btn-primary focus:bg-rose-500 bg-rose-500" href="/categories">Shop Now</a>
            </div>
          </div>
        </div>`,
          link:'https://images.unsplash.com/photo-1526045405698-cf8b8acc4aaf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80'
        },
        {
          id: 'slide-2',
          link:'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
        },
        {
          id: 'slide-3',
          link:'https://images.unsplash.com/photo-1546213290-e1b492ab3eee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80'
        },
      ]
      
      

      

</script>
<style>
.max-width-90{
    max-width: 90%;
}
.fullPage{
  min-height: 100vh;
}
.in-enter-active,
.in-leave-active {
  transition: opacity 1s ease-in-out;
}

.in-enter-from,
.in-leave-to {
  opacity: 0;
}
</style>