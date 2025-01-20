import { Component } from '@angular/core';
import {ShepherdComponent} from "./shepherd/shepherd.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    ShepherdComponent
  ]
})
export class AppComponent {
  title = 'shepherd-tester';
}
