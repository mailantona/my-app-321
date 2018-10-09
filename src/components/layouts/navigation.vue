<template>
<div>
    <v-navigation-drawer v-model="drawer" fixed app width="250">
        <v-toolbar flat>
            <v-list>
                <v-list-tile>
                    <v-list-tile-title class="title">
                        Меню
                    </v-list-tile-title>
                </v-list-tile>
            </v-list>
        </v-toolbar>
        <v-list>
            <v-list-tile>
                <v-list-tile-action>
                    <v-icon>home</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>Home</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
                <v-list-tile-action>
                    <v-icon>contact_mail</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>Contact</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
    </v-navigation-drawer>
    <v-toolbar color="blue" dark fixed app>
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-spacer></v-spacer>
        {{this.$store.getters.userLoginSett.email}}
    </v-toolbar>
</div>
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
