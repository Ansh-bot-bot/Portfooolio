import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { deskSoundEngine } from '../utils/soundEffects';

const STORAGE_KEY = 'creative-desk-sound-muted';

interface SoundContextValue {
  isMuted: boolean;
  toggleMute: () => void;
  playClick: () => void;
  playPaperTurn: () => void;
  playPaperClose: () => void;
  playTabTick: () => void;
}

const SoundContext = createContext<SoundContextValue | null>(null);

export function SoundProvider({ children }: { children: ReactNode }) {
  const [isMuted, setIsMuted] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    try {
      return window.localStorage.getItem(STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, String(isMuted));
    } catch {
      // Ignore storage errors in restricted environments
    }
  }, [isMuted]);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      if (!next) {
        deskSoundEngine.playClick();
      }
      return next;
    });
  }, []);

  const playClick = useCallback(() => {
    if (!isMuted) deskSoundEngine.playClick();
  }, [isMuted]);

  const playPaperTurn = useCallback(() => {
    if (!isMuted) deskSoundEngine.playPaperTurn();
  }, [isMuted]);

  const playPaperClose = useCallback(() => {
    if (!isMuted) deskSoundEngine.playPaperClose();
  }, [isMuted]);

  const playTabTick = useCallback(() => {
    if (!isMuted) deskSoundEngine.playTabTick();
  }, [isMuted]);

  return (
    <SoundContext.Provider
      value={{
        isMuted,
        toggleMute,
        playClick,
        playPaperTurn,
        playPaperClose,
        playTabTick,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  const ctx = useContext(SoundContext);
  if (!ctx) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return ctx;
}
