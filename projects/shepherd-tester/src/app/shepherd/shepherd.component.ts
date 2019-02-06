import { Component, AfterViewInit } from '@angular/core';
import { ShepherdService } from '../../../../shepherd/src/lib/shepherd.service';
import { steps as defaultSteps, defaultStepOptions} from '../data';

@Component({
  selector: 'shepherd',
  templateUrl: './shepherd.component.html',
  styleUrls: ['./shepherd.component.css']
})
export class ShepherdComponent implements AfterViewInit {

  constructor(private shepherdService: ShepherdService) { }

  ngAfterViewInit() {
    this.shepherdService.defaultStepOptions = defaultStepOptions;
    this.shepherdService.disableScroll = true;
    this.shepherdService.modal = true;
    this.shepherdService.confirmCancel = false;
    this.shepherdService.addSteps(defaultSteps);
    this.shepherdService.start();
  }
}
