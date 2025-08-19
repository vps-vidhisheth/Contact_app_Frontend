
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ContactService, Contact, ContactDetail } from '../../../../services/contact.service';

@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.css']
})
export class CreateContactComponent {
  contact = {
    firstName: '',
    lastName: '',
    isActive: true,
    details: [] as ContactDetail[]
  };

  newDetail: ContactDetail = { type: 'email', value: '' };

  userId!: number; 

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

   ngOnInit() {
    // Load values from query params
    const params = this.route.snapshot.queryParams;
    if (params['userId']) this.userId = +params['userId'];
    if (params['first_name']) this.contact.firstName = params['first_name'];
    if (params['last_name']) this.contact.lastName = params['last_name'];
    if (params['is_active'] !== undefined) this.contact.isActive = params['is_active'] === 'true';
    if (params['detail_type'] && params['detail_value']) {
      this.newDetail.type = params['detail_type'];
      this.newDetail.value = params['detail_value'];
      // Optional: push to details array immediately
      this.contact.details.push({ type: this.newDetail.type, value: this.newDetail.value });
    }
  }

  addDetail() {
    if (!this.newDetail.value.trim()) {
      alert('Detail value cannot be empty');
      return;
    }
    this.contact.details.push({ ...this.newDetail });
    this.newDetail.value = ''; // clear input
  }

  removeDetail(index: number) {
    this.contact.details.splice(index, 1);
  }

createContact() {
  if (!this.userId || this.userId <= 0) {
    alert('Please enter a valid User ID!');
    return;
  }

  // Correct payload matching backend
const payload = {
  first_name: this.contact.firstName, // map component firstName to backend
  last_name: this.contact.lastName,   // map component lastName to backend
  details: this.contact.details || [] // map component details to backend
};

// Send payload
this.contactService.createContact(this.userId, payload as any).subscribe({
  next: (res) => { alert('Contact created successfully!'); },
  error: (err) => { console.error(err); }
});


}

}
