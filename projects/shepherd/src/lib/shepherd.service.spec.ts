import { TestBed } from '@angular/core/testing';

import { ShepherdService } from './shepherd.service';

export const builtInButtons = {
  cancel: {
    classes: 'cancel-button',
    secondary: true,
    text: 'Exit',
    type: 'cancel'
  },
  next: {
    classes: 'next-button',
    text: 'Next',
    type: 'next'
  },
  back: {
    classes: 'back-button',
    text: 'Back',
    type: 'back'
  }
};

const steps = [
  {
    id: 'intro',
    options: {
      attachTo: {
        element: '.test-element',
        on: 'bottom'
      },
      buttons: [
        builtInButtons.cancel,
        builtInButtons.next
      ],
      classes: 'custom-class-name-1 custom-class-name-2',
      title: 'Welcome to Ember-Shepherd!',
      text: 'Test text',
      scrollTo: true,
      scrollToHandler() {
        return 'custom scrollToHandler';
      }
    }
  }
];

describe('ShepherdService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('starts the tour when the `start` event is triggered', () => {
    const service: ShepherdService = TestBed.get(ShepherdService);
    const mockTourObject = {
      start() {
        expect(true).toBeTruthy('The tour was started');
      }
    }

    service.steps = steps;

    // @ts-ignore: Tests do not need all methods
    service.tourObject = mockTourObject;

    service.start();
  });

  it('passes through a custom scrollToHandler option', () => {
    const service: ShepherdService = TestBed.get(ShepherdService);
    const mockTourObject = {
      start() {
        expect(steps[0].options.scrollToHandler()).toBe('custom scrollToHandler', 'The handler was passed through as an option on the step');
      }
    };

    service.steps = steps;

    // @ts-ignore: Tests do not need all methods
    service.tourObject = mockTourObject;

    service.start();
  });
});
