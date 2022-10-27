<template>
    <section>
        <NavbarComponent/>
        <LoginComponent :forAdmin="false" />
    <FooterComponent/>
    </section>
</template>

<script>
import NavbarComponent from '@/components/NavbarComponent.vue';
import LoginComponent from '@/components/LoginComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue'
export default {
    name: 'LoginView',
    components: {
        NavbarComponent,
        FooterComponent,
        LoginComponent,
    },
    
}
</script>