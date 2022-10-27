<template>
        <span class="flex justify-between px-5 py-10">
                <span class="flex justify-start">
                    <select class="select bg-gray-800 text-white select-sm w-20 xs-v2:w-full max-w-xs">
                        <option disabled selected>Filter</option>
                        <option>Price</option>
                        <option>Popularity</option>
                        <option>Alphabetical</option>
                        <option>Rating</option>
                        <!-- <option>Maggie</option> -->
                    </select>
                    <button class="btn btn-sm btn-ghost text-white mx-2 bg-gray-800 border-gray-800 hover:btn-info">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path></svg>
                    </button>
                </span>
                
                <span class="flex justify-center">
                    <input type="text" placeholder="Type here" class="input bg-gray-800 text-white rounded-r-none input-sm w-full max-w-xs" />
                    <button class="btn btn-sm rounded-l-none bg-gray-600 border-gray-600 hover:bg-gray-800">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </button>
                </span>
            </span>
</template>

<script setup lang="ts">

</script>