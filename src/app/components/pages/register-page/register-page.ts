import { Component } from '@angular/core';
import { HttpService } from '../../../services/http-service';
import { UserModel } from '../../../models/UserModel';
import { Router } from '@angular/router';
import { UserRegisterRequest } from '../../../models/UserRegisterRequest';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'register-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register-page.html',
  styleUrl: './register-page.scss',
})
export class RegisterPage {
  user: UserRegisterRequest = {
    name: '',
    email: '',
    description: '',
    password: '',
    address: '',
    imageProfileUrl: '',
  };

  loading: boolean = false;

  constructor(
    private httpService: HttpService,
    private router: Router,
  ) {}

  onRegister(form: NgForm) {
    if (form.invalid) {
        form.control.markAllAsTouched();
        return;
    }

    this.loading = true;

    this.httpService.register(this.user).subscribe({
      next: (user: UserModel) => {
        this.loading = false;
        console.log('Registro exitoso:', user);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.loading = false;
        console.error('Error en registro:', error);
      },
    });
  }
}