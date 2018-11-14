import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from "../../services/login.service";
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {
  loginForm: FormGroup;
  signupForm: FormGroup;
  title: string;
  toggle_btn: string;
  toggle_key: boolean;
  formType:any;

  constructor(
    public dialogRef: MatDialogRef<ForgotComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
  ) { 
    this.formType = data.type; 
  }

  ngOnInit() {
    this.title = "Sign Up";
    this.toggle_btn = "Sign In";
    this.loginForm = this.formBuilder.group({
      email: ["",
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)
        ]
      ],
      password: ["", Validators.required]
    });

    this.signupForm = this.formBuilder.group({
      name: ["", Validators.required],
      email: ["",
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)
        ]
      ],
      password: ["", Validators.required]
    });
  }

  modalClose() {
    this.dialogRef.close();
  }

  toggle() {
    this.toggle_key = !this.toggle_key;
    if (this.toggle_key) {
      this.title = "Sign In";
      this.toggle_btn = "New user sign up";
    }
    else {
      this.title = "Sign Up";
      this.toggle_btn = "Back to sign in";
    }
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

}
