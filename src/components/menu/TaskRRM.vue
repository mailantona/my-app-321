<template>
<div>
    <v-toolbar flat color="grey lighten-5">
        <v-toolbar-title>Задачи АРМ РРМ</v-toolbar-title>
        <v-divider class="mx-2" inset vertical></v-divider>
        <v-dialog v-model="dialog" max-width="600px" persistent>
            <v-btn slot="activator" color="blue" dark class="mb-2">Добавить</v-btn>
            <v-card>
                <v-card-title class="blue">
                    <span class="headline white--text">{{ formTitle }}</span>
                </v-card-title>
                <v-container grid-list-md>
                    <v-card-text>
                        <v-layout wrap row>
                            <v-flex xs12>
                                <v-text-field v-model="newTask.name" label="Заголовок" :counter="50" required v-validate="'required|max:50'" :error-messages="errors.collect('name')" data-vv-name="name"></v-text-field>
                                <v-textarea auto-grow rows=2 v-model="newTask.description" label="Описание" required v-validate="'required'" :error-messages="errors.collect('description')" data-vv-name="description"></v-textarea>
                            </v-flex>
                            <v-flex xs6>
                                <v-select :items="employee" item-text="name" :item-value="key" v-model="newTask.employeeSelKey" label="Исполнитель" required v-validate="'required'" :error-messages="errors.collect('employeeSelKey')" data-vv-name="employeeSelKey"></v-select>
                                <v-select :items="scope" v-model="newTask.scope" label="Рамки выполнения" required v-validate="'required'" :error-messages="errors.collect('scope')" data-vv-name="scope"></v-select>
                            </v-flex>
                            <v-flex xs6>
                                <v-select :items="['Блокирующий', 'Высокий' , 'Средний' , 'Низкий']" v-model="newTask.priority" label="Приоритет" required v-validate="'required'" :error-messages="errors.collect('priority')" data-vv-name="priority"></v-select>
                                <v-select :items="matching" v-model="newTask.matching" label="Согласование" required v-validate="'required'" :error-messages="errors.collect('matching')" data-vv-name="matching"></v-select>
                            </v-flex>

                            <v-flex xs6>
                                
                            </v-flex>
                            <v-flex xs6>
                                
                            </v-flex>
                            <v-flex xs4>
                            </v-flex>
                            <v-flex xs4>
                            </v-flex>
                            <v-flex xs4>
                            </v-flex>
                            <v-flex xs4>
                            </v-flex>

                        </v-layout>
                    </v-card-text>
                </v-container>
                <v-card-actions>

                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click.native="close()">Отмена</v-btn>
                    <v-btn color="blue darken-1" flat @click.native="save()">Сохранить</v-btn>
                </v-card-actions>
                newTask - {{newTask}}
            </v-card>
        </v-dialog>
    </v-toolbar>

    {{newTask}}
    {{editedIndexForUpdate}}
    {{editedIndex}}
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
                <v-hover v-for="task in taskRRM" :key="task['.key']">

                    <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`" class="mx-auto mb-3">
                        <v-card-title class="cyan">
                            <span class="subheading white--text">{{task.name}}</span>
                        </v-card-title>
                        <v-list three-line>
                            <v-list-tile>
                                <v-list-tile-content>
                                    <v-list-tile-sub-title>{{task.description}}</v-list-tile-sub-title>
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
                            <v-btn color="cyan" flat>Детали</v-btn>
                            <v-spacer></v-spacer>
                            <v-btn @click="editItem(task)" icon color="cyan" flat>
                                <v-icon>edit</v-icon>
                            </v-btn>
                            <v-btn @click="deleteItem(task)" icon color="cyan" flat>
                                <v-icon>delete</v-icon>
                            </v-btn>

                        </v-card-actions>
                    </v-card>
                </v-hover>

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
                employeeSelKey: {
                    required: () => 'Поле не должно быть пустым',
                },
                scope: {
                    required: () => 'Поле не должно быть пустым',
                }
                ,
                matching: {
                    required: () => 'Поле не должно быть пустым',
                }
                ,
                priority: {
                    required: () => 'Поле не должно быть пустым',
                }
            }
        },

        /* Нормальные переменные */
        dialog: false,
        employee: {},
        taskRRM: {},
        newTask: {
            name: null,
            description: null,
            employeeSelKey: null,
            scope: null,
            matching: null,
            whoIns: '',
            priority: null
        },
        scope: ['Сопровождение', 'Доп. сопровождение', 'Инвест. программа'],
        matching: ['Согласовано в ПАО', 'Согласовано в ИНФОРМ', 'В процессе', 'Не требует'],

        editedIndex: 1,
        editedIndexForUpdate: null,
    }),

    methods: {
        close() {
            this.dialog = false;
            this.newTask = {};
            this.$validator.reset();
            this.editedIndex = 1;
            this.editedIndexForUpdate = null
        },
        editItem(item) {

            this.editedIndexForUpdate = item['.key'];
            this.editedIndex = 2
            this.newTask = Object.assign({}, item);
            this.dialog = true;

            console.log('TCL: editItem -> item', item);
        },

        save() {

            this.$validator.validateAll().then((result) => {
                if (result) {
                     this.newTask.whoIns = this.$store.getters.userLoginSett.email;
                    if (this.editedIndex === 1) {
                        this.$firebaseRefs.taskRRM.push(this.newTask);
                    } else {
                        const copy = this.newTask;
                        delete copy['.key'];
                        this.$firebaseRefs.taskRRM.child(this.editedIndexForUpdate).set(copy)
                        console.log(this.editedIndexForUpdate);
                    }

                    this.close()

                } else {
                    console.log("validation failed");

                }
            }).catch(() => {
                console.log('TCL: save -> errors', errors);
            })

        },
        deleteItem(item) {
            confirm('Удалить запись?') && this.$firebaseRefs.taskRRM.child(item['.key']).remove()
        },
        key: item => item['.key']
    },
    firebase: {
        employee: db.ref('employee'),
        taskRRM: db.ref('taskRRM')
    },
    mounted() {
        /*Валидация*/
        this.$validator.localize('ru', this.dictionary)
    },
    computed: {
        formTitle() {
            return this.editedIndex === 1 ? 'Новая задача' : 'Редактировать задачу'
        }
    }
}
</script>

<style>

</style>
