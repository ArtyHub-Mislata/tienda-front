import { Component } from '@angular/core';
import { HttpService } from '../../../services/http-service';
import { UserModel } from '../../../models/UserModel';
import { Router, RouterLink } from '@angular/router';

import { CButton } from '../../../components/ui/c-button/c-button';
import { UserRegisterRequest } from '../../../models/UserRegisterRequest';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'register-page',
  imports: [RouterLink, CButton, FormsModule],
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

  constructor(
    private httpService: HttpService,
    private router: Router,
  ) {}

  onRegister() {
    this.httpService.register(this.user).subscribe({
      next: (user: UserModel) => {
        console.log(user);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
