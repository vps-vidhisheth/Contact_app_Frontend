import { Component } from '@angular/core';
import { ContactDetailService } from '../../../../services/contact-detail.service';

@Component({
  selector: 'app-delete-contact-detail',
  templateUrl: './delete-contact-detail.component.html',
  styleUrls: ['./delete-contact-detail.component.css']
})
export class DeleteContactDetailComponent {
  userId = '';
  contactId = '';
  detailId = '';

  constructor(private contactDetailService: ContactDetailService) {}

  deleteContactDetail() {
    const userIdNum = +this.userId;
    const contactIdNum = +this.contactId;
    const detailIdNum = +this.detailId;

    if (!userIdNum || !contactIdNum || !detailIdNum) {
      alert('All IDs are required and must be numbers.');
      return;
    }

    this.contactDetailService.deleteContactDetail(userIdNum, contactIdNum, detailIdNum)
      .subscribe(
        response => {
          console.log('Delete successful:', response);
          alert('Contact detail deleted successfully!');
        },
        error => {
          console.error('Delete failed:', error);
          alert('Failed to delete contact detail.');
        }
      );
  }
}
