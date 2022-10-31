<template>
<div>
<NavbarComponent />
  <div class="bg-white shadow overflow-hidden rounded-lg m-5 lg:mb-64">
    <div class="px-4 py-5 flex-col sm:flex-row flex justify-between sm:px-6">
      <span>
        <h3 class="text-xl text-center sm:text-left font-bold leading-6 text-gray-900">User Profile</h3>
        <p class="my-1 text-center sm:text-left max-w-2xl text-sm text-gray-500">Personal details and account information.</p>
      </span>
      <span class="flex justify-center">
        <button class="btn max-w-sm" @click="">Edit User Details</button>
      </span>
    </div>
    <div class="border-t border-gray-200">
      <dl>
        <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-md font-medium text-gray-500">First name</dt>
          <dd class="mt-1 text-lg font-medium text-gray-900 sm:mt-0 sm:col-span-2 flex justify-between items-center">{{ currentUser.user.firstName}}</dd>
        </div>
        <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-md font-medium text-gray-500">Last name</dt>
          <dd class="mt-1 text-lg font-medium text-gray-900 sm:mt-0 sm:col-span-2 flex justify-between items-center">{{ currentUser.user.lastName }} </dd>
        </div>
        <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-md font-medium text-gray-500">Phone Number</dt>
          <dd class="mt-1 text-lg font-medium text-gray-900 sm:mt-0 sm:col-span-2 flex justify-between items-center">{{currentUser.user.phoneNumber}} </dd>
        </div>
        <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-md font-medium text-gray-500">Email address</dt>
          <dd class="mt-1 text-lg font-medium text-gray-900 sm:mt-0 sm:col-span-2 flex justify-between items-center">{{currentUser.user.email}}</dd>
        </div>
        <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-md font-medium text-gray-500">Gender</dt>
          <dd class="mt-1 text-lg font-medium text-gray-900 sm:mt-0 sm:col-span-2 flex justify-between items-center">{{currentUser.user.gender}}</dd>
        </div>
        <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-md font-medium text-gray-500">Date of birth</dt>
          <dd class="mt-1 text-lg font-medium text-gray-900 sm:mt-0 sm:col-span-2 flex justify-between items-center">{{new Date(currentUser.user.dateOfBirth).toLocaleDateString() }}</dd>
        </div>
        <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-md font-medium text-gray-500">Shipping Address(es)</dt>
          <dd class="mt-1 text-lg font-medium text-gray-900 sm:mt-0 sm:col-span-2 gap-x-5 flex flex-col justify-start">
            <span v-for="address,index in shippingAddress" :key="index" class="mb-3 flex flex=start gap-3">
              <div class="rounded p-4 bg-gray-800 text-gray-200 w-96 relative h-fit">
                <button class="btn btn-sm absolute btn-error top-4 right-4">delete</button>
                <p class="text-base font-sans mb-2">Address {{index+1}}</p>
                <p class="text-sm font-medium">{{address.street_address}} </p>
                <p class="text-sm font-medium">{{address.parish}}</p>
                <p class="text-sm font-medium">{{address.city}}</p>
              </div>
            </span>
            </dd>
        </div>
        <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 flex flex-col items-center justify-center sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-800 sm:text-left text-center">Security</dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex flex-col max-w-md">
            <label for="changePassword" class="btn btn-sm m-1">change password</label>
          </dd>
        </div>
        <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 flex flex-col items-center justify-center">
          <dt class="text-sm font-medium text-gray-800 sm:text-left text-center">Account Action</dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex flex-col max-w-md">
            <button class="btn btn-sm btn-error">Delete Account</button>
          </dd>
        </div>
      </dl>
    </div>
  </div>
  <!-- password modal -->
  <input type="checkbox" id="changePassword" class="modal-toggle" />
  <div class="modal">
    <div class="modal-box relative">
      <label for="changePassword" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
      <h3 class="font-bold text-lg text-center mb-5">Change Password</h3>
        <div class="flex flex-col" v-if="!changeSuccess">
        <label for="old-password">Current Password</label>
        <input type="password" id="old-password" v-model="passwordChange.password" :class="`input input-md my-3 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm sm:text-sm ${errorMsg == '' ? 'border-gray-300':'border-red-600'} rounded-md`">
        <p class="text-xs font-medium -mt-3 text-error">{{errorMsg}}</p>
        <label for="new-password">New Password</label>
        <input type="password" id="new-password" v-model="passwordChange.new" class="input input-md my-3 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm sm:text-sm border-gray-300 rounded-md">
        <p class="text-xs font-medium -mt-1 text-error">{{newPasswordError}}</p>
        <label for="confirm-password">Confirm New Password</label>
        <input type="password" id="confirm-password" v-model="passwordChange.confirm" class="input input-md my-3 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm sm:text-sm border-gray-300 rounded-md">
      </div>
      <p class="text-error font-medium" v-if="passwordChange.new != passwordChange.confirm">Password do not match</p>
      <Transition name="fade" mode="out-in">
      <p class="font-bold text-3xl text-center text-green-700" v-if="changeSuccess">Password Successfully Updated!</p>
      </Transition>
      <div class="modal-action">
        <button class="btn" @click="changePassword()" v-if="!changeSuccess">Change Password</button>
        <label for="changePassword" class="btn" v-else @click="refreshPage">close</label>
      </div>
    </div>
  </div>
  <FooterComponent/>
</div>
</template>

<script setup lang="ts">
import NavbarComponent from "@/components/NavbarComponent.vue";
import DataService from "../DataService";
import FooterComponent from '@/components/FooterComponent.vue'
import { ref } from "vue";
import { currentUserStore } from "../stores/userStore";
const currentUser = currentUserStore();

//create shipping address array
const shippingAddress = [
  {
    street_address: "123 Main Street",
    parish: "Kingston",
    city: "Kingston",
  },
  {
    street_address: "123 Main Street",
    parish: "Kingston",
    city: "Kingston",
  },
];

let passwordChange = ref({
  password: "",
  new: "",
  confirm: "",
});

let errorMsg = ref("");
let newPasswordError = ref("");
let changeSuccess = ref(false);

function refreshPage() {
  window.location.reload();
}

function changePassword(){
  changeSuccess.value = true
}
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>