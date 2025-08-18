import { Component } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-create-contact-detail',
  templateUrl: './create-contact-detail.component.html',
  styleUrls: ['./create-contact-detail.component.css']
})
export class CreateContactDetailComponent {
  userId: string = '';
  contactId: string = '';
  contactDetail = { type: '', value: '', isActive: true };

  constructor(private authService: AuthService) {}

  createContactDetail() {
    if (!this.userId || !this.contactId) {
      alert('User ID and Contact ID are required!');
      return;
    }

    if (!this.contactDetail.type || !this.contactDetail.value) {
      alert('Type and Value are required!');
      return;
    }

    const body = {
      user_id: Number(this.userId),
      contact_id: Number(this.contactId),
      type: this.contactDetail.type,
      value: this.contactDetail.value,
      is_active: this.contactDetail.isActive
    };

    this.authService.createContactDetail(Number(this.userId), Number(this.contactId), body)
      .subscribe({
        next: (res) => {
          console.log('Created:', res);
          alert('Contact detail created successfully!');
          this.contactDetail = { type: '', value: '', isActive: true };
        },
        error: (err: any) => {
          console.error('Failed to create contact detail:', err);
          alert('Failed to create contact detail: ' + (err.error?.message || err.message));
        }
      });
  }
}
