import { Component, OnInit } from '@angular/core';
import { MembersService } from '../_services/members.service';
import { Member } from '../_models/Member';
import { CommonModule } from '@angular/common';
import { MemberCardComponent } from '../members/member-card/member-card.component';
import { Pagination } from '../_models/pagination';
import { PaginationModule } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-lists',
  standalone: true,
  imports: [CommonModule, MemberCardComponent, PaginationModule],
  templateUrl: './lists.component.html',
  styleUrl: './lists.component.css'
})
export class ListsComponent implements OnInit {

  members: Member[] | undefined;
  predicate = 'liked';
  pagination: Pagination | undefined;
  pageNumber = 1;
  pageSize = 2;

  constructor(private memberService: MembersService) {

  }
  ngOnInit(): void {
    this.loadLikes(this.predicate);
  }

  setPredicate(predicate: string) {
    this.predicate = predicate;
  }

  loadLikes(predicate: string) {
    this.setPredicate(predicate);
    this.memberService.getLikes(this.predicate, this.pageNumber, this.pageSize).subscribe({
      next: response => {
        this.members = response.result;
        this.pagination = response.pagination;
      }
    }
    )
  }

  pageChanged(event: any) {
    if (this.pageNumber !== event.page)
      this.pageNumber = event.page;
    this.loadLikes(this.predicate);
  }



}
