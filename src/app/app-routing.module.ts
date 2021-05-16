import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/authorization/login/login.component';
import { RegisterComponent } from './components/authorization/register/register.component';
import { IndexComponent } from './components/index/index.component';
import { ConvertMultiFilesToBase64Component } from './components/convert-multi-files-to-base64/convert-multi-files-to-base64.component';


const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'authorization/register', component: RegisterComponent },
  { path: 'authorization/login', component: LoginComponent },
  { path: 'to-base64', component: ConvertMultiFilesToBase64Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
