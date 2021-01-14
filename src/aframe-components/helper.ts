import type { Component, Entity, ObjectMap, System } from 'aframe';

/**
 * helper function to iterate over child nodes
 * @param cb
 */
export function runOnAllChildren(
  el: Entity<ObjectMap<Component<any, System<any>>>> | HTMLElement,
  cb: (node: Element) => void
): void {
  const childNodes = el.querySelectorAll('*');
  childNodes.forEach((n) => cb(n));
}

export function getChessPieceRoot(
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
