<template>
<v-content>
    <v-container>
        <transition name="slide-fade" mode="out-in">
            <router-view></router-view>
        </transition>
    </v-container>
</v-content>
</template>

<script>
export default {

}
</script>

<style>
.slide-fade-enter-active {
    transition: all .1s ease;
}

.slide-fade-leave-active {
    transition: all .0.5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-enter,
.slide-fade-leave-to

/* .slide-fade-leave-active до версии 2.1.8 */
    {
    transform: translateX(10px);
    opacity: 0;
}
</style>
