import { Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { UsersComponent } from '../users/users.component';
import { AuthGuardService as AuthGuard } from '../services/auth-guard.service';


export const routes:Routes = [
    {path : '' , redirectTo : '/home' , pathMatch : 'full'},
    {path: 'home' , component : HomeComponent},
    {path: 'users' , component : UsersComponent, canActivate: [AuthGuard]},
    {path: '**' , component : HomeComponent}
];

