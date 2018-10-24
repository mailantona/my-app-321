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

                <v-tabs grow fixed-tabs>
                    <v-tab>
                        Item
                    </v-tab>
                    <v-tab>
                        Item 2
                    </v-tab>
                    <v-tab-item >
                        <v-container pt-0 grid-list-md>
                            <v-card-text>
                                <v-layout wrap row>
                                    <v-flex xs12>
                                        <!-- <span class="headline">Основное</span> -->
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

                                </v-layout>
                            </v-card-text>
                        </v-container>
                    </v-tab-item>
                    <v-tab-item>
                        asasd
                    </v-tab-item>
                </v-tabs>

                <v-card-actions>

                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click.native="close()">Отмена</v-btn>
                    <v-btn color="blue darken-1" flat @click.native="save()">Сохранить</v-btn>
                </v-card-actions>
                newTask - {{newTask}}
            </v-card>

        </v-dialog>
    </v-toolbar>
    <v-container grid-list-xl>
        <v-layout row wrap>
            <v-flex class="text-xs-center" xs4>
                <span class="display-1">Новые</span>
            </v-flex>
            <v-flex class="text-xs-center" xs4>
                <span class="display-1">В работе</span>
            </v-flex>
            <v-flex class="text-xs-center" xs4>
                <span class="display-1">Готово</span>
            </v-flex>
            <!-- Задачи -->
            <v-flex xs4>
                <div v-for="task in even(taskRRM)" :key="task['.key']">
                    <v-hover v-if="task.state === '1'">
                        <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`" class="mx-auto mb-3">
                            <v-card-title :class="priorityObj.find(x => x.orderBy === task.priority).color.toString()">
                                <span class="subheading white--text">{{task.name}}</span>
                            </v-card-title>
                            <v-list three-line>
                                <v-list-tile>
                                    <v-list-tile-content>
                                        <v-list-tile-sub-title>{{task.description}} {{task.state}}</v-list-tile-sub-title>
                                    </v-list-tile-content>
                                    <v-list-tile-avatar>
                                        <img src="https://cdn.vuetifyjs.com/images/lists/1.jpg">
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
                </div>

            </v-flex>
            <v-flex xs4>
                <div v-for="task in even(taskRRM)" :key="task['.key']">
                    <v-hover v-if="task.state === '2'">
                        <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`" class="mx-auto mb-3">
                            <v-card-title :class="priorityObj.find(x => x.orderBy === task.priority).color.toString()">
                                <span class="subheading white--text">{{task.name}}</span>
                            </v-card-title>
                            <v-list three-line>
                                <v-list-tile>
                                    <v-list-tile-content>
                                        <v-list-tile-sub-title>{{task.description}} {{task.state}}</v-list-tile-sub-title>
                                    </v-list-tile-content>
                                    <v-list-tile-avatar>
                                        <img src="https://cdn.vuetifyjs.com/images/lists/1.jpg">
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
                </div>

            </v-flex>
            <v-flex xs4>
                <div v-for="task in even(taskRRM)" :key="task['.key']">
                    <v-hover v-if="task.state === '3'">
                        <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`" class="mx-auto mb-3">
                            <v-card-title :class="priorityObj.find(x => x.orderBy === task.priority).color.toString()">
                                <span class="subheading white--text">{{task.name}}</span>
                            </v-card-title>
                            <v-list three-line>
                                <v-list-tile>
                                    <v-list-tile-content>
                                        <v-list-tile-sub-title>{{task.description}} {{task.state}}</v-list-tile-sub-title>
                                    </v-list-tile-content>
                                    <v-list-tile-avatar>
                                        <img src="https://cdn.vuetifyjs.com/images/lists/1.jpg">
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
                </div>
            </v-flex>

        </v-layout>
    </v-container>
</div>
</template>

<script src="./taskRRM/jsTaskRRM.js"></script>

<style>
.v-card__text {
    padding-top: 0 !important;
}
/* .v-tabs__content {
  height: 370px;
} */
</style>
