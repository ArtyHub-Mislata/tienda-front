import { ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserModel } from '../../../models/UserModel';
import { HttpService } from '../../../services/http-service';
import { FormsModule } from '@angular/forms';
import { CategoryModel } from '../../../models/CategoryModel';

@Component({
  selector: 'c-header',
  imports: [RouterLink, FormsModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  isLogged: boolean = false;
  user!: UserModel;
  showLogoutMessage: boolean = false;
  isHiding: boolean = false;
  comprobarCierre: boolean = false;
  menuVisible: boolean = false;
  categories!: CategoryModel[];

  constructor(
    private httpService: HttpService,
    private router: Router,
    private cd: ChangeDetectorRef,
  ) {}
  ngOnInit() {
    this.httpService.isLogged$.subscribe({
      next: (isLogged) => {
        this.isLogged = isLogged;
        this.cd.detectChanges();
      },
    });
    this.httpService.getUser().subscribe({
      next: (user) => {
        if (user) this.user = user;
        this.cd.detectChanges();
      },
    });
    this.httpService.getAllCategories().subscribe({
      next: (categories) => {
        this.categories = categories.data;
        this.cd.detectChanges();
      },
    });
  }

  logOut() {
    this.comprobarCierre = true;
  }

  onLogout() {
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
    this.httpService.logout();
    this.router.navigate(['/login']);
  }

  categoryMenu() {
    this.menuVisible = !this.menuVisible;
  }

  selectCategory(categoryName: string) {
    this.httpService.updateCategory(categoryName);
    this.menuVisible = false;
  }
}
