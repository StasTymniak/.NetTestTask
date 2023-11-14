import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { canActivate } from './guards/auth.guard';
import { AddNewUrlComponent } from './components/add-new-url/add-new-url.component';
import { ShortUrlInfoComponent } from './components/short-url-info/short-url-info.component';
import { AboutComponent } from './components/about/about.component';


const routes: Routes = [
  {path:'', component: DashboardComponent},
  {path:'login', component: LoginComponent},
  {path:'dashboard', component: DashboardComponent},
  {path:'shortinfo/:id', component: ShortUrlInfoComponent, canActivate:[canActivate]},
  {path:'about',component: AboutComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
