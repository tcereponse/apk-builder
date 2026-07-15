import { PieceType } from '../types/game';
export const PIECES: Record<PieceType, string[][]> = {
I: [
[null, null, null, null],
['#00f0f0', '#00f0f0', '#00f0f0', '#00f0f0'],
[null, null, null, null],
[null, null, null, null],
],
J: [
['#0000f0', null, null],
['#0000f0', '#0000f0', '#0000f0'],
[null, null, null],
],
L: [
[null, null, '#f0a000'],
['#f0a000', '#f0a000', '#f0a000'],
[null, null, null],
],
O: [
['#f0f000', '#f0f000'],
['#f0f000', '#f0f000'],
],
S: [
[null, '#00f000', '#00f000'],
['#00f000', '#00f000', null],
[null, null, null],
],
T: [
[null, '#a000f0', null],
['#a000f0', '#a000f0', '#a000f0'],
[null, null, null],
],
Z: [
['#f00000', '#f00000', null],
[null, '#f00000', '#f00000'],
[null, null, null],
],
};
export const COLORS: Record<PieceType, string> = {
I: '#00f0f0',
J: '#0000f0',
L: '#f0a000',
O: '#f0f000',
S: '#00f000',
T: '#a000f0',
Z: '#f00000',
};
export const WALL_KICKS: [number, number][] = [
[0, 0],
[-1, 0],
[1, 0],
[0, -1],
[-1, -1],
[1, -1],
[-2, 0],
[2, 0],
];