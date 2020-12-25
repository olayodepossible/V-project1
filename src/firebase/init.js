import firebase from 'firebase/app';
import 'firebase/firestore';

var firebaseConfig = {
  apiKey: 'AIzaSyClWbpjpdt5yMsWRHVTqP7aQuI5QsNEw0g',
  authDomain: 'smoothie-ninja-5eea8.firebaseapp.com',
  databaseURL: 'https://smoothie-ninja-5eea8.firebaseio.com',
  projectId: 'smoothie-ninja-5eea8',
  storageBucket: 'smoothie-ninja-5eea8.appspot.com',
  messagingSenderId: '989282342988',
  appId: '1:989282342988:web:2c273bcdc11835bf02fce9',
  measurementId: 'G-091ZX5P9RF',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });
// firebase.analytics();

export default db;
