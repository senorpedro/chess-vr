<script lang="ts">
  import type { Vector3 } from 'three';

  import {
    BOARD_COLOR_BLACK,
    BOARD_COLOR_WHITE,
    BOARD_HEIGHT,
    CELL_SIZE,
  } from '../constants';
  import { getPositionMap } from '../lib/position-helper';

  const getTileColor = (worldPosition: Vector3): string => {
    const evenRank = worldPosition.z % 2 === 0;
    const evenFile = worldPosition.x % 2 === 0;

    if (evenRank) {
      return evenFile ? BOARD_COLOR_WHITE : BOARD_COLOR_BLACK;
    }
    return evenFile ? BOARD_COLOR_BLACK : BOARD_COLOR_WHITE;
  };

  const positionMap = getPositionMap();

</script>

{#each [...positionMap] as [chessPosition, worldPosition]}
  <a-box
    chess-position={chessPosition}
    depth={CELL_SIZE}
    height={BOARD_HEIGHT}
    width={CELL_SIZE}
    shadow
    position={worldPosition}
    color={getTileColor(worldPosition)} /> 
{/each}
