import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyCiPxW6SK9jp2TehISjkttvbjod_3vf1a8",
    authDomain: "survey-app-1801.firebaseapp.com",
    databaseURL: "https://survey-app-1801.firebaseio.com",
    projectId: "survey-app-1801",
    storageBucket: "survey-app-1801.appspot.com",
    messagingSenderId: "473521526306"
};

const firebaseApp = firebase.initializeApp(config)
export const database = firebaseApp.database()
export const auth = firebase.auth()