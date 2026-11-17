import { useState, type CSSProperties } from 'react';
import { designerProfile, softwareToolsList } from '../data/portfolioData';
import { ImagePlaceholder } from './ImagePlaceholder';

export function AboutSection() {
  const [activeToolId, setActiveToolId] = useState<string | null>(null);

  return (
    <section id="about" className="relative px-5 pt-14 pb-20 sm:px-10 sm:pt-20 sm:pb-28 lg:px-14">
      <div className="mx-auto max-w-7xl">
        {/* Margin handwritten cue + framed heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-12 lg:mb-14">
          <div className="flex items-center gap-3.5">
            <span className="font-hand text-2xl sm:text-3xl lg:text-[2.25rem] font-semibold text-zinc-800 -rotate-3">
              {designerProfile.aboutMarginNote}
            </span>
            <svg viewBox="0 0 42 18" className="w-9 h-4 lg:w-11 lg:h-5 text-zinc-700" fill="none" aria-hidden="true">
              <path
                d="M2 10 Q20 3 38 11 M32 6 L39 11 L32 15"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="inline-block border-[1.75px] border-zinc-900 bg-white px-5 py-1.5 sm:px-6 sm:py-2 shadow-[4px_4px_0_#F6C93B] self-start sm:self-auto">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-900">
              {designerProfile.aboutHeading}
            </h2>
          </div>
        </div>

        {/* Editorial 2-column notebook spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left column: Large taped portrait */}
          <div className="lg:col-span-5 relative flex flex-col items-center">
            {/* Main large portrait print */}
            <div className="relative w-full max-w-[360px] sm:max-w-[400px] lg:max-w-[440px] bg-white p-3.5 sm:p-4 pb-9 sm:pb-10 border border-zinc-900/15 shadow-md -rotate-1 transition-transform duration-200 hover:rotate-0">
              {/* Top masking tape strips */}
              <div className="masking-tape pointer-events-none absolute -top-3.5 left-7 h-6 sm:h-7 w-20 sm:w-24 -rotate-12" />
              <div className="masking-tape pointer-events-none absolute -top-3.5 right-7 h-6 sm:h-7 w-20 sm:w-24 rotate-12" />

              <ImagePlaceholder
                label={designerProfile.aboutMainPortrait.label}
                placeholderPath={designerProfile.aboutMainPortrait.placeholderPath}
                imageSrc={designerProfile.aboutMainPortrait.imageSrc}
                aspectRatio="3:4"
                blueprint="portrait"
                imgClassName="object-top"
              />
              <p className="mt-3.5 text-center font-hand text-base sm:text-lg font-medium tracking-wide text-black -rotate-[0.5deg]">
                {designerProfile.aboutMainPortrait.caption}
              </p>
            </div>
          </div>

          {/* Right column: Personal introduction + 7 sticker-inspired software tool logos */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-10">
            <div className="space-y-5">
              {designerProfile.aboutBio.map((paragraph, idx) => (
                <p
                  key={idx}
                  className="font-hand text-2xl sm:text-[1.75rem] lg:text-[2rem] leading-[1.45] text-zinc-900"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Software & Tools Stickers */}
            <div className="pt-2">
              <div className="mb-6 flex items-center gap-2.5">
                <span className="font-hand text-xl sm:text-2xl font-bold text-zinc-700">
                  SOFTWARE &amp; TOOLS
                </span>
                <svg viewBox="0 0 36 22" className="w-7 h-5 lg:w-8 lg:h-6 text-zinc-700" fill="none" aria-hidden="true">
                  <path
                    d="M2 5 Q18 6 24 18 M19 14 L24 19 L29 13"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <ul
                aria-label="Software and design tools"
                className="m-0 flex list-none flex-wrap items-center gap-x-5 gap-y-7 p-0 pt-3 pb-2 sm:gap-x-6 sm:gap-y-8"
              >
                {softwareToolsList.map((tool) => {
                  const isActive = activeToolId === tool.id;
                  return (
                    <li
                      key={tool.id}
                      className={`group relative ${tool.offsetClass}`}
                    >
                      {/* Hover / Focus / Tap Software Name Label */}
                      <span
                        aria-hidden="true"
                        className={`pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap border border-zinc-900 bg-zinc-900 px-2.5 py-1 font-display text-xs sm:text-sm font-bold uppercase tracking-wider text-[#FAF8F3] shadow-[2px_2px_0_#F6C93B] transition-all duration-150 ${
                          isActive
                            ? 'opacity-100 translate-y-0'
                            : 'opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:translate-y-0'
                        }`}
                      >
                        {tool.name}
                      </span>

                      <button
                        type="button"
                        aria-label={tool.name}
                        onClick={() => setActiveToolId((prev) => (prev === tool.id ? null : tool.id))}
                        onMouseLeave={() => setActiveToolId((prev) => (prev === tool.id ? null : prev))}
                        onBlur={() => setActiveToolId((prev) => (prev === tool.id ? null : prev))}
                        style={
                          {
                            '--tool-rotate': `${tool.rotateDeg}deg`,
                          } as CSSProperties
                        }
                        className={`relative flex items-center justify-center bg-transparent p-0 ${tool.sizeClass} [transform:rotate(var(--tool-rotate))] transition-transform duration-200 ease-out group-hover:[transform:rotate(0deg)_scale(1.08)_translateY(-4px)] group-focus-visible:[transform:rotate(0deg)_scale(1.08)_translateY(-4px)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-900 cursor-pointer select-none`}
                      >
                        <img
                          src={tool.imageSrc}
                          alt={tool.name}
                          loading="lazy"
                          className="h-full w-full object-contain drop-shadow-[0_3px_6px_rgba(24,24,27,0.14)] pointer-events-none"
                        />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
