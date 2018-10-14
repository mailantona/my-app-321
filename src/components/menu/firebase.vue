<template>
<div>
    <P> {{users}} </P>
</div>
</template>

<script>
import {
    db
} from '../config/firebase.js';

export default {

    data() {
        return {
            users: {}
        }
    },
    firebase: {
        users: {
            source: db.ref('books'),
            cancelCallback(err) {
                console.error(err);
            }
        }
    }/* ,
    firestore() {
        return {
            locations: booksColl
        }
    } */

}
</script>

<style>

</style>
