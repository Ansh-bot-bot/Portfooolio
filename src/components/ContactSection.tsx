import { useState } from 'react';
import { ArrowUpRight, Check, Copy, Mail } from 'lucide-react';
import { designerProfile } from '../data/portfolioData';
import { useSound } from '../context/SoundContext';

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const { playClick } = useSound();

  const handleCopyEmail = async () => {
    playClick();
    try {
      await navigator.clipboard.writeText(designerProfile.contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const mailtoHref = `mailto:${designerProfile.contact.email}?subject=${encodeURIComponent(
    'Project Inquiry — Portfolio'
  )}`;

  const socialStickerStyles: Record<string, { bg: string; text: string; tilt: string }> = {
    LINKEDIN: { bg: 'bg-[#2E5BFF]', text: 'text-white', tilt: '-rotate-1' },
    INSTAGRAM: { bg: 'bg-[#F4609B]', text: 'text-zinc-950', tilt: 'rotate-1' },
    BEHANCE: { bg: 'bg-[#F6C93B]', text: 'text-zinc-950', tilt: '-rotate-1' },
  };

  const renderSocialIcon = (label: string) => {
    switch (label) {
      case 'LINKEDIN':
        return (
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0" fill="currentColor" aria-hidden="true">
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77Z" />
          </svg>
        );
      case 'INSTAGRAM':
        return (
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect width="18" height="18" x="3" y="3" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
          </svg>
        );
      case 'BEHANCE':
      default:
        return (
          <span aria-hidden="true" className="font-display text-[13px] font-extrabold leading-none tracking-tight">
            Bē
          </span>
        );
    }
  };

  return (
    <section id="contact" className="relative border-t border-zinc-900/15 px-5 py-16 sm:px-10 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="relative border-[1.5px] border-zinc-900 bg-white p-7 sm:p-12 shadow-[8px_8px_0_#F6C93B]">
          {/* Decorative corner sticker */}
          <div className="hidden sm:inline-flex items-center border border-zinc-900/25 bg-[#3FD095] px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-zinc-900 -rotate-3 absolute -top-4 right-8 shadow-xs">
            SAY HELLO
          </div>

          <div className="space-y-6">
            <span className="font-hand text-2xl font-semibold text-zinc-700 inline-block">
              {designerProfile.contact.handwrittenNote}
            </span>

            <h2 className="font-display text-5xl sm:text-7xl font-extrabold uppercase tracking-tight leading-[0.92] text-zinc-900 text-balance">
              {designerProfile.contact.heading}
            </h2>

            <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-zinc-700">
              {designerProfile.contact.invitation}
            </p>

            {/* Primary Mailto CTA + Clickable Mailto Email & Copy */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href={mailtoHref}
                onClick={playClick}
                className="inline-flex items-center gap-2.5 bg-zinc-900 px-7 py-3.5 text-xs font-extrabold tracking-widest uppercase text-white shadow-[4px_4px_0_#F16D43] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#F16D43] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
              >
                <Mail className="h-4 w-4 text-[#F6C93B]" aria-hidden="true" />
                <span>LET&apos;S TALK</span>
              </a>

              <div className="inline-flex max-w-full items-center border-[1.5px] border-zinc-900/25 bg-[#FAF8F3] hover:border-zinc-900 transition-colors">
                <a
                  href={mailtoHref}
                  onClick={playClick}
                  className="inline-flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-mono font-semibold text-zinc-900 hover:text-[#2E5BFF] transition-colors break-all focus-visible:outline-2 focus-visible:outline-zinc-900"
                >
                  <span>{designerProfile.contact.email}</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  aria-label={copied ? 'Copied email address' : 'Copy email address'}
                  title={copied ? 'Copied!' : 'Copy email address'}
                  className="inline-flex items-center justify-center border-l border-zinc-900/15 px-3 py-3 text-zinc-600 hover:bg-[#F6C93B] hover:text-zinc-900 transition-colors cursor-pointer shrink-0 focus-visible:outline-2 focus-visible:outline-zinc-900"
                >
                  {copied ? (
                    <Check className="h-3.5 w-3.5 text-emerald-700" aria-hidden="true" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>

            {/* Social Media Sticker Links */}
            <div className="pt-6 border-t border-zinc-900/10 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
              <div className="flex flex-wrap items-center gap-3.5">
                {designerProfile.contact.socials.map((social) => {
                  const style = socialStickerStyles[social.label] ?? {
                    bg: 'bg-[#FAF8F3]',
                    text: 'text-zinc-900',
                    tilt: 'rotate-0',
                  };
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={playClick}
                      className={`group inline-flex items-center gap-2 border-[1.5px] border-zinc-900 ${style.bg} ${style.text} ${style.tilt} px-4 py-2 text-xs font-extrabold uppercase tracking-widest shadow-[3px_3px_0_#18181b] transition-all duration-150 hover:rotate-0 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#18181b] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900`}
                    >
                      {renderSocialIcon(social.label)}
                      <span>{social.label}</span>
                      <ArrowUpRight
                        className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      />
                    </a>
                  );
                })}
              </div>

              <span className="font-hand text-xl text-zinc-600">
                always open to thoughtful collaborations ↗
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
