import { Component } from '@angular/core';
import { UserModel } from '../../../models/UserModel';
import { ArtworkModel } from '../../../models/ArtworkModel';
import { HttpService } from '../../../services/http-service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Chatbot } from '../chatbot/chatbot';

@Component({
  selector: 'app-user-page',
  imports: [RouterLink, Chatbot],
  templateUrl: './user-page.html',
  styleUrl: './user-page.scss',
})
export class UserPage {
  user!: UserModel;
  artworks: ArtworkModel[] = [];
  constructor(
    private httpService: HttpService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id')!;
      if (id) {
        this.loadUser(id);
      }
    });
  }

  loadUser(id: string) {
    this.httpService.getUserById(id).subscribe({
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
}
