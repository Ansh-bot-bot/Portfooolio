import { useState } from 'react';
import { Folder, Home, Mail, Menu, Shapes, User, Volume2, VolumeX, X } from 'lucide-react';
import { designerProfile } from '../data/portfolioData';
import { useSound } from '../context/SoundContext';

export type SectionId = 'home' | 'about' | 'work' | 'playground' | 'contact';

interface NavigationProps {
  activeSection: SectionId;
  onNavigate: (id: SectionId) => void;
}

const navItems: { id: Exclude<SectionId, 'contact'>; label: string; Icon: typeof Home }[] = [
  { id: 'home', label: 'HOME', Icon: Home },
  { id: 'about', label: 'ABOUT', Icon: User },
  { id: 'work', label: 'WORK', Icon: Folder },
  { id: 'playground', label: 'PLAYGROUND', Icon: Shapes },
];

export function Navigation({ activeSection, onNavigate }: NavigationProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isMuted, toggleMute, playClick } = useSound();

  const handleNavClick = (id: SectionId) => {
    playClick();
    setMobileOpen(false);
    onNavigate(id);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-900/15 bg-white/95 backdrop-blur-xs">
      <div className="flex items-center justify-between gap-4 px-4 py-2.5 sm:px-8">
        {/* Zone 1: Custom Logo / Initials Mark */}
        <button
          type="button"
          onClick={() => handleNavClick('home')}
          aria-label="Go to Home"
          className="group flex items-center gap-2.5 shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full border-[1.5px] border-zinc-900 bg-[#F4609B] text-xs font-extrabold tracking-tight text-zinc-900 transition-transform duration-150 group-hover:-rotate-6">
            {designerProfile.initials}
          </span>
          <span className="font-display text-lg font-bold tracking-wide text-zinc-900 whitespace-nowrap shrink-0">
            {designerProfile.name}
          </span>
        </button>

        {/* Zone 2: Desktop Navigation Items */}
        <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-2 lg:gap-3">
          {navItems.map(({ id, label, Icon }) => {
            const isActive = activeSection === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => handleNavClick(id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold tracking-wider transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 ${
                  isActive
                    ? 'bg-[#F6C93B] text-zinc-900 shadow-[2px_2px_0_#18181b]'
                    : 'text-zinc-800 hover:bg-zinc-100'
                }`}
              >
                <Icon className="h-3.5 w-3.5 text-zinc-900 shrink-0" strokeWidth={2.2} aria-hidden="true" />
                <span>{label}</span>
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Sound Mute Toggle + Outlined CONTACT Button + Mobile Menu Trigger */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={toggleMute}
            aria-pressed={isMuted}
            aria-label={isMuted ? 'Unmute sound effects' : 'Mute sound effects'}
            title={isMuted ? 'Unmute desk sounds' : 'Mute desk sounds'}
            className={`inline-flex h-8 w-8 items-center justify-center border border-zinc-900/20 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 ${
              isMuted
                ? 'bg-zinc-100 text-zinc-500 hover:text-zinc-900'
                : 'bg-[#FAF8F3] text-zinc-900 hover:bg-[#F6C93B]'
            }`}
          >
            {isMuted ? (
              <VolumeX className="h-3.5 w-3.5" strokeWidth={2.2} aria-hidden="true" />
            ) : (
              <Volume2 className="h-3.5 w-3.5" strokeWidth={2.2} aria-hidden="true" />
            )}
          </button>

          <button
            type="button"
            onClick={() => handleNavClick('contact')}
            className={`inline-flex items-center gap-1.5 border-[1.5px] border-zinc-900 px-3.5 py-1.5 text-xs font-bold tracking-wider transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 ${
              activeSection === 'contact'
                ? 'bg-[#F6C93B] text-zinc-900 shadow-[2px_2px_0_#18181b]'
                : 'bg-white text-zinc-900 hover:bg-[#F6C93B] hover:-translate-y-0.5 hover:shadow-[2px_2px_0_#18181b]'
            }`}
          >
            <Mail className="h-3.5 w-3.5 text-zinc-900 shrink-0" strokeWidth={2.2} aria-hidden="true" />
            <span>CONTACT</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playClick();
              setMobileOpen((prev) => !prev);
            }}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex md:hidden h-10 w-10 items-center justify-center border border-zinc-900/20 bg-white text-zinc-900 hover:bg-zinc-100 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Compact Mobile Menu */}
      {mobileOpen && (
        <nav
          aria-label="Mobile navigation"
          className="md:hidden border-t border-zinc-900/10 bg-[#FAF8F3] px-4 py-3 flex flex-wrap gap-2"
        >
          {navItems.map(({ id, label, Icon }) => {
            const isActive = activeSection === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => handleNavClick(id)}
                className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold tracking-wider border border-zinc-900/15 cursor-pointer ${
                  isActive ? 'bg-[#F6C93B] text-zinc-900 border-zinc-900' : 'bg-white text-zinc-800'
                }`}
              >
                <Icon className="h-3.5 w-3.5 text-zinc-900" strokeWidth={2.2} aria-hidden="true" />
                <span>{label}</span>
              </button>
            );
          })}
        </nav>
      )}
    </header>
  );
}
