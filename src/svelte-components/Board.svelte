<script lang="ts">
  import { BoardColor } from '../types';

  export let cellSize: number;
  export let boardHeight: number;

  const rows = 8;
  const cols = 8;

  const offset = 4 * cellSize;

  const getTileColor = (rowIdx: number, colIdx: number): BoardColor => {
    const evenRow = rowIdx % 2 === 0;
    const evenCol = colIdx % 2 === 0;

    if (evenRow) {
      return evenCol ? BoardColor.white : BoardColor.black;
    }
    return evenCol ? BoardColor.black : BoardColor.white;
  };
</script>

<!-- chess board -->
{#each { length: rows } as _, rowIdx}
  {#each { length: cols } as _, colIdx}
    <a-box
      depth={cellSize}
      height={boardHeight}
      width={cellSize}
      shadow
      position="{rowIdx * cellSize - offset} 0 {colIdx * cellSize - offset}"
      color={getTileColor(rowIdx, colIdx)} />
  {/each}
{/each}
