<template>
    <div :class="`w-full flex flex-col justify-evenly h-72 hover:bg-gray-900  hover:cursor-pointer rounded-lg relative
    transition ease-in-out delay-100 hover:-translate-y-3 hover:scale-100 duration-300`" @click="goToProductPage()" :style="`min-width: ${minWidth}rem;`">
        <span class="w-fit px-6 py-2 absolute z-10 bg-orange-500 text-black font-bold top-0 right-0 rounded-tr-lg rounded-bl-lg">
            ${{product.price}}
        </span>
        <div class="w-full p-1 aspect-auto flex justify-center relative">
            
            <img :src="product.thumbnail" alt="" class="aspect-auto h-48 rounded">
        </div>
        <span class="p-2 w-full font-semibold text-center text-white">
            {{product.name}}
        </span>
    </div>             
</template>
<script setup lang="ts">
import { Product } from '@prisma/client';
import { useRouter } from 'vue-router';
const router = useRouter();

let props = defineProps<{
    product: Product
    minWidth: number
}>()

function goToProductPage() {
    router.push('/view-product/' + props.product.id);
}
</script>
