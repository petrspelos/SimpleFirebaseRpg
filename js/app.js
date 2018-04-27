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
let $loginStatusCard = $("#login-status-card");
let $loginMessage = $("#login-message");
let $usernameTag = $("#username-tag");
let $useravatarTag = $("#useravatar-tag");

// Firebase object references
const charactersRefObj = firebase.database().ref().child('characters');

auth.onAuthStateChanged(firebaseUser => {
  // Login status changed
  if(firebaseUser) {
    $loginMessage.text("Logged in.");
    userId = firebase.auth().currentUser.uid;
    $loginStatusCard.addClass("border-success");
    registerWatchers();
  } else {
    $loginMessage.text("Not logged in.");
  }
});

function login(email, password) {
  const promise = auth.signInWithEmailAndPassword(email, password);
  promise.catch(e => console.log(e.message));
}

function register(email, password) {
  auth.createUserWithEmailAndPassword(email, password)
    .then(createNewUserCharacter);
}

function createNewUserCharacter(user) {
  user.updateProfile({ displayName: "anonymous" });
  const rootRef = firebase.database().ref().child("characters");
  rootRef.child(firebase.auth().currentUser.uid).set(getDefaultCharacter());
}

function getDefaultCharacter() {
  return {
    name: "nobody",
    gold: 0,
    avatarURL: "http://nd04.jxs.cz/728/677/638c91f645_72771180_o2.jpg"
  };
}

// State Watching
function registerWatchers() {
  charactersRefObj.on("value", onAnyCharacterChanged);
}

// Events
function onAnyCharacterChanged(snapshot) {
  snapshot.forEach(charNode => {
    if(charNode.key == firebase.auth().currentUser.uid) {
      loadUserCharacter(charNode.val());
    }
  });
}

// UI
function loadUserCharacter(character) {
  $usernameTag.text(character.name);
  $useravatarTag.attr("src", character.avatarURL);
}

// Character Attribute edits
function updateCharacterName(newName) {
  updateUserCharacterAttribute("name", newName);
}

function updateAvatarUrl(newUrl) {
  updateUserCharacterAttribute("avatarURL", newUrl);
}

function updateUserCharacterAttribute(attributeName, newValue) {
  let data = {};
  data[firebase.auth().currentUser.uid + '/' + attributeName] = newValue;
  charactersRefObj.update(data);
}
