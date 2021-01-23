import { BOARD_HEIGHT, CELL_SIZE } from "../../constants";
import { getPosition } from "../../lib/position-helper";

AFRAME.registerComponent('pawn', {
  dependencies: ['chess-piece'],
  schema: {
    color: { type: 'string'},
    boardPosition: {type: 'string'},
  },

  init: function() {

    const conePos = getPosition(this.data.boardPosition);
    const spherePos = conePos.clone();

    conePos.y = BOARD_HEIGHT + 0.1;
    spherePos.y = BOARD_HEIGHT + CELL_SIZE / 2 - 0.1;

    const cone = document.createElement('a-cone')
    cone.setAttribute('material', `color: ${this.data.color}`)
    cone.setAttribute('shadow', 'cast: true; receive: false')
    cone.setAttribute('position', conePos);
    cone.setAttribute('radius-bottom', CELL_SIZE / 3);
    cone.setAttribute('radius-top', 0);
    cone.setAttribute('height', CELL_SIZE / 2);

    const sphere = document.createElement('a-sphere')
    sphere.setAttribute('material', `color: ${this.data.color}`)
    sphere.setAttribute('shadow', 'cast: true; receive: false')
    sphere.setAttribute('position', spherePos);
    sphere.setAttribute('radius', CELL_SIZE / 5);

    this.el.appendChild(cone);
    this.el.appendChild(sphere);
  }
});
