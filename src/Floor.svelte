<!-- simple circular floor, from aframe minecraft demo -->
<script lang="ts">
</script>

<!--
  use aframe asset management to make sure scene only renders when (network) assets
  have been fetched
  https://aframe.io/docs/1.1.0/guides/building-a-minecraft-demo.html#preloading-assets
-->
<a-assets>
  <img
    id="groundTexture"
    src="https://cdn.aframe.io/a-painter/images/floor.jpg" />
</a-assets>
<a-cylinder src="#groundTexture" id="ground" radius="32" height="0.1" />
