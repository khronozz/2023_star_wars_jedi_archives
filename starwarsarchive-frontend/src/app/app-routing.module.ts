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
 * app-routing.module.ts
 * The routing module of the application
 *
 * @author Nicolas Favre
 * @date 18.05.2023
 * @version 1.0.0
 * @email khronozz-dev@proton.me
 * @userid khronozz
 */


import {NgModule} from '@angular/core';
import {Router, RouterModule, Routes} from '@angular/router';
import {AuthentificationService} from "./services/authentification.service";
import {OverviewComponent} from "./pages/overview/overview.component";
import {SigninComponent} from "./pages/signin/signin.component";
import {SignupComponent} from "./pages/signup/signup.component";

/**
 * The routes of the application
 */
const routes: Routes = [
  // Login / Signup
  {path: 'signin', component: SigninComponent, canActivate: [AuthentificationService.isLoggedOut]},
  {path: 'signup', component: SignupComponent, canActivate: [AuthentificationService.isLoggedOut]},

  // Overview
  {path: 'overview', component: OverviewComponent, canActivate: [AuthentificationService.isLoggedIn]},

  // Empty path redirect to signin or overview
  {path: '', component: OverviewComponent, canActivate: [AuthentificationService.isLoggedIn]},
  {path: '', component: SigninComponent, canActivate: [AuthentificationService.isLoggedOut]},

  // Default
  {path: '**', redirectTo: '/signin', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

  constructor(
    private router: Router
  ) {
    // Redirect to signin if not logged in
    if (AuthentificationService.isLoggedIn()) {
      this.router.navigate(['overview']);
    } else {
      this.router.navigate(['signin']);
    }

    //Redirect to overview if user access page and was already logged in
    this.router.events.subscribe((event:any) => {
      if (event.url === "/") {
        if (AuthentificationService.isLoggedIn()) {
          this.router.navigate(['overview']);
        } else {
          this.router.navigate(['signin']);
        }
      }
    })
  }
}
