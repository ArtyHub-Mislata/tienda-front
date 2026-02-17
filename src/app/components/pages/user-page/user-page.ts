import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../../models/UserModel';
import { ArtworkModel } from '../../../models/ArtworkModel';
import { HttpService } from '../../../services/http-service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Chatbot } from '../chatbot/chatbot';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'user-page',
  standalone: true,
  imports: [RouterLink, Chatbot, CurrencyPipe],
  templateUrl: './user-page.html',
  styleUrl: './user-page.scss',
})
export class UserPage implements OnInit {
  user!: UserModel;
  artworks: ArtworkModel[] = [];

  constructor(
    private httpService: HttpService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
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
      error: (err) => console.error('Error cargando perfil de artista:', err)
    });
  }

  loadArtworks(id: string) {
    this.httpService.getAllArtworksOfUser(id).subscribe({
      next: (artworks) => {
        this.artworks = artworks.data || [];
      },
      error: (err) => console.error('Error cargando obras:', err)
    });
  }
}