import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'nav-bar-component',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './NavBarComponent.html',
})
export class NavBarComponent {}
