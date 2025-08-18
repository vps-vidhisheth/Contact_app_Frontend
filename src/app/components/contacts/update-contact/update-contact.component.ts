import { Component } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-update-contact',
  templateUrl: './update-contact.component.html',
  styleUrls: ['./update-contact.component.css']
})
export class UpdateContactComponent {
  updateData = {
    userId: null,
    contactId: null,
    field: '',
    value: ''
  };

  constructor(private authService: AuthService) {}

  onUpdateContact() {
    if (!this.updateData.userId || !this.updateData.contactId) {
      alert('Please enter both User ID and Contact ID');
      return;
    }

    const body = {
      field: this.updateData.field,
      value: this.updateData.value
    };

    this.authService.updateContact(
      this.updateData.userId,
      this.updateData.contactId,
      body
    ).subscribe({
      next: (res) => {
        console.log(' Contact updated:', res);
        alert('Contact updated successfully!');
      },
      error: (err) => {
        console.error(' Update failed:', err);
        alert('Failed to update contact');
      }
    });
  }
}
