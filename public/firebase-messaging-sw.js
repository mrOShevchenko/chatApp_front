importScripts('https://www.gstatic.com/firebasejs/9.22.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.2/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyBpk8bySp1Vo1APTqVq_u3TtG0kAPNtb3o",
    authDomain: "chatApp.firebaseapp.com",
    projectId: "chatApp",
    storageBucket: "chatApp.appspot.com",
    messagingSenderId: "140305000798",
    appId: "1:140305000798:web:cdfc454ec02cf0510ec7cf"
});

const isSupported = firebase.messaging.isSupported();
if (isSupported) {
    const messaging = firebase.messaging();
    messaging.onBackgroundMessage(({ notification: { title, body, image } }) => {
        self.registration.showNotification(title, { body, icon: image || '/assets/icons/icon-72x72.png' });
    });
}