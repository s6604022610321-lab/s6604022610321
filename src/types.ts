export type GuessFeedbackType = 'HIGHER' | 'LOWER' | 'CORRECT' | null;

export type GameStatus = 'PLAYING' | 'WON' | 'GAME_OVER';

export interface GuessHistoryItem {
  id: string;
  attemptNumber: number;
  guessNumber: number;
  feedback: 'HIGHER' | 'LOWER' | 'CORRECT';
  feedbackText: string;
  scoreAfter: number;
}

export interface GameState {
  targetNumber: number;
  attempts: number;
  score: number;
  status: GameStatus;
  lastGuess: number | null;
  lastFeedback: GuessFeedbackType;
  minPossible: number;
  maxPossible: number;
  history: GuessHistoryItem[];
}
