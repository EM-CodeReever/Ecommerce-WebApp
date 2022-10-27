<template>
    <vueper-slides
      class="no-shadow bg-none w-full p-3 pb-0 rounded-lg"
      :visible-slides="slides_to_show"
      :gap="1"
      :slide-ratio="1 / slides_to_show"
      :arrows="false"
      :autoplay="true"
      :slide-multiple="true"
      :duration="3000"
      :bulletsOutside="true"
      :dragging-distance="70">
      <vueper-slide v-for="i in 9" :key="i" :title="i.toString()" class="rounded-box" image="https://erasmusnation-com.ams3.digitaloceanspaces.com/woocommerce-placeholder.png"/>
  </vueper-slides>
</template>

<script>
import { VueperSlides, VueperSlide } from 'vueperslides';
import 'vueperslides/dist/vueperslides.css';

    export default{
        name:"CustomVueperSlide",
        props:['slides_to_show'],
        components:{
            VueperSlides,
            VueperSlide
        },
        data(){
            return{

            }
        },
    }
</script>
