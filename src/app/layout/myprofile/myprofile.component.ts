import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
//services
import { MyprofileService } from '../../core/services/myprofile.service';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.scss']
})
export class MyprofileComponent implements OnInit {
  editForm: FormGroup;
  profileDetails=[];
  user_id: string;
  editProfile: boolean;
  profileImageToUpload: File = null;
  profileImage: File = null;
  userName:string;
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private myprofileService: MyprofileService,
  ) { }

  ngOnInit() {
    if (localStorage.getItem('isLoggedin')) {
      this.user_id = localStorage.getItem('userId');

    }
    this.profileImage;
    this.editForm = this.formBuilder.group({
      name: ["", Validators.required],
      email: ["",
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)
        ]
      ],
      contact: ["", Validators.required],
      profile_image: [""]
    });

    this.getProfileDetails(this.user_id);
    
  }
  getProfileDetails(id) {
    this.myprofileService.getProfile(id).subscribe(
      res => {
        this.profileDetails = res['result'];
        this.editProfile = false;
      },
      error => {
        console.log(error);
      }
    );
  }

  showEditProfile() {
    this.editProfile = true;
  }

  onFileChange(event) {
    this.profileImage = event.target.files[0];
    //console.log(this.profileImage);
  }

  updateProfile() {
    if (this.editForm.valid) {
      
      this.myprofileService.updatemyProfile(this.user_id,this.profileImage, this.editForm.value).subscribe(
        res => {
          this.profileDetails = res['result'];
          this.userName = res['result']['name'];
          this.toastr.success('Profile Update successfully', '', {
            timeOut: 3000,
          });
          localStorage.setItem('userName', this.userName);
          this.myprofileService.updateProfileStatus(true);
          this.editProfile = false;
       
      
          this.getProfileDetails(localStorage.getItem('userId'));
        },
        error => {
          // console.log(error)
          this.toastr.error(error.error.message, '', {
            timeOut: 3000,
          });
        }
      )
    } else {
      this.markFormGroupTouched(this.editForm)
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
