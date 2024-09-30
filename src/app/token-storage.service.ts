import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})

export class TokenStorageService {
  private sessionStorage: Storage | null;

  constructor(@Inject(DOCUMENT) private document: Document) {
    // Access the sessionStorage safely by using the injected document
    this.sessionStorage = this.document.defaultView?.sessionStorage ?? null;
  }

  signOut(): void {
    if (this.sessionStorage) {
      this.sessionStorage.clear();
    }
  }

  public saveToken(token: string): void {
    if (this.sessionStorage) {
      this.sessionStorage.removeItem(TOKEN_KEY);
      this.sessionStorage.setItem(TOKEN_KEY, token);
    }
  }

  public getToken(): string | null {
    if (this.sessionStorage) {
      return this.sessionStorage.getItem(TOKEN_KEY);
    }
    return null;
  }

  public saveUser(user: any): void {
    if (this.sessionStorage) {
      this.sessionStorage.removeItem(USER_KEY);
      this.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    }
  }

  public getUser(): any {
    if (this.sessionStorage) {
      const user = this.sessionStorage.getItem(USER_KEY);
      if (user) {
        return JSON.parse(user);
      }
    }
    return {};
  }
}
