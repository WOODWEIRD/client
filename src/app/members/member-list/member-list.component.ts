import { Component, OnInit } from '@angular/core';
import { MembersService } from '../../_services/members.service';
import { Member } from '../../_models/Member';
import { CommonModule } from '@angular/common';
import { MemberCardComponent } from '../member-card/member-card.component';
import { NgxLoadingModule } from 'ngx-loading';
import { BusyService } from '../../_services/busy.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-member-list',
  standalone: true,

  imports: [CommonModule, MemberCardComponent, NgxLoadingModule],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css'
})
export class MemberListComponent implements OnInit {
  members$: Observable<Member[]> | undefined;
  loading: boolean = false;
  constructor(private membersService: MembersService, private busyService: BusyService) {


  }
  ngOnInit(): void {
    this.members$ = this.membersService.getMembers();
  }

  sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  async sleepwork() {
    await this.sleep(1999);
  }
}
