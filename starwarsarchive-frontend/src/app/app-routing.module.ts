import {NgModule} from '@angular/core';
import {Router, RouterModule, Routes} from '@angular/router';
import {AuthentificationService} from "./services/authentification.service";
import {OverviewComponent} from "./pages/overview/overview.component";
import {SigninComponent} from "./pages/signin/signin.component";
import {SignupComponent} from "./pages/signup/signup.component";

function getHomePage() {
  if (AuthentificationService.isLoggedIn()) {
    return OverviewComponent;
  }
  return SigninComponent;
}

const routes: Routes = [
  // Login / Signup
  {path: 'signin', component: SigninComponent, canActivate: [AuthentificationService.isLoggedOut]},
  {path: 'signup', component: SignupComponent, canActivate: [AuthentificationService.isLoggedOut]},

  // Overview
  {path: 'overview', component: OverviewComponent, canActivate: [AuthentificationService.isLoggedIn]},

  // Default
  {path: '**', redirectTo: '/signin', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(
    private router: Router,
    private authentificationService: AuthentificationService
  ) {
    console.log("AppRoutingModule constructor")
    if (AuthentificationService.isLoggedIn()) {
      this.router.navigate(['overview']);
    } else {
      this.router.navigate(['signin']);
    }

    this.router.events.subscribe((event: any) => {
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
