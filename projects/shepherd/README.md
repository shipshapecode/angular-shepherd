# angular-shepherd

<a href="https://shipshape.io/"><img src="http://i.imgur.com/DWHQjA5.png" alt="Ship Shape" width="100" height="100"/></a>

**[angular-shepherd is built and maintained by Ship Shape. Contact us for web app consulting, development, and training for your project](https://shipshape.io/)**.

[![npm version](https://badge.fury.io/js/angular-shepherd.svg)](http://badge.fury.io/js/angular-shepherd)
![Download count all time](https://img.shields.io/npm/dt/angular-shepherd.svg)
[![npm](https://img.shields.io/npm/dm/angular-shepherd.svg)]()
[![Build Status](https://travis-ci.org/shipshapecode/angular-shepherd.svg)](https://travis-ci.org/shipshapecode/angular-shepherd)
[![Code Climate](https://codeclimate.com/github/shipshapecode/angular-shepherd/badges/gpa.svg)](https://codeclimate.com/github/shipshapecode/angular-shepherd)
[![Test Coverage](https://codeclimate.com/github/shipshapecode/angular-shepherd/badges/coverage.svg)](https://codeclimate.com/github/shipshapecode/angular-shepherd/coverage)
[![Greenkeeper badge](https://badges.greenkeeper.io/shipshapecode/angular-shepherd.svg)](https://greenkeeper.io/)

This is an Angular wrapper for the [Shepherd](https://github.com/shipshapecode/shepherd), site tour, library. 
It provides additional functionality, on top of Shepherd, as well.

## Installation

```bash
npm install angular-shepherd --save
```

## Usage

**NOTE: This may not be the proper Angular way to do everything, as I am not
an Angular dev, so please let me know if you have suggestions!**

First, you will want to include the Shepherd styles in your application component template.
To import from `node_modules`, you will need to use `ViewEncapsulation.None` and add the
`node_modules` relative path to your `styleUrls`.

```typescript
// app.component.ts

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
```

Then, you will need to inject the `ShepherdService` to be able to interact with Shepherd and 
call `addSteps` to add your steps, `start` to start the tour, etc.

You could either do this at the application level, in your application component
or on a per component or per route/view basis.

In that component you will want to use `AfterViewInit` to `addSteps` to the Shepherd service.

```typescript
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
```

## Configuration

The following configuration options can be set on the ShepherdService to control the way that Shepherd is used. 
**The only required option is `steps`, which is set via `addSteps`.**

### confirmCancel

`confirmCancel` is a boolean flag, when set to `true` it will pop up a native browser
confirm window on cancel, to ensure you want to cancel.

### confirmCancelMessage

`confirmCancelMessage` is a string to display in the confirm dialog when `confirmCancel`
is set to true.

### defaultStepOptions

`defaultStepOptions` is used to set the options that will be applied to each step by default.
You can pass in any of the options that you can with Shepherd.

**⚠️ You must set `defaultStepOptions` *BEFORE* calling `addSteps` to set the steps.**

It will be an object of a form something like:

```js
this.shepherdService.defaultStepOptions = {
  classes: 'custom-class-name-1 custom-class-name-2',
  scrollTo: false,
  showCancelLink: true
};
```

> **default value:** `{}`


### requiredElements

`requiredElements` is an array of objects that indicate DOM elements that are **REQUIRED** by your tour and must
exist and be visible for the tour to start. If any elements are not present, it will keep the tour from starting.

You can also specify a message, which will tell the user what they need to do to make the tour work.

**⚠️ You must set `requiredElements` *BEFORE* calling `addSteps` to set the steps.**

_Example_
```js
this.shepherdService.requiredElements = [
  {
    selector: '.search-result-element',
    message: 'No search results found. Please execute another search, and try to start the tour again.',
    title: 'No results'
  },
  {
    selector: '.username-element',
    message: 'User not logged in, please log in to start this tour.',
    title: 'Please login'
  },
];
```

> **default value:** `[]`


### disableScroll

`disableScroll` is a boolean, that when set to true, will keep the user from scrolling with the scrollbar,
mousewheel, arrow keys, etc. You may want to use this to ensure you are driving the scroll position with the tour.

> **default value:** `false`

### modal

`modal` is a boolean, that should be set to true, if you would like the rest of the screen, other than the current element, 
greyed out, and the current element highlighted. If you do not need modal functionality, you can remove this option or set it to false.

> **default value:** `false`

### addSteps

You must pass an array of steps to `addSteps`, something like this:

```js
this.shepherdService.addSteps([
  {
    id: 'intro',
    options: {
      attachTo: '.first-element bottom',
      beforeShowPromise: function() {
        return new Promise(function(resolve) {
          setTimeout(function() {
            window.scrollTo(0, 0);
            resolve();
          }, 500);
        });
      },
      buttons: [
        {
          classes: 'shepherd-button-secondary',
          text: 'Exit',
          type: 'cancel'
        },
        {
          classes: 'shepherd-button-primary',
          text: 'Back',
          type: 'back'
        },
        {
          classes: 'shepherd-button-primary',
          text: 'Next',
          type: 'next'
        }
      ],
      classes: 'custom-class-name-1 custom-class-name-2',
      highlightClass: 'highlight',
      scrollTo: false,
      showCancelLink: true,
      title: 'Welcome to Angular-Shepherd!',
      text: ['Angular-Shepherd is a JavaScript library for guiding users through your Angular app.'],
      when: {
        show: () => {
          console.log('show step');
        },
        hide: () => {
          console.log('hide step');
        }
      }
    }
  },
  ...
]);
```

A lot of the options are the same as Shepherd options, but I will go through each of them for reference.


#### id

The name to give this step of the tour


#### options

An object with all of the options for the step


##### attachTo

The selector and position for the tour popup to attach to, of the format 'selector position'. 
Position options are: top, bottom, left, and right. Can also be an object formatted like

```js
{
  element: '.myElement',
  on: 'top'
}
```

Where `.myElement` is any valid jQuery selector.

> **default value:** `''`


##### beforeShowPromise

A function that returns a promise. When the promise resolves, the rest of the `show` code for the step will execute. 

> **default value:** `null`


##### buttons

There are some standard button types supported by angular-shepherd. Just set `type` to `'next'`, `'back'`, or `'cancel'`, 
then set the `text` and `classes` as normal. These will automatically be bound to the Shepherd functions. If 
no type is passed, a normal Shepherd button will be created.

##### classes

Extra classes to apply to the step, for styling purposes and such.

> **default value:** `''`


#### canClickTarget

Whether or not the target element being attached to should be "clickable". If set to `false`, Angular Shepherd 
sets the element's [`pointerEvents` style](https://developer.mozilla.org/en-US/docs/Web/CSS/pointer-events) to 
`none` while the step is active.

> **default value:** `true`


##### highlightClass

This is an extra class to apply to the attachTo element when it is highlighted (that is, when its step is active). 
It can be any string. Just style that class name in your CSS.

> **default value:** ``


##### scrollTo

This sets whether or not the screen should be scrolled to get to the element when the step becomes active.

> **default value:** `false`


##### scrollToHandler

For custom scrolling actions, pass a function to this option. For example:

```js

  let scrollHandler = (el) => {
    let winHeight = $(window).height();
    // Target vertical middle scroll position
    let targetPos = ($(el).offset().top + $(el).position().top) - (winHeight / 2);
    // Animate scrolling with Velocity.js, for example.
    $('#main-scroll-container').velocity({ top: targetPos }, 1000, "swing");
  };

  let steps = [
    {id: 'intro',
     options: {
        attachTo: '#first-item left',
        title: 'Welcome!',
        text: ["Have we met before?"],
        scrollTo: true,
        scrollToHandler: scrollHandler
      }
    }
  ];
```

> **default value:** `null`


##### showCancelLink

When true, an x will appear in the top right of the popup, for canceling the tour.

> **default value:** `false`


##### title

The step's title. It becomes an h3 at the top of the step.

> **default value:** `''`


##### tippyOptions

Extra options to pass to [Tippy](https://atomiks.github.io/tippyjs/#all-options).

> **default value:** `null`


##### text

The text content to display in the tour popup. Can be:
+ a string
+ an array of strings
+ an HTML element
+ a function returning any of the above

Currently does ***not*** accept htmlbars input (PR welcome).

> **default value:** `null`


##### when

An object containing functions to be executed when events occur on the step.  
Supported events are `before-show`, `show`, `before-hide`, `hide`, `complete`, `cancel`, and `destroy`.

```js
  when: {
    show: function() {
      window.scrollTo(0, 0);
    }
  }
```

> **default value:** `null`
