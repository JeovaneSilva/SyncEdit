import firebase from "firebase/compat/app";
import "firebase/compat/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCLLB7UiBT_N2MUNJJxGnShWkY5R2iZAoU",
  authDomain: "syncedit-9783b.firebaseapp.com",
  projectId: "syncedit-9783b",
  storageBucket: "syncedit-9783b.appspot.com",
  messagingSenderId: "852722831706",
  appId: "1:852722831706:web:4cf1bc2e00619812122363"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

export { auth };
