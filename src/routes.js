import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import Mainpage from "./components/menu/main.vue";
import TaskRRM from "./components/menu/TaskRRM.vue";
import directory from "./components/menu/directory.vue";
import Firebase from "./components/menu/firebase.vue";
import E404 from "./components/pages/E404.vue";
/* import Directories from "./components/menu/directory/directories.vue"; */

const routes = [
    {
        name: 'mainpage',
        path: "",
        component: Mainpage
    },
    {
        name: 'firebase',
        path: "/firebase",
        component: Firebase
    },
    {
        name: 'taskRRM',
        path: "/taskRRM",
        component: TaskRRM
    },
    {
        name: 'directory',
        path: "/directory/:id",
        component: directory
    },
    {
        path: "*",
        component: E404
    },
    /* {
        name: 'directories',
        path: "/directory/:id",
        component: Directories
      }, */
];

export const router = new VueRouter({
    routes,
    mode: 'history'

})