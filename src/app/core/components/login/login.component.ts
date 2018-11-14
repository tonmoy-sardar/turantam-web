import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from "../../services/login.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  signupForm: FormGroup;
  forgotForm: FormGroup;
  forgotOtpForm: FormGroup;
  forgotPasswordForm:FormGroup;
  title: string;
  toggle_btn: string;
  toggle_key: boolean;
  formType: any;
  toggle_btn1: string;
  getOtp: any;
  otpForgotPassword:any;

  otp_verified:any;

  showOtpSection = false;
  newPwdSection = false;

  contact_no:any
  forgotOtp:any;

  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private loginService: LoginService
  ) {
    // this.formType = data.type; 

  }

  ngOnInit() {

    this.title = "Sign In";
    this.toggle_btn = "New user sign up";
    this.toggle_btn1 = "Forgot Password?";
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
      password: ["", Validators.required],
      contact: ["", Validators.required],
      otp: [""]
    });


    this.forgotForm = this.formBuilder.group({
      contact: ["", Validators.required],
    });

    this.forgotOtpForm = this.formBuilder.group({
      otp: ["", Validators.required],
    });

    this.forgotPasswordForm = this.formBuilder.group({
      newpassword: ["", Validators.required],
      confpassword: ["", Validators.required],
    });


    


    this.getOtp = "";

  }

  modalClose() {
    this.dialogRef.close();
  }

  toggle() {
    this.formType = 1;
    this.toggle_key = !this.toggle_key;
    if (this.toggle_key) {
      this.title = "Sign Up";
      this.toggle_btn = "Back to sign in";
    }
    else {
      this.title = "Sign In";
      this.toggle_btn = "New user sign up";
    }
  }

  toggle1() {
    this.formType = 2;
    this.toggle_key = !this.toggle_key;
    if (this.toggle_key) {
      this.title = "Forgot Password";
      this.toggle_btn = "Back to sign in";
    }
    else {
      this.title = "Sign In";
      this.toggle_btn1 = "Forgot Password?";
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


      if (this.signupForm.value.otp) {
        if (btoa(this.signupForm.value.otp) == this.getOtp) {
          console.log(this.signupForm.value);
          localStorage.setItem('isLoggedin', 'true');
          localStorage.setItem('userEmail', this.signupForm.value.email);
          //this.loginService.loginStatus(true);
          //  this.dialogRef.close(true);
          this.signupForm.value.otp_verified = 1;
          this.signupForm.value.user_type = 3;
          console.log("Signup value with otp verified ", this.signupForm.value);
          this.loginService.userSignup(this.signupForm.value).subscribe(
            res => {
              console.log(res);
              //this.getOtp = res['result']['otp'];

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
        }
        else {
          //alert("OTP Mismatch");
          this.toastr.error('OTP mismatch . Please try again', '', {
            timeOut: 3000,
          });
        }
      }
      else {
        console.log(this.signupForm.value);
        localStorage.setItem('userEmail', this.signupForm.value.email);
        this.signupForm.value.otp_verified = "";
        this.signupForm.value.user_type = 3;
        console.log(this.signupForm.value);
        this.loginService.userSignup(this.signupForm.value).subscribe(
          res => {
            console.log(res);
            this.getOtp = res['result']['otp'];
            this.toastr.success('OTP has been send successfully', '', {
              timeOut: 3000,
            });
          },
          error => {
            // console.log(error)
            this.toastr.error(error.error.message, '', {
              timeOut: 3000,
            });
          }
        )
      }


    } else {
      this.markFormGroupTouched(this.signupForm)
    }
  }

  resendOtpSignup() {
    console.log("Form Value ==>", this.signupForm.value);
    // localStorage.setItem('isLoggedin', 'true');
    localStorage.setItem('userEmail', this.signupForm.value.email);
    this.signupForm.value.otp_verified = "";
    this.signupForm.value.user_type = 3;
    console.log(this.signupForm.value);
    this.loginService.userSignup(this.signupForm.value).subscribe(
      res => {
        console.log(res);
        this.getOtp = res['result']['otp'];
        this.toastr.success('OTP has been send successfully', '', {
          timeOut: 3000,
        });
      },
      error => {
        // console.log(error)
        this.toastr.error(error.error.message, '', {
          timeOut: 3000,
        });
      }
    )
  }

  customerForgotPasswordOtp() {

    if (this.forgotForm.valid) {
      
      this.contact_no = this.forgotForm.value.contact;
      this.loginService.userForgetPasswordOtp(this.forgotForm.value).subscribe(
        res => {
          console.log(res);
          this.forgotOtp = res.result.otp
          this.showOtpSection = true;
          this.toastr.success('OTP has been sent succesfully', '', {
            timeOut: 3000,
          });
         
        },
        error => {
          this.toastr.error(error.error.msg, '', {
            timeOut: 3000,
          });
        }
      )
    }
    else {
      this.markFormGroupTouched(this.forgotForm)
    }
  }

  forgotPasswordOtp() {
    console.log(this.forgotOtp);
    console.log(this.forgotOtpForm.value.otp);
    if (this.forgotOtp == btoa(this.forgotOtpForm.value.otp)) {

      this.newPwdSection = true;
      this.otp_verified = 1;
    }
    else {

      this.toastr.error('Please Enter Valid OTP', '', {
        timeOut: 3000,
      });
      
     
    }
  }


  submitNewPwd() {

    if (this.forgotPasswordForm.valid) {
      if (this.forgotPasswordForm.value.confpassword != this.forgotPasswordForm.value.newpassword) {
        
        
        this.toastr.error('Password & Confirm Password are not same', '', {
          timeOut: 3000,
        });
      }
      else {
       
        var data = {
          contact: this.contact_no,
          otp_verified: this.otp_verified,
          password: this.forgotPasswordForm.value.newpassword
        }
        this.loginService.userForgetPasswordUpdate(data).subscribe(
          res => {  
            this.dialogRef.close();
            this.toastr.success('Password has been successfully changed.', '', {
              timeOut: 3000,
            });
          //  this.router.navigateByUrl('/');
          },
          error => {
            this.toastr.error(error.error.msg, '', {
              timeOut: 3000,
            });
           
          }
        )

      }

    }
    else {
      this.markFormGroupTouched(this.forgotPasswordForm)
    }
  }

  resendOtpForgot() {
    var data = {
      contact: this.contact_no
    }
    this.loginService.userForgetPasswordOtp(data).subscribe(
      res => {
        
        this.forgotOtp = res.result.otp
        this.showOtpSection = true;
      },
      error => {
        
        this.toastr.error(error.error.msg, '', {
          timeOut: 3000,
        });
      }
    )
  }


}
