import { Component } from '@angular/core';
import { HeroSection } from '../../components/sections/HeroSection/HeroSection';
import { BestRunnersSections } from '../../components/sections/BestRunnersSections/BestRunnersSections';
import { MultiplayerSection } from '../../components/sections/multiplayerSection/multiplayerSection';

@Component({
  selector: 'home-page',
  imports: [HeroSection, BestRunnersSections, MultiplayerSection],
  templateUrl: './HomePage.html',
})
export class HomePage {}
