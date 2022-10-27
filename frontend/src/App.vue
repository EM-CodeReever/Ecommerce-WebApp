<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import {RouterView} from 'vue-router'

</script>

<template>
  <RouterView />
</template>

<style>
body{
  height: 100%;
}

  .slideanim {opacity:0;}
  .slide {
    animation-name: slide;
    -webkit-animation-name: slide;
    animation-duration: 1s;
    -webkit-animation-duration: 1s;
    animation-fill-mode: forwards;
  }
  .delay-0{
    animation-delay: 0s;
  }
  .delay-150{
    animation-delay: .15s;
  }
  .delay-100{
    animation-delay: .1s;
  }
  .delay-200{
    animation-delay: .2s;
  }
  .delay-300{
    animation-delay: .3s;
  }
  .delay-400{
    animation-delay: .4s;
  }
  .delay-500{
    animation-delay: .5s;
  }
  .delay-600{
    animation-delay: .6s;
  }
  .delay-700{
    animation-delay: .7s;
  }
  .delay-800{
    animation-delay: .8s;
  }
  @keyframes slide {
    0% {
      opacity: 0;
      transform: translateY(70%);
    } 
    100% {
      opacity: 1;
      transform: translateY(0%);
    }
  }
  @-webkit-keyframes slide {
    0% {
      opacity: 0;
      -webkit-transform: translateY(70%);
    } 
    100% {
      opacity: 1;
      -webkit-transform: translateY(0%);
    }
  }
</style>
