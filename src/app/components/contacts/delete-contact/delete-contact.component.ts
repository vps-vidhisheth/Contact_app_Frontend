import { Component } from '@angular/core';
import { ContactService } from '../../../../services/contact.service'; 
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-delete-contact',
  templateUrl: './delete-contact.component.html',
  styleUrls: ['./delete-contact.component.css']
})
export class DeleteContactComponent {
  userId: number | null = null;
  contactId: number | null = null;

 constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

   ngOnInit() {
    // Read query params and populate inputs
    const params = this.route.snapshot.queryParams;
    if (params['userId']) this.userId = +params['userId'];
    if (params['contactId']) this.contactId = +params['contactId'];
  }


    // Update URL query params
  updateQueryParams() {
    const params: any = {
      userId: this.userId,
      contactId: this.contactId
    };

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: params,
      replaceUrl: true
    });
  }

onDeleteContact() {
  if (this.userId && this.contactId) {
    this.contactService.deleteContact(this.userId, this.contactId).subscribe({
      next: () => {
        alert('Contact and its details deleted successfully!');
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
