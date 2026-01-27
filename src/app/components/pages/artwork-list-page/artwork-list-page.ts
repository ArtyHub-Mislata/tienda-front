import { Component } from '@angular/core';
import { PageResponse } from '../../../models/PageResponseModel';
import { ArtworkModel } from '../../../models/ArtworkModel';
import { HttpService } from '../../../services/http-service';
import { Chatbot } from "../chatbot/chatbot";
import { RouterLink } from "@angular/router";
import { Observable } from 'rxjs';
import { CategoryModel } from '../../../models/CategoryModel';
import { CButton } from '../../ui/c-button/c-button';

@Component({
  selector: 'artwork-list-page',
  imports: [Chatbot, RouterLink, CButton ],
  templateUrl: './artwork-list-page.html',
  styleUrl: './artwork-list-page.scss',
})
export class ArtworkListPage {
  artworkList?: PageResponse<ArtworkModel>
  filteredArtworks: ArtworkModel[] = [];

  categories!: CategoryModel[];

  isSidebarCollapsed = false;

  showAllArtworks = false;
  
  constructor(private httpService: HttpService){

  }
  
  ngOnInit(){
    this.httpService.getAllArtworks().subscribe({
      next: (artworks) => {
        this.artworkList = artworks;
        this.listenToCategoryChanges();
      }, 
      error: (error) => {
        console.log("Error al tratar de recoger todos los artworks", error)
      }
    })
    this.httpService.getAllCategories().subscribe({
      next: (categories) => {
        this.categories = categories.data;
      }, 
      error: (error) => {
        console.log("Error al tratar de recoger todas las categorías", error)
      }
    })
  }

  selectedCategory(categoryName: string) {
    this.httpService.updateCategory(categoryName);
  }
  
  listenToCategoryChanges(){
    this.httpService.currentCategory$.subscribe(categoryName => {
      if (categoryName === 'Todas') {
        this.filteredArtworks = this.artworkList?.data || [];
      } else {
        this.filterArtworksLocal(categoryName);
      }
    })
  }
  
  filterArtworksLocal(categoryName: string){
    this.filteredArtworks = this.artworkList?.data.filter(artwork => artwork.categoryDto?.name === categoryName) || [];
  }

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  toggleShowAllArtworks() {
    this.showAllArtworks = !this.showAllArtworks;
  }
}