<template>
<div class="container mx-auto mt-10 pb-10">
        <div class="flex flex-wrap justify-center">
            <div class="w-full max-w-sm">
                <div class="flex flex-col break-words bg-white border rounded shadow-md">
                    <div class="font-semibold bg-gray-200 text-gray-700 py-3 px-6 mb-0">
                        <h1 class="text-center">Login</h1>
                    </div>
                    <div class="w-full p-6">
                        <div class="flex flex-wrap mb-6">
                            <label for="email" class="block text-gray-700 text-sm font-bold mb-2">
                                Email
                            </label>
                            <input
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="email"
                                type="text"
                                placeholder="email@example.com"
                                v-model="loginRequest.email"
                                required
                            />
                        </div>
                        <div class="flex flex-wrap">
                            <label for="password" class="block text-gray-700 text-sm font-bold mb-2">
                                Password
                            </label>
                            <input
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                id="password"
                                type="password"
                                placeholder="******************"
                                v-model="loginRequest.password"
                                required
                            />
                        </div>
                        <p class="text-red-500 text-xs italic">
                            {{ error }}
                            </p>
                        <div class="flex items-center justify-between mt-6">
                        <span class="flex flex-col">
                            <!-- <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                            Forgot Password?
                            </a> -->
                            <router-link class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" to="/signup">
                            Create Account
                            </router-link>
                        </span>
                        <button
                            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            @click="login">
                            Login
                        </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import DataService from '../DataService';
import { defineProps } from 'vue';
import { currentUserStore } from '../stores/userStore';
import { currentCartStore, Cart } from '../stores/cartStore';
import type { LoginRequest, LoginResponse } from '../types/index';
import { useRouter } from 'vue-router';
import { User } from '.prisma/client';
let router = useRouter();
let currentUser = currentUserStore();
let currentCart = currentCartStore();
// defineProps<{ forAdmin: boolean }>();
let loginRequest: LoginRequest = {
    email: '',
    password: '',
};

let error = ref('');

async function login(){
    let res = await DataService.login(loginRequest) as LoginResponse;
    if (res.status) {
        currentUser.loggedIn = res.status;
        currentUser.user = res.user as User;
        currentCart.setCurrentCart(await DataService.getUserCart(currentUser.user.id) as Cart);
        router.push('/');
    } else {
        error.value = res.message;
    } 
}


</script>