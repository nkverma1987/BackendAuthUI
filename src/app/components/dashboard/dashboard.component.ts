import { ApiService } from 'src/app/services/api.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { UserstoreService } from 'src/app/services/userstore.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  public users: any = [];
  public role!: string;

  public fullName: string = "";

  constructor(private api: ApiService, private auth: AuthService, private userStore: UserstoreService) { }

  ngOnInit() {
    this.api.getUsers()
      .subscribe(res => {
        this.users = res;
      });

     this.userStore.getFullNameFromStore()
    .subscribe(val=>{
      const fullNameFromToken = this.auth.getFullNameFromToken();
      this.fullName = val || fullNameFromToken
    });

    this.userStore.getRoleFromStore()
    .subscribe(val=>{
      const roleFromToken = this.auth.getRoleFromToken();
      this.role = val || roleFromToken;
    })
  }

  logout() {
    this.auth.signOut();
  }

  fetchFullName() {
    debugger;
    this.userStore.getFullNameFromStore()
      .subscribe(val => {
        let fullNameFromToken = this.auth.getFullNameFromToken();
        this.fullName = val || fullNameFromToken;
      });
  }
}
