import type { TextInterface } from './Text.interface';

export interface RaceInterface {
  cpm: number;
  accuracy: string;
  time: string;
  textUsed: TextInterface['id'];
}
