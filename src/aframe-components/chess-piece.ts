import { PIECE_COLOR_WHITE } from '../constants';
import { runOnAllChildren } from './helper';

AFRAME.registerComponent('chess-piece', {
  schema: {
    color: {type: 'string', default: PIECE_COLOR_WHITE}
  },
  init: function () {
    runOnAllChildren(this.el, (n) => {
      n.setAttribute('controller-handler', '1');

      // UI stuff
      n.setAttribute('material', `color: ${this.data.color}`);
      n.setAttribute('shadow', 'cast: true; receive: false');
    });
  },
});
