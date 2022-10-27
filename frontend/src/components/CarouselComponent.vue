<template>
    <span :class="`xl:mr-5 ${hideOnMobile ? 'hidden xl:flex' : 'flex'} h-1/1 xl:justify-between flex-col `">
        <span></span>  <!-- empty span just to make slideshow seem center justified on some screen sizes-->
        <div class="carousel h-fit w-fit rounded aspect-square custom-width">
        <div :id="`item${itemId + index}`" class="carousel-item aspect-square custom-width" v-for="(image,index) in props.images" :key="index">
            <img :src="image.url" class="aspect-square xl:custom-width" />
        </div> 
        </div>
            <div class="flex justify-center w-full lg:w-86 pt-2 gap-2">
                <a :href="`#item${itemId + index}`" class="btn btn-xs h-10 w-10" v-for="(image,index) in props.images" :key="index">{{index+1}}</a> 
            </div>
        </span>
        <!-- </div> -->
</template>
<script setup lang="ts">
import { Images } from '.prisma/client';
import { ref } from 'vue'
let props = defineProps<{
    itemId: number,
    hideOnMobile: boolean,
    images : Images[]
}>()
// export default {
//     name: 'CarouselComponent',
//     props: ['hideOnMobile','itemId'],
//     methods: {
//         preventDefault(e){
//             e.preventDefault();
//         }
//     }
// }
</script>
<style>
.custom-width{
    max-width: 550px;
}
</style>