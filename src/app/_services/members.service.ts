import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Member } from '../_models/Member';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiURl;

  constructor(private http: HttpClient) { }

  getMembers() {
    return this.http.get<Member[]>(this.baseUrl + 'users');
  }

  getMemeber(username: string) {
    return this.http.get<Member>(this.baseUrl + 'users/' + username);
  }
}
