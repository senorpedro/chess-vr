import { getChessPieceRoot } from './helper';

/**
 * component to enable chess-pieces to be interactable with the controller
 * - highlight when pointed to
 * - highlight when controller button is pressed
 * - move on board
 * - ...
 */
AFRAME.registerComponent('controller-events', {
  dependencies: ['position', 'chess-piece'],

  init: function () {
    const chessPieceRoot = getChessPieceRoot(this.el);

    const emitEventOnRoot = (evtName: string, data = {}) => {
      (chessPieceRoot as any).emit(evtName, data);
    }

    // trigger pulled
    // => lift piece .5 in the air
    this.el.addEventListener('mousedown', e => {
      const grabber = (e as any).detail.cursorEl;
      emitEventOnRoot('grabstart', { grabber });
    });

    // trigger released
    // => put piece back on board
    this.el.addEventListener('mouseup', () => {
      emitEventOnRoot('grabend');
    });

    // laser hits object
    this.el.addEventListener('mouseenter', () => {
      emitEventOnRoot('hoverstart');
    });

    // laser leaves object
    this.el.addEventListener('mouseleave', () => {
      emitEventOnRoot('hoverend');
    });
  }
});
