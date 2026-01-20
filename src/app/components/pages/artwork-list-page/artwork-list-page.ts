import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CButton } from '../../ui/c-button/c-button';
import { PageResponse } from '../../../models/PageResponseModel';
import { ArtworkModel } from '../../../models/ArtworkModel';
import { HttpService } from '../../../services/http-service';

@Component({
  selector: 'artwork-list-page',
  imports: [RouterLink, CButton],
  templateUrl: './artwork-list-page.html',
  styleUrl: './artwork-list-page.scss',
})
export class ArtworkListPage {
  artworkList!: PageResponse<ArtworkModel>

  constructor(private httpService: HttpService){

  }
  
  ngOnInit(){
    this.getAllArtWorks()
  }
  
  getAllArtWorks(){
    this.httpService.getAllArtworks().subscribe({
      next: (artworks) => {
        console.log(artworks)
        this.artworkList = artworks;
      }, 
      error: (error) => {
        console.log("Error al tratar de recoger todos los artworks", error)
      }
    })  
  }
}
