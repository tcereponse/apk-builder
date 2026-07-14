import { ChevronLeft, ChevronRight, RotateCw, ArrowDown, ArrowDownToLine } from 'lucide-react';
interface ControlsProps {
onMoveLeft: () => void;
onMoveRight: () => void;
onRotate: () => void;
onSoftDrop: () => void;
onHardDrop: () => void;
}
function Controls({ onMoveLeft, onMoveRight, onRotate, onSoftDrop, onHardDrop }: ControlsProps) {
return (
    <div className="flex items-center justify-center gap-3 w-full max-w-md mt-2">
      <button
        onClick={onMoveLeft}
        className="p-4 bg-slate-800 hover:bg-slate-700 rounded-xl text-white transition-all duration-200 active:scale-95 touch-manipulation"
        aria-label="Déplacer à gauche"
      >
        <ChevronLeft size={28} />
      </button><button
onClick={onRotate}
className="p-4 bg-slate-800 hover:bg-slate-700 rounded-xl text-white transition-all duration-200 active:scale-95 touch-manipulation"
aria-label="Rotation"
        <RotateCw size={28} />
      </button><button
onClick={onSoftDrop}
className="p-4 bg-slate-800 hover:bg-slate-700 rounded-xl text-white transition-all duration-200 active:scale-95 touch-manipulation"
aria-label="Descente rapide"
        <ArrowDown size={28} />
      </button><button
onClick={onMoveRight}
className="p-4 bg-slate-800 hover:bg-slate-700 rounded-xl text-white transition-all duration-200 active:scale-95 touch-manipulation"
aria-label="Déplacer à droite"
        <ChevronRight size={28} />
      </button><button
onClick={onHardDrop}
className="p-4 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-white transition-all duration-200 active:scale-95 touch-manipulation"
aria-label="Chute directe"
        <ArrowDownToLine size={28} />
      </button>
    </div>
  );
};
export default Controls;