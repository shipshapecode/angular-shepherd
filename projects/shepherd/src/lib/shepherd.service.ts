import { Injectable } from '@angular/core';
import Shepherd from 'shepherd.js';
import { elementIsHidden } from './utils/dom';
import { makeButton } from './utils/buttons';

@Injectable({
  providedIn: 'root'
})
export class ShepherdService {
  confirmCancel = false;
  confirmCancelMessage: string = null;
  defaultStepOptions: object = {};
  errorTitle = null;
  isActive = false;
  messageForUser: string = null;
  modal = false;
  requiredElements = [];
  steps = [];
  tourName = undefined;
  tourObject: Shepherd.Tour = null;

  constructor() {
  }

  /**
   * Get the tour object and call back
   */
  back() {
    this.tourObject.back();
  }

  /**
   * Cancel the tour
   */
  cancel() {
    this.tourObject.cancel();
  }

  /**
   * Complete the tour
   */
  complete() {
    this.tourObject.complete();
  }

  /**
   * Hides the current step
   */
  hide() {
    this.tourObject.hide();
  }

  /**
   * Advance the tour to the next step
   */
  next() {
    this.tourObject.next();
  }

  /**
   * Show a specific step, by passing its id
   * @param id The id of the step you want to show
   */
  show(id) {
    this.tourObject.show(id);
  }

  /**
   * Start the tour
   */
  start() {
    this.isActive = true;
    this.tourObject.start();
  }

  /**
   * This function is called when a tour is completed or cancelled to initiate cleanup.
   * @param completeOrCancel 'complete' or 'cancel'
   */
  onTourFinish(completeOrCancel: string) {
    this.isActive = false;
  }

  /**
   * Take a set of steps and create a tour object based on the current configuration
   * @param steps An array of steps
   */
  addSteps(steps: Array<any>) {
    this._initialize();
    const tour = this.tourObject;

    // Return nothing if there are no steps
    if (!steps || !Array.isArray(steps) || steps.length === 0) {
      return;
    }

    if (!this.requiredElementsPresent()) {
      tour.addStep({
        buttons: [{
          text: 'Exit',
          action: tour.cancel
        }],
        id: 'error',
        title: this.errorTitle,
        text: [this.messageForUser]
      });
      return;
    }

    steps.forEach((step) => {
      if (step.buttons) {
        step.buttons = step.buttons.map(makeButton.bind(this), this);
      }

      tour.addStep(step);
    });
  }

  /**
   * Observes the array of requiredElements, which are the elements that must be present at the start of the tour,
   * and determines if they exist, and are visible, if either is false, it will stop the tour from executing.
   */
  private requiredElementsPresent() {
    let allElementsPresent = true;

    /* istanbul ignore next: also can't test this due to things attached to root blowing up tests */
    this.requiredElements.forEach((element) => {
      const selectedElement = document.querySelector(element.selector);

      if (allElementsPresent && (!selectedElement || elementIsHidden(selectedElement))) {
        allElementsPresent = false;
        this.errorTitle = element.title;
        this.messageForUser = element.message;
      }
    });

    return allElementsPresent;
  }

  /**
   * Initializes the tour, creates a new Shepherd.Tour. sets options, and binds events
   */
  private _initialize() {
    const tourObject = new Shepherd.Tour({
      confirmCancel: this.confirmCancel,
      confirmCancelMessage: this.confirmCancelMessage,
      defaultStepOptions: this.defaultStepOptions,
      tourName: this.tourName,
      useModalOverlay: this.modal
    });

    tourObject.on('complete', this.onTourFinish.bind(this, 'complete'));
    tourObject.on('cancel', this.onTourFinish.bind(this, 'cancel'));

    this.tourObject = tourObject;
  }
}
