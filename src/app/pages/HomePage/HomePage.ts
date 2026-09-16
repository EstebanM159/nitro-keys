import { Component } from '@angular/core';
import { HeroSection } from '../../components/sections/HeroSection/HeroSection';
import { MultiplayerSection } from '../../components/sections/multiplayerSection/multiplayerSection';
import { BestPlayersSections } from '../../components/sections/BestPlayersSections/BestPlayersSections';

@Component({
  selector: 'home-page',
  imports: [HeroSection, BestPlayersSections, MultiplayerSection],
  templateUrl: './HomePage.html',
})
export default class HomePage {}
