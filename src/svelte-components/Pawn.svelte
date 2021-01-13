<script lang="ts">
  import type { Component, Entity, ObjectMap, System } from 'aframe';

  import { PieceColor } from '../types';

  export let cellSize: number;
  export let boardHeight: number;

  const conePosition = `0 ${boardHeight + 0.1} 0`;
  const spherePosition = `0 ${boardHeight + cellSize / 2 - 0.1} 0`;

  /**
   * TODO create mixin for chess piece
   *   - pass in board coordinates
   */

  /**
   * helper function to iterate over child nodes
   * @param cb
   */
  function runOnAllChildren(
    el: Entity<ObjectMap<Component<any, System<any>>>> | HTMLElement,
    cb: (node: Element) => void
  ): void {
    const childNodes = el.querySelectorAll('*');
    childNodes.forEach((n) => cb(n));
  }

  function getChessPieceRoot(
    el: Entity<ObjectMap<Component<any, System<any>>>>
  ): HTMLElement {
    let ptr:
      | Entity<ObjectMap<Component<any, System<any>>>>
      | null
      | HTMLElement = el;

    do {
      ptr = ptr.parentElement;

      if (!ptr) {
        throw new Error('node has no parent!!');
      }
    } while (!ptr.hasAttribute('chess-piece'));

    return ptr;
  }

  AFRAME.registerComponent('chess-piece', {
    init: function () {
      runOnAllChildren(this.el, (n) => {
        n.setAttribute('intersect-color-change', '1');

        // UI stuff
        n.setAttribute('material', `color: ${PieceColor.white}`);
        n.setAttribute('shadow', 'cast: true; receive: false');
      });
    },
  });

  /**
   * highlight piece when hit with the laser pointer
   */
  AFRAME.registerComponent('intersect-color-change', {
    isMouseEnter: false,
    init: function () {
      let initialColor = PieceColor.white;

      let chessPieceRoot = getChessPieceRoot(this.el);
      console.log(chessPieceRoot);

      this.el.setAttribute('data-type', 'intersect-color-change');

      // trigger pulled
      // => lift piece .5 in the air
      this.el.addEventListener('mousedown', () => {
        console.log('mousedown');

        runOnAllChildren(chessPieceRoot, (n) => {
          n.setAttribute('material', `color: #EF2D5E`);
        });
      });

      // trigger released
      // => put piece back on board
      this.el.addEventListener('mouseup', () => {
        console.log('mouseup');

        runOnAllChildren(chessPieceRoot, (n) =>
          n.setAttribute(
            'material',
            `color: ${this.isMouseEnter ? '#24CAFF' : initialColor}`
          )
        );
      });

      // laser leaves object
      this.el.addEventListener('mouseenter', () => {
        console.log('mouseenter');
        this.isMouseEnter = true;

        console.log(chessPieceRoot);
        console.log(chessPieceRoot.querySelectorAll('*'));

        runOnAllChildren(chessPieceRoot, (n) => {
          console.log(n);
          n.setAttribute('material', `color: #24CAFF`);
        });
      });

      // laser hits object
      this.el.addEventListener('mouseleave', () => {
        console.log('mouseleave');
        this.isMouseEnter = false;

        runOnAllChildren(chessPieceRoot, (n) =>
          n.setAttribute('material', `color: ${initialColor}`)
        );
      });
    },
  });
</script>

<a-entity chess-piece="color: white">
  <a-cone
    position={conePosition}
    radius-bottom={cellSize / 3}
    radius-top="0"
    height={cellSize / 2} />

  <a-sphere position={spherePosition} radius={cellSize / 5} />
</a-entity>
