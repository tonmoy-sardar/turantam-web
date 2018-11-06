import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { ContactusService } from "../../core/services/contactus.service";


@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.scss']
})
export class ContactusComponent implements OnInit {
  contactForm: FormGroup;
  constructor(
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private contactusService: ContactusService
  ) { }

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      name: ["", Validators.required],
      email: ["",
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)
        ]
      ],
      phone: ["", Validators.required],
      message: ["", Validators.required]
    });
  }

  markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control.controls) {
        control.controls.forEach(c => this.markFormGroupTouched(c));
      }
    });
  }

  isFieldValid(form: FormGroup, field: string) {
    return !form.get(field).valid && (form.get(field).dirty || form.get(field).touched);
  }

  displayFieldCss(form: FormGroup, field: string) {
    return {
      'is-invalid': form.get(field).invalid && (form.get(field).dirty || form.get(field).touched),
      'is-valid': form.get(field).valid && (form.get(field).dirty || form.get(field).touched)
    };
  }

  sendMessage() {
    console.log(this.contactForm);
     if (this.contactForm.valid) {
      this.contactusService.sendMessageStatus(true);  
      this.toastr.success('Message Send Successfully', '', {
        timeOut: 3000,
      });
      this.contactForm.reset();
      // this.contactusService.sendMessage(this.contactForm.value).subscribe(
      //   res => {
      //      console.log(res)
      //     this.toastr.success('Login successfully', '', {
      //       timeOut: 3000,
      //     });
      //     this.contactusService.sendMessageStatus(true);        
      //   },
      //   error => {
      //     // console.log(error)
      //     this.toastr.error(error.error.message, '', {
      //       timeOut: 3000,
      //     });
      //   }
      // )
     } else {
     this.markFormGroupTouched(this.contactForm)
     }
  }

  

}
