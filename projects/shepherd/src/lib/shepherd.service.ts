import { Injectable } from '@angular/core';
import Shepherd from 'shepherd.js';
import { elementIsHidden } from 'utils/dom';
import { normalizeAttachTo } from 'utils/attachTo';

@Injectable({
  providedIn: 'root'
})
export class ShepherdService {

  tourObject: object = null;

  constructor() {
    this._initialize();
    console.log(this.tourObject);
  }

  /**
   * Take a set of steps and create a tour object based on the current configuration
   * @param {Array} steps An array of steps
   * @private
   */
  addSteps(steps) {
    this._initialize();
    const tour = this.tourObject;

    // Return nothing if there are no steps
    if (!steps || !Array.isArray(steps) || steps.length === 0) {
      return;
    }
    /* istanbul ignore next: also can't test this due to things attached to root blowing up tests */
    if (!this.requiredElementsPresent()) {
      tour.addStep('error', {
        buttons: [{
          text: 'Exit',
          action: tour.cancel
        }],
        title: this.errorTitle,
        text: [this.messageForUser]
      });
      return;
    }

    steps.forEach((step, index) => {
      const { id, options } = step;

      if (options.buttons) {
        options.buttons = options.buttons.map(makeButton.bind(this), this);
      }

      options.attachTo = normalizeAttachTo(options.attachTo);
      tour.addStep(id, options);

      // Step up events for the current step
      const currentStep = tour.steps[index];

      if (!currentStep.options.scrollToHandler) {
        currentStep.options.scrollToHandler = (elem) => {
          // Allow scrolling so scrollTo works.
          disableScroll.off(window);

          if (typeof elem !== 'undefined') {
            elem.scrollIntoView();
          }

          later(() => {
            if (get(this, 'disableScroll')) {
              disableScroll.on(window);
            }
          }, 50);
        };
      }
    });
  }

  /**
   * Initializes the tour, creates a new Shepherd.Tour. sets options, and binds events
   * @private
   */
  _initialize() {
    const tourObject = new Shepherd.Tour({
      confirmCancel: true,
      confirmCancelMessage: 'Test',
      tourName: 'Test Tour Name',
      useModalOverlay: true
    });

    this.tourObject = tourObject;
  }
}
