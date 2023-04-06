<template>

    <div class="w-full h-fit min-h-96 flex justify-center">
        
        <div class="w-full max-w-xl md:max-w-3xl lg:max-w-6xl xl:max-w-7xl pb-5 h-fit bg-gray-700 rounded relative flex flex-col justify-between" v-if="!(products.length == 0)">
            <FilterProductsComponent />
            <div class="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-flow-row gap-3 h-fit px-3">
                <ProductComponent v-for="p in products" :minWidth="1" :product="p"/>
            </div>
        </div>
        <div class="w-full max-w-xl md:max-w-3xl lg:max-w-6xl xl:max-w-7xl pb-5 h-fit bg-gray-700 rounded relative flex flex-col justify-between" v-else>
            <FilterProductsComponent />
            <div class="flex w-full justify-center items-center">
                <div class="w-full h-96 flex justify-center items-center text-gray-100 font-bold" v-if="loaded">
                    <svg class="w-6 h-6 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    No Results Found
                </div>
                <div class="w-full h-96 flex justify-center items-center text-gray-100 font-bold" v-if="!loaded">
                    <svg class="animate-spin h-12 w-12 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="gray" stroke-width="4"></circle>
                    <path class="opacity-75" fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import DataService from '../DataService';
import ProductComponent from '@/components/ProductComponent.vue';
import FilterProductsComponent from '@/components/FilterProductsComponent.vue';
import { Product } from '@prisma/client';
import { onMounted, ref } from 'vue';
import {useEventStore} from '../stores/eventStore';

let props = defineProps<{
    category: number
}>()



const products = ref<Product[]>([]);
const loaded = ref(false);
onMounted(async () => {
    const data = await DataService.getAllProductsFromCategory(props.category);
    products.value = data;
    loaded.value = true;
})

// export default {
//     props:['categoryId'],
//     name: 'ProductGridComponent',
//     components: {
//         ProductComponent,
//         FilterProductsComponent

//     },
//     data() {
//         return {
//             Products : [],
//             loaded : false,
//         }
//     },
//     methods: {
//         eventHandling(){
//             this.$emitter.on('search-click',async (data) => {
//                 await this.fetchAllProducts()
//                 console.log(data)
//                 this.Products = this.Products.filter(e => {
//                     if(e.title.toLowerCase().includes(data.text.toLowerCase())){
//                         console.log(e.category)
//                         return e
                        
//                     }
//                 })
//             })
//             this.$emitter.on('filter-click',async(data)=>{
//                 console.log(data);
//                 if(data.category != 'Select Category'){
//                     await this.fetchAllProducts()
//                     this.Products = this.Products.filter(e => {
//                         if(e.category == data.category){
//                             return e
//                         }
//                     })
//                 }
//                 if(data.sort == 'rating'){
//                     console.log('sort by rating selected')
//                 }
//                 if(data.sort == 'price'){
//                     this.Products.sort((a,b) => {
//                         return b.price - a.price
//                     })
//                     console.log(this.Products)
//                 }
//                 if(data.sort == 'asc'){
//                     this.Products.sort((a,b)=>{
//                         let titleA = a.title.toLowerCase(),
//                             titleB = b.title.toLowerCase();

//                         if (titleA < titleB) {
//                             return -1;
//                         }
//                         if (titleA > titleB) {
//                             return 1;
//                         }
//                         return 0;
//                     })
//                 }
//                 if(data.sort == 'desc'){
//                     this.Products.sort((a,b)=>{
//                         let titleA = a.title.toLowerCase(),
//                             titleB = b.title.toLowerCase();

//                         if (titleA < titleB) {
//                             return 1;
//                         }
//                         if (titleA > titleB) {
//                             return -1;
//                         }
//                         return 0;
//                     })
//                 }
//             })
//         },
//         async fetchAllProducts(){
//             await DataService.getProductCategory(this.categoryId).then(data => {
//                 this.Products = data;
//                 console.log(this.Products);
//                 this.loaded = true
//             });
//         }
//     },
//     created() {
//         this.eventHandling()
//         this.fetchAllProducts()
//     },
// }
</script>
<style scoped>

</style>