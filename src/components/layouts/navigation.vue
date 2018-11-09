<template>
<div>
    <v-navigation-drawer v-model="drawer" fixed app width="250" :clipped="$vuetify.breakpoint.lgAndUp">
        <v-list>

            <v-list-tile to="/">
                <v-list-tile-action>
                    <v-icon>people</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>Журнал отсутствия</v-list-tile-title>
                    <!-- <v-list-tile-sub-title>Журнал отсутствия на рабочем месте</v-list-tile-sub-title> -->
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile to="/taskRRM">
                <v-list-tile-action>
                    <v-icon>dashboard</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title >Задачи</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile to="/directory/employee">
                <v-list-tile-action>
                    <v-icon>assignment</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title >Справочники</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>


        </v-list>
    </v-navigation-drawer>
    <v-toolbar :clipped-left="$vuetify.breakpoint.lgAndUp" color="blue" dark fixed app dense>
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-spacer></v-spacer>
        v0.0.12
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
