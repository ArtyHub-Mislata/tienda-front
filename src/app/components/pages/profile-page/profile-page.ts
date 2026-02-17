import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HttpService } from '../../../services/http-service';
import { UserModel } from '../../../models/UserModel';
import { ArtworkModel } from '../../../models/ArtworkModel';
import { Chatbot } from '../chatbot/chatbot';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'profile-page',
  standalone: true,
  imports: [RouterLink, Chatbot, CurrencyPipe, FormsModule],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.scss',
})
export class ProfilePage implements OnInit {
  user!: UserModel;
  tempUser!: UserModel;
  artworks: ArtworkModel[] = [];
  isEditing: boolean = false;

  constructor(
    private httpService: HttpService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.httpService.getUser().subscribe({
      next: (user) => {
        if (user) {
          this.user = user;
          this.tempUser = { ...user };
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

  toggleEdit() {
    this.isEditing = true;
    this.tempUser = { ...this.user };
  }

  cancelEdit() {
    this.isEditing = false;
    this.tempUser = { ...this.user };
  }

  saveChanges() {
    this.httpService.updateUser(this.tempUser).subscribe({
      next: (updatedUser) => {
        this.user = updatedUser;
        this.isEditing = false;
        console.log('Perfil actualizado con éxito');
      },
      error: (err) => console.error('Error al actualizar perfil:', err)
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