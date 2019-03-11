import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-terms-condition',
  templateUrl: './terms-condition.component.html',
  styleUrls: ['./terms-condition.component.scss']
})
export class TermsConditionComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
  }

}
