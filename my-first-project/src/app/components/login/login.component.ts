import { Component, OnInit } from '@angular/core';
import { Login } from 'src/app/interfaces/loginDto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string = '';
    password: string = '';
  
    login() {
      console.log('Usuario:', this.username);
      console.log('Password:', this.password);
  
      if (this.username !== '' && this.password !== '') {
        const objectRequest: Login = {
          username: this.username,
          password: this.password 
        };
      }
  
    }
}
