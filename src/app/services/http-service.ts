import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { PageResponse } from '../models/PageResponseModel';
import { ArtworkModel } from '../models/ArtworkModel';
import { CategoryModel } from '../models/CategoryModel';
import { UserModel } from '../models/UserModel';
import { CredentialModel } from '../models/CredentialModel';
import { catchError, map, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { UserRegisterRequest } from '../models/UserRegisterRequest';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  categorySelected = new BehaviorSubject<string>('Todas');
  currentCategory$ = this.categorySelected.asObservable();

  private url = 'http://store-artyhub.producciondaw.cip.fpmislata.com/api';

  constructor(
    private httpClient: HttpClient,
    private router: Router,
  ) {}

  //CRUD ARTWORKS

  getArtworksByCategoryId(id: string): Observable<PageResponse<ArtworkModel>> {
    return this.httpClient.get<PageResponse<ArtworkModel>>(`${this.url}/categories/${id}/artworks`);
  }

  getAllArtworks(): Observable<PageResponse<ArtworkModel>> {
    return this.httpClient.get<PageResponse<ArtworkModel>>(`${this.url}/artworks?page=1&size=10`);
  }

  getArtWorkById(id: string): Observable<ArtworkModel> {
    return this.httpClient.get<ArtworkModel>(`${this.url}/artworks/${id}`);
  }

  getAllArtworksOfUser(id: string): Observable<PageResponse<ArtworkModel>> {
    return this.httpClient.get<PageResponse<ArtworkModel>>(`${this.url}/users/${id}/artworks`);
  }

  //CRUD CATEGORIAS

  getAllCategories(): Observable<PageResponse<CategoryModel>> {
    return this.httpClient.get<PageResponse<CategoryModel>>(
      `${this.url}/categories?page=1&size=10`,
    );
  }

  getCategoryById(id: string): Observable<CategoryModel> {
    return this.httpClient.get<CategoryModel>(`${this.url}/categories/${id}`);
  }

  updateCategory(categoryName: string) {
    this.categorySelected.next(categoryName);
  }

  //CRUD LOGIN

  private loggedSubject = new BehaviorSubject<boolean>(false);
  isLogged$ = this.loggedSubject.asObservable();

  login(credential: CredentialModel): Observable<{ token: string }> {
    return this.httpClient.post<{ token: string }>(`${this.url}/users/login`, credential).pipe(
      map((resp) => {
        console.log(resp);

        localStorage.setItem('token', resp.token);
        this.loggedSubject.next(true);
        return resp;
      }),
    );
  }

  logout(): Observable<void> {
    return this.httpClient.delete<void>(`${this.url}/users/logout`).pipe(
      map(() => {
        console.log('SE ESTA LOGOUTEANDO DE VERAS');
        localStorage.removeItem('token');
        this.loggedSubject.next(false);
        this.router.navigate(['/login']);
      }),
    );
  }

  register(user: UserRegisterRequest): Observable<UserModel> {
    return this.httpClient.post<UserModel>(`${this.url}/users/register`, user);
  }

  isLogged(): Observable<boolean> {
    return this.httpClient.get<boolean>(`${this.url}/users/islogged`).pipe(
      tap((isLogged) => {
        this.loggedSubject.next(isLogged);
      }),
      catchError(() => {
        this.loggedSubject.next(false);
        return of(false);
      }),
    );
  }

  getUser(): Observable<UserModel | null> {
    return this.httpClient.get<UserModel | null>(`${this.url}/users/logged`);
  }
  getUserById(id: string): Observable<UserModel | null> {
    return this.httpClient.get<UserModel | null>(`${this.url}/users/${id}`);
  }
}
