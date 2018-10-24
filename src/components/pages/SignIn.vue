<template>
<v-content>
    <v-container fluid fill-height>
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
                <v-card max-width="500" class="elevation-12">
                    <v-toolbar dark color="primary">
                        <v-toolbar-title>Вход</v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-card-text>
                        <v-form v-on:submit.prevent="SignIn">
                            <v-text-field placeholder="Имя" v-model="user.email" prepend-icon="mail" name="Mail" label="Почта" suffix="@eaeconsult.ru"></v-text-field>
                            <v-text-field placeholder=" " v-model="user.password" prepend-icon="lock" name="password" label="Пароль" type="password"></v-text-field>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn type="submit" color="primary">Войти</v-btn>
                            </v-card-actions>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>

</v-content>
</template>

<script>
/* import firebase from 'firebase' */
import {
    firebaseApp
} from '../config/firebase.js'

import {
    mapGetters,
    mapMutations
} from "vuex";

export default {
    data() {
        return {
            user: {
                email: '',
                password: ''
            },
            errorMessage: ""
        }
    },
    methods: {
        SignIn() {
            firebaseApp.auth().signInWithEmailAndPassword(this.user.email + "@eaeconsult.ru", this.user.password)
                .then(response => {
                    this.$store.commit('isSignInSet');
                    this.$store.commit('userLoginSettSet', {
                        userLoginSettthisNew: {
                            email: response.user.email,
                            uid: response.user.uid
                        }
                    });
                })
                .catch(error => {
                    this.errorMessage = error.message;
                    console.log(error);
                })
        }
    }
}
</script>

<style>

</style>
