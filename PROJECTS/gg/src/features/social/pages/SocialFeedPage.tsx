import React, { useState, useEffect, useRef } from 'react';
import { Heart, MessageSquare, Share2, Mic, MicOff, ShieldAlert } from 'lucide-react';

interface Post {
  id: string;
  username: string;
  agency: string;
  content: string;
  metrics: { likes: number; comments: number };
  timestamp: string;
}

export default function SocialFeedPage() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: "1",
      username: "ALPHA_OPERATOR",
      agency: "NEXUS DEFENSE",
      content: "Suture binaire complete sur le cluster G12. Les boucliers de structure affichent une stabilite nominale de 99.98% sous charge critique.",
      metrics: { likes: 1024, comments: 42 },
      timestamp: "02 MIN AGO"
    },
    {
      id: "2",
      username: "GHOST_CODER",
      agency: "STEALTH LABS",
      content: "Optimisation du moteur de rendu mobile. Suppression complete des cascades (waterfalls) et passage en HSL pur. Le frame rate reste bloque a 60 FPS constants.",
      metrics: { likes: 512, comments: 19 },
      timestamp: "14 MIN AGO"
    }
  ]);

  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [voiceLog, setVoiceLog] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Simulation Caveman Debugging log
  useEffect(() => {
    console.log(`[CAVEMAN DEBUG] Initialized SocialFeedPage with ${posts.length} secure streams.`);
  }, [posts.length]);

  const handleLike = (id: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id === id) {
        console.log(`[CAVEMAN DEBUG] Intercepted interaction: Like triggered on post ${id}`);
        return { ...post, metrics: { ...post.metrics, likes: post.metrics.likes + 1 } };
      }
      return post;
    }));
  };

  const toggleVoiceCapture = () => {
    if (!isRecording) {
      setIsRecording(true);
      setVoiceLog("CAPTURE EN COURS...");
    } else {
      console.log("[CAVEMAN DEBUG] Stopping Voice Capture Session Store - Serializing Audio Blob");
      setIsRecording(false);
      setVoiceLog("MESSAGE VOCAL TRAITE : Suture tactique appliquee.");
      
      // Injection dynamique d'un nouveau post issu du flux vocal
      const newId = (posts.length + 1).toString();
      const voicePost: Post = {
        id: newId,
        username: "VOICE_TRANSCRIBER",
        agency: "DIAMOND VOICE CORE",
        content: "Flux vocal transcrit : Suture tactique appliquee sur l'ensemble de la maille du reseau local.",
        metrics: { likes: 1, comments: 0 },
        timestamp: "JUST NOW"
      };
      
      setPosts(prev => [voicePost, ...prev]);
    }
  };

  return (
    <div ref={containerRef} className="h-full w-full flex flex-col justify-between bg-[#0e1011] relative">
      {/* Infinite Scroll Mobile Body Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {posts.map(post => (
          <div 
            key={post.id} 
            className="w-full bg-[#151718]/60 border border-[#26292b] rounded-xl p-4 backdrop-blur-md relative overflow-hidden transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-xs font-mono font-bold tracking-wider text-[#38bdf8]">{post.username}</h3>
                <p className="text-[9px] font-mono text-[#64748b] tracking-widest">{post.agency}</p>
              </div>
              <span className="text-[9px] font-mono text-[#475569]">{post.timestamp}</span>
            </div>

            <p className="text-xs text-[#e2e8f0] font-sans leading-relaxed tracking-wide mb-4">
              {post.content}
            </p>

            <div className="flex items-center gap-6 border-t border-[#26292b] pt-3">
              <button 
                onClick={() => handleLike(post.id)}
                className="flex items-center gap-1.5 text-[#64748b] hover:text-[#f43f5e] transition-colors group"
              >
                <Heart className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-mono">{post.metrics.likes}</span>
              </button>
              <div className="flex items-center gap-1.5 text-[#64748b]">
                <MessageSquare className="w-4 h-4" />
                <span className="text-[10px] font-mono">{post.metrics.comments}</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#64748b] ml-auto">
                <Share2 className="w-4 h-4" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Tactical Audio Capture Deck */}
      <div className="p-4 border-t border-[#26292b] bg-[#151718]/40 backdrop-blur-xl flex flex-col gap-2">
        {voiceLog && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#1e293b]/50 border border-[#38bdf8]/20">
            <ShieldAlert className="w-3.5 h-3.5 text-[#38bdf8] animate-pulse" />
            <span className="text-[10px] font-mono text-[#94a3b8] tracking-wide">{voiceLog}</span>
          </div>
        )}
        
        <button
          onClick={toggleVoiceCapture}
          className={`w-full h-12 rounded-xl border font-mono text-xs tracking-widest flex items-center justify-center gap-3 transition-all duration-300 ${
            isRecording 
              ? 'bg-[#ef4444]/10 border-[#ef4444]/40 text-[#ef4444] animate-pulse' 
              : 'bg-[#38bdf8]/10 border-[#38bdf8]/30 text-[#38bdf8] hover:bg-[#38bdf8]/20'
          }`}
        >
          {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          {isRecording ? 'COUUPER LA CAPTURE AUDIO' : 'COMMENCER LA CAPTURE VOCALE'}
        </button>
      </div>
    </div>
  );
}