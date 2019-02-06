import firebase from 'firebase'
var config = {
    apiKey: "AIzaSyCbWDXngCJLYh9oYj8fE7YCAmSKjWZ6w7g",
    authDomain: "fire-react-todo.firebaseapp.com",
    databaseURL: "https://fire-react-todo.firebaseio.com",
    projectId: "fire-react-todo",
    storageBucket: "",
    messagingSenderId: "99353783006"
  };
firebase.initializeApp(config);
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;