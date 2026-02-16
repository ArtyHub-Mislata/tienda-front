import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CButton } from '../../ui/c-button/c-button';
import { HttpService } from '../../../services/http-service';
import { ArtworkModel } from '../../../models/ArtworkModel';
import { Chatbot } from "../chatbot/chatbot";

@Component({
  selector: 'artwork-page',
  imports: [RouterLink, CButton, Chatbot],
  templateUrl: './artwork-page.html',
  styleUrl: './artwork-page.scss',
})
export class ArtworkPage {
  artwork!: ArtworkModel;
  id!: string

  showToast: boolean = false;
  isHiding: boolean = false;
  isError: boolean = false;
  toastMessage: string = '';

  constructor(private route: ActivatedRoute, private httpService: HttpService){}

  ngOnInit(){
    this.route.paramMap.subscribe(
      paramMap => {
        this.id = paramMap.get('id')!
        if(this.id){
          this.loadArtwork(this.id)
        }
      }
      
    )
  }

  loadArtwork(id: string){
    this.httpService.getArtWorkById(id).subscribe({
      next: (artwork) => {
        this.artwork = artwork
      }, 
      error: (error) => {
        console.log(error)
      }
    })
  }

  addToCart(){
    this.httpService.addToCart(this.id).subscribe({
      next:(item) => {
        this.triggerToast("Obra añadida al carrito correctamente", false);
        console.log("item añadido " + item);
      }, 
      error: (err) => {
        this.triggerToast("Error al añadir la obra al carrito", true);
        console.log(err)
      }
    })
  }

  private triggerToast(message: string, error: boolean) {
    this.toastMessage = message;
    this.isError = error;
    this.showToast = true;
    this.isHiding = false;

    setTimeout(() => {
      this.isHiding = true;
      setTimeout(() => {
        this.showToast = false;
        this.isHiding = false;
      }, 500);
    }, 3000);
  }
}
