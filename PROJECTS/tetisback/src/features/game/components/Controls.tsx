import React from 'react';
import { useGame } from '@/app/contexts/GameContext';
import { ArrowLeft, ArrowRight, ArrowUp, ArrowDown, RotateCw, Square, Pause, Play } from 'lucide-react';
export default function Controls() {
const { state, dispatch } = useGame();
const handleTouch = (action: any) => (e: React.TouchEvent) => {
e.preventDefault();
dispatch(action);
};
return (
    <div className="grid grid-cols-3 gap-2 mt-4">
      <button onTouchStart={handleTouch({ type: 'MOVE_LEFT' })} onClick={() => dispatch({ type: 'MOVE_LEFT' })} className="bg-gray-700 p-3 rounded-lg active:bg-gray-600 transition-colors">
        <ArrowLeft className="w-6 h-6" />
      </button>
      <button onTouchStart={handleTouch({ type: 'ROTATE' })} onClick={() => dispatch({ type: 'ROTATE' })} className="bg-gray-700 p-3 rounded-lg active:bg-gray-600 transition-colors">
        <RotateCw className="w-6 h-6" />
      </button>
      <button onTouchStart={handleTouch({ type: 'MOVE_RIGHT' })} onClick={() => dispatch({ type: 'MOVE_RIGHT' })} className="bg-gray-700 p-3 rounded-lg active:bg-gray-600 transition-colors">
        <ArrowRight className="w-6 h-6" />
      </button>
      <button onTouchStart={handleTouch({ type: 'SOFT_DROP' })} onClick={() => dispatch({ type: 'SOFT_DROP' })} className="bg-gray-700 p-3 rounded-lg active:bg-gray-600 transition-colors">
        <ArrowDown className="w-6 h-6" />
      </button>
      <button onTouchStart={handleTouch({ type: 'HARD_DROP' })} onClick={() => dispatch({ type: 'HARD_DROP' })} className="bg-gray-700 p-3 rounded-lg active:bg-gray-600 transition-colors">
        <Square className="w-6 h-6" />
      </button>
      <button onTouchStart={handleTouch({ type: 'PAUSE' })} onClick={() => dispatch({ type: 'PAUSE' })} className="bg-gray-700 p-3 rounded-lg active:bg-gray-600 transition-colors">
        {state.status === 'paused' ? <Play className="w-6 h-6" /> : <Pause className="w-6 h-6" />}
      </button>
    </div>
  );
}