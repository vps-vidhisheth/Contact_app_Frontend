

// import { Component } from '@angular/core';
// import { ContactService } from '../../../../services/contact.service';
// import { forkJoin } from 'rxjs';
// import { Router, ActivatedRoute } from '@angular/router';

// interface ContactDetail {
//   type: string;
//   value: string;
//   id?: number;
// }

// @Component({
//   selector: 'app-update-contact',
//   templateUrl: './update-contact.component.html',
//   styleUrls: ['./update-contact.component.css']
// })
// export class UpdateContactComponent {
//   userId: number | null = null;
//   contactId: number | null = null;

//   contact = {
//     firstName: '',
//     lastName: '',
//     isActive: true,
//     details: [] as ContactDetail[]
//   };

//   successMessage: string = '';
//   errorMessage: string = '';

//   constructor(
//     private contactService: ContactService,
//     private route: ActivatedRoute,
//     private router: Router
//   ) {}

//   ngOnInit() {
//     const params = this.route.snapshot.queryParams;

//     if (params['userId']) this.userId = +params['userId'];
//     if (params['contactId']) this.contactId = +params['contactId'];
//     if (params['first_name']) this.contact.firstName = params['first_name'];
//     if (params['last_name']) this.contact.lastName = params['last_name'];
//     if (params['is_active'] !== undefined) this.contact.isActive = params['is_active'] === 'true';

//     if (params['detail_type'] && params['detail_value']) {
//       this.contact.details.push({
//         type: params['detail_type'],
//         value: params['detail_value']
//       });
//     }
//   }

//   updateQueryParams() {
//     const params: any = {
//       userId: this.userId,
//       contactId: this.contactId,
//       first_name: this.contact.firstName,
//       last_name: this.contact.lastName,
//       is_active: this.contact.isActive
//     };

//     if (this.contact.details.length > 0) {
//       params['detail_type'] = this.contact.details[0].type;
//       params['detail_value'] = this.contact.details[0].value;
//     }

//     this.router.navigate([], {
//       relativeTo: this.route,
//       queryParams: params,
//       replaceUrl: true
//     });
//   }

// //   loadContact() {
// //     if (this.userId == null || this.contactId == null) {
// //       this.errorMessage = 'Please enter both User ID and Contact ID.';
// //       return;
// //     }

// //     this.contactService.getContactByIdDetails(this.userId, this.contactId).subscribe({
// //       next: (data: any) => {
// //        this.contact.firstName = data.first_name;
// // this.contact.lastName = data.last_name;
// // this.contact.isActive = !!data.is_active;
// // this.contact.details = Array.isArray(data.details)
// //   ? data.details.map((d: any) => ({ type: d.type, value: d.value, id: d.contact_detail_id }))
// //   : [];

// //         this.errorMessage = '';
// //       },
// //       error: (err) => {
// //         console.error('Error loading contact:', err);
// //         this.errorMessage = 'Failed to load contact.';
// //       }
// //     });
// //   }

// loadContact() {
//   if (this.userId == null || this.contactId == null) {
//     this.errorMessage = 'Please enter both User ID and Contact ID.';
//     return;
//   }

//   this.contactService.getContactByIdDetails(this.userId, this.contactId).subscribe({
//     next: (data: any) => {
//       this.contact.firstName = data.first_name;
//       this.contact.lastName = data.last_name;
//       this.contact.isActive = !!data.is_active;
//       this.contact.details = Array.isArray(data.details)
//         ? data.details.map((d: any) => ({ type: d.type, value: d.value, id: d.contact_detail_id }))
//         : [];

//       this.errorMessage = '';
//     },
//     error: (err) => {
//       console.error('Error loading contact:', err);
//       this.errorMessage = 'Failed to load contact.';
//     }
//   });
// }


//   addDetail() {
//     this.contact.details.push({ type: '', value: '' });
//   }

//   removeDetail(index: number) {
//     this.contact.details.splice(index, 1);
//   }

//   onUpdateContact() {
//     if (this.userId == null || this.contactId == null) {
//       alert('User ID and Contact ID are required.');
//       return;
//     }

//     const userIdNum = Number(this.userId);
//     const contactIdNum = Number(this.contactId);

//     if (isNaN(userIdNum) || isNaN(contactIdNum)) {
//       alert('User ID and Contact ID must be valid numbers.');
//       return;
//     }

//     const payload = {
//       first_name: this.contact.firstName,
//       last_name: this.contact.lastName,
//       is_active: this.contact.isActive,
//       details: this.contact.details.map(d => ({ type: d.type, value: d.value }))
//     };

