<template>
<div>
    <v-toolbar flat color="grey lighten-5">
        <v-toolbar-title>Задачи АРМ РРМ</v-toolbar-title>
        <v-divider class="mx-2" inset vertical></v-divider>
        <v-dialog v-model="dialog" max-width="500px" persistent>
            <v-btn slot="activator" color="blue" dark class="mb-2">Добавить</v-btn>
            <v-card>
                <v-card-title>
                    <span class="headline">Новая задача</span>
                </v-card-title>

                <v-card-text>
                    <v-layout wrap>
                        <v-flex>
                            <v-text-field v-model="newTask.name" label="Заголовок" :counter="50" required v-validate="'required|max:50'" :error-messages="errors.collect('name')" data-vv-name="name"></v-text-field>
                            <v-textarea auto-grow rows=1 v-model="newTask.description" label="Описание" required v-validate="'required'" :error-messages="errors.collect('description')" data-vv-name="description"></v-textarea>

                            <v-select :return-object="true" :items="employee" item-text="name" v-model="employeeSel" label="Сотрудник" required v-validate="'required'" :error-messages="errors.collect('employeeSel')" data-vv-name="employeeSel">
                                <template slot="selection" slot-scope="data">
                                    {{ data.item.name}}
                                </template>
                                <template slot="item" slot-scope="data">
                                    {{ data.item.name}}
                                </template>
                            </v-select>
                        </v-flex>
                    </v-layout>
                </v-card-text>
 

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click.native="close()">Отмена</v-btn>
                    <v-btn color="blue darken-1" flat @click.native="save()">Сохранить</v-btn>
                </v-card-actions>
                {{newTask}}
                {{employeeSel}}
            </v-card>
        </v-dialog>
    </v-toolbar>

  <!--   <ul id="example-1">
        <li v-for="item in employee">
            {{ item.value }}
        </li>
    </ul> -->

    <v-container grid-list-xl>
        <v-layout row wrap>
            <v-flex xs4>
                <span class="display-1">Новые</span>
            </v-flex>
            <v-flex xs4>
                <span class="display-1">В работе</span>
            </v-flex>
            <v-flex xs4>
                <span class="display-1">Готово</span>
            </v-flex>
            <!-- Задачи -->
            <v-flex xs4>
                <v-hover>

                    <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`" class="mx-auto mb-3">
                        <v-card-title class="cyan">
                            <span class="subheading white--text">Постоение карт различных параметров</span>
                        </v-card-title>
                        <v-list three-line>
                            <v-list-tile>
                                <v-list-tile-content>
                                    <v-list-tile-sub-title>(650) 555-1234 ваываыва ываыва ыва ыва ыва ыв аыв ук впва пввыа аыв аыва ыв аыв аыва выа ыв аыва ыв авыа ыв аыва ап вап вап ва пва пвап ва пва па</v-list-tile-sub-title>
                                </v-list-tile-content>
                                <v-list-tile-avatar>
                                    <img src="https://cdn.vuetifyjs.com/images/lists/1.jpg">
                                </v-list-tile-avatar>
                                    <!-- <v-list-tile-action>
                                    <v-icon color="grey">
                                        table_chart
                                    </v-icon>
                                </v-list-tile-action> -->

                            </v-list-tile>
                        </v-list>
                        <!--  <v-divider></v-divider> -->
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn icon color="cyan" flat>
                                <v-icon>edit</v-icon>
                            </v-btn>
                            <v-btn color="cyan" flat>Детали</v-btn>

                        </v-card-actions>
                    </v-card>
                </v-hover>

                <v-card dark color="primary">
                    <v-card-text class="px-0">4</v-card-text>
                </v-card>
            </v-flex>
            <v-flex xs4>
                <v-card dark color="primary">
                    <v-card-text class="px-0">4</v-card-text>
                </v-card>

            </v-flex>
            <v-flex xs4>
                <v-card dark color="primary">
                    <v-card-text class="px-0">4</v-card-text>
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
    data: () => ({
        /* Хрень для тени при наведении */
        reviews: 413,
        value: 4.5,

        /*Валидация*/
        dictionary: {
            custom: {
                name: {
                    required: () => 'Поле не должно быть пустым',
                    max: 'Поле не должно превышать 50 символов'
                },
                description: {
                    required: () => 'Поле не должно быть пустым',
                },
                employeeSel: {
                    required: () => 'Поле не должно быть пустым',
                }
            }
        },

        /* Нормальные переменные */
        dialog: false,
        employee: {},
        employeeSel: {},
        taskRRM: {},
        newTask: {
            name: null,
            description: null,
            employeeSelKey: null
        }
    }),

    methods: {
        close() {
            this.dialog = false
            this.$validator.reset()
        },

        save() {

            /* this.newTask.employeeSelKey = employeeSel['.key']; */
            console.log(this.employeeSel['.key']);
            this.$firebaseRefs.taskRRM.push(this.newTask);

            this.$validator.validateAll().then((result) => {
                if (result) {

                    

                    this.close()


                } else {
                    console.log("validation failed");

                }
            }).catch(() => {
                console.log('TCL: save -> errors', errors);
            })

        }
    },
    firebase: {
        employee: db.ref('employee'),
        taskRRM: db.ref('taskRRM')
    },
    mounted() {
        /*Валидация*/
        this.$validator.localize('ru', this.dictionary)
    }
}
</script>

<style>
.borderRight {
    border-right: 1px solid gray !important;
}
</style>
