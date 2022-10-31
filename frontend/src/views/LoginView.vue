<template>
    <section>
        <NavbarComponent/>
        <LoginComponent :forAdmin="false" />
    <FooterComponent/>
    </section>
</template>

<script setup lang="ts">
import NavbarComponent from '@/components/NavbarComponent.vue';
import LoginComponent from '@/components/LoginComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue'

</script>