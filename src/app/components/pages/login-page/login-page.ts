import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CredentialModel } from '../../../models/CredentialModel';
import { HttpService } from '../../../services/http-service';

@Component({
  selector: 'login-page',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage {
   credential: CredentialModel = {
    email: '',
    password: ''
  };

  generalError: string = '';
  loading: boolean = false;

  constructor( private authService: HttpService, private router: Router ){}

  onLogin(form: NgForm) {
    this.generalError = '';
    
    if(form.invalid) {
        form.control.markAllAsTouched();
        return;
    }

    this.loading = true;

    this.authService.login(this.credential).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['']);
      },
      error: () => {
        this.loading = false;
        this.generalError = 'Credenciales no reconocidas.';
      }
    });
  }
}