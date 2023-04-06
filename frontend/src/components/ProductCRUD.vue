<template>
    <div class="rounded bg-gray-800 h-fit p-4 w-1/1 m-5 lg:m-12 min-height-600" v-if="true">
        <span class="flex justify-between mb-5">
            <p class="text-2xl sm:text-4xl m-2 text-gray-200 font-bold">Products</p>
            <button class="btn" @click="createNewProductModal()">Add New</button>
        </span>
        <div class="overflow-x-auto w-full max-height-500">
        <table class="table w-full">
            <thead class="relative">
            <tr class="sticky top-0">
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Rating</th>
                <th class="w-10"></th>
            </tr>
            </thead>
            <tbody class="hover:bg-gray-500">
                <tr class="hover cursor-pointer" v-for="p in products">
                    <th>{{p.id}}</th>
                    <th>{{p.name}}</th>
                    <th>{{p.price}}</th>
                    <th>{{p.stock}}</th>
                    <th>{{p.rating}}</th>
                    <th class="flex gap-x-2 justify-end">
                        <button class="btn btn-sm btn-info" @click="showProductModal(p.id)">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                        </button>
                        <button class="btn btn-sm" @click="getProductForEdit(p)">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                        </button>
                        <button class="btn btn-sm btn-error">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                        </button>
                    </th>
                </tr>
            </tbody>           
        </table>
        </div>

        <!-- Modal for creating a product -->
        <input type="checkbox" id="create-product" class="modal-toggle" />
        <div class="modal modal-bottom">
        <div class="modal-box w-full rounded">
            <h2 class="text-2xl lg:text-4xl font-extrabold text-center text-gray-800">Create Product</h2>
            <div class="grid grid-cols-4 grid-flow-row gap-5">
                <div class="form-control col-span-full h-fit my-5">
                    <label class="label">
                        <span class="label-text font-bold text-gray-700">Images</span>
                    </label>
                    <div class="flex gap-x-2 bg-gray-300 p-3 rounded w-full lg:w-fit m-auto lg:flex-row flex-col">
                            <div class="">
                                <label class="label">
                                    <span class="label-text font-semibold text-gray-700">Thumbnail</span>
                                </label>
                                <input type="file" id="thumbnail" class="file-input w-full" />
                            </div>
                            <div class="">
                                <label class="label">
                                    <span class="label-text font-semibold text-gray-700">Image 1</span>
                                </label>
                                <input type="file" id="img_1" class="file-input w-full" />
                            </div>
                            <div class="">
                                <label class="label">
                                    <span class="label-text font-semibold text-gray-700">Image 2</span>
                                </label>
                                <input type="file" id="img_2" class="file-input w-full" />
                            </div>
                            <div class="">
                                <label class="label">
                                    <span class="label-text font-semibold text-gray-700">Image 3</span>
                                </label>
                                <input type="file" id="img_3" class="file-input w-full" />
                            </div>
                        </div>    
                </div>
                <div class="form-control w-full col-span-full sm:col-span-2">
                    <label class="label">
                        <span class="label-text">Name</span>
                    </label>
                    <input type="text" v-model="emptyProduct.name" placeholder="Type here" class="input input-bordered w-full" />
                </div>
                <div class="form-control w-full col-span-full sm:col-span-2">
                    <label class="label">
                        <span class="label-text">Description</span>
                    </label>
                    <textarea v-model="emptyProduct.description" class="textarea h-24 textarea-bordered w-full" placeholder="Type here" ></textarea>
                </div>
                <div class="form-control w-full col-span-full sm:col-span-2">
                    <label class="label">
                        <span class="label-text">Price (JMD)</span>
                    </label>
                    <input v-model="emptyProduct.price" type="number" placeholder="Type here" class="input input-bordered w-full" />
                </div>
                <div class="form-control w-full col-span-full sm:col-span-2">
                    <label class="label">
                        <span class="label-text">Amount In Stock</span>
                    </label>
                    <input type="number" v-model="emptyProduct.stock" placeholder="Type here" class="input input-bordered w-full" />
                </div>
                <div class="form-control w-full col-span-full sm:col-span-2">
                    <label class="label">
                        <span class="label-text">Category</span>
                    </label>
                    <select class="select select-bordered w-full max-w-xs" v-model="emptyProduct.categoryId">
                        <option disabled selected>Choose a Category</option>
                        <option v-for="c in categories" :value="c.id">{{ c.name }}</option>
                    </select>
                </div>
            </div>
            <div class="modal-action">
            <label for="view-edit-product" id="modalToggle" class="btn btn-sm btn-error">cancel</label>
            <label for="view-edit-product" class="btn btn-sm btn-success" @click="createNewProduct">create</label>
            </div>
        </div>
        </div>


        <!-- Put this part before </body> tag -->
        <input type="checkbox" id="display-product" class="modal-toggle" />
        <label for="display-product" class="modal cursor-pointer">
        <label class="modal-box w-11/12 max-w-5xl relative" for="">
            <ViewProductComponentVue :key="componentKey" :displayOnly="true" :productId="currentProductID" v-if="currentProductID != '0'"/>
        </label>
        </label>
    </div>
