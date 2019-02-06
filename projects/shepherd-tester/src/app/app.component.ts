import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.css',
    '../../../../node_modules/shepherd.js/dist/css/shepherd-theme-default.css'
  ]
})
export class AppComponent {
  title = 'shepherd-tester';
}
