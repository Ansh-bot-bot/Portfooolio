import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import type { BlueprintKind, ProjectFolderItem } from '../data/portfolioData';

interface ProjectFolderProps {
  project: ProjectFolderItem;
  index: number;
  onOpen: (projectId: string) => void;
}

function getStackedPlacementClasses(index: number): string {
  const overlap = index === 0 ? '' : '-mt-12 sm:-mt-14 lg:-mt-[76px]';
  return `mx-auto w-full ${overlap}`;
}

function IntegratedArtwork({ kind, isDark }: { kind: BlueprintKind; isDark: boolean }) {
  const stroke = isDark ? '#F6C93B' : '#18181B';
  const fillPrimary = isDark ? '#F6C93B' : '#FFFFFF';
  const fillSecondary = isDark ? '#FAF8F3' : '#18181B';

  switch (kind) {
    case 'identity':
      return (
        <svg viewBox="0 0 240 150" className="w-full h-full max-w-[230px]" aria-hidden="true">
          <rect x="28" y="24" width="104" height="100" rx="10" fill={fillPrimary} fillOpacity="0.22" stroke={stroke} strokeWidth="1.75" />
          <circle cx="80" cy="74" r="26" fill={fillPrimary} fillOpacity="0.45" stroke={stroke} strokeWidth="1.75" />
          <rect x="144" y="24" width="68" height="44" rx="8" fill={fillPrimary} fillOpacity="0.35" stroke={stroke} strokeWidth="1.75" />
          <rect x="144" y="80" width="68" height="44" rx="8" fill={fillSecondary} fillOpacity="0.1" stroke={stroke} strokeWidth="1.75" />
        </svg>
      );
    case 'social':
      return (
        <svg viewBox="0 0 240 150" className="w-full h-full max-w-[230px]" aria-hidden="true">
          <rect x="24" y="20" width="56" height="108" rx="10" fill={fillPrimary} fillOpacity="0.25" stroke={stroke} strokeWidth="1.75" />
          <rect x="92" y="20" width="56" height="108" rx="10" fill={fillPrimary} fillOpacity="0.45" stroke={stroke} strokeWidth="1.75" />
          <rect x="160" y="20" width="56" height="108" rx="10" fill={fillSecondary} fillOpacity="0.12" stroke={stroke} strokeWidth="1.75" />
          <circle cx="52" cy="54" r="12" stroke={stroke} strokeWidth="1.5" fill="none" />
          <line x1="104" y1="58" x2="136" y2="58" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
          <line x1="104" y1="70" x2="128" y2="70" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case 'banners':
      return (
        <svg viewBox="0 0 240 150" className="w-full h-full max-w-[230px]" aria-hidden="true">
          <rect x="20" y="20" width="200" height="58" rx="10" fill={fillPrimary} fillOpacity="0.4" stroke={stroke} strokeWidth="1.75" />
          <line x1="38" y1="42" x2="132" y2="42" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
          <rect x="160" y="36" width="42" height="24" rx="6" fill={stroke} fillOpacity="0.85" />
          <rect x="20" y="90" width="94" height="40" rx="8" fill={fillPrimary} fillOpacity="0.2" stroke={stroke} strokeWidth="1.75" />
          <rect x="126" y="90" width="94" height="40" rx="8" fill={fillPrimary} fillOpacity="0.2" stroke={stroke} strokeWidth="1.75" />
        </svg>
      );
    case 'ai-photo':
    case 'ai-visual':
      return (
        <svg viewBox="0 0 240 150" className="w-full h-full max-w-[230px]" aria-hidden="true">
          <circle cx="120" cy="75" r="46" fill={fillPrimary} fillOpacity="0.26" stroke={stroke} strokeWidth="1.75" />
          <circle cx="120" cy="75" r="26" fill={fillPrimary} fillOpacity="0.45" stroke={stroke} strokeWidth="1.75" />
          <path d="M44 34 L62 34 M44 34 L44 52" stroke={stroke} strokeWidth="1.75" strokeLinecap="round" fill="none" />
          <path d="M196 34 L178 34 M196 34 L196 52" stroke={stroke} strokeWidth="1.75" strokeLinecap="round" fill="none" />
          <path d="M44 116 L62 116 M44 116 L44 98" stroke={stroke} strokeWidth="1.75" strokeLinecap="round" fill="none" />
          <path d="M196 116 L178 116 M196 116 L196 98" stroke={stroke} strokeWidth="1.75" strokeLinecap="round" fill="none" />
        </svg>
      );
    case 'uiux':
      return (
        <svg viewBox="0 0 240 150" className="w-full h-full max-w-[230px]" aria-hidden="true">
          <rect x="22" y="22" width="144" height="104" rx="10" fill={fillPrimary} fillOpacity="0.24" stroke={stroke} strokeWidth="1.75" />
          <line x1="22" y1="44" x2="166" y2="44" stroke={stroke} strokeWidth="1.5" />
          <rect x="36" y="56" width="54" height="52" rx="6" fill={fillPrimary} fillOpacity="0.38" stroke={stroke} strokeWidth="1.5" />
          <line x1="102" y1="62" x2="148" y2="62" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" />
          <line x1="102" y1="76" x2="140" y2="76" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
          <rect x="178" y="42" width="40" height="84" rx="9" fill={fillPrimary} fillOpacity="0.4" stroke={stroke} strokeWidth="1.75" />
        </svg>
      );
    case 'illustration':
      return (
        <svg viewBox="0 0 240 150" className="w-full h-full max-w-[230px]" aria-hidden="true">
          <path d="M42 108 Q90 20 132 82 T198 44" fill="none" stroke={stroke} strokeWidth="2.4" strokeLinecap="round" />
          <circle cx="94" cy="54" r="16" fill={fillPrimary} fillOpacity="0.38" stroke={stroke} strokeWidth="1.75" />
          <polygon points="158,82 190,118 134,118" fill={fillPrimary} fillOpacity="0.45" stroke={stroke} strokeWidth="1.75" strokeLinejoin="round" />
        </svg>
      );
    case 'packaging':
    case 'graphic':
    default:
      return (
        <svg viewBox="0 0 240 150" className="w-full h-full max-w-[230px]" aria-hidden="true">
          <polygon points="62,40 120,18 178,40 120,62" fill={fillPrimary} fillOpacity="0.45" stroke={stroke} strokeWidth="1.75" strokeLinejoin="round" />
          <polygon points="62,40 120,62 120,128 62,106" fill={fillPrimary} fillOpacity="0.3" stroke={stroke} strokeWidth="1.75" strokeLinejoin="round" />
          <polygon points="178,40 120,62 120,128 178,106" fill={fillSecondary} fillOpacity="0.14" stroke={stroke} strokeWidth="1.75" strokeLinejoin="round" />
        </svg>
      );
  }
}

export function ProjectFolder({ project, index, onOpen }: ProjectFolderProps) {
  const prefersReducedMotion = useReducedMotion();
  const [imgError, setImgError] = useState(false);

  const isDark = project.textColor === '#FFFFFF';
  const tabTextColor = project.isCharcoalYellow ? '#18181B' : project.textColor;
  const hasImage = Boolean(project.coverImage.imageSrc && !imgError);

  return (
    <motion.article
      data-project-id={project.id}
      data-project-index={index}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={
        prefersReducedMotion
          ? undefined
          : {
              y: -6,
              transition: { type: 'spring', stiffness: 320, damping: 24 },
            }
      }
      viewport={{ once: true, amount: 0.14 }}
      transition={{
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ zIndex: index + 1 }}
      className={`group relative hover:!z-20 focus-within:!z-20 ${getStackedPlacementClasses(index)}`}
    >
      <div className="relative drop-shadow-[0_14px_26px_rgba(24,24,27,0.14)] transition-all duration-200 group-hover:drop-shadow-[0_20px_34px_rgba(24,24,27,0.2)]">
        {/* Back Folder Silhouette (extends from top rim shelf down behind front pocket) */}
        <div
          aria-hidden="true"
          style={{ backgroundColor: project.tabBg }}
          className="pointer-events-none absolute inset-x-0 top-[18px] sm:top-[20px] bottom-[2px] rounded-t-[18px] sm:rounded-t-[24px] rounded-b-[20px] sm:rounded-b-[28px]"
        />

        {/* Integrated Upper-Left Raised Folder Tab + Smooth Curved Shoulder */}
        <div className="relative z-10 flex h-[44px] sm:h-[50px] items-start">
          <button
            type="button"
            onClick={() => onOpen(project.id)}
            style={{ backgroundColor: project.tabBg, color: tabTextColor }}
            className="inline-flex h-full items-start gap-2 rounded-tl-[18px] sm:rounded-tl-[24px] pl-5 pr-3 sm:pl-8 sm:pr-5 pt-[9px] sm:pt-[11px] text-[11px] sm:text-xs font-extrabold tracking-widest uppercase cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
          >
            <span aria-hidden="true" className="text-[10px] leading-none mt-0.5">
              ✦
            </span>
            <span className="whitespace-nowrap leading-none">{project.number}</span>
          </button>

          {/* Smooth curved shoulder connecting upper-left tab to folder top edge */}
          <svg
            viewBox="0 0 64 44"
            preserveAspectRatio="none"
            aria-hidden="true"
            className="pointer-events-none -ml-px h-full w-[56px] sm:w-[68px] shrink-0"
          >
            <path
              d="M 0 0 L 6 0 C 26 0, 30 18, 56 18 L 64 18 L 64 44 L 0 44 Z"
              fill={project.tabBg}
            />
          </svg>
        </div>

        {/* Wide Landscape Folder Body */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => onOpen(project.id)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onOpen(project.id);
            }
          }}
          style={{
            backgroundColor: project.accentBg,
            color: project.textColor,
          }}
          aria-label={`Open ${project.number}: ${project.title}`}
          className={`relative z-20 -mt-[12px] sm:-mt-[14px] w-full cursor-pointer rounded-[20px] sm:rounded-[28px] px-6 pt-5 pb-14 sm:px-9 sm:pt-7 sm:pb-[66px] lg:px-11 lg:pt-8 lg:pb-[84px] transition-shadow duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 ${
            project.isCharcoalYellow
              ? 'shadow-[inset_0_1px_0_rgba(255,255,255,0.16)]'
              : 'shadow-[inset_0_1.5px_0_rgba(255,255,255,0.38)]'
          }`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-12 items-center gap-5 sm:gap-8 lg:gap-10">
            {/* Left: Project Title + Short Summary */}
            <div className="sm:col-span-6 space-y-2.5 sm:space-y-3">
              <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight leading-[0.98] text-balance">
                {project.title}
              </h3>

              <p
                style={{ color: project.mutedTextColor }}
                className="text-sm sm:text-base leading-snug max-w-md"
              >
                {project.summary}
              </p>
            </div>

            {/* Right: Landscape Preview Artwork */}
            <div className="sm:col-span-6">
              {hasImage ? (
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[14px] sm:rounded-[18px] shadow-[0_6px_18px_rgba(24,24,27,0.12)]">
                  <img
                    src={project.coverImage.imageSrc}
                    alt={project.coverImage.label}
                    referrerPolicy="no-referrer"
                    onError={() => setImgError(true)}
                    className={`h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02] ${
                      project.coverImage.imgClassName ?? 'object-center'
                    }`}
                  />
                </div>
              ) : (
                <div
                  className={`relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden rounded-[14px] sm:rounded-[18px] p-5 transition-transform duration-300 group-hover:scale-[1.01] ${
                    isDark ? 'bg-white/[0.06]' : 'bg-white/[0.18]'
                  }`}
                >
                  <IntegratedArtwork kind={project.coverImage.blueprint} isDark={isDark} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
