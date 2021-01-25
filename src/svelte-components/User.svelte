<script lang="ts">
  const slowDownFactor = 50;
  let x = 1.5,
    y = 1.6,
    z = -2;

  const getPosition = () => {
    return `${x} ${y} ${z}`;
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

<a-entity id="cameraRig" {position} rotation="0 180 0">
  <!-- camera -->
  <a-entity id="head" camera wasd-controls look-controls />
  <!-- hand controls -->

  <a-entity
    id="leftHand"
    thumbstick-movement
    laser-controls="hand: left"
    raycaster="objects: [controller-events]; far: 10; useWorldCoordinates: true" />
  <a-entity
    id="rightHand"
    laser-controls="hand: right"
    raycaster="objects: [controller-events]; far: 10; useWorldCoordinates: true; lineColor: red" />
</a-entity>
