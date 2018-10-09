<template>
<v-app id="inspire">
    <template v-if="this.$store.getters.isSignIn">
        <Navigation></Navigation>
        <Main></Main>
        <Footer></Footer>
    </template>
    <template v-else>
        <SignIn></SignIn>
    </template>

</v-app>
</template>

<script>
import Navigation from './components/layouts/navigation.vue';
import Main from './components/layouts/main.vue';
import Footer from './components/layouts/footer.vue';
import SignIn from './components/pages/SignIn.vue';

export default {
    components: {
        Navigation,
        Main,
        Footer,
        SignIn
    },
    data: () => ({
        drawer: null
    }),
    props: {
        source: String
    }
}
</script>
