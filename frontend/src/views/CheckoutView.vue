<template>
  <div>
    <NavbarComponent/>
    <p class="text-2xl md:text-3xl font-bold text-gray-200 text-center mt-3">Checkout</p>
    <span class="flex justify-center">
        <StepsComponent class="custom-max-width" :stateNum="stateNum"/>
    </span>
    <div class="overflow-x-auto flex flex-col">
        
    <OrderSummaryComponent  v-if="stateNum == 0"/>

    <AddressComponent v-show="stateNum == 1" />

    <PayPalComponent v-if="stateNum == 2" :finalPrice="grandTotal" class="mb-16"/>

    <span class="flex justify-center mx-3">
         <div class="border-gray-200 py-6 px-4 sm:px-6 custom-max-width rounded bg-gray-800">
            <div class="flex justify-between text-base font-medium text-white">
                <p>Subtotal</p>
                <p>${{total}}</p>
            </div>
            <div class="divider m-0"></div> 
            <div class="flex justify-between text-base font-medium text-white">
                <p>Tax</p>
                <p>${{tax}}</p>
            </div>
            <div class="divider m-0"></div> 
            <div class="flex justify-between text-base font-medium text-white">
                <p>Shipping Fee</p>
                <p>${{shipFee}}</p>
            </div>
            <div class="divider m-0"></div> 
            <div class="flex justify-between text-xl font-bold text-white">
                <p>Grand Total</p>
                <p>${{grandTotal}}</p>
            </div>
        </div>   
    </span>
    
    </div>

    <span class="flex justify-center my-5 mx-3">
        <span class="custom-max-width flex justify-between">
            <button :class="`btn btn-sm ${stateNum == 0 ? 'btn-disabled':'' }`" @click="stateNum--;">back</button>
            <button :class="`btn btn-sm ${stateNum == 2 ? 'btn-disabled':'' }`" @click="advanceState();">continue</button>
        </span>
    </span>
    <FooterComponent/>
  </div>
</template>

<script>

import NavbarComponent from '@/components/NavbarComponent.vue'
import StepsComponent from '@/components/StepsComponent.vue'
import OrderSummaryComponent from '@/components/OrderSummaryComponent.vue'
import AddressComponent from '@/components/AddressComponent.vue'
import PayPalComponent from '@/components/PayPalComponent.vue'
import DataService from '@/dataService'
import FooterComponent from '@/components/FooterComponent.vue'

export default {
  name: 'CheckoutView',
  components: {
    NavbarComponent,
    StepsComponent,
    OrderSummaryComponent,
    AddressComponent,
    PayPalComponent,
    FooterComponent
  },
  data(){
    return{
        stateNum:0,
        checkOutCart:[],
        total:0,
        tax : 0,
        shipFee: 0,
        grandTotal: 0,
        Order:{
          orderID: '',
          payeeID: this.$getCurrentUserId(),
          payeeName: this.$getCurrentUserFullName(),
          payeeContactNumber: 0,
          date: new Date().toLocaleDateString(),
          tax: Number(),
          shippingFee : Number(),
          total : Number(),
          currency : 'USD',
          shipping : Boolean(),
          shippingAddress : String(),
          shippingCompleted : false,
          cartItems : [],
          paypalOrder : {}

        }
    }
  },
  methods:{
    calculateBill(shippingEnabled){
            this.total = 0;
            for(var prod of this.checkOutCart){
                this.total += prod.price * prod.quantity
            }
            this.tax = 0.03 * this.total;
            if(shippingEnabled){this.shipFee = 0.05 * this.total;}else{this.shipFee = 0.00}
            this.grandTotal = this.tax + this.total + this.shipFee


            this.total = Math.round((this.total + Number.EPSILON) * 100) / 100;
            this.shipFee = Math.round((this.shipFee + Number.EPSILON) * 100) / 100;
            this.tax = Math.round((this.tax + Number.EPSILON) * 100) / 100;
            this.grandTotal = Math.round((this.grandTotal + Number.EPSILON) * 100) / 100;
        },
        advanceState(){
          let shippingEnabled = document.getElementById('shippingEnabled').checked
          this.Order.shipping = shippingEnabled
          if(this.stateNum == 1 && shippingEnabled){
            let streetAddress = document.getElementById('street-address').value
            let city = document.getElementById('city').value
            let parish = document.getElementById('parish').value
            let shippingAddress = document.getElementById('shippingAddress').value
            console.log(shippingAddress);
            if(shippingAddress == 'other' && city != '' && streetAddress != '' && parish != ''){
              this.stateNum++
              this.Order.shippingAddress = streetAddress + ', ' + city  + ', ' + parish
            }else if(shippingAddress != '' && shippingAddress != 'other'){
              this.stateNum++
              console.log(shippingAddress);
              this.Order.shippingAddress = shippingAddress
            }else{
              console.info('An error occurred');
            }
          }else{
            this.stateNum++
          }
        },
        async generateOrder(paypal_order){
          let payeeNumber = await DataService.getUserInfo(this.$getCurrentUserId()).then(data=>{return data.phone_number})
          this.Order.orderID = paypal_order.id
          this.Order.payeeContactNumber = payeeNumber
          this.Order.total = this.grandTotal
          this.Order.tax = this.tax
          this.Order.shippingFee = this.shipFee
          this.Order.paypalOrder = paypal_order
        },
  },
  async created(){
        this.checkOutCart = await DataService.getUserCart(this.$getCurrentUserId())
        this.Order.cartItems = this.checkOutCart
        this.cartLoaded = true
        this.calculateBill(false)
        this.$emitter.on('shipping-toggle', (data) => {
            this.calculateBill(!data.enabled)
        })
        this.$emitter.on('generate-order',async (data)=>{
          if(data.status == 'COMPLETED'){
            await this.generateOrder(data)
            let res = await DataService.addNewOrder(this.Order)
            if(res.status){
              this.$emitter.emit('transaction-complete')
            }else{
               console.error('BACKEND RESPONSE STATUS NOT TRUE! : ' + res);
            }
          }else{
            console.error('PAYPAL STATUS NOT COMPLETED! : ' + data);
          }
        })
  },
}
</script>
<style>
.fullPage{
  min-height: 100vh;
}
.custom-max-width{
    width: 100%;
    max-width: 1000px;
}
</style>