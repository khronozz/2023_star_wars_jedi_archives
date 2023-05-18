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
 * signin.component.ts
 * Component used to display the signin page
 *
 * @author Nicolas Favre
 * @date 18.05.2023
 * @version 1.0.0
 * @email khronozz-dev@proton.me
 * @userid khronozz
 */

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
