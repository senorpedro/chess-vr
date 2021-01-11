import { PieceColor } from '../types';

// TODO put this where it's only run once!
AFRAME.registerComponent('chesspiece', {
  schema: {
    color: { type: 'string', default: 'white' },
    // TODO maybe put chess-coordinates here (H1, A4...) as input
  },
  init: function () {
    this.el.setAttribute('data-type', 'chesspiece');
    const color =
      this.data.color === 'white' ? PieceColor.white : PieceColor.black;
    this.el.setAttribute('color', color);
  },
});
