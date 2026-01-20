import { ChangeDetectorRef, Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserModel } from '../../../models/UserModel';
import { HttpService } from '../../../services/http-service';

@Component({
  selector: 'c-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  isLogged: boolean = false;
  user?: UserModel;

  constructor(private httpService: HttpService, private router: Router, private cd: ChangeDetectorRef) {
    
  }
  ngOnInit(){
    this.httpService.isLogged$.subscribe({
      next: (isLogged) =>{
        this.isLogged = isLogged;
        this.cd.detectChanges();
      }
    })
    this.httpService.getUser().subscribe({
      next: (user) => {
        this.user = user;
        this.cd.detectChanges();
      }
    })
  }  
  logOut(){
    this.router.navigate(['/logout']);
  }
}
