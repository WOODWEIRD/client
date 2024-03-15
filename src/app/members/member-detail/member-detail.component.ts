import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Member } from '../../_models/Member';
import { ActivatedRoute, RouteReuseStrategy } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TabDirective, TabsModule, TabsetComponent } from 'ngx-bootstrap/tabs';
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';
import { MemberMessagesComponent } from '../member-messages/member-messages.component';
import { MessageService } from '../../_services/message.service';
import { Message } from '../../_models/Message';
import { PresenceService } from '../../_services/presence.service';
import { AccountService } from '../../_services/account.service';
import { User } from '../../_models/User';
import { take } from 'rxjs';
import { CustomRouteReuseStrategy } from '../../_services/customRouteReuseStrategy';


@Component({
  selector: 'app-member-detail',
  standalone: true,
  imports: [CommonModule, TabsModule, GalleryModule, MemberMessagesComponent],
  templateUrl: './member-detail.component.html',
  styleUrl: './member-detail.component.css',
  providers: [{ provide: RouteReuseStrategy, useClass: CustomRouteReuseStrategy }]
})
export class MemberDetailComponent implements OnInit, OnDestroy {
  @ViewChild('memberTabs', { static: true }) memberTabs?: TabsetComponent;
  member: Member = {} as Member;
  images: GalleryItem[] = [];
  activeTab?: TabDirective;
  messages: Message[] = [];
  user?: User;

  constructor(
    private route: ActivatedRoute,
    private messageService: MessageService,
    public presenceService: PresenceService,
    private accountService: AccountService,

  ) {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => { if (user) this.user = user }
    })
  }
  ngOnDestroy(): void {
    this.messageService.stopHubConnection();
  }

  ngOnInit(): void {
    this.route.data.subscribe({
      next: data => this.member = data['member']
    })

    this.route.queryParams.subscribe({
      next: params => {
        params['tab'] && this.selectTab(params['tab']);
      }
    })
    this.getImages();
  }

  selectTab(heading: string) {
    if (this.memberTabs) {
      this.memberTabs.tabs.find(x => x.heading === heading)!.active = true;
    }
  }

  onTabActivated(data: TabDirective) {
    if (data.heading === 'Messages' && this.user) { this.messageService.createHubConnection(this.user, this.member.userName); }
    else {
      this.messageService.stopHubConnection();
    }
  }


  loadMessageThread() {
    if (this.member) {
      this.messageService.getMessagesThread(this.member.userName).subscribe({
        next: r => this.messages = r
      })
    }
  }


  getImages() {
    if (!this.member) return;
    for (const photo of this.member.photos) {
      this.images.push(new ImageItem({ src: photo.url, thumb: photo.url })),
        this.images.push(new ImageItem({ src: photo.url, thumb: photo.url }))
    }
  }
}
