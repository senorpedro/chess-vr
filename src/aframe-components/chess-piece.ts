import { PIECE_COLOR_WHITE } from '../constants';
import { runOnAllChildren } from './helper';

// TODO put this somewhere appropriate
const pointedToColor = '#24CAFF';
const buttonPressColor = '#EF2D5E';
const liftOffset = 0.2;

AFRAME.registerComponent('chess-piece', {
  isGrabbed: false,
  schema: {
    color: { type: 'string', default: PIECE_COLOR_WHITE },
  },
  init: function () {
    runOnAllChildren(this.el, (n) => {
      n.setAttribute('controller-handler', '1');

      // UI stuff
      n.setAttribute('material', `color: ${this.data.color}`);
      n.setAttribute('shadow', 'cast: true; receive: false');
    });

    const initialColor = this.data.color;

    // chesspiece got pointed to with laser
    this.el.addEventListener('hoverstart', (e) => {
      console.log('hoverstart');
      runOnAllChildren(this.el, (n) => {
        n.setAttribute('material', `color: ${pointedToColor}`);
      });
    });

    this.el.addEventListener('hoverend', (e) => {
      console.log('hoverend');
      runOnAllChildren(this.el, (n) => {
        n.setAttribute('material', `color: ${initialColor}`);
      });
    });

    // chesspiece got grabbed
    this.el.addEventListener('grabstart', (e) => {
      console.log('grab');
      if (this.isGrabbed === false) {
        runOnAllChildren(this.el, (n) => {

          // lift in the air
          const position = (n.getAttribute('position') as any);
          position.y += liftOffset;

          n.setAttribute('position', position as string);
        });

        this.isGrabbed = true;
      }
    });

    this.el.addEventListener('grabend', (e) => {
      console.log('grabend');
      if (this.isGrabbed === true) {
        runOnAllChildren(this.el, (n) => {
          // lift in the air
          const position = n.getAttribute('position');
          (position as any).y -= liftOffset;
          n.setAttribute('position', position as string);
        });
        this.isGrabbed = false;
      }
    });
  },
});
