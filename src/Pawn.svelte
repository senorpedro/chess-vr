<script lang="ts">
  import { PieceColor } from './types';

  export let cellSize: number;
  export let boardHeight: number;
  const color = PieceColor.white;

  const conePosition = `0 ${boardHeight + 0.1} 0`;
  const spherePosition = `0 ${boardHeight + cellSize / 2 - 0.1} 0`;
</script>

<a-cone
  position={conePosition}
  shadow
  {color}
  radius-bottom={cellSize / 3}
  radius-top="0"
  height={cellSize / 2} />

<a-sphere {color} position={spherePosition} radius={cellSize / 5} />
