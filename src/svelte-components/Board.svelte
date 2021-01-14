<script lang="ts">
  import {
    BOARD_COLOR_BLACK,
    BOARD_COLOR_WHITE,
    BOARD_HEIGHT,
    CELL_SIZE,
  } from '../constants';

  const rows = 8;
  const cols = 8;

  const offset = 4 * CELL_SIZE;

  const getTileColor = (rowIdx: number, colIdx: number): string => {
    const evenRow = rowIdx % 2 === 0;
    const evenCol = colIdx % 2 === 0;

    if (evenRow) {
      return evenCol ? BOARD_COLOR_WHITE : BOARD_COLOR_BLACK;
    }
    return evenCol ? BOARD_COLOR_BLACK : BOARD_COLOR_WHITE;
  };
</script>

<!-- chess board -->
{#each { length: rows } as _, rowIdx}
  {#each { length: cols } as _, colIdx}
    <a-box
      depth={CELL_SIZE}
      height={BOARD_HEIGHT}
      width={CELL_SIZE}
      shadow
      position="{rowIdx * CELL_SIZE - offset} 0 {colIdx * CELL_SIZE - offset}"
      color={getTileColor(rowIdx, colIdx)} />
  {/each}
{/each}
