import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() valuesFromHome : any;
  @Output() cancelRegister = new EventEmitter();
  model : any = {};

  constructor(private authService : AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
  }
  register(){
   this.authService.register(this.model).subscribe(() => {
     this.alertify.success('Registration Successfully');

   }, error => {
    this.alertify.error(error);
    });
  }
  cancel(){
    this.cancelRegister.emit(false);
    }

}
