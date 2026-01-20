import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CButton } from '../../ui/c-button/c-button';

@Component({
  selector: 'login-page',
  imports: [FormsModule, CButton, RouterLink],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage {
   credential: CredentialModel = {
    email: '',
    password: ''
  };

  isLogged: boolean = false;

  generalError: string = '';

  loading: boolean = false;

  constructor( private authService: HttpService, private router: Router ){}

  onLogin(form: NgForm) {
    this.generalError = '';

    this.loading = true;

    if(form.invalid) return;

    this.authService.login(this.credential).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/']);
      },
      error: () => {
        this.loading = false;
        this.generalError = 'Error al iniciar sesión';
      }
    });
  }
}
