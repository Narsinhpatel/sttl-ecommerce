import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { authGuard } from './auth.guard';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';


export const routes: Routes = [
     {path:"", component:HomeComponent,canActivate:[authGuard]},
    {path:"login", component:LoginComponent,},
    {path:"register",component:RegisterComponent,},

];