</template>
<script setup lang="ts">
import DataService from '../DataService';
import ViewProductComponentVue from './ViewProductComponent.vue';
import { ref, onMounted } from 'vue';
import { Category, Product, Images } from '@prisma/client';
import { Product as BetterProduct, } from '../types/betterTypes';
import { Logger } from 'tslog';
const logger = new Logger();

let products = ref<Product[]>([]);
let currentProductID = ref("0");
let componentKey = ref(0);
let categories = ref<Category[]>([]);


DataService.getAllProducts().then((data) => {
    products.value = data;
});

let displayedProduct = ref<Product>({
    id: 0,
    name: '',
    description: '',
    price: 0,
    stock: 0,
    categoryId: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    rating: 0,
    thumbnail: '',
});

let emptyProduct = ref<Product>({
    id: 0,
    name: '',
    description: '',
    price: 0,
    stock: 0,
    categoryId: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    rating: 0,
    thumbnail: '',
});

let editable = ref(false);
let create = ref(false);


onMounted( async () => {
    categories.value = await DataService.getAllCategories();
    console.log(categories.value);
});

function createNewProductModal() {
    let toggle = document.getElementById('create-product') as HTMLLabelElement;
    editable.value = false;
    create.value = false;
    toggle.click();
}

function getProductForEdit(product: Product) {
    let toggle = document.getElementById('modalToggle') as HTMLLabelElement;
    editable.value = true;
    create.value = false;
    displayedProduct.value = product;
    console.log(displayedProduct.value);
    toggle.click();
}


function showProductModal(productID: number){
    componentKey.value++;
    currentProductID.value = String(productID);
    let toggle = document.getElementById('display-product') as HTMLLabelElement;
    toggle.click();
}

function createNewProduct(){

    let newProductId: string;
    logger.info('Creating new product: ');
    logger.info(emptyProduct.value);

    DataService.createProduct(emptyProduct.value).then((data) => {
        logger.info('Created new product: ');
        logger.info(data);
        newProductId = data.id as string;
    });

    let fileInputs = document.querySelectorAll('input[type="file"]') as any;

    for(let i = 0; i < fileInputs.length; i++){
        console.log(fileInputs[i].files);
        const reader = new FileReader();
        reader.onload = (e:any) => {
            DataService.imageUpload(fileInputs[i].files[0].name, getBase64StringFromDataURL(e.target.result)).then((res) => {
                logger.info('Response status from image upload: ' + res.status);
                logger.info('--------------------------------------------------');
                if(fileInputs[i].files[0].id === 'thumbnail'){
                    DataService.addImageToProduct(newProductId, res.data.url,true).then((data) => {
                        logger.info('Updated thumbnail for product: [' + newProductId + '] \nImage url: ' + res.data.url);
                    });
                }else{
                    DataService.addImageToProduct(newProductId, res.data.url,false).then((data) => {
                        logger.info('Added image to product: [' + newProductId + '] \nImage url: ' + res.data.url);
                    });
                }
            });
        }
        try{
            reader.readAsDataURL(fileInputs[i].files[0] as Blob);
        }
        catch(e){
            console.log(e);
            console.log('no file selected');
        }
    }

    function getBase64StringFromDataURL(dataURL:any){
        return dataURL.replace('data:', '').replace(/^.+,/, '');
    }
}
</script>