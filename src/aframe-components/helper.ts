import type { Component, Entity, ObjectMap, System } from 'aframe';


// TODO fix types!!!

export type AframeElement = Entity<ObjectMap<Component<any, System<any>>>>;
export type AframeElementOrElement = AframeElement | Element;


/**
 * helper function to iterate over child nodes
 * @param cb
 */
export function runOnAllChildren(
  el: AframeElementOrElement,
  cb: (node: Element) => void
): void {
  const childNodes = el.querySelectorAll('*');
  childNodes.forEach((n) => cb(n));
}

export function getChessPieceRoot(
  el: AframeElement
): Element {

  let ptr: AframeElementOrElement | null = el;

  do {
    ptr = ptr.parentElement;

    if (!ptr) {
      throw new Error('node has no parent!!');
    }
  } while (!ptr.hasAttribute('chess-piece'));

  return ptr;
}
