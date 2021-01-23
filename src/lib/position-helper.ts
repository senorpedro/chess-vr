import { Vector3 } from 'three';
import {
  CELL_SIZE,
} from '../constants';

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

files.forEach((f, fIdx) => {
  ranks.forEach((r, rIdx) => {
    const key = f + r;

    const x = fIdx * CELL_SIZE;
    const z = rIdx * CELL_SIZE;
    const pos = new Vector3(x, 0 , z);
    positionMap.set(key, pos)
  })
})

export function getPosition(boardPosition: string): Vector3 {
  return (positionMap as any).get(boardPosition).clone();
}

export function getPositionMap(): Map<string, Vector3>{
  return positionMap;
}
