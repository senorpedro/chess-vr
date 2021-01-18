import { getChessPieceRoot } from './helper';

/**
 * component to enable chess-pieces to be interactable with the controller
 * - highlight when pointed to
 * - highlight when controller button is pressed
 * - move on board
 * - ...
 */
AFRAME.registerComponent('controller-handler', {
  dependencies: ['position', 'chess-piece'],
  isGrabbed: false,
  raycaster: null,

  init: function () {
    const chessPieceRoot = getChessPieceRoot(this.el);

    const emitEventOnRoot = (evtName: string) => {
      (chessPieceRoot as any).emit(evtName);
    }

    // trigger pulled
    // => lift piece .5 in the air
    this.el.addEventListener('mousedown', e => {
      emitEventOnRoot('grabstart');
      /*
      console.log(e)
      this.isGrabbed = true;

      const grabber = (e as any).detail.cursorEl;
      this.raycaster = grabber.getAttribute('raycaster')

      console.log(grabber)

      runOnAllChildren(chessPieceRoot, (n) => {
        n.setAttribute('material', `color: ${buttonPressColor}`);

        // lift in the air
        const position = n.getAttribute('position');
        (position as any).y += liftOffset;
        // TODO fix types
        n.setAttribute('position', position as string);
      });
      */
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
  },
  tick: function () {
    if (this.isGrabbed) {
      if (this.raycaster) {
        // TODO see in aframe-super-hands-component/reaction_components/grabbable.js
        // how to move element
        // then snap to board
        // see https://cdn.jsdelivr.net/gh/supermedium/superframe@dae06f2d832e4d305ec7da830fb09a6079af4790/scenes/aincraft/components/snap.js
        console.log((this.raycaster as any).direction)
      }
    }

  }
});
