import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model : any = {};

  constructor(public authService : AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
  }

  login(){
    this.authService.login(this.model).subscribe(next => {
     this.alertify.success('Logged in Successfully');
    }, error =>{
      // console.log('Failed to Login');
      this.alertify.error('Failed to Login');
    });
  }

  loggedIn(){
    // const token = localStorage.getItem('token');
    // return !!token;
    return this.authService.loggedIn();
  }

  logout(){
    localStorage.removeItem('token');
    this.alertify.warning('Logged Out.');
    console.log('Logged Out.');
  }

}
