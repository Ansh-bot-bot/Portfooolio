import { ArrowUp } from 'lucide-react';
import { designerProfile } from '../data/portfolioData';
import { useSound } from '../context/SoundContext';

interface FooterProps {
  onBackToTop: () => void;
}

export function Footer({ onBackToTop }: FooterProps) {
  const { playClick } = useSound();
  return (
    <footer className="border-t border-zinc-900/15 bg-white/80 px-5 py-8 sm:px-10">
      <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Designer Logo + Copyright */}
        <div className="flex items-center gap-3">
          <span className="flex h-7 w-7 items-center justify-center rounded-full border border-zinc-900 bg-[#F6C93B] text-[11px] font-extrabold text-zinc-900">
            {designerProfile.initials}
          </span>
          <span className="text-xs font-semibold text-zinc-700">
            © 2026 {designerProfile.name}. All rights reserved.
          </span>
        </div>

        {/* Handwritten Closing Note */}
        <p className="font-hand text-xl font-semibold text-zinc-700">
          Made with curiosity.
        </p>

        {/* Social Links + Back to Top */}
        <div className="flex items-center gap-5">
          {designerProfile.contact.socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-bold uppercase tracking-wider text-zinc-700 hover:text-zinc-900 transition-colors"
            >
              {social.label}
            </a>
          ))}

          <button
            type="button"
            onClick={() => {
              playClick();
              onBackToTop();
            }}
            aria-label="Back to top"
            className="inline-flex items-center gap-1 border border-zinc-900 bg-[#FAF8F3] px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-zinc-900 hover:bg-[#F6C93B] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-zinc-900"
          >
            <span>Top</span>
            <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}
