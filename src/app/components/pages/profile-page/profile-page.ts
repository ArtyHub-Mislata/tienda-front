import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'profile-page',
  imports: [RouterLink],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.scss',
})
export class ProfilePage {
  user?: UserModel;
  artworks: ArtWorkModel[] = [];

  constructor(private httpService: HttpService, private router: Router) {
    
  }

  ngOnInit(): void {
    this.httpService.getUser().subscribe({
      next: (user) => {
        this.user = user;
      }
    });
    this.httpService.getAllArtworksOfUser(this.user?.id!).subscribe({
      next: (artworks) => {
        this.artworks = artworks.data;
      }
    });
  }
}
