// Import the functions you need from the SDKs you need
import {initializeApp} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import {getDatabase, ref, set, get, child} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCeixdhuKRh80p8COaB4Rh-Ie7NL_64f4c",
    authDomain: "quiz-33d95.firebaseapp.com",
    projectId: "quiz-33d95",
    storageBucket: "quiz-33d95.appspot.com",
    messagingSenderId: "761628771669",
    appId: "1:761628771669:web:f5512cf3b3d9613df29bdc",
    measurementId: "G-WCQBJ6DKWG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

document.getElementById("submit").addEventListener('click', function (e) {

    set(ref(db, 'user/' + document.getElementById("username").value), {

        username: document.getElementById("username").value,
        email: document.getElementById("email").value,
        PhoneNumber: document.getElementById("phone").value
    });

    alert("Login Succesful !");

})
 
