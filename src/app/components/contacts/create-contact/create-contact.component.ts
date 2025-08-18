import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ContactService } from '../../../../services/contact.service';

@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.css']
})
export class CreateContactComponent {
  contact = {
    firstName: '',
    lastName: '',
    isActive: true
  };

  userId!: number; 

  constructor(
    private contactService: ContactService,
    private router: Router
  ) {}

  createContact() {
    if (!this.userId || this.userId <= 0) {
      alert('Please enter a valid User ID!');
      return;
    }

    const payload = {
      first_name: this.contact.firstName,
      last_name: this.contact.lastName,
      is_active: this.contact.isActive
    };

    this.contactService.createContact(this.userId, payload).subscribe({
      next: (res) => {
        alert('Contact created successfully!');
    
        this.router.navigate([`/contacts/view/${this.userId}`]);
      },
      error: (err) => {
        console.error('Error creating contact:', err);
        alert('Error creating contact! ' + (err.error?.message || err.statusText));
      }
    });
  }
}
