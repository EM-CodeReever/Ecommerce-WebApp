<template>
    <div>
      <NavbarComponent />
      <div class="w-full h-fit min-h-96 flex flex-col justify-start items-center my-24">
          <ViewProductComponent :productId="id" :displayOnly="false" />
          <h2 class="text-2xl lg:text-4xl font-extrabold text-center text-gray-200 my-10">You Might Also Like</h2>
          <perfect-scrollbar class="w-full max-w-xl md:max-w-3xl lg:max-w-6xl xl:max-w-7xl py-5 px-4 h-fit min-h-fit gap-x-5 grid grid-flow-col grid-rows-1 bg-gray-700 rounded overflow-x-scroll">
              <ProductComponent :minWidth="20" :product="p" v-for="p in CategorizedProducts" class="flex-none"/>
          </perfect-scrollbar>
          <div class="flex flex-col-reverse lg:flex-row justify-between w-full max-w-xl md:max-w-3xl lg:max-w-6xl xl:max-w-7xl h-fit mt-20 gap-5">
              <perfect-scrollbar class="bg-red-200 w-full lg:max-w-md h-80 relative" v-if="!questionSent">
                  <span class="bg-gray-700 text-white h-14 flex justify-center items-center sticky top-0"> 
                      <h2 class="text-xl font-semibold">Ask a Question</h2>
                  </span>
                  <form action="" @submit.prevent class="grid grid-cols-5 grid-rows-2 relative">
                      <div class="form-control px-5 col-span-full row-span-1">
                          <label for="question" class="label font-semibold">Question</label>
                          <textarea name="question" id="question"  class="textarea"  placeholder="Types here..."></textarea>
                      </div>
                      <div class="form-control px-5 col-span-2 row-span-1">
                          <label for="name" class="label font-semibold">Name</label>
                          <input type="text" name="name" id="name" class="input">
                      </div>
                      <div class="form-control px-5 col-span-3 row-span-1">
                          <label for="email" class="label font-semibold">Email</label>
                          <input type="email" name="email" id="email" class="input">
                      </div>
                      <button class="absolute btn btn-sm -bottom-7 right-5" @click="questionSent = true">submit</button>
                  </form>
              </perfect-scrollbar>
              <perfect-scrollbar v-if="questionSent" class="h-80 w-full lg:max-w-md bg-red-200 flex justify-center items-center">
                  <h2 class="text-2xl font-bold">Your question has been sent!</h2>
              </perfect-scrollbar>
              <div class="w-full max-w-xl md:max-w-3xl lg:max-w-6xl xl:max-w-7xl h-80 min-h-fit gap-x-5 flex flex-col justify-between bg-gray-200 rounded">
                  <span class="bg-gray-700 text-white h-14 flex justify-between items-center w-full py-3 px-5"> 
                      <h2 class="text-xl font-semibold">Reviews</h2>
                      <button class="btn btn-info btn-sm">Add Review</button>
                  </span>
                  <perfect-scrollbar>
                      <!-- review components to go here -->
                  </perfect-scrollbar>
              </div>
          </div>
      </div>
      <FooterComponent/>
    </div>
  </template>
  
  <script setup lang="ts">
  import FooterComponent from '@/components/FooterComponent.vue'
  import NavbarComponent from '@/components/NavbarComponent.vue'
  import ViewProductComponent from '@/components/ViewProductComponent.vue'
  import DataService from '../DataService';
  import ProductComponent from '../components/ProductComponent.vue';
  import { Review } from '@prisma/client';
  import { Product } from '../types/betterTypes';
  import { useRoute } from "vue-router";
  import { onMounted, ref } from "vue";
  
  import { currentUserStore } from '../stores/userStore';

  const route = useRoute();
  const id = ref<string>(route.params.id as string);
  
  console.log(id.value);

  let currentUser = currentUserStore();

  

  

  let questionSent = ref(false);
  

  
  let newReview = ref<Review>({
      comment: '',
      rating: 1,
      productId: 0,
      userId: 0,
      createdAt: new Date(),
      id: 0,
  })


  
  let productReviews = ref<Review[]>([]);
  let CategorizedProducts = ref<Product[]>([]);

  
  onMounted(async () => {
      console.log('mounted');
      let product = await DataService.getProduct(id.value);
      CategorizedProducts.value = await DataService.getAllProductsFromCategory(product.categoryId);
      console.log(CategorizedProducts.value);
      console.log("hex dee");
      
      
      // productReviews.value = await DataService.getReviews(props.productId);
  })
  
  function getReview() {
      
  }
  

  
  // let productCategories = {
  //     1: 'Electronics',
  //     2: 'Clothing',
  //     3: 'Shoes',
  //     4: 'Accessories',
  //     5: 'Beauty',
  //     6: 'Home',
  //     8: 'Books',
  //     9: 'Sports',
  //     10: 'Automotive',
  //     12: 'Tools',
  //     15: 'Health',
  //     18: 'Luggage',
  //     20: 'Musical Instruments',
  //     21: 'Office Products',
  //     24: 'Outdoors',
  //     25: 'Handmade',
  //     28: 'Camera & Photo',
  //     29: 'Collectibles & Fine Art',
  // }
  
  </script>
  <style>
  textarea {
      resize: none;
  }
  .scroll-style::-webkit-scrollbar {
    background-color: transparent;
    height: 4px;
  }
  .scroll-style::-webkit-scrollbar-thumb {
    background-color: #7c69ef;
    border-radius: 10px;
  }
  .space_between_children:first-of-type{
      margin-left: 0px;
  }
  .space_between_children{
      margin-left: 15px;
  }
  .ps{
      height: 320px;
  }
  </style>