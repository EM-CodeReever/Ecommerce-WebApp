<template>
    <div>
        <div class="navbar bg-base-100">
        <div class="navbar-start">
            <div class="dropdown">
            <label tabindex="0" class="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
            <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                <li @click="$emit('page-change',{target:'Orders'})"><a class="font-bold">Orders</a></li>
                <li @click="$emit('page-change',{target:'Products'})"><a class="font-bold">Products</a></li>
                <li @click="$emit('page-change',{target:'Users'})"><a class="font-bold">Users</a></li>
            </ul>
            </div>
            <a class="btn btn-ghost normal-case text-xl">Admin Section</a>
        </div>
        <div class="navbar-center hidden lg:flex">
            <ul class="menu menu-horizontal p-0">
                <li @click="$emit('page-change',{target:'Orders'})"><a class="font-bold">Orders</a></li>
                <li @click="$emit('page-change',{target:'Products'})"><a class="font-bold">Products</a></li>
                <li @click="$emit('page-change',{target:'Users'})"><a class="font-bold">Users</a></li>
            </ul>
        </div>
        <div class="navbar-end">
            <a class="btn">
                <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"></path></svg> 
                <span>return</span>
            </a>
        </div>
        </div>
        <!-- <template #content>
            
        </template> -->
        
    </div>
</template>

<script setup lang="ts">
import HeadBannerComponent from './HeadBannerComponent.vue';
import NavbarComponentVue from './NavbarComponent.vue';
import { ref } from 'vue';



let component = ref(HeadBannerComponent);
</script>
