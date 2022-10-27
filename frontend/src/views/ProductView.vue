<template>
  <div>
    <NavbarComponent />
      <ViewProductComponent :productId='id'/>
    <FooterComponent/>
  </div>
</template>

<script setup lang="ts">
// @ is an alias to /src
import { useRoute } from "vue-router";
import FooterComponent from '@/components/FooterComponent.vue'
import NavbarComponent from '@/components/NavbarComponent.vue'
import ViewProductComponent from '@/components/ViewProductComponent.vue'

import { onMounted, ref } from "vue";
const route = useRoute();
const id = ref<string>(route.params.id as string);

  console.log(id.value);
function demo() {
    console.log('hello log somthing');
}

onMounted(() => {
  
  
});

</script>