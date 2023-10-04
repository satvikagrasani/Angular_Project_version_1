import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditempComponent } from './editemp/editemp.component';
import { EmployeeComponent } from './employee/employee.component';
import { ListempComponent } from './listemp/listemp.component';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', component: EmployeeComponent },
  { path: 'edit/:id', component : EditempComponent },
  { path: 'list', component: ListempComponent },
  { path: 'login', component: LoginComponent},


  { path: 'welcome', component: WelcomeComponent ,canActivate:[AuthGuard]},
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
