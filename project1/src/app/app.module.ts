import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';


import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTableModule} from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';

import { MatDividerModule } from '@angular/material/divider';

import { EmployeeComponent } from './employee/employee.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditempComponent } from './editemp/editemp.component';
import { ListempComponent } from './listemp/listemp.component';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    EmployeeComponent,
    EditempComponent,
    ListempComponent,
    LoginComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatToolbarModule,
    MatGridListModule,
    MatTableModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatDividerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
