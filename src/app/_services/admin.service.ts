import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models/User';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = environment.apiURl;
  users = [];
  constructor(private http: HttpClient) { }

  getUsersWithRoles() {
    return this.http.get<User[]>(this.baseUrl + 'admin/users-with-roles');
  }

  updateUserRoles(username: string, roles: string) {
    return this.http.put<string[]>(this.baseUrl + 'admin/edit-roles/' + username + '?roles=' + roles, {});
  }

}