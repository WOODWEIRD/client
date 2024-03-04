import { Component, OnInit } from '@angular/core';
import { MembersService } from '../../_services/members.service';
import { Member } from '../../_models/Member';
import { CommonModule } from '@angular/common';
import { MemberCardComponent } from '../member-card/member-card.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { Pagination } from '../../_models/pagination';
import { UserParams } from '../../_models/userParams';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

@Component({
  selector: 'app-member-list',
  standalone: true,

  imports: [
    CommonModule,
    MemberCardComponent,
    PaginationModule,
    ReactiveFormsModule,
    ButtonsModule
  ],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css'
})

export class MemberListComponent implements OnInit {
  members: Member[] = [];
  pagination: Pagination | undefined;
  userParams: UserParams | undefined;
  genderList = [
    { value: 'male', display: 'Males' },
    { value: "female", display: "Females" }
  ];
  filterForm: FormGroup = new FormGroup({});

  constructor(
    private membersService: MembersService) {
    this.userParams = this.membersService.getUserParams();
  }

  setUserParams() {
    if (this.userParams) {
      this.userParams.gender = this.filterForm.value.gender;
      this.userParams.minAge = this.filterForm.value.minAge;
      this.userParams.maxAge = this.filterForm.value.maxAge;
      this.userParams.orderBy = this.filterForm.value.orderBy;
    }
  }


  orderMembersBy(ordering: string) {
    if (this.userParams) {
      this.userParams.orderBy = ordering;
    }
    this.loadMembers();
  }


  initializeForm() {
    this.filterForm = new FormGroup({
      minAge: new FormControl(18),
      maxAge: new FormControl(99),
      gender: new FormControl('male'),
      orderBy: new FormControl('lastActive')
    })
  }

  resetFilters() {
    this.userParams = this.membersService.resetUserParams();
    this.loadMembers();
    this.filterForm.reset({
      minAge: 18,
      maxAge: 99,
      gender: this.membersService.userParams?.gender
    })
  }

  ngOnInit(): void {
    this.initializeForm();
    this.loadMembers();
  }

  pageChanged(event: any) {
    if (this.userParams && this.userParams?.pageNumber !== event.page)
      this.userParams.pageNumber = event.page;
    this.loadMembers();
  }

  loadMembers() {
    if (this.userParams) {
      this.membersService.setUserParams(this.userParams);
      this.membersService.getMembers(this.userParams).subscribe({
        next: r => {
          if (r.pagination && r.result) {
            this.members = r.result;
            this.pagination = r.pagination;
          }
        }
      })
    }
  }


}
