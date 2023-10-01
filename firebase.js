import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAzLbZ64Dm5is-YfvMK6MZ8EfJZH7jYmcE",
    authDomain: "clubapp-448bd.firebaseapp.com",
    projectId: "clubapp-448bd",
    storageBucket: "clubapp-448bd.appspot.com",
    messagingSenderId: "580046943765",
    appId: "1:580046943765:web:de0e7d9659544e4900001c",
    measurementId: "G-92NG2574NG"
  };

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
