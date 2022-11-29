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
                <tr class="hover cursor-pointer" v-for="p in products" >
                    <th>{{p.id}}</th>
                    <th>{{p.name}}</th>
                    <th>{{p.price}}</th>
                    <th>{{p.stock}}</th>
                    <th>{{p.rating}}</th>
                    <th class="flex gap-x-2 justify-end">
                        <button class="btn btn-sm btn-primary" @click="getProductForEdit(p)">edit</button>
                        <button class="btn btn-sm btn-error">Delete</button>
                    </th>
                </tr>
            </tbody>           
        </table>
        </div>

        <!-- Modal for viewing a product -->
        <input type="checkbox" id="view-edit-product" class="modal-toggle" />
        <div class="modal modal-bottom">
        <div class="modal-box w-full rounded">
            <h2 class="text-2xl lg:text-4xl font-extrabold text-center text-gray-800">Product Information</h2>
            <div class="grid grid-cols-4 grid-flow-row gap-5">
                <div class="form-control col-span-full h-fit my-5">
                    <label class="label">
                        <span class="label-text font-bold text-gray-700">Images</span>
                    </label>
                    <div v-if="editable" class="flex gap-x-2 bg-gray-300 p-3 rounded w-full lg:w-fit m-auto lg:flex-row flex-col">
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
                    <perfect-scrollbar v-else class="bg-gray-700 w-full h-fit rounded flex sm:justify-center p-5 gap-5 items-center">
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
                </div>
                <div class="form-control w-full col-span-full sm:col-span-2">
                    <label class="label">
                        <span class="label-text">Product ID</span>
                    </label>
                    <input type="text" v-model="displayedProduct.id" placeholder="Type here" class="input input-bordered w-full" :disabled="!editable"/>
                </div>
                <div class="form-control w-full col-span-full sm:col-span-2">
                    <label class="label">
                        <span class="label-text">Name</span>
                    </label>
                    <input type="text" v-model="displayedProduct.name" placeholder="Type here" class="input input-bordered w-full" :disabled="!editable"/>
                </div>
                <div class="form-control w-full col-span-full sm:col-span-2">
                    <label class="label">
                        <span class="label-text">Description</span>
                    </label>
                    <textarea v-model="displayedProduct.description" class="textarea h-24 textarea-bordered w-full" placeholder="Type here" :disabled="!editable"></textarea>
                </div>
                <div class="form-control w-full col-span-full sm:col-span-2">
                    <label class="label">
                        <span class="label-text">Price (JMD)</span>
                    </label>
                    <input v-model="displayedProduct.price" type="number" placeholder="Type here" class="input input-bordered w-full" :disabled="!editable"/>
                </div>
                <div class="form-control w-full col-span-full sm:col-span-2">
                    <label class="label">
                        <span class="label-text">Amount In Stock</span>
                    </label>
                    <input type="text" v-model="displayedProduct.stock" placeholder="Type here" class="input input-bordered w-full" :disabled="!editable"/>
                </div>
                <div class="form-control w-full col-span-full sm:col-span-2">
                    <label class="label">
                        <span class="label-text">Category</span>
                    </label>
                    <input type="text" v-model="displayedProduct.categoryId" placeholder="Type here" class="input input-bordered w-full" :disabled="!editable"/>
                </div>
            </div>
            <div class="modal-action">
            <label for="view-edit-product" id="modalToggle" class="btn btn-sm btn-error">close</label>
            <label for="view-edit-product" class="btn btn-sm btn-info" v-if="editable && !create">save</label>
            <label for="view-edit-product" class="btn btn-sm btn-success" v-if="create">create</label>
            </div>
        </div>
        </div>
        <input type="checkbox" id="create-product" class="modal-toggle" />
        <div class="modal modal-bottom">
            <div class="modal-box w-full rounded">

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

let editable = ref(false);
let create = ref(false);

function getProductForDisplay(product: Product) {
    let toggle = document.getElementById('modalToggle') as HTMLLabelElement;
    displayedProduct.value = product;
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
</script>