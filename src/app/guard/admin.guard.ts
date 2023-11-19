import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const currentUser = JSON.parse(localStorage.getItem('auth')!);
    if (!currentUser) {
      this.router.navigate(['/login']);
      return false;
    }
    if (currentUser.role == 'admin') {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
