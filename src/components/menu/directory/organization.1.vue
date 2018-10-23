<template>
<div>
    <v-dialog v-model="dialog" persistent max-width="500px">
        <v-btn slot="activator" color="primary">Добавить</v-btn>
        <v-card>
            <v-card-title >
                <span class="headline">Организация</span>
            </v-card-title>
            <v-card-text>
                <v-text-field v-model="NewOrg.name" label="Название" :counter="50" required v-validate="'required|max:50'" :error-messages="errors.collect('name')" data-vv-name="name"></v-text-field>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click.native="dialog = false">Закрыть</v-btn>
                <v-btn color="blue darken-1" flat v-on:click="register">Сохранить</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <br><br>
    <v-data-table :headers="headers" :items="organization" hide-actions class="elevation-1">
        <template slot="items" slot-scope="props">
            <td>{{ props.item.name }}</td>
        </template>
    </v-data-table>
</div>
</template>

<script>
import {
    db
} from '../../config/firebase.js';
import {
    mapGetters
} from "vuex";

export default {
    $_veeValidate: {
        validator: 'new'
    },
    data: () => ({
        dialog: false,
        organization: {},
        NewOrg: {
            name: "",
            whoIns: ""
        },
        /*Валидация*/
        dictionary: {
            custom: {
                name: {
                    required: () => 'Поле не должно быть пустым',
                    max: 'Поле не должно превышать 50 символов'
                }
            }
        },
        headers: [
          { text: 'Организация', value: 'name' }
        ]
    }),
    firebase: {
        organization: db.ref('Organization')
    },
    mounted() {
        /*Валидация*/
        this.$validator.localize('ru', this.dictionary)
    },
    methods: {
        register() {
            this.$validator.validate('name').then((result) => {
                if (result) {
                    this.NewOrg.whoIns = this.$store.getters.userLoginSett.email;
                    this.$firebaseRefs.organization.push(this.NewOrg);
                    this.NewOrg.name = '';
                    this.NewOrg.whoIns = '';
                    this.$validator.reset();
                    this.dialog = false;
                } else {
                    console.log("validation failed");
                }
            }).catch(() => {
                alert(this.errors.all())
            })
        }
    }

    
}
</script>

<style>

</style>
