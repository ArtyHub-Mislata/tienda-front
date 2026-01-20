import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CButton } from '../../ui/c-button/c-button';
import { HttpService } from '../../../services/http-service';
import { ArtworkModel } from '../../../models/ArtworkModel';

@Component({
  selector: 'artwork-page',
  imports: [RouterLink, CButton],
  templateUrl: './artwork-page.html',
  styleUrl: './artwork-page.scss',
})
export class ArtworkPage {
  artwork!: ArtworkModel;
  
  constructor(private route: ActivatedRoute, private httpService: HttpService){}

  ngOnInit(){
    this.route.paramMap.subscribe(
      paramMap => {
        const id = paramMap.get('id')!
        if(id){
          this.loadArtwork(id)
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
}
