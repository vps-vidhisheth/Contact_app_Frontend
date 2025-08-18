import { Component } from '@angular/core';
import { ContactService } from '../../../../services/contact.service'; 

@Component({
  selector: 'app-delete-contact',
  templateUrl: './delete-contact.component.html',
  styleUrls: ['./delete-contact.component.css']
})
export class DeleteContactComponent {
  userId: number | null = null;
  contactId: number | null = null;

  constructor(private contactService: ContactService) {}

  onDeleteContact() {
    if (this.userId && this.contactId) {
      this.contactService.deleteContact(this.userId, this.contactId).subscribe({
        next: (res) => {
          console.log('Contact deleted successfully:', res);
          alert('Contact deleted successfully!');
        },
        error: (err) => {
          console.error('Failed to delete contact:', err);
          alert('Failed to delete contact.');
        }
      });
    } else {
      alert('Please enter both User ID and Contact ID.');
    }
  }
}
