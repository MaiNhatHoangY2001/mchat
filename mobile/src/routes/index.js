import { ForgotPass, Home, Login, Register } from '../components/pages';

const publicRoutes = [
    { path: '/', component: Login },
    { path: '/register', component: Register },
    { path: '/home', component: Home },
    { path: '/forgotPass', component: ForgotPass },
    // { path: '/call', component: Call },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
