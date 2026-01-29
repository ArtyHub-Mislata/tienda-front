import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HttpService } from '../../../services/http-service';
import { UserModel } from '../../../models/UserModel';
import { ArtworkModel } from '../../../models/ArtworkModel';
import { Chatbot } from '../chatbot/chatbot';

@Component({
  selector: 'profile-page',
  imports: [RouterLink, Chatbot],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.scss',
})
export class ProfilePage {
  user!: UserModel;
  artworks: ArtworkModel[] = [];
  constructor(
    private httpService: HttpService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.httpService.getUser().subscribe({
      next: (user) => {
        if (user) {
          this.user = user;
          if (user.id) this.loadArtworks(user.id);
        }
      },
    });
  }
  loadArtworks(id: string) {
    this.httpService.getAllArtworksOfUser(id).subscribe({
      next: (artworks) => {
        this.artworks = artworks.data;
      },
    });
  }
  logOut() {
    this.httpService.logout().subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
    });
  }
}
