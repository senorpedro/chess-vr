import { Quaternion, Vector3} from 'three';
import { PIECE_COLOR_WHITE } from '../constants';
import { AframeElementOrElement, runOnAllChildren } from './helper';

// TODO put this somewhere appropriate
const pointedToColor = '#24CAFF';
const buttonPressColor = '#EF2D5E';
const liftOffset = 0.2;

    const q = new Quaternion()
    const v = new Vector3()

    const objPos = new Vector3()
    const grabPos = new Vector3()


const getPositionString = (pos: Vector3): string =>
  `${pos.x} ${pos.y} ${pos.z}`;

function getAttribute<T>(ele: AframeElementOrElement, attributeName: string): T {
  const attr = ele.getAttribute(attributeName);
  return attr as T;
}


AFRAME.registerComponent('chess-piece', {
  isGrabbed: false,

  grabber: null,
  targetPosition: new Vector3(),
  grabDirection: new Vector3(0, 0, -1),
  grabDistance: 0,
  grabOffset: new Vector3(0,0,0),
  deltaPositionIsValid: false,
  deltaPosition: new Vector3(),
  xFactor: 1,
  zFactor: 1,

  schema: {
    color: { type: 'string', default: PIECE_COLOR_WHITE },
  },
  init: function () {
    runOnAllChildren(this.el, (n) => {
      n.setAttribute('controller-handler', '1');

      // UI stuff
      n.setAttribute('material', `color: ${this.data.color}`);
      n.setAttribute('shadow', 'cast: true; receive: false');
    });

    const initialColor = this.data.color;

    // chesspiece got pointed to with laser
    this.el.addEventListener('hoverstart', (e) => {
      console.log('hoverstart');
      runOnAllChildren(this.el, (n) => {
        n.setAttribute('material', `color: ${pointedToColor}`);
      });
    });

    this.el.addEventListener('hoverend', (e) => {
      console.log('hoverend');
      runOnAllChildren(this.el, (n) => {
        n.setAttribute('material', `color: ${initialColor}`);
      });
    });

    // chesspiece got grabbed
    this.el.addEventListener('grabstart', ((e: CustomEvent) => {
      console.log('grab');
      if (this.isGrabbed === false) {
        runOnAllChildren(this.el, (n) => {
          // lift in the air

          const position = <Vector3>getAttribute(n, 'position')
          position.y += liftOffset;

          n.setAttribute('position', getPositionString(position));
        });

        const grabber = e.detail.grabber;
        const raycaster = grabber.getAttribute('raycaster');
        this.grabDirection = raycaster.direction;
        this.grabOffset = raycaster.origin
        this.grabDistance = this.el.object3D
          .getWorldPosition(objPos)
          .distanceTo(grabber.object3D.getWorldPosition(grabPos));

        this.grabber = grabber;
        this.isGrabbed = true;
      }
    }) as EventListener);

    this.el.addEventListener('grabend', (e) => {
      // drop back on board
      console.log('grabend');
      if (this.isGrabbed === true) {
        runOnAllChildren(this.el, (n) => {

          const position = <Vector3>getAttribute(n, 'position')
          position.y -= liftOffset;
          n.setAttribute('position', getPositionString(position));
        });
        this.grabber = null;
        this.isGrabbed = false;
      }
    });
  },

  tick: function () {
    if (this.grabber !== null) {
      const grabber = (this.grabber as any);
      // reflect on z-axis to point in same direction as the laser
      this.targetPosition.copy(this.grabDirection);
      this.targetPosition
        .applyQuaternion(grabber.object3D.getWorldQuaternion(q))
        .setLength(this.grabDistance)
        .add(grabber.object3D.getWorldPosition(v))
        .add(this.grabOffset);
      if (this.deltaPositionIsValid) {
        // relative position changes work better with nested entities
        this.deltaPosition.sub(this.targetPosition);
        runOnAllChildren(this.el, (n) => {
          const position = <Vector3>getAttribute(n, 'position')

          // only move in x and z space around, y stays the same
          position.x -= this.deltaPosition.x * this.xFactor;
          position.z -= this.deltaPosition.z * this.zFactor;

          n.setAttribute('position', getPositionString(position));
        })
      } else {
        this.deltaPositionIsValid = true;
      }
      this.deltaPosition.copy(this.targetPosition);
    }
  },
});
