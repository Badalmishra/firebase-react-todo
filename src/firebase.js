import firebase from 'firebase'
var config = {
    apiKey: "###############################",
    authDomain: "fire-react-todo.firebaseapp.com",
    databaseURL: "https://fire-react-todo.firebaseio.com",
    projectId: "fire-react-todo",
    storageBucket: "",
    messagingSenderId: "###################"
  };
firebase.initializeApp(config);
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;
