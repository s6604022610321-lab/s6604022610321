import { useState, useCallback } from 'react';
import { Sparkles, Trophy, RotateCcw } from 'lucide-react';
import { GameState, GuessFeedbackType, GuessHistoryItem } from './types';
import { ScoreBoard } from './components/ScoreBoard';
import { FeedbackCard } from './components/FeedbackCard';
import { GuessForm } from './components/GuessForm';
import { HowToPlay } from './components/HowToPlay';
import { GuessHistory } from './components/GuessHistory';

function generateRandomNumber(): number {
  return Math.floor(Math.random() * 100) + 1;
}

const INITIAL_SCORE = 100;
const PENALTY_PER_GUESS = 10;

export default function App() {
  const [gameState, setGameState] = useState<GameState>(() => ({
    targetNumber: generateRandomNumber(),
    attempts: 0,
    score: INITIAL_SCORE,
    status: 'PLAYING',
    lastGuess: null,
    lastFeedback: null,
    minPossible: 1,
    maxPossible: 100,
    history: [],
  }));

  // Best score tracker saved in state
  const [bestScore, setBestScore] = useState<number | null>(null);

  const resetGame = useCallback(() => {
    setGameState({
      targetNumber: generateRandomNumber(),
      attempts: 0,
      score: INITIAL_SCORE,
      status: 'PLAYING',
      lastGuess: null,
      lastFeedback: null,
      minPossible: 1,
      maxPossible: 100,
      history: [],
    });
  }, []);

  const handleGuess = useCallback((guess: number) => {
    setGameState((prev) => {
      if (prev.status !== 'PLAYING') return prev;

      const newAttempts = prev.attempts + 1;
      let feedback: GuessFeedbackType = null;
      let feedbackText = '';
      let newScore = prev.score;
      let newStatus = prev.status;
      let newMin = prev.minPossible;
      let newMax = prev.maxPossible;

      if (guess === prev.targetNumber) {
        feedback = 'CORRECT';
        feedbackText = '🎉 ถูกต้อง!';
        newStatus = 'WON';
        // Check and update best score
        setBestScore((currentBest) => {
          if (currentBest === null || prev.score > currentBest) {
            return prev.score;
          }
          return currentBest;
        });
      } else if (guess < prev.targetNumber) {
        feedback = 'HIGHER';
        feedbackText = '⬆️ มากกว่านี้';
        newScore = Math.max(0, prev.score - PENALTY_PER_GUESS);
        newMin = Math.max(prev.minPossible, guess + 1);
        if (newScore === 0) {
          newStatus = 'GAME_OVER';
        }
      } else {
        feedback = 'LOWER';
        feedbackText = '⬇️ น้อยกว่านี้';
        newScore = Math.max(0, prev.score - PENALTY_PER_GUESS);
        newMax = Math.min(prev.maxPossible, guess - 1);
        if (newScore === 0) {
          newStatus = 'GAME_OVER';
        }
      }

      const historyItem: GuessHistoryItem = {
        id: `${Date.now()}-${newAttempts}`,
        attemptNumber: newAttempts,
        guessNumber: guess,
        feedback: feedback!,
        feedbackText,
        scoreAfter: newScore,
      };

      return {
        ...prev,
        attempts: newAttempts,
        score: newScore,
        status: newStatus,
        lastGuess: guess,
        lastFeedback: feedback,
        minPossible: newMin,
        maxPossible: newMax,
        history: [historyItem, ...prev.history],
      };
    });
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-center items-center py-4 sm:py-10 px-3.5 sm:px-6 overflow-x-hidden w-full">
      {/* Centered Main Container */}
      <div className="w-full max-w-lg mx-auto space-y-4 sm:space-y-5">
        
        {/* Header Section */}
        <header id="app-header" className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-[11px] sm:text-xs font-semibold tracking-wide shadow-2xs max-w-full">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
            <span className="truncate">เกมทายตัวเลขสำหรับนักศึกษา (1 - 100)</span>
          </div>

          <h1
            id="app-title"
            className="text-2xl xs:text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight"
          >
            Number Guessing Game
          </h1>

          <p className="text-slate-500 text-xs sm:text-sm font-normal max-w-md mx-auto px-2">
            ทายตัวเลขปริศนาให้ถูกต้องด้วยจำนวนครั้งที่น้อยที่สุด
          </p>

          {bestScore !== null && (
            <div className="pt-0.5">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-800 bg-amber-50 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full border border-amber-200">
                <Trophy className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>คะแนนสูงสุดรอบนี้: <strong className="font-bold">{bestScore}</strong> คะแนน</span>
              </span>
            </div>
          )}
        </header>

        {/* Central Master Game Card */}
        <main
          id="main-game-card"
          className="bg-white rounded-2xl border border-slate-200 shadow-md sm:shadow-lg p-4 sm:p-7 space-y-4 sm:space-y-6 w-full box-border overflow-hidden"
        >
          {/* Top Info / ScoreBoard Header */}
          <div className="space-y-2">
            <div className="flex items-center justify-between px-0.5">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">
                สถานะเกมปัจจุบัน
              </span>
              <button
                type="button"
                onClick={resetGame}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition-colors hover:underline cursor-pointer py-1 px-1.5 rounded active:bg-indigo-50"
                aria-label="รีเซ็ตเกม"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>รีเซ็ต</span>
              </button>
            </div>

            {/* Score & Attempts Stats */}
            <ScoreBoard
              score={gameState.score}
              attempts={gameState.attempts}
              minPossible={gameState.minPossible}
              maxPossible={gameState.maxPossible}
              isWon={gameState.status === 'WON'}
            />
          </div>

          {/* Feedback Area */}
          <FeedbackCard
            lastFeedback={gameState.lastFeedback}
            lastGuess={gameState.lastGuess}
            status={gameState.status}
            score={gameState.score}
            attempts={gameState.attempts}
            onReset={resetGame}
          />

          {/* Input & Form Area */}
          <div className="pt-0.5">
            <GuessForm
              onGuess={handleGuess}
              status={gameState.status}
              minPossible={gameState.minPossible}
              maxPossible={gameState.maxPossible}
              onReset={resetGame}
            />
          </div>
        </main>

        {/* Guess History Log */}
        <GuessHistory history={gameState.history} />

        {/* How To Play Accordion/Card */}
        <HowToPlay />

        {/* Footer info */}
        <footer className="text-center pt-1 pb-3 text-xs text-slate-400">
          <p>Number Guessing Game • สำหรับนักศึกษาฝึกทักษะการคิดวิเคราะห์</p>
        </footer>
      </div>
    </div>
  );
}
