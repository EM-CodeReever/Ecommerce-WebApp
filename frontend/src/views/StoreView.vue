<template>
  <div>
    <NavbarComponent/>
    <span>
      <span class="w-full h-44 flex justify-center items-center">
        <h2 class="text-2xl md:text-4xl font-extrabold text-center text-gray-200">{{categoryDisplayName}}</h2>
      </span>
    </span>
    <ProductGridComponent :category="categoryId"/>
    <div class="btn-group flex justify-center py-5">
      <button class="btn">«</button>
      <button class="btn">Page 1</button>
      <button class="btn">»</button>
    </div>

    <FooterComponent/>
  </div>
</template>

<script setup lang="ts">
// @ is an alias to /src
import { useRoute } from "vue-router";
import DataService from "../DataService";
import FooterComponent from '../components/FooterComponent.vue'
import NavbarComponent from '../components/NavbarComponent.vue'
import ProductGridComponent from '../components/ProductGridComponent.vue'
import FilterProductsComponent from '../components/FilterProductsComponent.vue'
import { Category, Product } from "@prisma/client";
import { ref } from "vue";
import {onMounted} from "vue";

const route = useRoute();
let products = ref<Product[]>([]);
let categoryId = ref<number>(0);
let categoryDisplayName = ref<string>("");
categoryId.value = Number(route.params.categoryId);


onMounted(async () => {
  DataService.getAllCategories().then((data) => {
    data.forEach((category:Category) => {
      if (category.id == categoryId.value) {
        categoryDisplayName.value = category.name;
      }
    });
  });
  products.value = await DataService.getAllProducts();
  console.log(products.value);
});
</script>
