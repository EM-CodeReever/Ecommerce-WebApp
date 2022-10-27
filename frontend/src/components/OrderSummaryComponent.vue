<template>
<div class="flex justify-center m-3">
    <ul :class="`divide-y divide-gray-200 rounded p-3 bg-white text-black custom-max-width md:mx-12 h-96 overflow-y-scroll ${!cartLoaded ? 'flex justify-center items-center' : ''}`">
            <h2 v-if="cartLoaded" class="text-2xl font-bold text-center mb-2">Order Summary</h2>
            <svg v-if="!cartLoaded" class="animate-spin -ml-1 mr-3 h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="gray" stroke-width="4"></circle>
                    <path class="opacity-75" fill="black" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            <li class="flex items-center justify-between py-4" v-for="(product,index) in checkOutCart" :key="index">
                <div class="flex items-start">
                    <img
                      class="flex-shrink-0 object-cover w-16 h-16 rounded-lg"
                      src="https://images.unsplash.com/photo-1588099768531-a72d4a198538?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8Y2xvdGhpbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
                      alt=""
                    />
                    <div class="ml-4">
                      <p class="text-sm">{{product.title}}</p>
                      <dl class="mt-1 space-y-1 text-xs text-gray-500">
                        <div>
                          <dt class="inline">Quantity: </dt>
                          <dd class="inline">{{product.quantity}}</dd>
                        </div>
                        <div>
                          <dt class="inline">Individual Price: </dt>
                          <dd class="inline">${{product.price}}</dd>
                        </div>
                      </dl>
                    </div>
                </div>
                <div>
                    <p class="text-sm">
                        ${{ Math.round((product.price * product.quantity + Number.EPSILON) * 100) / 100 }}
                    </p>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
import DataService from '@/dataService'
export default {
    name:'OrderSummaryComponent',
    data(){
      return{
        cartLoaded:false,
        checkOutCart:[]
      }
    },
    async created(){
        this.checkOutCart = await DataService.getUserCart(JSON.parse(localStorage.currentUser).id)
        this.cartLoaded = true
    },
    methods:{
      
    }
}
</script>