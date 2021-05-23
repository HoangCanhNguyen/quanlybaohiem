import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Auth } from '../models/auth.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authListener = new BehaviorSubject<boolean>(false);

  constructor(private api: ApiService, private router: Router) {}


  login(admin: Auth) {
    return this.api.post('/user/login', admin).pipe(
      map((res: any) => {
        this.authListener.next(true);
        this.setAuth(res.user.token);
        this.router.navigate(['quan-ly']);
      })
    );
  }

  logout(): void {
    this.clearAuth();
    this.authListener.next(false);
    this.router.navigate(['trang-chu']);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getAuthListener(): Observable<boolean> {
    return this.authListener.asObservable();
  }

  private setAuth(token: string): void {
    localStorage.setItem('token', token);
  }

  private clearAuth(): void {
    localStorage.clear();
  }
}
