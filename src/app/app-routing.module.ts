
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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

const routes: Routes = [

  { path: '', redirectTo: '/login', pathMatch: 'full' },


  { path: 'login', component: LoginComponent },
  { path: 'login/:email', component: LoginComponent }, 

  { path: 'register', component: RegisterComponent },


  { 
    path: 'users', 
    component: UsersComponent,
    children: [
  { path: 'create', component: CreateUserComponent },
  { path: 'create/:field/:value', component: CreateUserComponent },
  { path: 'view', component: ViewUsersComponent },
  { path: 'update', component: UpdateUserComponent },
  { path: 'delete', component: DeleteUserComponent },
  { path: '', redirectTo: 'view', pathMatch: 'full' }
]

  },


  { 
    path: 'contacts',
    component: ContactsComponent,
    children: [
      { path: 'create', component: CreateContactComponent },
      { path: 'view', component: ViewContactsComponent },
      { path: 'update', component: UpdateContactComponent },
      { path: 'delete', component: DeleteContactComponent },
      { path: '', redirectTo: 'view', pathMatch: 'full' }
    ]
  },

  {
    path: 'contact-details',
    component: ContactDetailComponent,
    children: [
      { path: 'create', component: CreateContactDetailComponent },
      { path: 'view', component: ViewContactDetailsComponent },
      { path: 'update', component: UpdateContactDetailComponent },
      { path: 'delete', component: DeleteContactDetailComponent },
      { path: '', redirectTo: 'view', pathMatch: 'full' }
    ]
  },


  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
