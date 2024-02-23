import { Component, Input, OnInit, input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';
import { NavComponent } from "./nav/nav.component";
import { User } from './_models/User';
import { AccountService } from './_services/account.service';
import { HomeComponent } from './home/home.component';
import { NgxLoadingModule } from 'ngx-loading';


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, NgFor,
    NavComponent,
    HomeComponent,
    NgxLoadingModule,
    CommonModule
  ]
})

export class AppComponent implements OnInit {
  title = 'dotnet app';
  loading: boolean = false;

  constructor(private accountService: AccountService) {

  }
  ngOnInit(): void {
    this.setCurrentUser();
  }

  setCurrentUser() {
    const userString = localStorage.getItem('user');
    if (!userString) return;
    const user: User = JSON.parse(userString);
    this.accountService.setCurrentUser(user);
  }




}
