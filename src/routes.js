import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import Mainpage from "./components/menu/main.vue";
import TaskRRM from "./components/menu/TaskRRM.vue";
import Firebase from "./components/menu/firebase.vue";
import E404 from "./components/pages/E404.vue";

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
        name: 'TaskRRM',
        path: "/TaskRRM",
        component: TaskRRM
    },
    {
      path: "*",
      component: E404
    }
];

export const router = new VueRouter({
    routes,
    mode: 'history'

})