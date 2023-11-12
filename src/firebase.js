import firebase from 'firebase/compat/app';
import 'firebase/compat/messaging';

const firebaseConfig = {
    apiKey: "AIzaSyBpk8bySp1Vo1APTqVq_u3TtG0kAPNtb3o",
    authDomain: "chatApp.firebaseapp.com",
    projectId: "chatApp",
    storageBucket: "chatApp.appspot.com",
    messagingSenderId: "140305000798",
    appId: "1:140305000798:web:cdfc454ec02cf0510ec7cf"
};

firebase.initializeApp(firebaseConfig);

export default firebase.messaging();