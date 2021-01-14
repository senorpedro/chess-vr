<script lang="ts">
  import { BOARD_HEIGHT, CELL_SIZE } from '../constants';
  import type { Color } from '../types';

  export let color: Color;

  const conePosition = `0 ${BOARD_HEIGHT + 0.1} 0`;
  const spherePosition = `0 ${BOARD_HEIGHT + CELL_SIZE / 2 - 0.1} 0`;

  /**
   * TODO create mixin for chess piece
   *   - pass in board coordinates
   */
</script>

<a-entity chess-piece="color: {color}">
  <a-cone
    position={conePosition}
    radius-bottom={CELL_SIZE / 3}
    radius-top="0"
    height={CELL_SIZE / 2} />

  <a-sphere position={spherePosition} radius={CELL_SIZE / 5} />
</a-entity>
