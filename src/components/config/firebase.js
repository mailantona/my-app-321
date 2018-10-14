
import firebase from 'firebase'
import VueFire from 'vuefire'
import 'firebase/firestore'

var config = {
    apiKey: "AIzaSyCQjsM52FNFZ-0Qg39fcnmPa9Lj93TxtFE",
    authDomain: "my-app-321.firebaseapp.com",
    databaseURL: "https://my-app-321.firebaseio.com",
    projectId: "my-app-321",
    storageBucket: "my-app-321.appspot.com",
    messagingSenderId: "703123305565"
  };
  export const firebaseApp = firebase.initializeApp(config);
  
  // Export the database for components to use.
  /* export const db = firebaseApp.database(); */
  export const db = firebase.firestore();
