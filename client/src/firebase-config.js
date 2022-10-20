//link npm firebase: https://www.npmjs.com/package/firebase
//link firebase doc: 
//https://firebase.google.com/docs/auth/web/start; https://firebase.google.com/docs/auth/web/phone-auth
//https://www.youtube.com/watch?v=IivlA4o5RkU&t=774s

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyAoyE1IePwGi1gyHgfAKTDyY7P4Fy7-amY',
    authDomain: 'otp-verify-phonenumber-mline.firebaseapp.com',
    projectId: 'otp-verify-phonenumber-mline',
    storageBucket: 'otp-verify-phonenumber-mline.appspot.com',
    messagingSenderId: '601006345664',
    appId: '1:601006345664:web:5839a1c6c68ef1d0e40c25',
    measurementId: 'G-W1ECSF8NJY',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// export {app, auth};
export default auth;