import { Component, inject, type OnInit } from '@angular/core';
import { HeroSection } from '../../components/sections/HeroSection/HeroSection';
import { BestRunnersSections } from '../../components/sections/BestRunnersSections/BestRunnersSections';
import { MultiplayerSection } from '../../components/sections/multiplayerSection/multiplayerSection';
import { TextsService } from '../../services/texts.service';

@Component({
  selector: 'home-page',
  imports: [HeroSection, BestRunnersSections, MultiplayerSection],
  templateUrl: './HomePage.html',
})
export class HomePage implements OnInit {
  textService = inject(TextsService);

  ngOnInit(): void {
    this.textService.getRandomText().subscribe((text) => {
      console.log(text);
    });
  }
}
