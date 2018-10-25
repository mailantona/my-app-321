import {
    db
} from '../../config/firebase.js';
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
            requestJiraURL: '',

        },
        scope: ['Сопровождение', 'Доп. сопровождение', 'Инвест. программа'],
        matching: ['Согласовано в ПАО', 'Согласовано в ИНФОРМ', 'В процессе', 'Не требует'],
        asdads: ['', '', '', ''],
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
                state: '1'
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
        even: function(arr) {
            // Set slice() to avoid to generate an infinite loop!
            return arr.slice().sort(function(a, b) {
              return a.priority - b.priority;
            });
          }
    },
    firebase: {
        employee: db.ref('employee'),
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