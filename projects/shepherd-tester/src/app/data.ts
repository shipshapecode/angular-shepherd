export const builtInButtons = {
  cancel: {
    classes: 'shepherd-button-secondary cancel-button',
    text: 'Exit',
    type: 'cancel'
  },
  next: {
    classes: 'shepherd-button-primary next-button',
    text: 'Next',
    type: 'next'
  },
  back: {
    classes: 'shepherd-button-primary back-button',
    text: 'Back',
    type: 'back'
  }
};

export const defaultStepOptions = {
  classes: 'shepherd-theme-arrows custom-default-class',
  scrollTo: true,
  showCancelLink: true,

  tippyOptions: {
    duration: 500,
  },
};

export const steps = [
  {
    id: 'intro',
    options: {
      attachTo: '.first-element bottom',
      buttons: [
        builtInButtons.cancel,
        builtInButtons.next,
      ],
      classes: 'custom-class-name-1 custom-class-name-2',
      title: 'Welcome to Ember Shepherd!',
      text: [
        `
          Ember Shepherd is a JavaScript library for guiding users through your Ember app.
          It is an Ember addon that wraps <a href="https://github.com/shipshapecode/shepherd">Shepherd</a>
          and extends its functionality. Shepherd uses <a href="https://atomiks.github.io/tippyjs/">Tippy.js</a>,
          another open source library, to position all of its steps and enable entrance and exit animations.
        `,
        `
          Tippy makes sure your steps never end up off screen or cropped by an
          overflow. Try resizing your browser to see what we mean.
        `
      ],
    }
  },
  {
    id: 'installation',
    options: {
      attachTo: '.install-element bottom',
      buttons: [
        builtInButtons.cancel,
        builtInButtons.back,
        builtInButtons.next,
      ],
      classes: 'custom-class-name-1 custom-class-name-2',
      title: 'Installation',
      text: ['Installation is simple, if you are using Ember-CLI, just install like any other addon.']
    }
  },
  {
    id: 'usage',
    options: {
      attachTo: '.usage-element bottom',
      buttons: [
        builtInButtons.cancel,
        builtInButtons.back,
        builtInButtons.next,
      ],
      classes: 'custom-class-name-1 custom-class-name-2',
      title: 'Usage',
      text: ['To use the tour service, simply inject it into your application and use it like this example.']
    }
  },
  {
    id: 'noAttachTo',
    options: {
      buttons: [
        builtInButtons.cancel,
        builtInButtons.back,
      ],
      title: 'Centered Modals',
      classes: 'custom-class-name-1 custom-class-name-2',
      text: ['If no attachTo is specified, the modal will appear in the center of the screen, as per the Shepherd docs.']
    }
  }
];
