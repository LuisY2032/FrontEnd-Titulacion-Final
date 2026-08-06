import {Routes} from '@angular/router';
import {MY_ROUTES} from '@routes';

export default [
    {
        path: MY_ROUTES.authPages.signIn.base,
        title: 'Login',
        loadComponent: () => import('./components/sign-in/components/sign-in-container')
    },
    {
    path: 'email-verification',
    title: 'Verificación de Email',
    loadComponent: () => import('./components/email-verification/email-verification.component'),
  },

] as Routes;
// {
//     path: MY_ROUTES.authPages.passwordReset.base,
//         title: 'Recuperación Cuenta',
//     loadComponent: () => import('./components/password-reset/password-reset.component')
// }
