import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';


import { UsersComponent } from './components/users/users.component';
import { CreateUserComponent } from './components/users/create-user/create-user.component';
import { ViewUsersComponent } from './components/users/view-users/view-users.component';
import { UpdateUserComponent } from './components/users/update-user/update-user.component';
import { DeleteUserComponent } from './components/users/delete-user/delete-user.component';

import { ContactsComponent } from './components/contacts/contacts.component';
import { CreateContactComponent } from './components/contacts/create-contact/create-contact.component';
import { ViewContactsComponent } from './components/contacts/view-contacts/view-contacts.component';
import { UpdateContactComponent } from './components/contacts/update-contact/update-contact.component';
import { DeleteContactComponent } from './components/contacts/delete-contact/delete-contact.component';

import { ContactDetailComponent } from './components/contact-details/contact-details.component';
import { CreateContactDetailComponent } from './components/contact-details/create-contact-detail/create-contact-detail.component';
import { ViewContactDetailsComponent } from './components/contact-details/view-contact-details/view-contact-details.component';
import { UpdateContactDetailComponent } from './components/contact-details/update-contact-detail/update-contact-detail.component';
import { DeleteContactDetailComponent } from './components/contact-details/delete-contact-detail/delete-contact-detail.component';

import { MenuComponent } from './components/menu/menu.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DynamicUrlInputComponent } from './dynamic-url-input/dynamic-url-input.component';
import { DynamicUrlDirective } from './shared/directives/dynamic-url.directive';

@NgModule({
  declarations: [
    AppComponent,


    LoginComponent,
    RegisterComponent,


    UsersComponent,
    CreateUserComponent,
    ViewUsersComponent,
    UpdateUserComponent,
    DeleteUserComponent,

    ContactsComponent,
    CreateContactComponent,
    ViewContactsComponent,
    UpdateContactComponent,
    DeleteContactComponent,

    ContactDetailComponent,
    CreateContactDetailComponent,
    ViewContactDetailsComponent,
    UpdateContactDetailComponent,
    DeleteContactDetailComponent,

   
    MenuComponent,
    NavbarComponent,
    DynamicUrlInputComponent,
    DynamicUrlDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,       
    HttpClientModule,  
    AppRoutingModule   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

