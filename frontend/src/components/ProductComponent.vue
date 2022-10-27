<template>
    <div class="w-full flex flex-col justify-evenly h-72 hover:bg-gray-900 hover:cursor-pointer rounded relative" @click="goToProductPage()">
        <span class="w-fit px-3 py-2 font-semibold absolute bg-rose-600 text-white top-0 right-0 rounded-tr rounded-bl">
            ${{product.price}}
        </span>
        <div class="w-full p-1 aspect-auto flex justify-center">
            <img :src="product.thumbnail" alt="" class="aspect-auto h-48 rounded">
        </div>
        <span class="p-2 w-full font-semibold text-center text-white">
            {{product.name}}
        </span>
    </div>             
</template>
<script setup lang="ts">
import { Product } from '.prisma/client';
import { useRouter } from 'vue-router';
const router = useRouter();

let props = defineProps<{
    product: Product
}>()

function goToProductPage() {
    router.push('/view-product/' + props.product.id);
}
</script>
