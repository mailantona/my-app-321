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
                    max: 'Поле не должно превышать 100 символов'
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
                url: '',
                isDone: false,
                executor: ''
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
                url: '',
                isDone: '',
                executor: ''
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