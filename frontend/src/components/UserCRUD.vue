<template>
    <div class="rounded bg-gray-800 h-fit p-4 w-1/1 m-5 lg:m-12 min-height-600" v-if="true">
        <span class="flex justify-between mb-5">
            <p class="text-2xl sm:text-4xl m-2 text-gray-200 font-bold">Users</p>
            <button class="btn">Add New</button>
        </span>
        <div class="overflow-x-auto w-full max-height-500">
        <table class="table w-full">
            <thead class="relative">
            <tr class="sticky top-0">
                <th>ID</th>
                <th>FirstName</th>
                <th>LastName</th>
                <th>Email</th>
                <th class="w-10"></th>
            </tr>
            </thead>
            <tbody>
                <tr class="hover" v-for="u in users">
                    <th>{{u.id}}</th>
                    <th>{{u.firstName}}</th>
                    <th>{{u.lastName}}</th>
                    <th>{{u.email}}</th>
                    <th class="flex gap-x-2 justify-end">
                        <button class="btn btn-sm btn-primary">Edit</button>
                        <button class="btn btn-sm btn-error">Delete</button>
                    </th>
                </tr>
            </tbody>           
        </table>
        </div>
    </div>
</template>
<script setup lang="ts">
import DataService from '../DataService';
import { ref } from 'vue';
import { User } from '@prisma/client';
let users = ref<User[]>([]);
DataService.getAllUsers().then((data) => {
    users.value = data;
});
</script>