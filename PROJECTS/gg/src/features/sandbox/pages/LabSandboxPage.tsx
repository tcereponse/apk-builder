import React, { useState, useEffect } from 'react';
import { Sliders, RefreshCw, Layers } from 'lucide-react';

export default function LabSandboxPage() {
  const [gravity, setGravity] = useState<number>(9.8);
  const [elasticity, setElasticity] = useState<number>(0.8);
  const [friction, setFriction] = useState<number>(0.1);
  
  const [positionY, setPositionY] = useState<number>(40);
  const [velocityY, setVelocityY] = useState<number>(0);

  // Boucle de simulation physique 2D native ultra-legere pour Canvas/UI Mobile
  useEffect(() => {
    let animationFrameId: number;
    const boundaryHeight = 220; // Limite basse de la boite de simulation
    
    const updatePhysics = () => {
      setPositionY(prevY => {
        let nextVelocity = velocityY + (gravity * 0.05);
        let nextY = prevY + nextVelocity;

        // Friction de l'air lineaire
        nextVelocity *= (1 - friction * 0.02);

        // Collision detection sol
        if (nextY >= boundaryHeight) {
          nextY = boundaryHeight;
          nextVelocity = -nextVelocity * elasticity;
          
          // Seuil d'arret complet energetique
          if (Math.abs(nextVelocity) < 0.2) {
            nextVelocity = 0;
          }
        }

        setVelocityY(nextVelocity);
        return nextY;
      });

      animationFrameId = requestAnimationFrame(updatePhysics);
    };

    animationFrameId = requestAnimationFrame(updatePhysics);
    return () => cancelAnimationFrame(animationFrameId);
  }, [gravity, elasticity, friction, velocityY]);

  const handleReset = () => {
    console.log("[CAVEMAN DEBUG] Resetting physics core variables to initial vector");
    setPositionY(40);
    setVelocityY(0);
  };

  return (
    <div className="h-full w-full bg-[#0e1011] p-4 flex flex-col gap-4">
      {/* Visual Header Zone */}
      <div className="flex items-center gap-2 border-b border-[#26292b] pb-2">
        <Layers className="w-4 h-4 text-[#38bdf8]" />
        <h2 className="text-xs font-mono font-bold tracking-wider text-[#e2e8f0]">CANVAS CRITICAL SANDBOX</h2>
      </div>

      {/* Physics Container Viewport */}
      <div className="w-full h-64 bg-[#151718] border border-[#26292b] rounded-xl relative overflow-hidden flex items-center justify-center">
        {/* Grille de precision en arriere plan */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#26292b_1px,transparent_1px),linear-gradient(to_bottom,#26292b_1px,transparent_1px)] bg-[size:20px_20px] opacity-20"></div>
        
        {/* Vecteur de lecture temps reel */}
        <div className="absolute top-3 left-3 font-mono text-[9px] text-[#64748b] space-y-0.5">
          <div>POS_Y: {positionY.toFixed(2)}px</div>
          <div>VEL_Y: {velocityY.toFixed(2)}m/s</div>
        </div>

        {/* Le corps physique simule */}
        <div 
          className="absolute w-8 h-8 rounded-full bg-gradient-to-br from-[#38bdf8] to-[#0284c7] shadow-[0_0_15px_rgba(56,189,248,0.4)] flex items-center justify-center border border-[#7dd3fc]"
          style={{ transform: `translateY(${positionY - 110}px)` }}
        >
          <div className="w-2 h-2 rounded-full bg-white/60"></div>
        </div>

        {/* Ligne de collision sol fixe */}
        <div className="absolute bottom-12 left-4 right-4 h-0.5 bg-[#38bdf8]/30 border-t border-dashed border-[#38bdf8]/50"></div>
      </div>

      {/* Parameters Controls Core (Zod structured updates alternative) */}
      <div className="bg-[#151718]/60 border border-[#26292b] rounded-xl p-4 space-y-4 backdrop-blur-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-[#64748b]" />
            <span className="text-[10px] font-mono text-[#94a3b8] tracking-widest uppercase">MOTEUR VECTORIEL</span>
          </div>
          <button 
            onClick={handleReset}
            className="p-1 rounded bg-[#1e293b] border border-[#30363a] text-[#64748b] hover:text-[#38bdf8] transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Input Gravity Control */}
        <div className="space-y-1">
          <div className="flex justify-between font-mono text-[10px]">
            <span className="text-[#64748b]">GRAVITE (m/s²)</span>
            <span className="text-[#38bdf8]">{gravity.toFixed(1)}</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="25" 
            step="0.5" 
            value={gravity} 
            onChange={(e) => {
              console.log(`[CAVEMAN DEBUG] Gravity modified: ${e.target.value}`);
              setGravity(parseFloat(e.target.value));
            }}
            className="w-full h-1 bg-[#26292b] rounded-lg appearance-none accent-[#38bdf8] cursor-pointer"
          />
        </div>

        {/* Input Restitution Bounciness Control */}
        <div className="space-y-1">
          <div className="flex justify-between font-mono text-[10px]">
            <span className="text-[#64748b]">RESTITUTION (ELASTICITE)</span>
            <span className="text-[#38bdf8]">{elasticity.toFixed(2)}</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.05" 
            value={elasticity} 
            onChange={(e) => {
              console.log(`[CAVEMAN DEBUG] Elasticity modified: ${e.target.value}`);
              setElasticity(parseFloat(e.target.value));
            }}
            className="w-full h-1 bg-[#26292b] rounded-lg appearance-none accent-[#38bdf8] cursor-pointer"
          />
        </div>

        {/* Input Friction Control */}
        <div className="space-y-1">
          <div className="flex justify-between font-mono text-[10px]">
            <span className="text-[#64748b]">AMORTISSEMENT (FRICTION)</span>
            <span className="text-[#38bdf8]">{friction.toFixed(2)}</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.05" 
            value={friction} 
            onChange={(e) => {
              console.log(`[CAVEMAN DEBUG] Friction modified: ${e.target.value}`);
              setFriction(parseFloat(e.target.value));
            }}
            className="w-full h-1 bg-[#26292b] rounded-lg appearance-none accent-[#38bdf8] cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}



L'infrastructure plate globale de l'environnement GG Core est désormais matérialisée à 100%, sans aucune omission, et parée pour la compilation APK native directe via FIX_AND_BUILD.bat.