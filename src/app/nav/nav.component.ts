import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [ReactiveFormsModule, BsDropdownModule,
    CommonModule, RouterLink, RouterLinkActive,],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {
  constructor(public accountServices: AccountService,
    private router: Router,
    private toastr: ToastrService) { }

  ngform = new FormGroup({
    userName: new FormControl(''),
    password: new FormControl('')
  });
  public login() {
    this.accountServices.login(this.ngform.value).subscribe({
      next: _ => this.router.navigateByUrl('/members'),
    })
  }
  logout() {
    this.accountServices.logout();
    this.router.navigateByUrl('/')
  }
  ngOnInit(): void {
  }

}
