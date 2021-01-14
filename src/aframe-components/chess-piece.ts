import { PieceColor } from '../types';
import { runOnAllChildren } from './helper';

AFRAME.registerComponent('chess-piece', {
  init: function () {
    runOnAllChildren(this.el, (n) => {
      n.setAttribute('controller-handler', '1');

      // UI stuff
      n.setAttribute('material', `color: ${PieceColor.white}`);
      n.setAttribute('shadow', 'cast: true; receive: false');
    });
  },
});
