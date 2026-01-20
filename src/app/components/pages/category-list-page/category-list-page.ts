import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CButton } from '../../ui/c-button/c-button';

@Component({
  selector: 'category-list-page',
  imports: [RouterLink, CButton],
  templateUrl: './category-list-page.html',
  styleUrl: './category-list-page.scss',
})
export class CategoryListPage {
  categories!: CategoryModel[];
  constructor(private route: ActivatedRoute, private httpService: HttpService, private router :Router){}

  ngOnInit(){
    this.loadCategories();
  }
  loadCategories(){
    this.httpService.getAllCategories().subscribe({
      next: (categoriesPage) => {
        this.categories = categoriesPage.data
      }, 
      error: (error) => {
        console.log(error)
      }
    })
  }
}
