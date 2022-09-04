import { Home, Signup, Login, ForgotPass } from '../components/pages';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/signup', component: Signup },
    { path: '/login', component: Login },
    { path: '/forgotPass', component: ForgotPass },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
