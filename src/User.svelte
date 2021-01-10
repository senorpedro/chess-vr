<script lang="ts">
  const slowDownFactor = 50;
  let x = 0,
    z = 1.6,
    y = 2;

  const getPosition = () => {
    return `${x} ${z} ${y}`;
  };

  let position = getPosition();

  AFRAME.registerComponent('thumbstick-movement', {
    init: function () {
      this.el.addEventListener('thumbstickmoved', this.calculateNewPosition);
    },
    calculateNewPosition: (evt: any) => {
      x += evt.detail.x / slowDownFactor;
      y += evt.detail.y / slowDownFactor;

      position = getPosition();
    },
  });
</script>

<a-entity id="cameraRig" {position}>
  <!-- camera -->
  <a-entity id="head" camera wasd-controls look-controls />
  <!-- hand controls -->

  <a-entity id="leftHand" thumbstick-movement laser-controls="hand: left" />
  <a-entity
    id="rightHand"
    laser-controls="hand: right"
    line="color: red; opacity: 0.75"
    raycaster="far: 2" />
</a-entity>
