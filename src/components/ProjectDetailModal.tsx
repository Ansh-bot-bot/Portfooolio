import { useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import { useReducedMotion } from 'motion/react';
import type { ProjectFolderItem } from '../data/portfolioData';
import { ImagePlaceholder } from './ImagePlaceholder';

interface ProjectDetailModalProps {
  project: ProjectFolderItem | null;
  currentIndex: number;
  totalProjects: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export function ProjectDetailModal({
  project,
  currentIndex,
  totalProjects,
  onClose,
  onPrev,
  onNext,
}: ProjectDetailModalProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [project?.id]);

  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [project, onClose, onNext, onPrev]);

  if (!project) return null;

  const hasScrollShowcase = Boolean(project.caseStudyScrollImages && project.caseStudyScrollImages.length > 0);
  const fallbackImages = [project.coverImage, ...project.gallery];
  const counterLabel = `${String(currentIndex + 1).padStart(2, '0')} / ${String(totalProjects).padStart(2, '0')}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-detail-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/75 p-1.5 sm:p-3 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex h-[94dvh] max-h-[94dvh] w-[95vw] max-w-none flex-col overflow-hidden border-[1.5px] border-zinc-900 bg-[#FAF8F3] shadow-2xl"
      >
        {/* Top Folder Header Bar (remains pinned while body scrolls) */}
        <div
          style={{ backgroundColor: project.accentBg, color: project.textColor }}
          className="shrink-0 flex flex-wrap items-center justify-between gap-2.5 border-b border-zinc-900/15 px-3.5 py-2 sm:px-6 sm:py-2.5"
        >
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold tabular-nums px-2.5 py-1 bg-white text-zinc-900 border border-zinc-900/20">
              {counterLabel}
            </span>
            <span
              id={hasScrollShowcase ? 'project-detail-title' : undefined}
              className="text-xs font-extrabold tracking-widest uppercase"
            >
              {project.number} · {project.category}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onPrev}
              aria-label="Previous project"
              className="inline-flex items-center gap-1.5 border border-zinc-900/25 bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-zinc-900 hover:bg-[#F6C93B] cursor-pointer focus-visible:outline-2 focus-visible:outline-zinc-900"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="hidden sm:inline">Prev</span>
            </button>
            <button
              type="button"
              onClick={onNext}
              aria-label="Next project"
              className="inline-flex items-center gap-1.5 border border-zinc-900/25 bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-zinc-900 hover:bg-[#F6C93B] cursor-pointer focus-visible:outline-2 focus-visible:outline-zinc-900"
            >
              <span className="hidden sm:inline">Next</span>
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Back to Work"
              className="inline-flex items-center gap-1.5 border border-zinc-900 bg-zinc-900 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-zinc-800 cursor-pointer focus-visible:outline-2 focus-visible:outline-white"
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Back to Work</span>
            </button>
          </div>
        </div>

        {/* Body: Full-Width Continuous Vertical Presentation */}
        {hasScrollShowcase ? (
          <div
            ref={scrollContainerRef}
            className="flex-1 overflow-y-auto scroll-smooth bg-[#FAF8F3] px-1.5 sm:px-3 py-1.5 sm:py-3"
          >
            <div className="mx-auto flex w-full flex-col gap-0">
              {project.caseStudyScrollImages!.map((item, idx) =>
                item.mediaType === 'video' ? (
                  <video
                    key={item.id}
                    src={item.imageSrc}
                    aria-label={item.label}
                    autoPlay={!prefersReducedMotion}
                    muted
                    loop
                    playsInline
                    controls={!item.hideControls || Boolean(prefersReducedMotion)}
                    preload="auto"
                    className="block w-full h-auto"
                  />
                ) : (
                  <img
                    key={item.id}
                    src={item.imageSrc}
                    alt={item.label}
                    referrerPolicy="no-referrer"
                    loading={idx === 0 || item.imageSrc.toLowerCase().endsWith('.gif') ? 'eager' : 'lazy'}
                    className="block w-full h-auto select-none"
                  />
                )
              )}
            </div>
          </div>
        ) : (
          <div
            ref={scrollContainerRef}
            className="flex-1 overflow-y-auto scroll-smooth bg-[#FAF8F3] px-1.5 sm:px-3 py-1.5 sm:py-3"
          >
            <div className="mx-auto flex w-full flex-col gap-0">
              {/* Continuous Vertical Artwork Stack */}
              {fallbackImages.map((img) => (
                <div key={img.id} className="w-full">
                  {img.imageSrc ? (
                    <img
                      src={img.imageSrc}
                      alt={img.label}
                      referrerPolicy="no-referrer"
                      className="block w-full h-auto select-none"
                    />
                  ) : (
                    <ImagePlaceholder
                      label={img.label}
                      placeholderPath={img.placeholderPath}
                      imageSrc={img.imageSrc}
                      aspectRatio="16:10"
                      blueprint={img.blueprint}
                    />
                  )}
                  {img.caption && (
                    <p className="px-2 pt-2 pb-5 font-hand text-lg sm:text-xl text-zinc-700">
                      {img.caption}
                    </p>
                  )}
                </div>
              ))}

              {/* Project Description Placed Below Artwork */}
              <div className="mt-4 border-t border-zinc-900/15 px-3 py-8 sm:px-6 sm:py-10 space-y-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
                    {project.yearPlaceholder}
                  </p>
                  <h2
                    id="project-detail-title"
                    className="mt-1 font-display text-4xl sm:text-5xl font-extrabold tracking-tight leading-[0.95] text-zinc-900"
                  >
                    {project.title}
                  </h2>
                </div>

                <div className="max-w-3xl space-y-3 text-sm sm:text-base leading-relaxed text-zinc-700">
                  <p className="font-medium text-zinc-900">{project.overview}</p>
                  <p>{project.approach}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-zinc-900/10 pt-5 max-w-3xl">
                  <div>
                    <h3 className="text-xs font-extrabold uppercase tracking-widest text-zinc-500 mb-2">
                      Deliverables
                    </h3>
                    <ul className="space-y-1 text-sm text-zinc-800">
                      {project.deliverables.map((item) => (
                        <li key={item} className="flex items-center gap-2">
                          <span className="text-xs text-zinc-400" aria-hidden="true">
                            —
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xs font-extrabold uppercase tracking-widest text-zinc-500 mb-1.5">
                      Tools &amp; Workflow
                    </h3>
                    <p className="text-sm text-zinc-700">{project.tools.join(' · ')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
