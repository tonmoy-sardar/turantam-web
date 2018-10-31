import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from "../../services/login.service";


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  loginForm: FormGroup;
  signupForm: FormGroup;
  title: string;
  toggle_btn: string;
  toggle_key: boolean;
  formType:any;
  constructor(
    public dialogRef: MatDialogRef<SignupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private loginService:LoginService
  ) { }

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

  signIn() {
    console.log(this.loginForm);
    if (this.loginForm.valid) {
      this.loginService.userLogin(this.loginForm.value).subscribe(
        res => {
           console.log(res)
          localStorage.setItem('isLoggedin', 'true');          
          localStorage.setItem('userId', res['result']['id']);
          localStorage.setItem('userName', res['result']['name']);
          localStorage.setItem('userEmail', res['result']['email']);
          this.toastr.success('Login successfully', '', {
            timeOut: 3000,
          });
          this.loginService.loginStatus(true);
          this.dialogRef.close(true);          
        },
        error => {
          // console.log(error)
          this.toastr.error(error.error.message, '', {
            timeOut: 3000,
          });
        }
      )
    } else {
      this.markFormGroupTouched(this.loginForm)
    }
  }

  signUp() {

    if (this.signupForm.valid) {
      console.log(this.signupForm.value.email);
      localStorage.setItem('isLoggedin', 'true');
      localStorage.setItem('userEmail', this.signupForm.value.email);
          //this.loginService.loginStatus(true);
          this.dialogRef.close(true);
      this.loginService.userSignup(this.signupForm.value).subscribe(
        res => {
          // console.log(res)
          localStorage.setItem('isLoggedin', 'true');          
          localStorage.setItem('userId', res['result']['id']);
          localStorage.setItem('userName', res['result']['name']);
          localStorage.setItem('userEmail', res['result']['email']);
          this.toastr.success('Register successfully', '', {
            timeOut: 3000,
          });
          this.loginService.loginStatus(true);
          this.dialogRef.close(true);
        },
        error => {
          // console.log(error)
          this.toastr.error(error.error.message, '', {
            timeOut: 3000,
          });
        }
      )
    } else {
      this.markFormGroupTouched(this.signupForm)
    }
  }

}
