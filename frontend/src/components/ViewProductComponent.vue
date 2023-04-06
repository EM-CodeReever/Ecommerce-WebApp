<template>
    <div class="w-full max-w-xl md:max-w-3xl lg:max-w-6xl xl:max-w-7xl py-5 px-4 h-fit min-h-fit flex flex-col md:flex-row justify-between items-center bg-gray-700 rounded">
    <div class="h-fit xs-v2:h-full flex flex-col xs-v2:flex-row justify-between w-fit">
            <perfect-scrollbar class="hidden overflow-y-scroll h-fit max-h-80 w-28 xs-v2:grid grid-cols-1 gap-2 grid-flow-row">
                <div class="aspect-auto w-24 cursor-pointer rounded hover:opacity-75" @click="changeCurrentDisplayImage(product.thumbnail)">
                    <img :src="product.thumbnail" alt="" class="rounded">
                </div>
                <div class="aspect-auto w-24 cursor-pointer rounded hover:opacity-75" v-for="i in product.images" @click="changeCurrentDisplayImage(i.url)">
                    <img :src="i.url" alt="" class="rounded">
                </div>
            </perfect-scrollbar>
            <span class="xs-v2:hidden w-full h-fit flex justify-center gap-x-5 my-5">
                <div class="w-8 h-8 bg-white rounded cursor-pointer flex justify-center items-center" @click="changeCurrentDisplayImage(product.thumbnail)">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                </div>
                <div class="w-8 h-8 bg-white rounded cursor-pointer flex justify-center items-center" v-for="(i,index) in product.images" @click="changeCurrentDisplayImage(i.url)">{{index+1}}</div>
            </span>
        <figure class="h-80 w-80 bg-none rounded flex justify-center items-center">
            <img :src="currentDisplayImage" alt="" class="aspect-auto rounded max-h-80">
        </figure>
    </div>
    <div class="h-80 w-full rounded p-5 relative">
        <h2 class="text-2xl font-bold text-white">{{product.name}}</h2>
        <p class="text-gray-400 mb-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.</p>
        <StarRatingComponent :editable="false" :rating="product.rating" class="" :radioId="`review_${1}`"/>
        <label>
            <p class="mt-5 text-md font-semibold text-white mr-3">Quantity</p>
            <input class="input input-sm text-white w-20 input-ghost" type="number" min="1" v-model="quantity">
        </label>
        
        <button :disabled="displayOnly" class="absolute btn right-2 bottom-2 btn-success" @click="UpdateCart()">Add to Cart</button>
        <h2 class="text-2xl font-bold text-white absolute left-5 bottom-2">$ {{product.price}}</h2>
    </div>
    </div>
</template>
<script setup lang="ts">
import DataService from '../DataService';
import StarRatingComponent from '@/components/StarRatingComponent.vue';

import { Images } from '@prisma/client';
import { Product, CartItem } from '../types/betterTypes';
import { onMounted, ref } from 'vue';
import { currentCartStore } from '../stores/cartStore';
import { currentUserStore } from '../stores/userStore';

let currentCart = currentCartStore();
// let currentUser = currentUserStore();

let props = defineProps<{
    productId: string;
    displayOnly: boolean;
}>()

let images = ref<Images[]>([
    {
        id: 0,
        url: '',
        productId: 0,
    }
]);
let product = ref<Product>({
    id: 0,
    name: '',
    description: '',
    price: 0,
    stock: 0,
    categoryId: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    rating: 0,
    thumbnail: '',
    images: images.value,
});

let quantity = ref(1);

onMounted(async () => {
    product.value = await DataService.getProduct(props.productId);
    currentDisplayImage.value = product.value.thumbnail;
});

let currentDisplayImage = ref('');

function changeCurrentDisplayImage(image: string) {
    currentDisplayImage.value = image;
    
}


function UpdateCart() {
    console.log('Updating cart with new item [' + product.value.name + ']' + ' Quantity: ' + quantity.value + ' ID: ' + product.value.id);
    
    let cartItem: CartItem = {
        productId: product.value.id,
        quantity: quantity.value,
        product : product.value,
        cartId: currentCart.cart.id,
        id: 0,//do not include id when writing to db, I REPEAT DO NOT INCLUDE ID WHEN WRITING TO DB
    }
    // console.log(cartItem);
    currentCart.addCartItem(cartItem);
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
