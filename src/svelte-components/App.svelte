<script lang="ts">
  import User from './User.svelte';
  import ChessGame from './ChessGame.svelte';

</script>

<a-scene>
  <a-entity environment="preset: default" />

  <User />

  <ChessGame playingSide="black" />

  <!--
  <a-entity mixin="marker" position="-1 0 0" />
  <a-entity
    position="1 2 0"
    text="width: 2; lineHeight: 50; letterSpacing: 5; color: green; value: {hello}" />

  <a-sphere position="0 1.25 -5" radius="1.25" color="#EF2D5E" shadow />
  <a-cylinder
    position="1 0.75 -3"
    radius="0.5"
    height="1.5"
    color="#FFC65D"
    shadow />
  <a-plane
    position="0 0 -4"
    rotation="-90 0 0"
    width="4"
    height="4"
    color="#7BC8A4"
    shadow />

  <a-entity position="0 1.8 2">
    <a-entity camera look-controls wasd-controls />
  </a-entity>
-->
</a-scene>
