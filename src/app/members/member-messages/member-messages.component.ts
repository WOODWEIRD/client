import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Message } from '../../_models/Message';
import { CommonModule } from '@angular/common';
import { MessageService } from '../../_services/message.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-member-messages',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './member-messages.component.html',
  styleUrl: './member-messages.component.css'
})
export class MemberMessagesComponent implements OnInit {
  @ViewChild('messageForm') messageForm?: NgForm;
  @Input() username?: string;
  @Input() messages: Message[] = [];

  ngform = new FormGroup({
    content: new FormControl('')
  });


  constructor(private messageService: MessageService, private fb: FormBuilder) { }
  ngOnInit(): void { }

  sendMessage() {
    if (!this.username) return;
    if (!this.ngform.controls['content'].value) return;
    this.messageService.sendMessage(this.username, this.ngform.controls['content'].value).subscribe({
      next: message => {
        this.messages.push(message);
        this.messageForm?.reset();
      }
    })
  }

}
