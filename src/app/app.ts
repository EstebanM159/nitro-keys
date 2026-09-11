import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeLayout } from './layout/HomeLayout/HomeLayout';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HomeLayout],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('nitro-keys');
}
