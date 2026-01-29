import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { HttpService } from '../services/http-service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

export const loginGuardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const httpService = inject(HttpService)

  return httpService.isLogged().pipe(
    map(user => {
      if (user) {
        console.log(user)
        return true;
      }
      alert("Necesitas iniciar sesión para acceder a esta página");
      router.navigate(['/login']);
      return false;
  })
  );
};
