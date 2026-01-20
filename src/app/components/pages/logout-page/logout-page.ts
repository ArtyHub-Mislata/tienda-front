import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CButton } from '../../ui/c-button/c-button';
import { HttpService } from '../../../services/http-service';

@Component({
  selector: 'logout-page',
  imports: [RouterLink, CButton],
  templateUrl: './logout-page.html',
  styleUrl: './logout-page.scss',
})
export class LogoutPage {
  constructor( private authService: HttpService, private router: Router ){}

  onLogout() {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.log("HAY UN ERROR EN EL LOGOUT" ,err)
      }
    });
  }
}
