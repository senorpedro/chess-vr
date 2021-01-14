import { getChessPieceRoot, runOnAllChildren } from './helper';

// TODO put this somewhere appropriate
const pointedToColor = '#24CAFF';
const buttonPressColor = '#EF2D5E';

/**
 * component to enable chess-pieces to be interactable with the controller
 * - highlight when pointed to
 * - highlight when controller button is pressed
 * - move on board
 * - ...
 */
AFRAME.registerComponent('controller-handler', {
  isMouseEnter: false,
  init: function () {
    const material = this.el.getAttribute('material');
    const initialColor = material.color;

    const chessPieceRoot = getChessPieceRoot(this.el);

    // trigger pulled
    // => lift piece .5 in the air
    this.el.addEventListener('mousedown', () => {
      runOnAllChildren(chessPieceRoot, (n) => {
        n.setAttribute('material', `color: ${buttonPressColor}`);
      });
    });

    // trigger released
    // => put piece back on board
    this.el.addEventListener('mouseup', () => {
      runOnAllChildren(chessPieceRoot, (n) =>
        n.setAttribute(
          'material',
          `color: ${this.isMouseEnter ? pointedToColor : initialColor}`
        )
      );
    });

    // laser leaves object
    this.el.addEventListener('mouseenter', () => {
      this.isMouseEnter = true;

      runOnAllChildren(chessPieceRoot, (n) => {
        n.setAttribute('material', `color: ${pointedToColor}`);
      });
    });

    // laser hits object
    this.el.addEventListener('mouseleave', () => {
      this.isMouseEnter = false;

      runOnAllChildren(chessPieceRoot, (n) =>
        n.setAttribute('material', `color: ${initialColor}`)
      );
    });
  },
});
