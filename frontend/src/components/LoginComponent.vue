<template>
<div class="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 sm:mb-44">
  <div class="w-full max-w-md space-y-8 bg-white p-8 rounded-md">
    <div>
      <img class="mx-auto h-12 w-auto" src="../assets/ik-logo.png" alt="Your Company">
      <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Or
        <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">Create an account</a>
      </p>
    </div>
    <form class="mt-8 space-y-6" id="loginForm" @submit.prevent >
      <input type="hidden" name="remember" value="true">
      <div class="-space-y-px rounded-md shadow-sm">
        <div>
          <label for="email-address" class="sr-only">Email address</label>
          <input id="email-address" v-model="loginRequest.email" name="email" type="email" autocomplete="email" required class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Email address">
        </div>
        <div>
          <label for="password" class="sr-only">Password</label>
          <input id="password" name="password" v-model="loginRequest.password" type="password" autocomplete="current-password" required class="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Password">
        </div>
      </div>
      <p class="text-sm font-semibold text-error text-center">{{error}}</p>
      <div>
        <button @click="login()" type="submit" class="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          <span class="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg v-if="!processing" class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clip-rule="evenodd" />
            </svg>
            <hollow-dots-spinner v-if="processing"
              :animation-duration="1000"
              :dot-size="10"
              :dots-num="3"
              color="#fff"
            />
          </span>
          Sign in
        </button>
      </div>
    </form>
  </div>
</div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import DataService from '../DataService';
import { HollowDotsSpinner } from 'epic-spinners';
import { currentUserStore } from '../stores/userStore';
import { currentCartStore} from '../stores/cartStore';
import type { LoginRequest, LoginResponse } from '../types/index';
import { Cart } from '../types/betterTypes';
import { useRouter } from 'vue-router';
import { User } from '.prisma/client';
let router = useRouter();
let currentUser = currentUserStore();
let currentCart = currentCartStore();

let processing = ref(false);  

let loginRequest: LoginRequest = {
    email: '',
    password: '',
};

let error = ref('');

async function login(){
  processing.value = true;
    let res = await DataService.login(loginRequest) as LoginResponse;
    if (res.status) {
        currentUser.loggedIn = res.status;
        currentUser.user = res.user as User;
        currentCart.setCurrentCart(await DataService.getUserCart(currentUser.user.id) as Cart);
        router.push('/');
    } else {
        error.value = res.message;
        processing.value = false;
    } 
}


</script>