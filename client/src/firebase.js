import firebase from 'firebase';



// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCplDus9c8kCaPJKjyKaMY4bpob_caEhx4",
    authDomain: "ecommerce-70535.firebaseapp.com",
    databaseURL: "https://ecommerce-70535.firebaseio.com",
    projectId: "ecommerce-70535",
    storageBucket: "ecommerce-70535.appspot.com",
    messagingSenderId: "315553257444",
    appId: "1:315553257444:web:e5b32dcb5d7876308919f1",
    measurementId: "G-DRSVHYYEPH"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  export const auth = firebase.auth();
  
  export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();