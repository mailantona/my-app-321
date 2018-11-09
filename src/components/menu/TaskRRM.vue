<template>
<div>
    <v-toolbar flat color="grey lighten-5">
        <v-toolbar-title>Задачи АРМ РРМ</v-toolbar-title>
        <v-divider class="mx-2" inset vertical></v-divider>
        <!-- Редактирование *****************************************************************************************************************-->
        <v-dialog v-model="dialog" max-width="800px" persistent scrollable>
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
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field v-model="newTask.name" label="Заголовок" :counter="50" required v-validate="'required|max:50'" :error-messages="errors.collect('name')" data-vv-name="name"></v-text-field>
                                <v-textarea auto-grow rows=1 v-model="newTask.description" label="Описание" required v-validate="'required'" :error-messages="errors.collect('description')" data-vv-name="description"></v-textarea>
                            </v-flex>
                            <v-flex xs6>
                                <v-radio-group v-model="newTask.state" row required v-validate="'required'" :error-messages="errors.collect('state')" data-vv-name="state">
                                    <v-radio v-for="(st, index) in state" :key="index" color="blue" default="true" :label="st.title" :value="st.id"></v-radio>
                                </v-radio-group>
                            </v-flex>
                            <v-flex xs6>
                                <v-select :items="status" v-model="newTask.status" item-text="title" item-value="id" label="Этап" required v-validate="'required'" :error-messages="errors.collect('status')" data-vv-name="status"></v-select>
                            </v-flex>
                            <v-flex xs12>
                                <span class="headline">Дополнительно</span>
                            </v-flex>
                            <v-flex xs6>
                                <v-select :items="employee" item-text="name" :item-value="key" v-model="newTask.employeeSelKey" label="Исполнитель" required v-validate="'required'" :error-messages="errors.collect('employeeSelKey')" data-vv-name="employeeSelKey"></v-select>
                                <v-select :items="scope" v-model="newTask.scope" label="Рамки выполнения" required v-validate="'required'" :error-messages="errors.collect('scope')" data-vv-name="scope"></v-select>
                            </v-flex>
                            <v-flex xs6>
                                <v-select :items="priorityObj" item-text="title" item-value="orderBy" v-model="newTask.priority" label="Приоритет" required v-validate="'required'" :error-messages="errors.collect('priority')" data-vv-name="priority"></v-select>
                                <v-select :items="matching" v-model="newTask.matching" label="Согласование" required v-validate="'required'" :error-messages="errors.collect('matching')" data-vv-name="matching"></v-select>
                            </v-flex>
                            <v-flex xs12>
                                <span class="headline">Service Desk</span>
                            </v-flex>
                            <v-flex xs4>
                                <v-text-field v-model="newTask.requestSD" label="Номер заявки и Дата"></v-text-field>
                            </v-flex>
                            <v-flex xs4>
                                <v-select :items="organization" item-text="name" :item-value="key" v-model="newTask.organizationSelKey" label="Организация"></v-select>
                            </v-flex>
                            <v-flex xs4>
                                <v-text-field v-model="newTask.initiator" label="ФИО Инициатора"></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <span class="headline">Jira</span>
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
            </v-card>

        </v-dialog>
        <v-btn color="blue" v-on:click="onexport()" dark class="mb-2">Excel</v-btn>

        <!-- Второе окно *****************************************************************************************************************-->
        <v-dialog v-model="dialogDescriptionVal" width="500px">
            <v-card>
                <v-card-title class="headline grey lighten-2" primary-title>
                    Детали
                </v-card-title>
                <v-card-text>
                    <v-list dense subheader>
                        <v-subheader style="height:25px">Jira:</v-subheader>
                        <v-list-tile style="height:30px" v-for="(jiraURL, index) in newTask.requestJiraURL" :key="index">
                            <v-list-tile-content>
                                <v-list-tile-sub-title> <a :href="jiraURL.url" target="_blank">{{jiraURL.url}}</a> </v-list-tile-sub-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </v-list>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" flat @click="close(); dialogDescriptionVal = false">
                        Все понятно
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- Второе окно конец *****************************************************************************************************************-->
    </v-toolbar>
    <v-container grid-list-xl>
        <v-layout row wrap>
            <!-- Задачи *****************************************************************************************************************-->
            <v-flex v-for="(n, index) in 3" :key="index" xs12 sm4>
                <span class="headline" v-if="n === 1">Ожидание</span>
                <span class="headline" v-if="n === 2">В работе</span>
                <span class="headline" v-if="n === 3">Готово</span>
                <v-divider class="mb-2"></v-divider>
                <v-layout row wrap>
                    <v-flex xs12 sm12 md12 lg12 xl6 v-for="(task, index) in even(taskRRM)" :key="index" v-if="task.state === n.toString()">
                        <v-hover>
                            <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`">
                                <v-card-title :class="getColor(task.priority)">
                                    <span class="subheading white--text">{{task.name}}</span>
                                </v-card-title>
                                <v-list three-line>
                                    <v-list-tile>
                                        <v-list-tile-content>
                                            <v-list-tile-sub-title class="caption">{{task.description}}</v-list-tile-sub-title>
                                        </v-list-tile-content>
                                    </v-list-tile>
                                </v-list>
                                <v-list>
                                    <v-list-tile>
                                        <v-list-tile-avatar>
                                            <img v-for="epm in employee" :key="epm['.key']" v-if="epm['.key'] === task.employeeSelKey" :src="epm.avatarURL">
                                            <!-- {{employee.find(x => x['.key'] === task.employeeSelKey).avatarURL.toString()}} -->
                                        </v-list-tile-avatar>
                                        <v-list-tile-content>
                                            <v-list-tile-title class="body-2">{{getStatus(task.status , 1)}}</v-list-tile-title>
                                            <v-list-tile-sub-title>
                                                <v-progress-linear :color="getColor(task.priority)" height="10" :value="getStatus(task.status, 2)"></v-progress-linear>
                                            </v-list-tile-sub-title>
                                        </v-list-tile-content>
                                    </v-list-tile>
                                </v-list>
                                <v-card-actions>
                                    <v-btn @click="showDescription(task)" :color="getColor(task.priority)" flat>Детали</v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn @click="editItem(task)" icon :color="getColor(task.priority)" flat>
                                        <v-icon>edit</v-icon>
                                    </v-btn>
                                    <!-- <v-btn @click="deleteItem(task)" icon :color="priorityObj.find(x => x.orderBy === task.priority).color.toString()" flat>
                                        <v-icon>delete</v-icon>
                                    </v-btn> -->
                                </v-card-actions>
                                <v-alert :value="countProperties(task)" type="warning">
                                    Заполнены не все поля!
                                </v-alert>
                            </v-card>
                        </v-hover>
                    </v-flex>
                </v-layout>
            </v-flex>
            <!-- Задачи конец *****************************************************************************************************************-->
        </v-layout>
    </v-container>

</div>
</template>

<script>
import {
    db
} from '../config/firebase.js';
import XLSX from 'xlsx';
import {
    functions
} from 'firebase';
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
                },
                status: {
                    required: () => 'Поле не должно быть пустым',
                },
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
            status: ''
        },
        state: [{
                id: "1",
                title: "Ожидание"
            },
            {
                id: "2",
                title: "В работе"
            },
            {
                id: "3",
                title: "Готово"
            },
        ],
        newTaskCount: 14,
        scope: ['Сопровождение', 'Доп. сопровождение', 'Инвест. программа'],
        matching: ['Согласовано в ПАО', 'Согласовано в ИНФОРМ', 'В процессе', 'Не требует'],
        editedIndex: 1,
        editedIndexForUpdate: null,
        dialogDescriptionVal: false
    }),
    firebase: {
        employee: db.ref('employee'),
        employeeObj: {
            source: db.ref('employee'),
            asObject: true
        },
        taskRRM: db.ref('taskRRM'),
        organization: db.ref('organization'),
        priorityObj: db.ref('priorityObj'),
        status: db.ref('status'),

    },

    methods: {
        /*Поиск название цвета в priorityObj. Не знаю как убрать ошибку - написал try*/
        getColor(ColorID) {
            //JSON.parse(JSON.stringify(priorityObj))
            try {
                return this.priorityObj.find(x => x.orderBy.toString() === ColorID).color.toString();
            } catch (error) {
                //console.log(error);
            }
        },
        /*Поиск процента выполнения. Не знаю как убрать ошибку - написал try*/
        getStatus(statusID, paramID) {
            try {
                if (paramID === 1) {
                    return this.status.find(x => x.id.toString() === statusID).title.toString();
                } else {
                    return this.status.find(x => x.id.toString() === statusID).value.toString();
                }

            } catch (error) {
                //console.log(error);
            }
        },
        onexport() {
            var rootRef = db.ref()
            var employeeRef = rootRef.child('employee')
            var taskRRMRef = rootRef.child('taskRRM');
            var organizationRRMRef = rootRef.child('organization');
            var statusRef = rootRef.child('status');
            var valColl = [];
            var stateOnexport = this.state;

            taskRRMRef.on('child_added', function (task) {
                /*объект в Массив*/
                var requestJiraURLArray = task.val().requestJiraURL.map(function (item) {
                    return item['url'];
                });
                //console.log(task.val());
                employeeRef.child(task.val().employeeSelKey).once('value', user => {
                    //console.log(user.val());
                    organizationRRMRef.child(task.val().organizationSelKey).once('value', org => {
                        //console.log(org.val());
                        statusRef.child(task.val().status).once('value', str => {
                            //console.log(str.val());
                            valColl.push({
                                "Заголовок": task.val().name,
                                "Описание": task.val().description,
                                "Инициатор": task.val().initiator,
                                "Ответственный": user.val().name,
                                "Согласование": task.val().matching,
                                "Приоритет": task.val().priority,
                                "Service Desk": task.val().requestSD,
                                "Рамки выполнения": task.val().scope,
                                "Состояние": stateOnexport.find(x => x.id.toString() === task.val().state).title.toString(),
                                "Статус": str.val().title,
                                "Jira": requestJiraURLArray.join(" "),
                                "Организация-Заказчик": org.val().name,
                            })

                        })

                    })

                })

            })
            console.log('TCL: onexport -> valColl', valColl);

            var list1 = XLSX.utils.json_to_sheet(valColl);
            var wb = XLSX.utils.book_new()
            XLSX.utils.book_append_sheet(wb, list1, 'Задачи АРМ РРМ')
            XLSX.writeFile(wb, 'Задачи АРМРРМ ' + new Date() + '.xlsx')
        },
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
        showDescription(item) {
            this.newTask = Object.assign({}, item);
            this.dialogDescriptionVal = true;

        },

        save() {

            this.$validator.validateAll().then((result) => {
                if (result) {
                    this.newTask.whoIns = this.$store.getters.userLoginSett.email;
                    /* if (!this.newTask.requestJiraURL) {
                        this.newTask.requestJiraURL = [{
                            url: ''
                        }];
                    }; */
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
            confirm('Удалить запись?') && taskRRMRef.child(item['.key']).remove()
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
            if (key !== 0) {
                this.newTask.requestJiraURL.splice(key, 1);
                console.log('TCL: key', key);
            }
        },
        countProperties: function (obj) {
            let alertMessages = false
            if (Object.keys(obj).length < this.newTaskCount) {
                alertMessages = true;
            }
            if (obj.requestJiraURL[0].url === '') {
                alertMessages = true;
            }
            for (var key in obj) {
                if (obj[key] === '') {
                    alertMessages = true;
                }
            }
            return alertMessages
            console.log('as', alertMessages);
        }

        /* addBook: function () {
            this.$bindAsObject('customers', db.ref('books').limitToFirst(this.num))
        } */
    },
    mounted() {
        /*Валидация*/
        this.$validator.localize('ru', this.dictionary)
    },
    computed: {
        formTitle() {
            return this.editedIndex === 1 ? 'Новая задача' : 'Редактировать задачу'
        },

    }
}
</script>

<style>

</style>
