import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import firebase from 'firebase/app';

var firebaseConfig = {
  apiKey: "AIzaSyCv8vvXtMjD18ZZ8NcEXF14sZqRq0eupwo",
  authDomain: "blog-3cf00.firebaseapp.com",
  projectId: "blog-3cf00",
  storageBucket: "blog-3cf00.appspot.com",
  messagingSenderId: "323554552816",
  appId: "1:323554552816:web:c0b30792c2088be79d0b35",
  measurementId: "G-07ESQL3DVJ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

createApp(App).use(router).mount('#app')
