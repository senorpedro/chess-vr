import { getChessPieceRoot } from './helper';

/**
 * emits the controller events on the chess piece container when a
 * object of the chess piece is hit by the laser
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


    this.el.addEventListener('raycaster-intersected', (e) => {
      const x = e.detail.getIntersection(this.el);
      console.log(x)
    });


  }
});
