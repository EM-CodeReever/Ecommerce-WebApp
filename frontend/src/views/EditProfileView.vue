<template>
<section>
    <NavbarComponent/>
    <div class="text-white my-10">
            <h1 class="text-4xl font-extrabold text-center">Edit Profile</h1>
            <p class="text-center font-medium mx-2">Update your profile information here and click save when finished</p>
    </div>
    <div class="flex justify-center">
    <div class="overflow-x-auto w-full max-w-6xl ">
        <div class="shadow overflow-hidden pro-lg:rounded">
          <div class="px-4 py-5 bg-white sm:p-6">
            <div class="grid grid-cols-6 gap-6">
              <p class="text-md col-span-6 text-center font-medium">User Information</p>
              <div class="col-span-6 sm:col-span-3">
                <label for="first-name" class="block text-sm font-medium text-gray-700">First name</label>
                <input type="text" v-model="userInfo.first_name" name="first-name" id="first-name" autocomplete="given-name" class="mt-1 input input-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
              </div>

              <div class="col-span-6 sm:col-span-3">
                <label for="last-name" class="block text-sm font-medium text-gray-700">Last name</label>
                <input type="text" v-model="userInfo.last_name" name="last-name" id="last-name" autocomplete="family-name" class="mt-1 input input-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
              </div>

              <div class="col-span-6 sm:col-span-2">
                <label for="email-address" class="block text-sm font-medium text-gray-700">Email address</label>
                <input type="text" v-model="userInfo.email" name="email-address" id="email-address" autocomplete="email" :class="`mt-1 input input-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm ${!error.email ? 'border-gray-300':'border-red-600'}  rounded-md`">
              </div>
              <div class="col-span-6 sm:col-span-2">
                <label for="email-address" class="block text-sm font-medium text-gray-700">Phone Number</label>
                <input type="text" v-model="userInfo.phone_number" name="phone-number" id="phone-number" :class="`mt-1 input input-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm ${!error.phone ? 'border-gray-300':'border-red-600'} rounded-md`">
              </div>
              <div class="col-span-6 sm:col-span-2">
                <label for="email-address" class="block text-sm font-medium text-gray-700">Date of birth</label>
                <input type="date" v-model="userInfo.date_of_birth" name="date_of_birth" id="date_of_birth" class="mt-1 input input-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
              </div>
              <div class="divider col-span-6"></div>
                <p class="text-md col-span-6 text-center font-medium">Shipping Address Information</p>
                <select id="shippingAddress" v-model="re" name="shippingAddress" class="mt-1 col-span-6 lg:col-span-5 select-md select select-ghost text-black focus:text-black bg-gray-200 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <option v-for="(add,index) in userInfo.shipping_address" :key="index" :value="`${index}`">{{`${add.street_address}, ${add.city}, ${add.parish}`}} </option>
                </select>
                <div class="col-span-6 lg:col-span-1 flex justify-center"><label for="addNewAddress" class="btn btn-sm sm:btn-md mt-1">add new address</label></div>
              <div class="col-span-6" v-if="userLoaded">
                <label for="street-address" class="block text-sm font-medium text-gray-700">Street address</label>
                <input type="text" v-model="userInfo.shipping_address[re].street_address" name="street-address" id="street-address" autocomplete="street-address" class="mt-1 input input-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
              </div>

              <div class="col-span-6 sm:col-span-3 lg:col-span-3" v-if="userLoaded">
                <label for="city" class="block text-sm font-medium text-gray-700">City</label>
                <input type="text" v-model="userInfo.shipping_address[re].city" name="city" id="city" autocomplete="address-level2" class="mt-1 input input-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
              </div>

              <div class="col-span-6 sm:col-span-3 lg:col-span-3" v-if="userLoaded">
                <label for="region" class="block text-sm font-medium text-gray-700">State / Province / Parish</label>
                <input type="text" v-model="userInfo.shipping_address[re].parish" name="parish" id="parish" autocomplete="address-level1" class="mt-1 input input-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
              </div>
            </div>
          </div>
          <div class="px-4 py-3 bg-gray-50 text-right sm:px-6 flex justify-end items-center">
            <p class="text-error font-medium mr-2">{{editError}}</p>
            <button @click="validateForm()" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white btn bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Save</button>
          </div>
        </div>
    </div>
    </div>
    <input type="checkbox" id="addNewAddress" class="modal-toggle" />
    <div class="modal">
    <div class="modal-box">
        <label for="addNewAddress" id="labelForAddNewAddress" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
        <h3 class="font-bold text-lg mb-4">Add new shipping address</h3>
        <div class="grid grid-cols-6 gap-6">
            <div class="col-span-6">
                <label for="street-address" class="block text-sm font-medium text-gray-700">Street address</label>
                <input type="text" v-model="newAddress.street_address" name="new-street-address" id="new-street-address" class="mt-1 input input-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
              </div>
              <div class="col-span-6 sm:col-span-3 lg:col-span-3">
                <label for="city" class="block text-sm font-medium text-gray-700">City</label>
                <input type="text" v-model="newAddress.city" name="new-city" id="new-city" class="mt-1 input input-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
              </div>
              <div class="col-span-6 sm:col-span-3 lg:col-span-3">
                <label for="region" class="block text-sm font-medium text-gray-700">State / Province / Parish</label>
                <input type="text" v-model="newAddress.parish" name="new-parish" id="new-parish" class="mt-1 input input-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
              </div>
        </div>
        <div class="modal-action flex justify-between">
            <p class="text-error">{{newAddressError}}</p>
            <button class="btn" @click="addAddress()">add</button>
        </div>
    </div>
    </div>
    <!-- Put this part before </body> tag -->
    <input type="checkbox" id="updatedSuccess" class="modal-toggle" />
    <div class="modal">
    <div class="modal-box">
        <!-- <h3 class="font-bold text-lg">Profile</h3> -->
        <p class="py-4">{{updateResponseMessage}}</p>
        <div class="modal-action">
        <label for="updatedSuccess" id="updatedSuccessButton"></label>
        <button class="btn" @click="this.$router.push('/profile')">return to profile</button>
        </div>
    </div>
    </div>
    <FooterComponent class="mt-14"/>