//     this.contactService.updateContact(userIdNum, contactIdNum, payload).subscribe({
//       next: () => {
//         this.updateContactDetails(userIdNum, contactIdNum);
//         this.successMessage = 'Contact updated successfully.';
//         this.errorMessage = '';
//       },
//       error: (err) => {
//         console.error('Error updating contact:', err);
//         this.errorMessage = 'Failed to update contact.';
//         this.successMessage = '';
//       }
//     });
//   }

//   private updateContactDetails(userIdNum: number, contactIdNum: number) {
//     const detailObservables = this.contact.details
//       .filter(d => d.type.trim() !== '' && d.value.trim() !== '')
//       .map(d => {
//         if (d.id) return this.contactService.updateContactDetail(userIdNum, d.id, d);
//         else return this.contactService.addContactDetail(userIdNum, contactIdNum, d);
//       });

//     if (detailObservables.length === 0) {
//       this.successMessage = 'Contact updated successfully!';
//       this.errorMessage = '';
//       return;
//     }

//     forkJoin(detailObservables).subscribe({
//       next: () => {
//         this.successMessage = 'Contact and details updated successfully!';
//         this.errorMessage = '';
//       },
//       error: (err) => {
//         console.error('Error updating contact details:', err);
//         this.errorMessage = 'Failed to update contact details.';
//         this.successMessage = '';
//       }
//     });
//   }
// }



import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContactService } from '../../../../services/contact.service';
import { forkJoin } from 'rxjs';

interface ContactDetail {
  type: string;
  value: string;
  id?: number;
}

@Component({
  selector: 'app-update-contact',
  templateUrl: './update-contact.component.html',
  styleUrls: ['./update-contact.component.css']
})
export class UpdateContactComponent implements OnInit {
  userId: number = 0;
  contactId: number = 0;

  contact = {
    firstName: '',
    lastName: '',
    isActive: true,
    details: [] as ContactDetail[]
  };

  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private contactService: ContactService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['userId']) this.userId = +params['userId'];
      if (params['contactId']) this.contactId = +params['contactId'];
      if (params['firstName']) this.contact.firstName = params['firstName'];
      if (params['lastName']) this.contact.lastName = params['lastName'];
      if (params['isActive']) this.contact.isActive = params['isActive'] === 'true';
    });
  }

  loadContact() {
    if (!this.userId || !this.contactId) {
      this.errorMessage = 'Please enter valid User ID and Contact ID.';
      return;
    }

    this.contactService.getContactByIdDetails(this.userId, this.contactId).subscribe({
      next: (data: any) => {
        this.contact.firstName = data.first_name;
        this.contact.lastName = data.last_name;
        this.contact.isActive = !!data.is_active;
        this.contact.details = Array.isArray(data.details)
          ? data.details.map((d: any) => ({
              type: d.type,
              value: d.value,
              id: d.contact_detail_id
            }))
          : [];
        this.errorMessage = '';
      },
      error: () => {
        this.errorMessage = 'Failed to load contact.';
      }
    });
  }

  addDetail() {
    this.contact.details.push({ type: '', value: '' });
  }

  removeDetail(index: number) {
    this.contact.details.splice(index, 1);
  }

  updateContact() {
    if (!this.userId || !this.contactId) {
      this.errorMessage = 'User ID and Contact ID are required.';
      return;
    }

    const payload = {
      first_name: this.contact.firstName,
      last_name: this.contact.lastName,
      is_active: this.contact.isActive,
      details: this.contact.details.map(d => ({ type: d.type, value: d.value }))
    };

    this.contactService.updateContact(this.userId, this.contactId, payload).subscribe({
      next: () => {
        this.updateContactDetails();
        this.successMessage = 'Contact updated successfully!';
        this.errorMessage = '';
      },
      error: () => {
        this.errorMessage = 'Failed to update contact.';
        this.successMessage = '';
      }
    });
  }

  private updateContactDetails() {
    const detailObservables = this.contact.details
      .filter(d => d.type.trim() && d.value.trim())
      .map(d => {
        if (d.id) {
          return this.contactService.updateContactDetail(this.userId, d.id, d);
        } else {
          return this.contactService.addContactDetail(this.userId, this.contactId, d);
        }
      });

    if (detailObservables.length > 0) {
      forkJoin(detailObservables).subscribe({
        next: () => {
          this.successMessage = 'Contact and details updated successfully!';
          this.errorMessage = '';
        },
        error: () => {
          this.errorMessage = 'Failed to update contact details.';
          this.successMessage = '';
        }
      });
    }
  }
}

