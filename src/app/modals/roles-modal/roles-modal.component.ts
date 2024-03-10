import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { BsModalRef, ModalModule } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-roles-modal',
  standalone: true,
  imports: [CommonModule, ModalModule, ReactiveFormsModule],
  templateUrl: './roles-modal.component.html',
  styleUrl: './roles-modal.component.css'
})
export class RolesModalComponent {
  @ViewChild('rolesForm') rolesForm?: NgForm;
  username = '';
  availableRoles: any[] = [];
  selectedRoles: any[] = [];

  ngform = new FormGroup({
    content: new FormControl('')
  });


  constructor(public bsModalRef: BsModalRef) {

  }

  updateChecked(checkedValue: String) {
    const index = this.selectedRoles.indexOf(checkedValue);
    index !== -1 ? this.selectedRoles.splice(index, 1) : this.selectedRoles.push(checkedValue);
  }
}
