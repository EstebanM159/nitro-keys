export type Difficult = 'easy' | 'medium' | 'hard' | 'extreme';

export interface TextInterface {
  id: number;
  body: string;
  characterCount: number;
  characterCountWithoutSpaces: number;
  difficulty: Difficult; // <--- Cambiado de "difficult" a "difficulty"
}
