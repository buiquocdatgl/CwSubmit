import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyADrNwn7jPZmHCKl9FG5kwLDzwyuOArUgY",
    authDomain: "coursework-90c00.firebaseapp.com",
    projectId: "coursework-90c00",
    storageBucket: "coursework-90c00.appspot.com",
    messagingSenderId: "992330015340",
    appId: "1:992330015340:web:d288de1d4cba193e902e49",
    measurementId: "G-Z64BDR2BBC"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}


export default firebase;