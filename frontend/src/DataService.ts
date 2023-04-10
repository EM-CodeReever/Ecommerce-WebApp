import { Cart, Product, User } from '@prisma/client';
import { Cart as BetterCart , Product as BetterProduct } from './types/betterTypes';
import { Logger } from 'tslog'
import axios from 'axios';
import { LoginRequest, LoginResponse } from './types';
const logger = new Logger();

const API_URL = 'em-codereever-service-production.up.railway.app/api';
// const API_URL = 'http://192.168.0.23:5000/api';

export default class DataService {
    static async getTest():Promise<string> {
        const response = await axios.get(API_URL + '/test');
        return response.data;
    }
    static async getAllProducts(){
        try{
            let res = await axios.get(API_URL + '/products');
            return res.data;
        }catch(err){
            console.log(err);
        }
    }
    static async createProduct(product:Product) {
        try{
            let res = await axios.post(API_URL + '/product', product);
            return res.data;
        }catch(err){
            console.log(err);
        }
    }
    static async getProduct(id:string) {
        let res =  await axios.get(API_URL + '/product/' + id);
        return res.data as BetterProduct;
    }
    static async getAllProductsFromCategory(categoryId:number){
        let res = await axios.get(API_URL + '/category/' + categoryId);
        return res.data
    }
    static async getAllCategories(){
        try{
            let res = await axios.get(API_URL + '/categories');
            logger.info('Retrieved all categories on frontend');
            return res.data
        }catch(err){
            logger.error(err);
        }
    }
    static async getAllUsers(){
        let res = await axios.get(API_URL + '/users');
        return res.data
    }
    static async login(loginRequest:LoginRequest) {
        try {
            let res = await axios.post(API_URL + '/login', loginRequest);
            return res.data as LoginResponse;
        }catch(err){
            console.log(err);
        }
    }
    static async signUp(newUser:User) {
        try {
            let res = await axios.post(API_URL + '/register', newUser);
            return res.data
        }catch(err){
            console.log(err);
        }
    }
    static async getUserCart(userId:number){
        try{
           let res = await axios.get(API_URL + '/cart/' + userId);
           return res.data as Cart;
        }catch(err){
            console.log(err);
        }
    }
    static async updateCart(cart:BetterCart){
        try{
            let res = await axios.post(API_URL + '/cart-update', cart);
            return res.data;
        }catch(err){
            console.log(err);
        }
    }
    static async emptyCurrentCart(userId:number){
        try{
            let res = await axios.get(API_URL + '/empty-cart/' + userId);
            return res.data as boolean;
        }catch(err){
            console.log(err);
        }
    }

    static async imageUpload(name:string, base64String:string){
        try{
            let form = new FormData()
            form.append('image',base64String)
            form.append('name',name)
            let res = axios.post('https://api.imgbb.com/1/upload?&key=1a9b57b4a75755ca7918b790b76e5c4e',form,{
                headers:{
                    "Content-Type": "multipart/form-data",
                }
            })
            return res.then(response => response.data)
        }catch(err){
            console.log(err);
        }
    }
    static async addImageToProduct(productId:string, image:string, isThumbnail:boolean){
        try{
            let res = await axios.post(API_URL + '/image', {productId, image, isThumbnail});
            return res.data;
        }catch(err){
            console.log(err);
        }
    }

}