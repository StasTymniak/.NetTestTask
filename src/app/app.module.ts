import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ShortUrlsTableComponent } from './components/short-urls-table/short-urls-table.component';
import { AddNewUrlComponent } from './components/add-new-url/add-new-url.component';
import { ShortUrlInfoComponent } from './components/short-url-info/short-url-info.component';
import { AboutComponent } from './components/about/about.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ShortUrlsTableComponent,
    AddNewUrlComponent,
    ShortUrlInfoComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
