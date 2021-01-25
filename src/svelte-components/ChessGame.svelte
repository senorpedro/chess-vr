<script lang="ts">
  import { SCALE_FACTOR } from '../constants';
  import { initPositionMap } from '../lib/position-helper';
  import type { Color } from '../types';
  import ChessBoard from './ChessBoard.svelte';


  export let playingSide: Color;

  initPositionMap(playingSide);

</script>

<a-entity scale="{SCALE_FACTOR} {SCALE_FACTOR} {SCALE_FACTOR}">
  <ChessBoard />

  <a-entity chess-piece="color: white; type:pawn; boardPosition:a2" />
  <a-entity chess-piece="color: white; type:pawn; boardPosition:b2" />
  <a-entity chess-piece="color: white; type:pawn; boardPosition:c2" />
  <a-entity chess-piece="color: white; type:pawn; boardPosition:d2" />

</a-entity>