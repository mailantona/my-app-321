<template>
<div>
    <v-toolbar flat color="grey lighten-5">
        <v-toolbar-title>Организация</v-toolbar-title>
        <v-divider class="mx-2" inset vertical></v-divider>
        <v-dialog v-model="dialog" max-width="500px" persistent>
            <v-btn slot="activator" color="blue" dark class="mb-2">Добавить</v-btn>
            <v-card>
                <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                    <v-layout wrap>
                        <v-flex>
                            <v-text-field v-model="editedItem.name" label="Организация" :counter="50" required v-validate="'required|max:50'" :error-messages="errors.collect('name')" data-vv-name="name"></v-text-field>
                        </v-flex>
                    </v-layout>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click.native="close()">Отмена</v-btn>
                    <v-btn color="blue darken-1" flat @click.native="save">Сохранить</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-toolbar>
    <v-data-table :headers="headers" :items="organization" hide-actions class="elevation-1" :loading="loading">
        <template slot="items" slot-scope="props">
            <td>{{ props.item.name }}</td>
            <td>{{ props.item.whoIns }}</td>
            <td>
                <v-icon small class="mr-2" @click="editItem(props.item)">
                    edit
                </v-icon>
                <v-icon small @click="deleteItem(props.item)">
                    delete
                </v-icon>
            </td>
        </template>
    </v-data-table>
</div>
</template>

<script>
import {
    db
} from '../../config/firebase.js';
export default {
    data: () => ({
        loading: false,
        dialog: false,
        headers: [
            {
                text: 'Организация',
                align: 'left',
                value: 'name'
            },
            {
                text: 'Кто добавил',
                align: 'left',
                value: 'name'
            },
            {
                text: 'Действие',
                value: 'name',
                sortable: false
            }
        ],
        editedIndex: -1,
        editedIndexForUpdate: "",
        /* Объект записи -------------------------------------------------------------------*/
        editedItem: {
            name: '',
            whoIns: ''
        },
        defaultItem: {
            name: '',
            whoIns: ''
        },
        organization: {},
        /* Конец объект записи -------------------------------------------------------------------*/
        /*Валидация*/
        dictionary: {
            custom: {
                name: {
                    required: () => 'Поле не должно быть пустым',
                    max: 'Поле не должно превышать 50 символов'
                }
            }
        },
    }),
    firebase: {
        organization: db.ref('organization')
    },

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'Новая организация' : 'Редактировать оргенизацию'
        }
    },

    watch: {
        dialog(val) {
            val || this.close()
        }
    },

    methods: {
        editItem(item) {
            this.editedIndexForUpdate = item['.key'];
            this.editedIndex = this.organization.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },
        /* Удаление записи -------------------------------------------------------------------*/
        deleteItem(item) {
            confirm('Удалить запись?') && this.$firebaseRefs.organization.child(item['.key']).remove()
        },

        close() {
            this.dialog = false
            this.editedIndexForUpdate = ""
            
            
            setTimeout(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
                this.$validator.reset()
                console.log("$validator.reset");
            }, 300)
            
        },

        save() {
            this.$validator.validate('name').then((result) => {
                if (result) {
                    this.editedItem.whoIns = this.$store.getters.userLoginSett.email;
                    if (this.editedIndex > -1) {
                        const copy = this.editedItem;
                        delete copy['.key'];
                        console.log(this.editedItem["name"]);
                        console.log(this.editedIndexForUpdate);
                        this.$firebaseRefs.organization.child(this.editedIndexForUpdate).set(copy)

                    } else {
                        /* Добавление новой записи -------------------------------------------------------------------*/
                        this.$firebaseRefs.organization.push(this.editedItem);
                    }
                    this.close()
                    
                } else {
                    console.log("validation failed");
                    
                }
            }).catch(() => {
                alert(this.errors.all())
            })

        }

    },
    mounted() {
        /*Валидация*/
        this.$validator.localize('ru', this.dictionary)
    }
}
</script>

<style>

</style>
