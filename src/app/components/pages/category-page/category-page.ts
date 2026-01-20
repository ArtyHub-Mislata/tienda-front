import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'category-page',
  imports: [RouterLink],
  templateUrl: './category-page.html',
  styleUrl: './category-page.scss',
})
export class CategoryPage {
  category!: CategoryModel;

  constructor(private route: ActivatedRoute, private httpService: HttpService){}
  
  ngOnInit(){
    this.route.paramMap.subscribe(
      paramMap => {
        const id = paramMap.get('id')
        if(id){
          this.loadCategory(id)
        }
      }
    )
  }

  loadCategory(id:string){
    this.httpService.getCategoryId(id).subscribe({
      next: (category) => {
        this.category = category
      }, 
      error: (error) => {
        console.log(error)
      }
    })
  }
}
