<template>
    <v-toolbar color="blue" dark fixed app sm>
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
    </v-toolbar>

</template>

<script>
export default {
    data: () => ({
        drawer: null
    }),
    props: {
        source: String
    }
}
</script>

<style>

</style>
