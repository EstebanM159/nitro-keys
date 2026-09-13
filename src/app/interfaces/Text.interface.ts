export interface TextInterface {
  id: number;
  body: string;
  characterCount: number;
  characterCountWithoutSpaces: number;
  difficult: Difficult;
}

export type Difficult = 'easy' | 'medium' | 'hard';
