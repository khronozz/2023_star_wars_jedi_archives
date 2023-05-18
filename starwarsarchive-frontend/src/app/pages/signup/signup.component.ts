/**
 * Copyright 2023 Nicolas Favre
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * signup.component.ts
 * Component used to display the signup page
 *
 * @author Nicolas Favre
 * @date 18.05.2023
 * @version 1.0.0
 * @email khronozz-dev@proton.me
 * @userid khronozz
 */

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
  // Toggle password visibility
  hide: boolean = true;
  hideRepeat: boolean = true;
  // Data
  username: string = "";
  password: string = "";
  passwordRepeat: string = "";
  // Error message
  message: string | null = null;
  // Form for the signup
  formGroup: FormGroup = new FormGroup({});
  constructor(
    private authenticationService: AuthentificationService,
    private router: Router
  ) {
  }

  /**
   * Initialize the form
   */
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

  /**
   * Signup the user
   */
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
