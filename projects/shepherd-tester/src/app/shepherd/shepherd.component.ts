import { Component, inject, type AfterViewInit } from '@angular/core';
import { ShepherdService } from '../../../../shepherd/src/lib/shepherd.service';
import { steps as defaultSteps, defaultStepOptions } from '../data';

@Component({
  selector: 'app-shepherd',
  templateUrl: './shepherd.component.html',
  styleUrls: ['./shepherd.component.css'],
  standalone: true
})
export class ShepherdComponent implements AfterViewInit {
  private shepherdService = inject(ShepherdService);

  ngAfterViewInit() {
    this.shepherdService.defaultStepOptions = defaultStepOptions;
    this.shepherdService.modal = true;
    this.shepherdService.confirmCancel = false;
    this.shepherdService.addSteps(defaultSteps);
    this.shepherdService.start();
  }
}
