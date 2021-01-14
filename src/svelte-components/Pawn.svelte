<script lang="ts">
  export let cellSize: number;
  export let boardHeight: number;

  const conePosition = `0 ${boardHeight + 0.1} 0`;
  const spherePosition = `0 ${boardHeight + cellSize / 2 - 0.1} 0`;

  /**
   * TODO create mixin for chess piece
   *   - pass in board coordinates
   */
</script>

<a-entity chess-piece="color: white">
  <a-cone
    position={conePosition}
    radius-bottom={cellSize / 3}
    radius-top="0"
    height={cellSize / 2} />

  <a-sphere position={spherePosition} radius={cellSize / 5} />
</a-entity>
