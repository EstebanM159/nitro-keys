import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from '../../components/NavBarComponent/NavBarComponent';
import { FooterSection } from '../../components/sections/footer-section/footer-section';

@Component({
  selector: 'home-layout',
  imports: [RouterOutlet, NavBarComponent, FooterSection],
  templateUrl: './HomeLayout.html',
})
export class HomeLayout {}
