<template>
<div class="flex justify-center mx-3">
    <div v-if="processing" class="loading flex justify-center items-center">
      <svg class="animate-spin -ml-1 mr-3 h-24 w-24 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="none" stroke-width="4"></circle>
                    <path class="opacity-75" fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
    </div>
    <div v-if="loading" class="flex justify-center items-center">
      <svg class="animate-spin -ml-1 mr-3 h-24 w-24 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="none" stroke-width="4"></circle>
                    <path class="opacity-75" fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
    </div>
    <div v-show="!loading" id="paypal-button-container" style="width: 600px"></div>
</div>
</template>
<script>
import { loadScript } from "@paypal/paypal-js";
import DataService from '@/dataService';


export default{
    name:'PayPalComponent',
    props:['finalPrice'],
    async created(){
      console.log(this.finalPrice);
      let paypal;
      try {
          paypal = await loadScript({ "client-id": "AdvIgUrH3b2FHFhxFa9x3q_skku6OhTvDteO7OeIneJ9N8PYUcAdjbNwtsAPQBGk-r8-sj-a576GPKyC" , currency: "USD"});
      } catch (error) {
          console.log("failed to load the PayPal JS SDK script", error);
      }
      if (paypal) {
          try {
              await paypal.Buttons({
                  
                createOrder: (data, actions) => {
                  // Set up the transaction
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: `${this.finalPrice}`
                        }
                      }
                    ],
                    application_context: {
                      shipping_preference: 'NO_SHIPPING'
                    }
                  });
                },
                onApprove: async (data,actions) => {
                  console.log(data);
                  return actions.order.capture().then((res)=>{
                    this.processing = true //controls processing animation
                    this.$emitter.emit('generate-order',res)
                    this.$emitter.on('transaction-complete',()=>{
                      this.processing = false
                      this.clearUserCart()
                      this.$router.push('/payment-success')
                    })

                  });
                },

              }).render('#paypal-button-container');
              this.loading = false //paypal buttons loading animation
          } catch (error) {
              console.log("Failed to render the PayPal Buttons: ", error);
          }
      }

    },
    methods:{
      async clearUserCart(){
        await DataService.updateUserCart(this.$getCurrentUserId(),[])
      }
    },
    data(){
      return{
        loading:true,
        processing : false
      }
    }
}
</script>
//sandbox customer account info
//PC;2KN!e
//sb-oirkn18256019@personal.example.com

//sandbox seller account info
//Q|**4.mU
//sb-xi8ua15131539@business.example.com
<style>
div.loading{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  background-color: rgba(16, 16, 16, 0.5);
}
.center-svg {
  position: absolute;
  top: 50%; right: 50%;
  transform: translate(50%,-50%);
}
</style>
<!-- 
{
    "id": "6WV46188PN7005604",
    "intent": "CAPTURE",
    "status": "COMPLETED",
    "purchase_units": [
        {
            "reference_id": "default",
            "amount": {
                "currency_code": "USD",
                "value": "939.60"
            },
            "payee": {
                "email_address": "sb-xi8ua15131539@business.example.com",
                "merchant_id": "7GS8H2MKMT68Y"
            },
            "payments": {
                "captures": [
                    {
                        "id": "3PK5787630363073A",
                        "status": "COMPLETED",
                        "amount": {
                            "currency_code": "USD",
                            "value": "939.60"
                        },
                        "final_capture": true,
                        "seller_protection": {
                            "status": "ELIGIBLE",
                            "dispute_categories": [
                                "ITEM_NOT_RECEIVED",
                                "UNAUTHORIZED_TRANSACTION"
                            ]
                        },
                        "create_time": "2022-07-31T14:15:16Z",
                        "update_time": "2022-07-31T14:15:16Z"
                    }
                ]
            }
        }
    ],
    "payer": {
        "name": {
            "given_name": "Jane",
            "surname": "Brown"
        },
        "email_address": "sb-oirkn18256019@personal.example.com",
        "payer_id": "PH9UGJ63VM574",
        "address": {
            "country_code": "US"
        }
    },
    "create_time": "2022-07-31T14:14:56Z",
    "update_time": "2022-07-31T14:15:16Z",
    "links": [
        {
            "href": "https://api.sandbox.paypal.com/v2/checkout/orders/6WV46188PN7005604",
            "rel": "self",
            "method": "GET"
        }
    ]
} -->