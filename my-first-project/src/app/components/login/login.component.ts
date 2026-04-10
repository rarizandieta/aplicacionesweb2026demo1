import { Component, Inject } from '@angular/core';
import { Login } from 'src/app/interfaces/loginDto';
import { FakeAuthService } from 'src/app/services/fake-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(@Inject(FakeAuthService) private fakeAuthService: FakeAuthService, private router: Router) {}

  login() {
    this.errorMessage = '';
    if (this.username !== '' && this.password !== '') {
      const objectRequest: Login = {
        username: this.username,
        password: this.password
      };

      this.fakeAuthService.login(objectRequest).subscribe((isAuthenticated) => {
        if (isAuthenticated) {
          this.router.navigate(['/dashboard']);
        } else {
          this.errorMessage = 'Usuario o contraseña incorrectos.';
        }
      });
    } else {
      this.errorMessage = 'Por favor ingresa usuario y contraseña.';
    }
  }
}
