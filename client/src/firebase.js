import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBgCGuLuS7dKdLi6XevKDvx5DOX8PUGQxM",
    authDomain: "kick-off-120.firebaseapp.com",
    projectId: "kick-off-120",
    storageBucket: "kick-off-120.appspot.com",
    messagingSenderId: "42080096481",
    appId: "1:42080096481:web:36fe7a15e440b5aad3a7a0"
};

firebase.initializeApp(firebaseConfig);

export default firebase;