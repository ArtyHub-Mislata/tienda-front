import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HttpService } from '../../../services/http-service';
import { UserModel } from '../../../models/UserModel';
import { ArtworkModel } from '../../../models/ArtworkModel';

@Component({
  selector: 'profile-page',
  imports: [RouterLink],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.scss',
})
export class ProfilePage {
  user?: UserModel;
  artworks: ArtworkModel[] = [];

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
