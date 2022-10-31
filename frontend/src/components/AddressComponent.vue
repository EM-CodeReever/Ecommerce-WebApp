<template>
    <div class="flex justify-center m-3">
        <div class="custom-max-width">
          <div class="md:col-span-2">
              <div class="shadow-xl overflow-hidden rounded-lg">
                <div :class="`px-4 py-5 bg-white sm:p-6 ${shippingEnabled ? '' : 'disabled'}`">
                  <span class="flex justify-center items-center">
                    <label class="mr-10 text-gray-700">Enable Shipping</label>
                    <input type="checkbox" id='shippingEnabled' v-model="shippingEnabled" class="checkbox checkbox-sm checkbox-primary" @click="emitShippingStatus">
                  </span>
                  <div class="grid grid-cols-6 gap-6">
                    <div class="col-span-6 sm:col-span-6">
                      <label for="shippingAddress" class="block text-sm font-medium text-gray-700">Choose Shipping Address</label>
                      <select id="shippingAddress" v-model="addressSelection" name="shippingAddress" class="mt-1 select-md select select-ghost text-black focus:text-black bg-gray-200 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        <option v-for="(add,index) in shippingAddress" :key="index" :value="`${add.street_address}, ${add.city}, ${add.parish}`">{{`${add.street_address}, ${add.city}, ${add.parish}`}}</option>
                        <option value="other" class="font-thin">Use another address</option>
                      </select>
                    </div>

                     <div class="divider col-span-6" v-show="addressSelection == 'other'"></div>
                      
                
                    <div class="col-span-6" v-show="addressSelection == 'other'">
                      <label for="street-address" class="block text-sm font-medium text-gray-700">Street address</label>
                      <input type="text" name="street-address" id="street-address" class="mt-1 input-sm text-black focus:text-black input input-ghost bg-gray-200 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                    </div>

                    <div class="col-span-6 sm:col-span-3 lg:col-span-3" v-show="addressSelection == 'other'">
                      <label for="city" class="block text-sm font-medium text-gray-700">City</label>
                      <input type="text" name="city" id="city"  class="mt-1 input-sm text-black focus:text-black input input-ghost bg-gray-200 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                    </div>

                    <div class="col-span-6 sm:col-span-3 lg:col-span-3" v-show="addressSelection == 'other'">
                      <label for="parish" class="block text-sm font-medium text-gray-700">State / Province / Parish</label>
                      <input type="text" name="parish" id="parish" class="mt-1 input-sm text-black focus:text-black input input-ghost bg-gray-200 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                    </div>
                  </div>
                </div>
              </div>
          </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

let shippingEnabled = ref(false);
let addressSelection = ref('other');

function emitShippingStatus() {
  // empty for now
}

let shippingAddress = [
  {
    street_address: '123 Main Street',
    city: 'Kingston',
    parish: 'St. Andrew'
  },
  {
    street_address: '456 Main Street',
    city: 'Kingston',
    parish: 'St. Andrew'
  },
  {
    street_address: '789 Main Street',
    city: 'Kingston',
    parish: 'St. Andrew'
  }
]
// import DataService from '@/dataService'

// export default{
//     name:'AddressComponent',
//     data(){
//         return{
//             shippingEnabled:false,
//             shippingAddress:[],
//             addressSelection:''
//         }
//     },
//     methods:{
//       emitShippingStatus(){
//         this.$emitter.emit('shipping-toggle',{enabled:this.shippingEnabled})
//       },
//       async getShippingAddress(){
//         let res = await DataService.getUserInfo(this.$getCurrentUserId())
//         this.shippingAddress = res.shipping_address
//       }
//     },
//     created(){
//       this.getShippingAddress()
//     }
// }
</script>

<style scoped>
.disabled div{
  opacity: .5; 
  user-select: none;
}
.disabled input[type="text"]{
    pointer-events: none;
}
.disabled select{
    pointer-events: none;
}
</style>