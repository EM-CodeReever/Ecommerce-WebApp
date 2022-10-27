import { Product, } from "@prisma/client";
import { defineStore } from "pinia";
import DataService from "../DataService";

import {Cart, CartItem} from "../types/betterTypes";

let defaultCart:Cart = {
    id: 0,
    userId: 0,
    cartItems: [],
    total: 0
}

export const currentCartStore = defineStore("currentCart", {
    state:()=>({
        cart : defaultCart,
        default : true,
    }),
    actions:{
        async writeToDatabase(){
            console.log(this.cart);
            let res = await DataService.updateCart(this.cart);
            console.log(res);
        },
        getProductCount():number{
            return this.cart.cartItems.length
        },
        getTotal():number{
            return this.cart.total
        },
        setCurrentCart(cart:Cart){
            this.default = false
            this.cart = cart
        },
        resetCart(){
            this.default = true
            this.cart = {
                id: 0,
                userId: 0,
                total: 0,
                cartItems: []
            }
        },
        emptyCart(){
            this.cart.total = 0
            this.cart.cartItems = []
        },
        addCartItem(cartItem:CartItem){
            if(this.cart.cartItems.length == 0){
                this.cart.cartItems.push(cartItem)
                console.log("Added first item to cart");
                
            }else if(this.cart.cartItems.find((item)=>item.productId == cartItem.productId)){
                console.log("Item already in cart");
                
                this.cart.cartItems.forEach((item)=>{
                    if(item.productId == cartItem.productId){
                        item.quantity += cartItem.quantity
                    }
                })
            }else{
                console.log("Added new item to cart");
                
                this.cart.cartItems.push(cartItem)
            }
            this.cart.total += cartItem.product.price * cartItem.quantity
        },
        removeCartItem(cartItem:CartItem){
            let existingProduct = this.cart.cartItems.find((item)=>item.id == cartItem.id)
            if(existingProduct){
                this.cart.total -= existingProduct.product.price * existingProduct.quantity
                this.cart.cartItems = this.cart.cartItems.filter((p:any)=>p.id !== cartItem.id)
            }else{
                console.log("Product not found in cart")
                throw new Error("Product not found in cart")
            }
        },
        changeCartItemQuantity(cartItem:CartItem, quantity:number){
            this.cart.cartItems.forEach((item)=>{
                if(item.id == cartItem.id){
                    item.quantity = quantity
                }
            })
        }
    },
    persist: true,
})