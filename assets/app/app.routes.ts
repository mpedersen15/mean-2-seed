import { Routes, RouterModule } from '@angular/router';
import { MessagesComponent } from './messages/messages.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { AUTH_ROUTES } from './authentication/auth.routes.ts';
const APP_ROUTES: Routes = [
	{path:'', redirectTo:'/messages', pathMatch: 'full'},
	{path:'messages', component: MessagesComponent},
	{path:'auth', component: AuthenticationComponent, children: AUTH_ROUTES }
];

export const myRoutes = RouterModule.forRoot(APP_ROUTES);