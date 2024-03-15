import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from '../../_services/message.service';
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { RouteReuseStrategy } from '@angular/router';
import { CustomRouteReuseStrategy } from '../../_services/customRouteReuseStrategy';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-member-messages',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './member-messages.component.html',
  styleUrl: './member-messages.component.css',
  providers: [{ provide: RouteReuseStrategy, useClass: CustomRouteReuseStrategy }]

})
export class MemberMessagesComponent implements OnInit {
  @ViewChild('messageForm') messageForm?: NgForm;
  @Input() username?: string;

  ngform = new FormGroup({
    content: new FormControl('')
  });


  constructor(public messageService: MessageService) { }
  ngOnInit(): void { }

  sendMessage() {
    if (!this.username) return;
    if (!this.ngform.controls['content'].value) return;
    this.messageService.sendMessage(this.username, this.ngform.controls['content'].value)
      .then(() => {
        this, this.messageForm?.reset();
      })
  }

}
