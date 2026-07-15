import { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import { Game } from '@shared/types/game';

interface GamesContextType {
  selectedGame: Game | null;
  setSelectedGame: (game: Game | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activePlatform: string | null;
  setActivePlatform: (platform: string | null) => void;
  activeYear: number | null;
  setActiveYear: (year: number | null) => void;
}

const GamesContext = createContext<GamesContextType | undefined>(undefined);

export function GamesProvider({ children }: { children: ReactNode }) {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activePlatform, setActivePlatform] = useState<string | null>(null);
  const [activeYear, setActiveYear] = useState<number | null>(null);

  const value = useMemo(
    () => ({
      selectedGame,
      setSelectedGame,
      searchQuery,
      setSearchQuery,
      activePlatform,
      setActivePlatform,
      activeYear,
      setActiveYear,
    }),
    [selectedGame, searchQuery, activePlatform, activeYear]
  );

  return <GamesContext.Provider value={value}>{children}</GamesContext.Provider>;
}

export function useGamesContext() {
  const context = useContext(GamesContext);
  if (!context) {
    throw new Error('useGamesContext must be used within a GamesProvider');
  }
  return context;
}