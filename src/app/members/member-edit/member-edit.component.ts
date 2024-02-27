import { Component, HostListener, OnInit, TemplateRef } from '@angular/core';
import { Member } from '../../_models/Member';
import { User } from '../../_models/User';
import { AccountService } from '../../_services/account.service';
import { MembersService } from '../../_services/members.service';
import { take } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BusyService } from '../../_services/busy.service';
import { NgxLoadingModule } from 'ngx-loading';
import { PhotoEditorComponent } from '../photo-editor/photo-editor.component';



@Component({
  selector: 'app-member-edit',
  standalone: true,
  imports: [CommonModule,
    TabsModule,
    ReactiveFormsModule,
    NgxLoadingModule,
    PhotoEditorComponent
  ],
  templateUrl: './member-edit.component.html',
  styleUrl: './member-edit.component.css'
})

export class MemberEditComponent implements OnInit {
  ngxLoadingAnimationTypes: any;
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.ngform.dirty) {
      $event.returnValue.true;
    }
  }
  member: Member | undefined;
  user: User | null = null;
  loading: boolean = false;
  constructor(private toastr: ToastrService,
    private accountService: AccountService,
    private memberService: MembersService,
    private busyService: BusyService,
  ) {

    this.accountService.currentUser$.pipe(take(1)).subscribe({

      next: async user => {
        this.user = user;
      }

    })

  }

  ngOnInit(): void {
    this.loadMember();
  }
  sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  ngform = new FormGroup({
    introduction: new FormControl(''),
    lookingFor: new FormControl(''),
    interests: new FormControl(''),
    city: new FormControl(''),
    country: new FormControl(''),
  });

  async sleepwork() {
    await this.sleep(1999);
  }

  updateMember() {
    const submitValue = JSON.parse(JSON.stringify(this.ngform.value));
    this.memberService.updateMember(submitValue).subscribe({
      next: async _ => {
        this.loading = this.busyService.busy();
        await this.sleepwork();
        if (!this.member) return;
        this.member.introduction = submitValue.introduction;
        this.member.lookingFor = submitValue.lookingFor;
        this.member.interests = submitValue.interests;
        this.member.city = submitValue.city;
        this.member.country = submitValue.country;
        this.toastr.success("success update");
        this.ngform.reset(this.ngform.value);
        this.loading = this.busyService.idle();


      }
    })

  }


  loadMember() {
    if (!this.user) return;
    this.memberService.getMemeber(this.user.username).subscribe({
      next: member => {
        this.member = member;
        this.ngform.setValue({
          introduction: member.introduction,
          lookingFor: member.lookingFor,
          interests: member.interests,
          city: member.city,
          country: member.country
        })
      }
    })
  }
}
