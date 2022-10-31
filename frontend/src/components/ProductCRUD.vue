<template>
    <div class="rounded bg-gray-800 h-fit p-4 w-1/1 m-5 lg:m-12 min-height-600" v-if="true">
        <span class="flex justify-between mb-5">
            <p class="text-2xl sm:text-4xl m-2 text-gray-200 font-bold">Products</p>
            <button class="btn">Add New</button>
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
                <tr class="hover" v-for="p in products">
                    <th>{{p.id}}</th>
                    <th>{{p.name}}</th>
                    <th>{{p.price}}</th>
                    <th>{{p.stock}}</th>
                    <th>{{p.rating}}</th>
                    <th class="flex gap-x-2 justify-end">
                        <label for="view-edit-product" class="btn btn-sm btn-primary" @click="getProductForDisplay(p)">view/edit</label>
                        <button class="btn btn-sm btn-error">Delete</button>
                    </th>
                </tr>
            </tbody>           
        </table>
        </div>

        <!-- Put this part before </body> tag -->
        <input type="checkbox" id="view-edit-product" class="modal-toggle" />
        <div class="modal modal-bottom">
        <div class="modal-box w-full rounded">
            <h2 class="text-2xl lg:text-4xl font-extrabold text-center text-gray-800">Product Information</h2>
            <div class="grid grid-cols-4 grid-flow-row">
                <div class="form-control col-span-full h-fit mb-10">
                    <label class="label">
                        <span class="label-text font-semibold text-gray-700">Images</span>
                    </label>
                    <perfect-scrollbar class="bg-gray-700 w-full h-fit rounded flex sm:justify-center p-5 gap-5 items-center">
                        <figure class="w-56 min-w-fit aspect-square bg-white rounded relative">
                            <img class="w-full h-full rounded object-cover" src="https://picsum.photos/200/300" alt="image">
                            <span class="w-full h-8 rounded-b flex items-center font-semibold text-white bottom-0 justify-center bg-teal-700" >Thumbnail</span>
                        </figure>

                        <div class="divider my-4 rounded-lg bg-slate-900 divider-horizontal"></div>

                        <figure class="w-56 min-w-fit aspect-square bg-white rounded relative">
                            <img class="w-full h-full rounded object-cover" src="https://picsum.photos/200/300" alt="image">
                            <span class="w-full h-8 rounded-b flex items-center font-semibold text-white bottom-0 justify-center bg-teal-700">Image 1</span>
                        </figure>
                        <figure class="w-56 min-w-fit aspect-square bg-white rounded relative">
                            <img class="w-full h-full rounded object-cover" src="https://picsum.photos/200/300" alt="image">
                            <span class="w-full h-8 rounded-b flex items-center font-semibold text-white bottom-0 justify-center bg-teal-700">Image 2</span>
                        </figure>
                        <figure class="w-56 min-w-fit aspect-square bg-white rounded relative">
                            <img class="w-full h-full rounded object-cover" src="https://picsum.photos/200/300" alt="image">
                            <span class="w-full h-8 rounded-b flex items-center font-semibold text-white bottom-0 justify-center bg-teal-700">Image 3</span>
                        </figure>
                    </perfect-scrollbar>
                    <!-- <img src="https://picsum.photos/200/300" alt="product image" class="w-10 h-10"> -->
                </div>
                <div class="form-control w-full sm:col-span-1">
                    <label class="label">
                        <span class="label-text">Product ID</span>
                    </label>
                    <input type="text" v-model="displayedProduct.id" placeholder="Type here" class="input input-bordered w-full max-w-xs" disabled/>
                </div>
                <div class="form-control w-full max-w-xs col-span-full sm:col-span-1">
                    <label class="label">
                        <span class="label-text">Name</span>
                    </label>
                    <input type="text" v-model="displayedProduct.name" placeholder="Type here" class="input input-bordered w-full max-w-xs" disabled/>
                </div>
                <div class="form-control w-full max-w-xs col-span-full sm:col-span-1">
                    <label class="label">
                        <span class="label-text">Description</span>
                    </label>
                    <textarea v-model="displayedProduct.description" class="textarea h-24 textarea-bordered w-full max-w-xs" placeholder="Type here" disabled></textarea>
                </div>
                <div class="form-control w-full max-w-xs col-span-full sm:col-span-1">
                    <label class="label">
                        <span class="label-text">Price (JMD)</span>
                    </label>
                    <input v-model="displayedProduct.price" type="number" placeholder="Type here" class="input input-bordered w-full max-w-xs" disabled/>
                </div>
                <div class="form-control w-full max-w-xs col-span-full sm:col-span-1">
                    <label class="label">
                        <span class="label-text">Amount In Stock</span>
                    </label>
                    <input type="text" v-model="displayedProduct.stock" placeholder="Type here" class="input input-bordered w-full max-w-xs" disabled/>
                </div>
                <div class="form-control w-full max-w-xs col-span-full sm:col-span-1">
                    <label class="label">
                        <span class="label-text">Category</span>
                    </label>
                    <input type="text" v-model="displayedProduct.categoryId" placeholder="Type here" class="input input-bordered w-full max-w-xs" disabled/>
                </div>
            </div>
            <div class="modal-action">
            <label for="view-edit-product" class="btn btn-sm btn-error">close</label>
            </div>
        </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import DataService from '../DataService';
import { ref } from 'vue';
import { Product } from '@prisma/client';
let products = ref<Product[]>([]);
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

function getProductForDisplay(product: Product) {
    displayedProduct.value = product;
    console.log(displayedProduct.value);
    
}
</script>