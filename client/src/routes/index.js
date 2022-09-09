import { Home, Register, Login, ForgotPass } from '../components/pages';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/Register', component: Register },
    { path: '/login', component: Login },
    { path: '/forgotPass', component: ForgotPass },
    
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
