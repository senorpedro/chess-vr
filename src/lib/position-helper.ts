import { Vector3 } from 'three';
import { CELL_SIZE } from '../constants';
import type { Color } from '../types';


export type PositionMap = Map<string, Vector3>;

/**
 * fileIdx = position on x axis (== column)
 * rankIdx = position on z axis (== row)
 * 
 * grows: 
 *       x 
 *    + ---> 
 *  z | 
 *    | 
 *    ▼
 */
const ranks = [1,2,3,4,5,6,7,8];
const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

const positionMap = new Map<string, Vector3>()

let isInitialized = false;

export function initPositionMap(side: Color): void {
  if (isInitialized) {
    throw new Error("positionMap already initialized")
  }

  files.forEach((f, fIdx) => {
    ranks.forEach((r, rIdx) => {
      const key = f + r;

      const x = (side === 'white' ? fIdx : (files.length - 1) - fIdx) * CELL_SIZE;
      const z = (side === 'white' ? rIdx : (ranks.length - 1) - rIdx) * CELL_SIZE;
      const pos = new Vector3(x, 0 , z);
      positionMap.set(key, pos)
    })
  })

  console.log(positionMap)

  isInitialized = true;
}

export function getPosition(boardPosition: string): Vector3 {
  if (!isInitialized) {
    throw new Error("positionMap not initialized yet")
  }
  return (positionMap as any).get(boardPosition).clone();
}

//export function getPositionMap(side: Color): PositionMap {
export function getPositionMap(): PositionMap {
  if (!isInitialized) {
    throw new Error("positionMap not initialized yet")
  }

  return positionMap;
}
