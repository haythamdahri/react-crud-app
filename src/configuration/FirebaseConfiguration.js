import * as firebase from 'firebase';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBpGuWacIwsmbFQjQ6mBA9tMS15KljBdLA",
    authDomain: "data-api-68722.firebaseapp.com",
    databaseURL: "https://data-api-68722.firebaseio.com",
    projectId: "data-api-68722",
    storageBucket: "data-api-68722.appspot.com",
    messagingSenderId: "562880060856",
    appId: "1:562880060856:web:45f76b20bb42af0355834d"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
