// Entry point copied over src/main.ts of a fresh `ng new` app by check.sh.
// It starts a one-step tour so the check can assert that Shepherd rendered.
import { AfterViewInit, Component, inject } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { ShepherdService } from 'angular-shepherd';

@Component({
  selector: 'app-root',
  standalone: true,
  template: '<h1 class="first">angular-shepherd compat</h1>'
})
class AppComponent implements AfterViewInit {
  private shepherdService = inject(ShepherdService);

  ngAfterViewInit() {
    this.shepherdService.modal = true;
    this.shepherdService.addSteps([
      {
        id: 'compat',
        title: 'Compat step',
        text: 'Rendered by angular-shepherd',
        attachTo: { element: '.first', on: 'bottom' }
      }
    ]);
    this.shepherdService.start();
  }
}

bootstrapApplication(AppComponent).catch((err) => console.error(err));
