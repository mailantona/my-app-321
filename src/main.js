import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import VueFire from 'vuefire'
import firebase from 'firebase'

import 'vuetify/dist/vuetify.css'
import 'firebase/firestore'

Vue.use(Vuetify)
Vue.use(VueFire)

// Initialize Firebase
/* var config = {
  apiKey: "AIzaSyCQjsM52FNFZ-0Qg39fcnmPa9Lj93TxtFE",
  authDomain: "my-app-321.firebaseapp.com",
  databaseURL: "https://my-app-321.firebaseio.com",
  projectId: "my-app-321",
  storageBucket: "my-app-321.appspot.com",
  messagingSenderId: "703123305565"
};
var firebaseApp = firebase.initializeApp(config);
export const db = firebaseApp.database() */

import {router} from './routes.js'
import {store} from './store.js'



new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
