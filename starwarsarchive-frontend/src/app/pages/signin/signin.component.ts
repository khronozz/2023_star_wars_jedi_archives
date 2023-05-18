import {Component} from '@angular/core';
import {AuthentificationService} from "../../services/authentification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {
  constructor(
    private authenticationService: AuthentificationService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  // Toggle for the password visibility
  hide: boolean = true;

  // User data
  username: string = "";
  password: string = "";

  // Error message
  message: string | null = null;

  // Check if the username and password are not empty
  formOk() {
    return this.username.length > 0 && this.password.length > 0;
  }

  // Login function
  signIn() {
    this.authenticationService.login(this.username, this.password).subscribe((result) => {
      if (!result) {
        this.message = "Username or password incorrect";
      } else {
        this.router.navigate(['/overview']);
      }
    })
  }

}
