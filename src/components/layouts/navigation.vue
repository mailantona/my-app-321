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

            <v-list-tile to="/">
                <v-list-tile-action>
                    <v-icon>home</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title >Главная</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile to="/TaskRRM">
                <v-list-tile-action>
                    <v-icon></v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title >Задачи</v-list-tile-title>
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
    data() {
        return {
            user: {
                email: '',
                password: ''
            },
            errorMessage: "",
            drawer: null
        }
    }
}
</script>

<style>

</style>
