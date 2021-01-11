<script lang="ts">
  export let cellSize: number;
  export let boardHeight: number;

  const conePosition = `0 ${boardHeight + 0.1} 0`;
  const spherePosition = `0 ${boardHeight + cellSize / 2 - 0.1} 0`;
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
