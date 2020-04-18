/**
 * Creates a button of the specified type, with the given classes and text
 *
 * @param button.type The type of button cancel, back, or next
 * @param button.classes Classes to apply to the button
 * @param button.text The text for the button
 * @param button.action The action to call
 */
export function makeButton(button) {
  const { classes, disabled, label, secondary, type, text } = button;
  const builtInButtonTypes = ['back', 'cancel', 'next'];

  if (!type) {
    return button;
  }

  if (builtInButtonTypes.indexOf(type) === -1) {
    throw new Error(`'type' property must be one of 'back', 'cancel', or 'next'`);
  }

  return {
    action: this[type].bind(this),
    classes,
    disabled,
    label,
    secondary,
    text
  };
}
