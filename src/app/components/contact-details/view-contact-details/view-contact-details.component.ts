import { Component } from '@angular/core';
import { ContactDetailService } from '../../../../services/contact-detail.service';

interface ContactDetail {
  id: number;
  type: string;
  value: string;
  isActive: boolean;
  userId: number;
  contactId: number;
}

@Component({
  selector: 'app-view-contact-details',
  templateUrl: './view-contact-details.component.html',
  styleUrls: ['./view-contact-details.component.css']
})
export class ViewContactDetailsComponent {
  contactDetails: ContactDetail[] = [];

  userId!: number;
  contactId!: number;

  constructor(private contactDetailService: ContactDetailService) {}

  fetchContactDetails() {
    if (!this.userId || !this.contactId) {
      alert('Please enter both User ID and Contact ID');
      return;
    }

    this.contactDetailService.getContactDetails(this.userId, this.contactId)
      .subscribe({
        next: (data: any[]) => {
          this.contactDetails = data.map(d => ({
            id: d.contact_details_id,
            type: d.type,
            value: d.value,
            isActive: d.is_active,
            userId: d.user_id,
            contactId: d.contact_id
          }));
        },
        error: (err) => console.error('Error fetching contact details:', err)
      });
  }
}
