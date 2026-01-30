import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { PageResponse } from '../../../models/PageResponseModel';
import { ArtworkModel } from '../../../models/ArtworkModel';
import { HttpService } from '../../../services/http-service';
import { Chatbot } from "../chatbot/chatbot";
import { RouterLink } from "@angular/router";
import { Observable } from 'rxjs';
import { CategoryModel } from '../../../models/CategoryModel';
import { CButton } from '../../ui/c-button/c-button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'artwork-list-page',
  imports: [Chatbot, RouterLink, CButton, FormsModule  ],
  templateUrl: './artwork-list-page.html',
  styleUrl: './artwork-list-page.scss',
})
export class ArtworkListPage implements AfterViewInit{
  artworkList?: PageResponse<ArtworkModel>;
  searchText: string = '';
  selectedCategoryName: string = 'Todas';


  categories!: CategoryModel[];

  isSidebarCollapsed = false;

  showAllArtworks = false;

  @ViewChild('infoSection') infoSection!: ElementRef;
  isInfoVisible = false;
  


  constructor(private httpService: HttpService){}





  ngAfterViewInit(): void {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.isInfoVisible = true;
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(this.infoSection.nativeElement);
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




  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  toggleShowAllArtworks() {
    this.showAllArtworks = !this.showAllArtworks;
  }



  selectedCategory(categoryName: string) {
    this.httpService.updateCategory(categoryName);
  }
  
  listenToCategoryChanges(){
    this.httpService.currentCategory$.subscribe(categoryName => {
      this.selectedCategoryName = categoryName;
    })
  }



   get filteredArtworks(): ArtworkModel[] {
    let results = this.artworkList?.data || [];

    if (this.selectedCategoryName !== 'Todas') {
      results = results.filter(a => a.categoryDto?.name === this.selectedCategoryName);
    }

    if (this.searchText) {
      const text = this.searchText.toLowerCase();
      results = results.filter(artwork =>
        artwork.id?.toString().includes(text) ||
        artwork.name?.toLowerCase().includes(text) ||
        artwork.description.toLowerCase().includes(text) ||
        artwork.price?.toString().includes(text) ||
        artwork.categoryDto.name.toLowerCase().includes(text) ||
        artwork.userDto.name.toLowerCase().includes(text)
      );
    }

    return results;
  }
}