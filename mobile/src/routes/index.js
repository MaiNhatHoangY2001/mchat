import { ForgotPass, Home, Login, Register } from '../components/pages';

const publicRoutes = [
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/', component: Home },
    { path: '/forgotPass', component: ForgotPass },
    // { path: '/call', component: Call },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
