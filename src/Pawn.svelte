<script lang="ts">
  import { PieceColor } from './types';

  export let cellSize: number;
  export let boardHeight: number;

  const conePosition = `0 ${boardHeight + 0.1} 0`;
  const spherePosition = `0 ${boardHeight + cellSize / 2 - 0.1} 0`;

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
</script>

<a-cone
  chesspiece="color: white"
  position={conePosition}
  radius-bottom={cellSize / 3}
  radius-top="0"
  height={cellSize / 2} />

<a-sphere
  chesspiece="color: white"
  position={spherePosition}
  radius={cellSize / 5} />
