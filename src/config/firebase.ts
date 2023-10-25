// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
    //import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAj-4-DTNDd1U903QKju5OJhlAHeq9fEK0",
  authDomain: "social-media-react-byserene.firebaseapp.com",
  projectId: "social-media-react-byserene",
  storageBucket: "social-media-react-byserene.appspot.com",
  messagingSenderId: "475778209573",
  appId: "1:475778209573:web:357ab14023c0efee3eaccc",
  measurementId: "G-VY9D0W3PDK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
    //const analytics = getAnalytics(app);

export const auth = getAuth(app)
export const provider = new GoogleAuthProvider();