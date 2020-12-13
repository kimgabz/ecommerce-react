import firebase from 'firebase';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCnvGYlaaoV3EewEOo6_bPSOI4WJwUuS9w",
    authDomain: "online-shopping-49d92.firebaseapp.com",
    projectId: "online-shopping-49d92",
    storageBucket: "online-shopping-49d92.appspot.com",
    messagingSenderId: "114113331596",
    appId: "1:114113331596:web:42b8b8e00ef72fb6b196a9"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();