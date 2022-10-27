<template>
    <div>
        <NavbarComponent/>
        <div class="bg-none">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="max-w-2xl mx-auto py-16 sm:py-24 lg:py-32 lg:max-w-none">
                <h2 class="text-2xl lg:text-4xl font-extrabold text-center text-gray-200 mb-20">All Categories</h2>

                <div class="mt-6 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:gap-y-12">
                <div v-for="(callout,index) in callouts" :key="callout.name" :class="`group relative slide delay-${index * 100}`" style="opacity:0">
                    <div class="relative w-full h-80 bg-white rounded-lg overflow-hidden group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1 cursor-pointer" @click="goToCategory(callout.href)">
                    <img :src="callout.imageSrc" :alt="callout.imageAlt" class="w-full h-full object-center object-cover" />
                    </div>
                    <h3 class="mt-3 font-medium text-xl text-gray-200">
                    <a :href="callout.href">
                        {{ callout.name }}
                    </a>
                    </h3>
                </div>
                </div>
            </div>
            </div>
        </div>
        <FooterComponent/>
    </div>
</template>

<script async setup lang="ts">
import NavbarComponent from "@/components/NavbarComponent.vue"
import FooterComponent from "@/components/FooterComponent.vue"
import { onMounted, Ref, ref } from "vue";
import { useRouter } from "vue-router";
import { Category } from ".prisma/client";
import DataService from "../DataService";
const router = useRouter();
let callouts = ref<any>();
onMounted(() => {
    DataService.getAllCategories().then((categories: Category[]) => {
        callouts.value = categories.map((category: Category) => {
            return {
                name: category.name,
                href: `/store/${category.id}`,
                imageSrc: category.image,
                imageAlt: category.name
            }
        })
    })
})

function goToCategory(url: string) {
    router.push(url);
}
</script>