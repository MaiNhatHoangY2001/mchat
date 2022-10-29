//link npm firebase: https://www.npmjs.com/package/firebase
//link firebase doc: https://firebase.google.com/docs/auth/web/start; https://firebase.google.com/docs/auth/web/phone-auth
//new link firebase-expo-recaptcha: https://docs.expo.dev/versions/latest/sdk/firebase-recaptcha/
//link yt: https://www.youtube.com/watch?v=ePk0fjrNo6c
//npm i firebase@9.6.11
//npm i expo-firebase-recaptcha react-native-webview
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

export const firebaseConfig = {
    apiKey: 'AIzaSyAoyE1IePwGi1gyHgfAKTDyY7P4Fy7-amY',
    authDomain: 'otp-verify-phonenumber-mline.firebaseapp.com',
    projectId: 'otp-verify-phonenumber-mline',
    storageBucket: 'otp-verify-phonenumber-mline.appspot.com',
    messagingSenderId: '601006345664',
    appId: '1:601006345664:web:5839a1c6c68ef1d0e40c25',
    measurementId: 'G-W1ECSF8NJY',
};

if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}