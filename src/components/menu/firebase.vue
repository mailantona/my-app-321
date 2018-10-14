<template>
<div>
    <p> {{ locations }} </p>
</div>
</template>

<script>
import {
    db
} from '../config/firebase.js'

export default {

    data() {
        return {
            users: {},
            locations: []
        }
    },
    /* firebase: {
        users: {
            source: db.ref('books'),
            // Optional, allows you to handle any errors.
            cancelCallback(err) {
                console.error(err);
            }
        }
    }, */
    firestore() {
        return {
            locations: db.collection("books")
        }
    }

}
</script>

<style>

</style>
