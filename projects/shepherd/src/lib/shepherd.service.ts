import { Injectable, OnDestroy } from '@angular/core';
import disableScroll from 'disable-scroll';
import Shepherd from 'shepherd.js';
import { elementIsHidden } from './utils/dom';
import { makeButton } from './utils/buttons';
import { normalizeAttachTo } from './utils/attachTo';

@Injectable({
  providedIn: 'root'
})
export class ShepherdService implements OnDestroy {
  confirmCancel = false;
  confirmCancelMessage: string = null;
  defaultStepOptions: object = {};
  disableScroll = false;
  errorTitle = null;
  isActive = false;
  messageForUser: string = null;
  modal = false;
  requiredElements = [];
  steps = [];
  tourName = undefined;
  tourObject: Shepherd = null;

  constructor() {
  }

  ngOnDestroy() {
    this._cleanup();
  }

  /**
   * Get the tour object and call back
   * @public
   */
  back() {
    this.tourObject.back();
    // this.trigger('back');
  }

  /**
   * Cancel the tour
   * @public
   */
  cancel() {
    this.tourObject.cancel();
  }

  /**
   * Complete the tour
   * @public
   */
  complete() {
    this.tourObject.complete();
  }

  /**
   * Hides the current step
   * @public
   */
  hide() {
    this.tourObject.hide();
  }

  /**
   * Advance the tour to the next step and trigger next
   * @public
   */
  next() {
    this.tourObject.next();
    // this.trigger('next');
  }

  /**
   * Show a specific step, by passing its id
   * @param id The id of the step you want to show
   * @public
   */
  show(id) {
    this.tourObject.show(id);
  }

  /**
   * Start the tour
   * @public
   */
  start() {
    this.isActive = true;
    this.tourObject.start();
  }

  /**
   * When the tour starts, setup the step event listeners, and disableScroll
   */
  onTourStart() {
    if (this.disableScroll) {
      disableScroll.on(window);
    }

    // this.trigger('start');
  }

  /**
   * This function is called when a tour is completed or cancelled to initiate cleanup.
   * @param {string} completeOrCancel 'complete' or 'cancel'
   */
  onTourFinish(completeOrCancel) {
    this.isActive = false;
    this._cleanup();
    // this.trigger(completeOrCancel);
  }

  /**
   * Cleanup disableScroll
   * @private
   */
  _cleanup() {
    if (this.disableScroll) {
      disableScroll.off(window);
    }
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

          setTimeout(() => {
            if (this.disableScroll) {
              disableScroll.on(window);
            }
          }, 50);
        };
      }
    });
  }

  /**
   * Observes the array of requiredElements, which are the elements that must be present at the start of the tour,
   * and determines if they exist, and are visible, if either is false, it will stop the tour from executing.
   * @private
   */
  requiredElementsPresent() {
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
   * @private
   */
  _initialize() {
    const tourObject = new Shepherd.Tour({
      confirmCancel: this.confirmCancel,
      confirmCancelMessage: this.confirmCancelMessage,
      defaultStepOptions: this.defaultStepOptions,
      tourName: this.tourName,
      useModalOverlay: this.modal
    });

    // TODO: Figure out events and triggering them
    // tourObject.on('start', bind(this, 'onTourStart'));
    // tourObject.on('complete', bind(this, 'onTourFinish', 'complete'));
    // tourObject.on('cancel', bind(this, 'onTourFinish', 'cancel'));

    this.tourObject = tourObject;
  }
}
