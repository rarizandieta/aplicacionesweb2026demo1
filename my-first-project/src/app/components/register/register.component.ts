import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistroResponse } from 'src/app/interfaces/loginDto';
import { FakeAuthService } from 'src/app/services/fake-auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registroForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    @Inject(FakeAuthService) private fakeAuthService: FakeAuthService
  ) { 
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      usuario: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmarPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmarPassword = form.get('confirmarPassword')?.value;
    const confirmarPasswordControl = form.get('confirmarPassword');

    if (!confirmarPasswordControl) {
      return;
    }
    
    if (password !== confirmarPassword) {
      confirmarPasswordControl.setErrors({
        ...(confirmarPasswordControl.errors || {}),
        passwordMismatch: true
      });
      return;
    }

    if (confirmarPasswordControl.hasError('passwordMismatch')) {
      const currentErrors = { ...(confirmarPasswordControl.errors || {}) };
      delete currentErrors['passwordMismatch'];
      confirmarPasswordControl.setErrors(Object.keys(currentErrors).length ? currentErrors : null);
    }
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.registroForm.valid) {
      const nuevoUsuario = this.registroForm.value;
      this.fakeAuthService.registro(nuevoUsuario).subscribe((entry: RegistroResponse) => {
        if (entry) {
          console.log('Registro exitoso:', nuevoUsuario);
          this.router.navigate(['/login']);
        } else {
          console.log('El usuario ya existe');
        }
      });
    }
  }

}
