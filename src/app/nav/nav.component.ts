import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';


@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [ReactiveFormsModule, BsDropdownModule, CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {
  constructor(public accountServices: AccountService) { }

  ngform = new FormGroup({
    userName: new FormControl(''),
    password: new FormControl('')
  });
  public login() {
    this.accountServices.login(this.ngform.value).subscribe({
      next: response => {
        console.log(response)
      },
      error: error => console.log(error)
    })
  }
  logout() {
    this.accountServices.logout();
  }
  ngOnInit(): void {
  }

}
