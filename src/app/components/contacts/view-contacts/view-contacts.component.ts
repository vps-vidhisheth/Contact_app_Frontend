// import { Component, OnInit } from '@angular/core';
// import { ContactService } from '../../../../services/contact.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-view-contacts',
//   templateUrl: './view-contacts.component.html',
//   styleUrls: ['./view-contacts.component.css']
// })
// export class ViewContactsComponent implements OnInit {
//   contacts: any[] = [];
//   userId!: number; 

//   constructor(
//     private contactService: ContactService,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
    
//   }

//   fetchContacts() {
//     if (!this.userId) {
//       alert('Please enter a valid User ID!');
//       return;
//     }

//     this.contactService.getContacts(this.userId).subscribe({
//       next: (data: any) => {

//         this.contacts = data.map((c: any) => ({
//           id: c.contact_id,
//           firstName: c.f_name,
//           lastName: c.l_name,
//           isActive: c.is_active === 1 ? true : false
//         }));
//       },
//       error: (err) => {
//         console.error('Error fetching contacts:', err);
//         alert('Error fetching contacts: ' + (err.error?.message || err.statusText));
//       }
//     });
//   }

//   editContact(contactId: number) {
//     this.router.navigate([`/contacts/update/${contactId}`]);
//   }

//   deleteContact(contactId: number) {
//     if (!this.userId) return;

//     if (confirm('Are you sure you want to delete this contact?')) {
//       this.contactService.deleteContact(this.userId, contactId).subscribe({
//         next: () => this.fetchContacts(),
//         error: (err) => console.error('Error deleting contact:', err)
//       });
//     }
//   }

//   viewContact(contactId: number) {
//     this.router.navigate([`/contacts/view/${contactId}`]);
//   }
// }
import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../../../services/contact.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-contacts',
  templateUrl: './view-contacts.component.html',
  styleUrls: ['./view-contacts.component.css']
})
export class ViewContactsComponent implements OnInit {
  contacts: any[] = [];
  userId!: number;

  constructor(
    private contactService: ContactService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  fetchContacts() {
    if (!this.userId || this.userId <= 0) {
      alert('Please enter a valid User ID!');
      return;
    }

    // Use the new service method to get contacts WITH details
    this.contactService.getContactsWithDetails(this.userId).subscribe({
      next: (data: any) => {
        if (!Array.isArray(data) || data.length === 0) {
          this.contacts = [];
          return;
        }

        // Map contacts including their Details from backend
        this.contacts = data.map((c: any) => ({
          id: c.contact_id,
          firstName: c.f_name || '',
          lastName: c.l_name || '',
          isActive: c.is_active == 1,
         details: Array.isArray(c.details)
    ? c.details.map((d: any) => ({ type: d.type, value: d.value }))
    : []

        }));
      },
      error: (err) => {
        console.error('Error fetching contacts:', err);
        alert('Error fetching contacts: ' + (err.error?.message || err.statusText));
      }
    });
  }

  editContact(contactId: number) {
    this.router.navigate([`/contacts/update/${contactId}`]);
  }

  deleteContact(contactId: number) {
    if (!this.userId || this.userId <= 0) return;

    if (confirm('Are you sure you want to delete this contact?')) {
      this.contactService.deleteContact(this.userId, contactId).subscribe({
        next: () => this.fetchContacts(),
        error: (err) => console.error('Error deleting contact:', err)
      });
    }
  }

  viewContact(contactId: number) {
    this.router.navigate([`/contacts/view/${contactId}`]);
  }
}
