import React, { useState, useRef } from 'react';
import { Lock, Unlock, KeyRound, CheckCircle2, RotateCcw, HelpCircle, ArrowLeft } from 'lucide-react';
import { CODE_CRACKER_QUESTIONS } from '../../data/gamesData';
import { api } from '../../services/api';

interface CodeCrackerGameProps {
  studentId: string;
  sessionId: string;
  onBack: () => void;
}

export const CodeCrackerGame: React.FC<CodeCrackerGameProps> = ({
  studentId,
  sessionId,
  onBack
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [unlockedDigits, setUnlockedDigits] = useState<string[]>([]);
  const [enteredCode, setEnteredCode] = useState('');
  const [feedback, setFeedback] = useState<{ text: string; isError: boolean } | null>(null);
  const [isLockSolved, setIsLockSolved] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const startTimeRef = useRef<number>(Date.now());

  const currentQ = CODE_CRACKER_QUESTIONS[currentQuestionIndex];
  const allQuestionsAnswered = unlockedDigits.length === CODE_CRACKER_QUESTIONS.length;

  const handleAnswerQuestion = (selectedIdx: number) => {
    if (selectedIdx === currentQ.correctIndex) {
      const newDigits = [...unlockedDigits, currentQ.digitRevealed];
      setUnlockedDigits(newDigits);
      setFeedback({ text: `Correct! Digit #${currentQuestionIndex + 1} revealed: [ ${currentQ.digitRevealed} ]`, isError: false });
      setShowHint(false);

      if (currentQuestionIndex < CODE_CRACKER_QUESTIONS.length - 1) {
        setTimeout(() => {
          setCurrentQuestionIndex(prev => prev + 1);
          setFeedback(null);
        }, 1200);
      }
    } else {
      setFeedback({ text: 'Incorrect! Re-read the technical question carefully.', isError: true });
    }
  };

  const handleKeypadPress = (digit: string) => {
    if (enteredCode.length < 4 && !isLockSolved) {
      setEnteredCode(prev => prev + digit);
    }
  };

  const handleClear = () => {
    setEnteredCode('');
    setFeedback(null);
  };

  const handleVerifyCode = async () => {
    const targetCode = CODE_CRACKER_QUESTIONS.map(q => q.digitRevealed).join('');
    if (enteredCode === targetCode) {
      setIsLockSolved(true);
      setFeedback({ text: 'ACCESS GRANTED! MASTER HARDWARE LOCK CRACKED!', isError: false });

      const duration = Math.round((Date.now() - startTimeRef.current) / 1000);
      await api.recordGameResult({
        student_id: studentId,
        session_id: sessionId,
        game_name: 'Code Cracker',
        start_time: new Date(startTimeRef.current).toISOString(),
        end_time: new Date().toISOString(),
        duration_seconds: duration,
        score: 100,
        level: 1,
        completed: true
      });
    } else {
      setFeedback({ text: 'ACCESS DENIED: INCORRECT CODE. TRY AGAIN.', isError: true });
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setUnlockedDigits([]);
    setEnteredCode('');
    setFeedback(null);
    setIsLockSolved(false);
    startTimeRef.current = Date.now();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Top Navigation */}
      <div className="flex items-center justify-between bg-white border border-gray-200 rounded-lg p-3 shadow-xs">
        <button
          onClick={onBack}
          className="text-xs font-bold text-gray-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK TO GAMES</span>
        </button>
        <div className="text-xs font-bold text-blue-900 bg-blue-50 px-3 py-1 rounded-md border border-blue-100">
          Digits Collected: {unlockedDigits.length} / 4
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT: QUESTIONS / CODE RETRIEVAL (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-gray-200 rounded-xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
              <div>
                <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider">
                  Hardware Cipher Challenge
                </span>
                <h3 className="text-lg font-black text-gray-900">
                  {allQuestionsAnswered ? 'All Cipher Keys Unlocked!' : `Stage ${currentQuestionIndex + 1}: Unlock Digit #${currentQuestionIndex + 1}`}
                </h3>
              </div>
              <KeyRound className="w-5 h-5 text-blue-600" />
            </div>

            {!allQuestionsAnswered ? (
              <div className="space-y-4">
                <p className="text-sm font-bold text-gray-800 leading-relaxed">
                  {currentQ.question}
                </p>

                <div className="space-y-2.5">
                  {currentQ.options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswerQuestion(idx)}
                      className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-blue-400 hover:bg-blue-50/60 transition-all text-xs font-medium text-gray-800 flex items-center gap-3 cursor-pointer"
                    >
                      <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 font-bold flex items-center justify-center shrink-0">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{opt}</span>
                    </button>
                  ))}
                </div>

                <div className="pt-2">
                  {!showHint ? (
                    <button
                      onClick={() => setShowHint(true)}
                      className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1 cursor-pointer"
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                      <span>Reveal Technical Hint</span>
                    </button>
                  ) : (
                    <div className="p-3 bg-amber-50 border border-amber-200 rounded-md text-xs text-amber-900">
                      <strong>Hint:</strong> {currentQ.hint}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-lg font-black text-emerald-900">All 4 Digits Discovered!</h4>
                <p className="text-xs text-emerald-800">
                  Your revealed digits are: <strong className="font-mono text-sm tracking-widest">{unlockedDigits.join(' - ')}</strong>. Now type them into the security lock keypad on the right!
                </p>
              </div>
            )}
          </div>

          {/* Feedback pill */}
          {feedback && (
            <div
              className={`mt-4 p-3 rounded-lg text-xs font-bold ${
                feedback.isError ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              }`}
            >
              {feedback.text}
            </div>
          )}
        </div>

        {/* RIGHT: VIRTUAL SAFE KEYPAD (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900 text-white rounded-xl p-6 shadow-md flex flex-col items-center justify-between border border-slate-800">
          
          <div className="w-full text-center space-y-2">
            <div className="w-12 h-12 mx-auto rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-blue-400">
              {isLockSolved ? (
                <Unlock className="w-6 h-6 text-emerald-400 animate-bounce" />
              ) : (
                <Lock className="w-6 h-6 text-yellow-400" />
              )}
            </div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">
              SECURITY KEYPAD ACCESS
            </h4>

            {/* Display code screen */}
            <div className="w-full py-3 bg-slate-950 rounded-lg border-2 border-slate-700 font-mono text-2xl tracking-[0.6em] text-center text-emerald-400 flex items-center justify-center">
              {enteredCode.padEnd(4, '•')}
            </div>
          </div>

          {/* Keypad Buttons */}
          <div className="grid grid-cols-3 gap-2.5 w-full max-w-[220px] my-5">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'CLR', '0', 'OK'].map((btn) => (
              <button
                key={btn}
                onClick={() => {
                  if (btn === 'CLR') handleClear();
                  else if (btn === 'OK') handleVerifyCode();
                  else handleKeypadPress(btn);
                }}
                disabled={isLockSolved}
                className={`h-11 rounded-lg font-bold text-sm transition-all flex items-center justify-center ${
                  btn === 'OK'
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                    : btn === 'CLR'
                    ? 'bg-red-700 hover:bg-red-600 text-white'
                    : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 active:scale-95'
                } cursor-pointer`}
              >
                {btn}
              </button>
            ))}
          </div>

          {/* Status Message */}
          {isLockSolved ? (
            <div className="w-full space-y-2">
              <div className="p-2.5 bg-emerald-950 border border-emerald-600 rounded-lg text-xs font-bold text-emerald-300 text-center">
                🎉 ACCESS GRANTED!
              </div>
              <button
                onClick={handleRestart}
                className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Play Again</span>
              </button>
            </div>
          ) : (
            <p className="text-[11px] text-slate-400 text-center">
              Enter the 4-digit code and press <strong>OK</strong>
            </p>
          )}

        </div>

      </div>

    </div>
  );
};
