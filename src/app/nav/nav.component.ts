import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { HasRoleDirective } from '../_directives/has-role.directive';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [ReactiveFormsModule, BsDropdownModule,
    CommonModule, RouterLink, RouterLinkActive, HasRoleDirective],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  constructor(
    public accountServices: AccountService,
    private router: Router) { }

  ngform = new FormGroup({
    userName: new FormControl(''),
    password: new FormControl('')
  });
  public login() {
    this.accountServices.login(this.ngform.value).subscribe({
      next: _ => {
        this.router.navigateByUrl('/members');
      },
    })
  }

  logout() {
    this.accountServices.logout();
    this.router.navigateByUrl('/')
  }
}
