import {defineStore} from "pinia";
import { User } from "@prisma/client";
import {currentCartStore} from "./cartStore";
import {Cart} from "../types/betterTypes";
import DataService from "../DataService";

let currentUser: User  =  {
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber : "",
    passwordHash: "",
    // role : Role.USER,
    dateOfBirth : new Date(),
    // gender : Gender.RATHER_NOT_SAY,
    createdAt: new Date(),
    updatedAt: new Date(),
};


export const currentUserStore = defineStore("currentUser", {
    state:()=>({
        user : currentUser,
        loggedIn : false,
    }),
    actions:{
        async setCurrentUser(user:User){
            let cartStore = currentCartStore();
            this.loggedIn = true
            this.user = user
            this.user.passwordHash = ""
            cartStore.setCurrentCart(await DataService.getUserCart(this.user.id) as Cart)
        }
    },
    getters:{
        fullName():string{
            return this.user.firstName + " " + this.user.lastName;
        },
        //TODO: implement 29/11/2023 
        isAdmin():boolean{
            return true
        },
        isUser():boolean{
            return false
        }
    },
    persist: true
})