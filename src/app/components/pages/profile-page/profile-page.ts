import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HttpService } from '../../../services/http-service';
import { UserModel } from '../../../models/UserModel';
import { ArtworkModel } from '../../../models/ArtworkModel';
import { Chatbot } from '../chatbot/chatbot';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'profile-page',
  standalone: true,
  imports: [RouterLink, Chatbot, CurrencyPipe],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.scss',
})
export class ProfilePage implements OnInit {
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
        } else {
          this.router.navigate(['/login']);
        }
      },
    });
  }

  loadArtworks(id: string) {
    this.httpService.getAllArtworksOfUser(id).subscribe({
      next: (artworks) => {
        this.artworks = artworks.data || [];
      },
      error: (err) => console.error('Error cargando colección:', err)
    });
  }

  logOut() {
    this.httpService.logout().subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => console.error('Error al cerrar sesión:', err)
    });
  }
}