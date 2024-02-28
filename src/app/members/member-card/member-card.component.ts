import { Component, Input } from '@angular/core';
import { MemberListComponent } from '../member-list/member-list.component';
import { Member } from '../../_models/Member';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-member-card',
  standalone: true,
  imports: [MemberListComponent, CommonModule, RouterLink
  ],
  templateUrl: './member-card.component.html',
  styleUrl: './member-card.component.css'
})
export class MemberCardComponent {
  @Input() member: Member | undefined;
  
  constructor() { }
}
