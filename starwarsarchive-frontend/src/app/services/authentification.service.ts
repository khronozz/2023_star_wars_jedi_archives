import {Injectable} from '@angular/core';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  constructor() {
  }

  private users: any[] = [
    {
      "username": "test",
      "password": "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08"
    },
  ];

  public signup(username: string, password: string, passwordRepeat: string): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      let credentialsOk = true;
      // Check if password and passwordRepeat are equal
      if (password != passwordRepeat) {
        credentialsOk = false;
      }
      // Check if username is already taken
      for (let user of this.users) {
        if (user.username == username) {
          credentialsOk = false;
          break;
        }
      }
      // Check if username does not contain special characters
      if (!username.match(/^[a-zA-Z0-9_]+$/)) {
        credentialsOk = false;
      }
      // Check if password and username are not empty
      if (password.length < 1 || username.length < 1) {
        credentialsOk = false;
      }
      if (!credentialsOk) {
        observer.next(credentialsOk);
        observer.complete();
        return;
      }
      // Hash password
      let encoder = new TextEncoder();
      let pass = encoder.encode(password);
      let digest = crypto.subtle.digest('SHA-256', pass);
      digest.then((hash) => {
        let hashArray = Array.from(new Uint8Array(hash));
        let hashedPassword = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
        this.users.push({
          username: username,
          password: hashedPassword
        });
        observer.next(credentialsOk);
        observer.complete();
      })
    })
  }

  public login(username: string, password: string): Observable<boolean> {
    if (AuthentificationService.isLoggedIn()) {
      return new Observable<boolean>(subscriber => {
        subscriber.next(true);
        subscriber.complete();
      });
    }

    return new Observable<boolean>((observer) => {
      // Hash password
      let encoder = new TextEncoder();
      let pass = encoder.encode(password);
      let digest = crypto.subtle.digest('SHA-256', pass);
      digest.then((hash) => {
        // Convert the ArrayBuffer to hexadecimal string
        let hashArray = Array.from(new Uint8Array(hash));
        let hashedPassword = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
        // Check if user exists
        // Default behaviour: username and password are not correct
        let userExists: boolean = false;
        for (let user of this.users) {
          if (user.username === username && user.password === hashedPassword) {
            localStorage.setItem('USER', username);
            localStorage.setItem('PASS', hashedPassword);
            userExists = true;
          }
        }
        observer.next(userExists);
        observer.complete();
      })
    })
  }

  public static isLoggedIn(): boolean {
    return localStorage.getItem('USER') != null && localStorage.getItem('PASS') != null;
  }

  public static isLoggedOut(): boolean {
    return !AuthentificationService.isLoggedIn();
  }

  public static logout(): void {
    localStorage.removeItem('USER');
    localStorage.removeItem('PASS');
  }
}
