<template>
<div>
    <v-toolbar flat color="grey lighten-5">
        <v-toolbar-title>Задачи АРМ РРМ</v-toolbar-title>
        <v-divider class="mx-2" inset vertical></v-divider>
        <!-- Редактирование *****************************************************************************************************************-->
        <v-dialog v-model="dialog" max-width="960px" persistent scrollable>
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
                                <v-text-field v-model="newTask.name" label="Заголовок" :counter="100" required v-validate="'required|max:100'" :error-messages="errors.collect('name')" data-vv-name="name"></v-text-field>
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
                                <v-select :items="employee" item-text="name" :item-value="key" v-model="newTask.employeeSelKey" label="Ответственный" required v-validate="'required'" :error-messages="errors.collect('employeeSelKey')" data-vv-name="employeeSelKey"></v-select>
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

                                <v-layout align-end row v-for="(item, index) in newTask.requestJiraURL" :key="index">
                                    <v-flex xs8>
                                        
                                        <v-text-field prepend-icon="link" v-model="item.url" label="Ссылка на заявку"></v-text-field>
                                    </v-flex>
                                    <v-flex xs3>
                                        <v-select :items="employee" item-text="name" :item-value="key" v-model="item.executor" label="Исполнитель"></v-select>
                                    </v-flex>
                                    <v-flex>
                                        <v-checkbox label="Сделано" color="blue" v-model="item.isDone"></v-checkbox>
                                    </v-flex>
                                    <v-flex>
                                        <v-btn @click="deleteJira(index)" icon color="blue" flat>
                                            <v-icon>remove_circle_outline</v-icon>
                                        </v-btn>
                                    </v-flex>
                                </v-layout>
                                <v-btn @click="addJira()" color="blue" flat>
                                    <v-icon>add_circle_outline</v-icon> Добавить заявку
                                </v-btn>

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
        <v-dialog v-model="dialogDescriptionVal" max-width="600px">
            <v-card>
                <v-card-title class="headline grey lighten-2" primary-title>
                    Детали
                </v-card-title>
                <v-card-text>
                    <v-list subheader>
                        <v-subheader>Jira:</v-subheader>
                        <template v-for="(jiraURL, index) in newTask.requestJiraURL">
                            <v-divider :key="index*157296" inset v-if="index !== 0"></v-divider>
                            <v-list-tile :key="index">
                                <v-list-tile-avatar>
                                    <img v-for="epm in employee" :key="epm['.key']" v-if="epm['.key'] === jiraURL.executor" :src="epm.avatarURL">
                                </v-list-tile-avatar>
                                    <v-list-tile-content>
                                        <v-list-tile-sub-title> <a :href="jiraURL.url" target="_blank">{{jiraURL.url}}</a> </v-list-tile-sub-title>
                                    </v-list-tile-content>
                                    <v-list-tile-action>
                                        <v-checkbox label="Сделано" readonly color="blue" v-model="jiraURL.isDone"></v-checkbox>
                                    </v-list-tile-action>
                            </v-list-tile>
                        </template>
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
                                    <!--  <v-btn @click="deleteItem(task)" icon :color="getColor(task.priority)" flat>
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

<script src="./taskRRM.js"></script>

<style>

</style>
