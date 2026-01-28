import { Component } from '@angular/core';
import { HttpService } from '../../../services/http-service';
import { UserModel } from '../../../models/UserModel';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CButton } from '../../ui/c-button/c-button';
import { UserRole } from '../../../models/UserRole';

@Component({
  selector: 'register-page',
  imports: [RouterLink, CButton, FormsModule],
  templateUrl: './register-page.html',
  styleUrl: './register-page.scss',
})
export class RegisterPage {
  user: UserModel = {
    name: '',
    email: '',
    description: '',
    address: '',
    imageProfileUrl: '',
    role: UserRole.USER,
  };

  constructor(private httpService: HttpService, private router: Router) { }

    onRegister() {
      this.httpService.register(this.user).subscribe({
        next: () => {
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
}
