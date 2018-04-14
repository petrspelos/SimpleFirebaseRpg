// Firebase Stup
var config = {
  apiKey: "AIzaSyCkKIYmunt7-LrSBPF10I04NnwncqQSHjI",
  authDomain: "simplerpg-eb8f6.firebaseapp.com",
  databaseURL: "https://simplerpg-eb8f6.firebaseio.com",
  projectId: "simplerpg-eb8f6",
  storageBucket: "simplerpg-eb8f6.appspot.com",
  messagingSenderId: "126035310758"
};
firebase.initializeApp(config);
const auth = firebase.auth();

// DOM elements
let $loginMessage = $("#login-message");

auth.onAuthStateChanged(firebaseUser => {
  // Login status changed
  if(firebaseUser) {
    
  } else {
    $loginMessage.text("Not logged in.");
  }
});