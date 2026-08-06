import {Routes} from '@angular/router';
import {MY_ROUTES} from '@routes';
import {accountGuard, tokenGuard} from '@utils/guards';

export const appRoutes: Routes = [
    {path: '', redirectTo: MY_ROUTES.dashboards.absolute, pathMatch: 'full'},

    {
        path: MY_ROUTES.main,
        loadComponent: () => import('@layout/component/app.layout-main'),
        canActivate: [tokenGuard, accountGuard],
        children: [
            {path: MY_ROUTES.adminPages.base, loadChildren: () => import('./app/pages/admin/admin.routes')},
            {path: MY_ROUTES.dashboards.base, loadChildren: () => import('./app/pages/dashboards/dashboard.routes')},
            {path: MY_ROUTES.corePages.base, loadChildren: () => import('./app/pages/core/core.routes')}
        ]
    },

    {
        path: MY_ROUTES.errorPages.base,
        loadComponent: () => import('@layout/component/app.layout-blank'),
        children: [{path: '', loadChildren: () => import('./app/pages/errors/errors.routes')}]
    },

    {
        path: MY_ROUTES.authPages.base,
        loadComponent: () => import('@layout/component/app.layout-auth'),
        children: [{path: '', loadChildren: () => import('./app/pages/auth/auth.routes')}]
    },

    {
        path: MY_ROUTES.publicPages.base,
        loadComponent: () => import('@layout/component/app.layout-blank'),
        children: [{path: '', loadChildren: () => import('./app/pages/public/public.routes')}]
    },

    {path: '**', redirectTo: MY_ROUTES.errorPages.notFound.absolute}
];
