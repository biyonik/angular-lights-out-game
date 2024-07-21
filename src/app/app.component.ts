import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import BoardComponent from './components/board.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BoardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = signal('Lights Out Game');

  constructor() { }
}
