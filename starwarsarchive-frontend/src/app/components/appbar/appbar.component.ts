import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {AuthentificationService} from "../../services/authentification.service";

@Component({
  selector: 'app-appbar',
  templateUrl: './appbar.component.html',
  styleUrls: ['./appbar.component.scss']
})
export class AppbarComponent {

  constructor(
    private router: Router,
  ) {
  }

  ngOnInit() {
  }

  logout() {
    AuthentificationService.logout();
    this.router.navigate(['/signin']);
  }
}
