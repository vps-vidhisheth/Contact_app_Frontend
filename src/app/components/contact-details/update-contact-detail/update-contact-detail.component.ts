import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface ContactDetail {
  type: string;
  value: string;
  isActive: boolean;
  userId: string;
  contactId: string;
}

@Component({
  selector: 'app-update-contact-detail',
  templateUrl: './update-contact-detail.component.html',
  styleUrls: ['./update-contact-detail.component.css']
})
export class UpdateContactDetailComponent {
  detailId = '';
  contactDetail: ContactDetail = {
    type: '',
    value: '',
    isActive: false,
    userId: '',
    contactId: ''
  };

  constructor(private http: HttpClient) {}

  updateContactDetail() {

    const userIdNum = +this.contactDetail.userId;
    const contactIdNum = +this.contactDetail.contactId;
    const detailIdNum = +this.detailId;

    if (!userIdNum || !contactIdNum || !detailIdNum) {
      alert('Please enter valid User ID, Contact ID, and Detail ID.');
      return;
    }

    const url = `http://localhost:8080/api/user/${userIdNum}/contacts/${contactIdNum}/details/${detailIdNum}`;


    const typeLower = this.contactDetail.type.trim().toLowerCase();
    const body = typeLower === 'email'
      ? { email: this.contactDetail.value, isActive: this.contactDetail.isActive }
      : { phone: this.contactDetail.value, isActive: this.contactDetail.isActive };


    const token = localStorage.getItem('authToken'); 
    if (!token) {
      alert('No JWT token found. Please login first.');
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    console.log('Updating Contact Detail');
    console.log('URL:', url);
    console.log('Body:', body);

    this.http.put(url, body, { headers })
      .subscribe(
        response => {
          console.log('Update successful:', response);
          alert('Contact detail updated successfully!');
        },
        error => {
          console.error('Update failed:', error);
          alert('Failed to update contact detail. Check console.');
        }
      );
  }
}
