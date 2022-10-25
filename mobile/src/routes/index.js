import { ForgotPass, Home, Login, Register } from '../components/pages';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/Register', component: Register },
    { path: '/login', component: Login },
    { path: '/forgotPass', component: ForgotPass },
    // { path: '/call', component: Call },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
