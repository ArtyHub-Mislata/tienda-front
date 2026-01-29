import { ChangeDetectorRef, Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserModel } from '../../../models/UserModel';
import { HttpService } from '../../../services/http-service';
import { FormsModule } from '@angular/forms';
import { CButton } from '../../ui/c-button/c-button';

@Component({
  selector: 'c-header',
  imports: [RouterLink, FormsModule, CButton],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  isLogged: boolean = false;
  user!: UserModel;
  showLogoutMessage: boolean = false;
  isHiding: boolean = false;
  comprobarCierre: boolean = false;

  constructor(
    private httpService: HttpService,
    private router: Router,
    private cd: ChangeDetectorRef,
  ) {}
  ngOnInit() {
    this.httpService.isLogged().subscribe();
    this.httpService.isLogged$.subscribe({
      next: (isLogged) => {
        this.isLogged = isLogged;
        this.cd.detectChanges();
        console.log('ESTA LOGUEADO' + isLogged);
      },
    });
    this.httpService.getUser().subscribe({
      next: (user) => {
        if (user) this.user = user;
        this.cd.detectChanges();

        console.log('USUARIO' + user?.id);
      },
    });
  }

  logOut() {
    this.comprobarCierre = true;
  }

  onLogout() {
    console.log('SE ESTA CERRANDO SESION');
    this.comprobarCierre = false;
    this.showLogoutMessage = true;
    this.isHiding = false;

    setTimeout(() => {
      this.isHiding = true;
      setTimeout(() => {
        this.showLogoutMessage = false;
        this.isHiding = false;
      }, 500);
    }, 3000);
    this.httpService.logout().subscribe();
    this.router.navigate(['/login']);
  }
}