</section>
</template>
<script>
import { defineComponent } from "vue";
import NavbarComponent from "@/components/NavbarComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import DataService from "@/dataService";
export default defineComponent({
    name:'EditProfileView',
    components:{ NavbarComponent, FooterComponent },
    data(){
        return{
            userInfo : {},
            userLoaded : false,
            newAddress : {
                street_address : '',
                city : '',
                parish : ''
            },
            error:{
              email:false,
              phone:false,
            },
            re : 0,
            editError:'' ,
            newAddressError : '',
            updateResponseMessage : ''
        }
    },
    async created(){
        this.userInfo = await DataService.getUserInfo(this.$getCurrentUserId())
        this.userLoaded = true
    },
    methods:{
        async updateUser(){
            let responseModalButton = document.getElementById('updatedSuccessButton')
            let res = await DataService.updateUser(this.$getCurrentUserId(),this.userInfo)
            console.log(res);
            if(res.status){
                this.updateResponseMessage = `You're account information has been successfully updated`
            }else{
                this.updateResponseMessage = `An error has occurred, return to profile page and try again`
            }
            responseModalButton.click()
        },
        validateForm(){
          this.error.phone = false
          this.error.email = false
            let firstname = document.getElementById('first-name').value
            let lastname = document.getElementById('last-name').value
            let email = document.getElementById('email-address').value
            let phone = document.getElementById('phone-number').value
            // let dob =  document.getElementById('date_of_birth').value
            let street = document.getElementById('street-address').value
            let city = document.getElementById('city').value
            let parish = document.getElementById('parish').value
            if(firstname != '' && lastname != '' && street != '' && city != '' && parish != ''){
               //eslint-disable-next-line
              if(email != '' && email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
                if(phone != '' && phone.match(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/)){
                    this.updateUser()
                }else{
                  this.error.phone = true
                  this.editError = 'Invalid Phone Number'
                }
              }else{
                this.editError = 'Invalid Email Format';
                this.error.email = true
              }
            }else{console.log('NAH');}
        },
        addAddress(){
            let newstreet = document.getElementById('new-street-address').value
            let newcity = document.getElementById('new-city').value
            let newparish = document.getElementById('new-parish').value
            let modalToggleButton = document.getElementById('labelForAddNewAddress')
            if(newstreet != '' && newcity != '' && newparish != ''){
                this.userInfo.shipping_address.push(this.newAddress)
                modalToggleButton.click()
                this.newAddressError = ''
                this.newAddress = {
                street_address : '',
                city : '',
                parish : ''
            }
            }else{
                this.newAddressError = 'Please fill out all fields'
            }
        }
    },

})
</script>