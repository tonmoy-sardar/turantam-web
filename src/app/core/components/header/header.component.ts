import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

//services 
import { LoginService } from '../../services/login.service';
import { CartService } from '../../services/cart.service';

// core 
import { LoginComponent } from '../login/login.component'
import { SignupComponent } from '../signup/signup.component'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  host: {
    '(window:scroll)': 'onScroll($event)'
}
})
export class HeaderComponent implements OnInit {
  isScrolled = false;
  currPos: Number = 0;
  startPos: Number = 0;
  changePos: Number = 100;
  loggedIn: boolean;
  logedUser;
  totalCart;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private loginService:LoginService,
    private cartService:CartService,
  ) {
    loginService.getLoggedInStatus.subscribe(status => this.changeStatus(status));
    cartService.getCartNumberStatus.subscribe(status => this.cartNumberStatus(status));
    //cartService.cartNumberStatus.subscribe(status => this.cartNumberStatus(cartNumer));

   }

  ngOnInit() {
    this.loadUserInfo();
 

    if (sessionStorage.getItem("cart")) {
      console.log(JSON.parse(sessionStorage.getItem("cart")));
      this.totalCart = JSON.parse(sessionStorage.getItem("cart")).length;
      
    }
    else {
      this.totalCart = 0;
    }
    
   
  }

  cartNumberStatus(status: boolean) {
    if(status) {
      this.totalCart = JSON.parse(sessionStorage.getItem("cart")).length;
    }
  }

  onScroll(evt) {//window object can be wrapper in a service but for now we directly use it
    this.currPos = (window.pageYOffset || evt.target.scrollTop) - (evt.target.clientTop || 0);
    if(this.currPos >= this.changePos ) {
        this.isScrolled = true;
    } else {
        this.isScrolled = false;
    }
}

private changeStatus(status: boolean) {
  if (status) {
    this.loadUserInfo();
  }
}

login() {
  let dialogRef = this.dialog.open(LoginComponent, {
    width: '525px',
    data: {type:1}
  });
  dialogRef.afterClosed().subscribe(result => {
    // console.log(result)
  })
}

register() {
  let dialogRef = this.dialog.open(SignupComponent, {
    width: '525px',
    data: {type:2}
  });
  dialogRef.afterClosed().subscribe(result => {
    // console.log(result)
  })
}

loadUserInfo() {
  if (localStorage.getItem('isLoggedin')) {
    this.loggedIn = true;
    this.logedUser = localStorage.getItem('userName');
  }
  
  // else {
  //   this.authService.authState.subscribe((user) => {
  //     this.user = user;
  //     console.log(user)
  //     this.loggedIn = (user != null);
  //     if (this.loggedIn) {
  //       localStorage.setItem('isLoggedin', 'true');
  //     }
  //   });
  // }
}

logout() {
  // this.authService.signOut();
  localStorage.clear();
  this.loggedIn = false;
  this.router.navigate(['/']);
}



 
}
