import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthentificationService} from "../../services/authentification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  hide: boolean = true;
  hideRepeat: boolean = true;
  username: string = "";
  password: string = "";
  passwordRepeat: string = "";
  // Error message
  message: string | null = null;
  formGroup: FormGroup = new FormGroup({});

  constructor(
    private authenticationService: AuthentificationService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.formGroup = new FormGroup({
      username: new FormControl(this.username, [
        Validators.required
      ]),
      password: new FormControl(this.password, [
        Validators.required
      ]),
      passwordRepeat: new FormControl(this.passwordRepeat, [
        Validators.required,
        Validators.pattern(this.password),
      ])
    });
  }

  signup() {
    this.authenticationService.signup(this.username, this.password, this.passwordRepeat).subscribe((result) => {
      if (!result) {
        this.message = "Username or password invalid (either contains invalid characters or is already taken)";
      } else {
        this.message = null
        this.router.navigate(['/signin']);
      }
    })
  }
}
