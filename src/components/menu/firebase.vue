<template>
<div>

    <v-flex xs6>
        <v-text-field v-model="booksNew.name" label="name"></v-text-field>
    </v-flex>
    <v-flex xs6>
        <v-text-field v-model="booksNew.age" label="age"></v-text-field>
    </v-flex>
    <v-flex xs12 sm8 md4>
        <v-text-field v-model.number="num" type="number" label="num"></v-text-field>
    </v-flex>
    <v-flex xs12 sm8 md4>
        <v-btn v-on:click="addBook()" color="success">Success</v-btn>
    </v-flex>

    <P> {{customers}} </P>
    <v-container grid-list-xl>
        <v-layout row wrap>
            <v-flex xs6>
                <v-card dark color="secondary">
                    <v-card-text class="px-0">6</v-card-text>
                </v-card>
            </v-flex>
            <v-flex xs6>
                <v-card dark color="secondary">
                    <v-card-text class="px-0">6</v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>

</div>
</template>

<script>
import {
    db
} from '../config/firebase.js';

export default {

    data() {
        return {
            customers: {},
            booksNew: {
                name: 'Anton',
                age: 33
            },
            num: 2
        }
    },
    firebase: {
        customers: db.ref('books').limitToFirst(5)

    },
    /* created() {
        this.$bindAsObject('customers', db.ref('books').limitToFirst(this.num))
    }, */

    /* firebase: function () {
        return {
           customers: db.ref('books').limitToFirst(this.num)
        }
    }, */
    methods: {
        addBook: function () {
            this.$firebaseRefs.customers.push(this.booksNew);
            this.booksNew.name = '';
            this.booksNew.age = '';
            this.$bindAsObject('customers', db.ref('books').limitToFirst(this.num))
        }

    }
}
</script>

<style>

</style>
