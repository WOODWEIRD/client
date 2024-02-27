import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from '../home/home.component';
import { AccountService } from '../_services/account.service';
import { error } from 'console';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HomeComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  constructor(
    private accountService: AccountService,
    private toastr: ToastrService
  ) { }


  @Output() cancelRegister = new EventEmitter();
  ngform = new FormGroup({
    userName: new FormControl(''),
    password: new FormControl('')
  });

  ngOnInit(): void { }

  register() {
    this.accountService.register(this.ngform.value).subscribe({
      next: () => this.cancel(),
      error: error => {
        this.toastr.error(error.error)

      }
    })
  }
  cancel() {
    this.cancelRegister.emit(false);
  }

}
