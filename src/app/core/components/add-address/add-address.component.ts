import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AddAddressService } from "../../services/add-address.service";
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.scss']
})
export class AddAddressComponent implements OnInit {
  addressForm: FormGroup;
  title:string;
  stateList:any;
  user_id:any;

  constructor(
    public dialogRef: MatDialogRef<AddAddressComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private addAddressService:AddAddressService
  ) { }

  ngOnInit() {
    if (localStorage.getItem('isLoggedin')) {
      this.user_id = localStorage.getItem('userId');
    }
    this.title = "Add Address";
    this.addressForm = this.formBuilder.group({
      type: ["", Validators.required],
      address: ["", Validators.required],
      pincode: ["", Validators.required],
     state_id: ["", Validators.required]
    });

    this.getStateList();

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



  getStateList() {
    this.addAddressService.getStateActiveList().subscribe(
      res => {
        this.stateList = res.result;
      },
      error => {
        console.log(error);
      }
    );
  }

  addAdress() {
    this.addressForm.value.customer_id = this.user_id;
    console.log(this.addressForm.value);
    if (this.addressForm.valid) {
      this.addAddressService.addcustomerAddress(this.addressForm.value).subscribe(
        res => {
          console.log(res);
          this.addAddressService.addressStatus(true);
          this.toastr.success('Address Added successfully', '', {
            timeOut: 3000,
          });
          this.dialogRef.close(true);
        },
        error => {
          this.toastr.error(error.error.message, '', {
            timeOut: 3000,
          });
        }
      )
    } else {
      this.markFormGroupTouched(this.addressForm)
    }
  }

}
