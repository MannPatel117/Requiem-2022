import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { redirectUnauthorizedTo, redirectLoggedInTo, canActivate} from '@angular/fire/auth-guard';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { MainComponent } from './pages/main/main.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { SuccessEmailSentComponent } from './pages/success-email-sent/success-email-sent.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['home']);

const routes: Routes = [
  {
    path: 'home', component: HomeComponent,
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full',
  },
 
  {
    path: 'login', component: LoginComponent,
    ...canActivate(redirectLoggedInToHome)
  },
  {
    path: 'register', component: RegisterComponent,
    ...canActivate(redirectLoggedInToHome)
  },

  {
    path: 'main', component: MainComponent,
  },

  {
    path: 'forgot-password', component: ForgotPasswordComponent,
    ...canActivate(redirectLoggedInToHome)
  },

  {
    path: 'verify-email', component: ForgotPasswordComponent,
    ...canActivate(redirectUnauthorizedToLogin)
  },

  {
    path: 'success-email-sent', component: SuccessEmailSentComponent,
    ...canActivate(redirectLoggedInToHome)
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
