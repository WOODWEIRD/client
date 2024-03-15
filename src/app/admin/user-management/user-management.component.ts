import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../_services/admin.service';
import { User } from '../../_models/User';
import { CommonModule } from '@angular/common';
import { BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { RolesModalComponent } from '../../modals/roles-modal/roles-modal.component';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, ModalModule],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css',
  providers: [BsModalService]
})
export class UserManagementComponent implements OnInit {
  users: User[] = [];
  bsModalRef: BsModalRef<RolesModalComponent> = new BsModalRef<RolesModalComponent>();
  availableRoles = [
    'Admin',
    'Mod',
    'Member'
  ];

  constructor(private adminService: AdminService, private modalSerivce: BsModalService) { }

  ngOnInit(): void {
    this.getUsersWithRoles()
  }

  getUsersWithRoles() {
    this.adminService.getUsersWithRoles().subscribe({
      next: r => this.users = r
    })
  }


  openRolesModal(user: User) {
    const config = {
      class: 'modal-dialog-centered',
      initialState: {
        username: user.username,
        availableRoles: this.availableRoles,
        selectedRoles: [...user.roles]
      }
    }
    this.bsModalRef = this.modalSerivce.show(RolesModalComponent, config);
    this.bsModalRef.onHide?.subscribe({
      next: () => {
        const selectedRoles = this.bsModalRef.content?.selectedRoles;
        if (!this.arrayEqual(selectedRoles!, user.roles)) {
          this.adminService.updateUserRoles(user.username, selectedRoles?.toString()!).subscribe({
            next: roles => user.roles = roles
          })
        }
      }
    })

  }

  private arrayEqual(arr1: any[], arr2: any[]) {
    return JSON.stringify(arr1.sort()) === JSON.stringify(arr2.sort());
  }
}
