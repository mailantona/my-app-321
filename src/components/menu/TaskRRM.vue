<template>
<div>
    <v-toolbar flat color="grey lighten-5">
        <v-toolbar-title>Задачи АРМ РРМ</v-toolbar-title>
        <v-divider class="mx-2" inset vertical></v-divider>
        <v-dialog v-model="dialog" max-width="650px" persistent scrollable>
            <v-btn slot="activator" color="blue" dark class="mb-2">Добавить</v-btn>
            <v-card>
                <v-card-title class="blue">
                    <span class="headline white--text">{{ formTitle }}</span>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <v-container pt-0 grid-list-md>
                        <v-layout wrap row align-end>
                            <v-flex xs12>
                                <span class="headline">Основное</span>
                                <v-text-field v-model="newTask.name" label="Заголовок" :counter="50" required v-validate="'required|max:50'" :error-messages="errors.collect('name')" data-vv-name="name"></v-text-field>
                                <v-textarea auto-grow rows=1 v-model="newTask.description" label="Описание" required v-validate="'required'" :error-messages="errors.collect('description')" data-vv-name="description"></v-textarea>
                                <v-radio-group v-model="newTask.state" row required v-validate="'required'" :error-messages="errors.collect('state')" data-vv-name="state">
                                    <v-radio color="blue" default="true" label="Новая" value="1"></v-radio>
                                    <v-radio color="blue" label="В работе" value="2"></v-radio>
                                    <v-radio color="blue" label="Готово" value="3"></v-radio>
                                </v-radio-group>
                            </v-flex>
                            <v-flex xs6>
                                <v-select :items="employee" item-text="name" :item-value="key" v-model="newTask.employeeSelKey" label="Исполнитель" required v-validate="'required'" :error-messages="errors.collect('employeeSelKey')" data-vv-name="employeeSelKey"></v-select>
                                <v-select :items="scope" v-model="newTask.scope" label="Рамки выполнения" required v-validate="'required'" :error-messages="errors.collect('scope')" data-vv-name="scope"></v-select>
                            </v-flex>
                            <v-flex xs6>
                                <v-select :items="priorityObj" item-text="title" item-value="orderBy" v-model="newTask.priority" label="Приоритет" required v-validate="'required'" :error-messages="errors.collect('priority')" data-vv-name="priority"></v-select>
                                <v-select :items="matching" v-model="newTask.matching" label="Согласование" required v-validate="'required'" :error-messages="errors.collect('matching')" data-vv-name="matching"></v-select>
                            </v-flex>
                            <v-flex xs4>
                                <span class="headline">Service Desk</span>
                                <v-text-field v-model="newTask.requestSD" label="Номер заявки"></v-text-field>
                            </v-flex>
                            <v-flex xs4>
                                <v-select :items="organization" item-text="name" :item-value="key" v-model="newTask.organizationSelKey" label="Организация"></v-select>
                            </v-flex>
                            <v-flex xs4>
                                <v-text-field v-model="newTask.initiator" label="ФИО Инициатора"></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <span class="headline">Jira</span>
                                <!-- <v-text-field prepend-icon="link" v-model="newTask.requestJiraURL" label="Ссылка на заявку"></v-text-field> -->
                                <v-btn @click="addJira()" icon color="blue" flat>
                                    <v-icon>add_circle_outline</v-icon>
                                </v-btn>

                                <v-layout row v-for="(item, key) in newTask.requestJiraURL" :key="key">

                                    <v-flex xs12>
                                        <v-text-field prepend-icon="link" v-model="item.url" label="Ссылка на заявку"></v-text-field>
                                    </v-flex>
                                    <v-flex p>
                                        <v-btn @click="deleteJira(key)" icon color="blue" flat>
                                            <v-icon>remove_circle_outline</v-icon>
                                        </v-btn>
                                    </v-flex>
                                </v-layout>

                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>

                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click.native="close()">Отмена</v-btn>
                    <v-btn color="blue darken-1" flat @click.native="save()">Сохранить</v-btn>

                </v-card-actions>
                {{ newTask }}
            </v-card>

        </v-dialog>
    </v-toolbar>
    <v-container grid-list-xl>
        <v-layout row wrap>
            <!-- Задачи -->
            <v-flex v-for="(n, index) in 3" :key="index" xs12 sm4>
                <span class="headline" v-if="n === 1">Новые</span>
                <span class="headline" v-if="n === 2">В работе</span>
                <span class="headline" v-if="n === 3">Готово</span>
                <v-divider class="mb-2"></v-divider>
                <v-layout row wrap>
                    <v-flex xs12 sm12 md12 lg12 xl6 v-for="task in even(taskRRM)" :key="task['.key']" v-if="task.state === n.toString()">
                        <v-hover>
                            <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`">
                                <v-card-title :class="priorityObj.find(x => x.orderBy === task.priority).color.toString()">
                                    <span class="subheading white--text">{{task.name}}</span>

                                </v-card-title>
                                <v-list two-line>
                                    <v-list-tile>
                                        <v-list-tile-content>
                                            <v-list-tile-sub-title>{{task.description}} {{task.state}}</v-list-tile-sub-title>
                                        </v-list-tile-content>
                                        <v-list-tile-avatar>
                                            <img v-for="epm in employee" :key="epm['.key']" v-if="epm['.key'] === task.employeeSelKey" :src="epm.avatarURL">
                                            <!-- {{employee.find(x => x['.key'] === task.employeeSelKey).avatarURL.toString()}} -->
                                        </v-list-tile-avatar>
                                    </v-list-tile>
                                </v-list>
                                <v-card-actions>
                                    <v-btn :color="priorityObj.find(x => x.orderBy === task.priority).color.toString()" flat>Детали</v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn @click="editItem(task)" icon :color="priorityObj.find(x => x.orderBy === task.priority).color.toString()" flat>
                                        <v-icon>edit</v-icon>
                                    </v-btn>
                                    <v-btn @click="deleteItem(task)" icon :color="priorityObj.find(x => x.orderBy === task.priority).color.toString()" flat>
                                        <v-icon>delete</v-icon>
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-hover>
                    </v-flex>
                </v-layout>
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
                },
                matching: {
                    required: () => 'Поле не должно быть пустым',
                },
                priority: {
                    required: () => 'Поле не должно быть пустым',
                },
                state: {
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
            priority: '',
            state: '1',
            requestSD: '',
            organizationSelKey: '',
            initiator: '',
            requestJiraURL: [{
                url: ''
            }],

        },
        scope: ['Сопровождение', 'Доп. сопровождение', 'Инвест. программа'],
        matching: ['Согласовано в ПАО', 'Согласовано в ИНФОРМ', 'В процессе', 'Не требует'],
        priorityObj: [{
                orderBy: '4',
                title: 'Низкий',
                color: 'lime'
            },
            {
                orderBy: '3',
                title: 'Средний',
                color: 'light-green'
            },
            {
                orderBy: '2',
                title: 'Высокий',
                color: 'purple'
            },
            {
                orderBy: '1',
                title: 'Блокирующий',
                color: 'red'
            },
        ],

        editedIndex: 1,
        editedIndexForUpdate: null,
    }),

    methods: {
        close() {
            this.dialog = false;
            this.newTask = {
                state: '1',
                requestJiraURL: [{
                    url: ''
                }]
            };
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
        key: item => item['.key'],
        /* Сортировка */
        even: function (arr) {
            // Set slice() to avoid to generate an infinite loop!
            return arr.slice().sort(function (a, b) {
                return a.priority - b.priority;
            });
        },
        addJira: function () {
            this.newTask.requestJiraURL.push({
                url: ''
            });
        },
        deleteJira: function (key) {
            this.newTask.requestJiraURL.splice(key, 1);
        }
    },
    firebase: {
        employee: db.ref('employee'),
        employeeObj: {
            source: db.ref('employee'),
            asObject: true
        },
        taskRRM: db.ref('taskRRM'),
        organization: db.ref('organization')
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
