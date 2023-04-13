import firebase from "firebase"
require("@firebase/firestore")

const firebaseConfig = {
    apiKey: "AIzaSyDXMKEv4IWGDLl1-wsMTznOyHIP2DzbSJg",
    authDomain: "class-70-ed204.firebaseapp.com",
    projectId: "class-70-ed204",
    storageBucket: "class-70-ed204.appspot.com",
    messagingSenderId: "468375394029",
    appId: "1:468375394029:web:c8b43ff9d4d034e4f01ee4"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore()