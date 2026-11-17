import { useEffect, useRef, useState } from 'react';
import { projectsList } from '../data/portfolioData';
import { useSound } from '../context/SoundContext';
import { ProjectDetailModal } from './ProjectDetailModal';
import { ProjectFolder } from './ProjectFolder';

export function WorkSection() {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [visibleProjectIdx, setVisibleProjectIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { playPaperTurn, playPaperClose } = useSound();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = Array.from(container.querySelectorAll<HTMLElement>('[data-project-index]'));
    if (cards.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          const idx = Number(visible[0].target.getAttribute('data-project-index'));
          if (!Number.isNaN(idx)) {
            setVisibleProjectIdx(idx);
          }
        }
      },
      {
        rootMargin: '-20% 0px -35% 0px',
        threshold: [0.15, 0.35, 0.6],
      }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  const selectedIndex = projectsList.findIndex((p) => p.id === selectedProjectId);
  const selectedProject = selectedIndex >= 0 ? projectsList[selectedIndex] : null;

  const handleOpen = (id: string) => {
    playPaperTurn();
    setSelectedProjectId(id);
  };

  const handleClose = () => {
    playPaperClose();
    setSelectedProjectId(null);
  };

  const handlePrev = () => {
    if (selectedIndex < 0) return;
    playPaperTurn();
    const prevIdx = (selectedIndex - 1 + projectsList.length) % projectsList.length;
    setSelectedProjectId(projectsList[prevIdx].id);
  };

  const handleNext = () => {
    if (selectedIndex < 0) return;
    playPaperTurn();
    const nextIdx = (selectedIndex + 1) % projectsList.length;
    setSelectedProjectId(projectsList[nextIdx].id);
  };

  return (
    <section id="work" className="relative overflow-x-clip px-5 pt-8 pb-24 sm:px-10 sm:pt-12 sm:pb-28 lg:px-14">
      <div className="mx-auto max-w-7xl">
        {/* Section Header + Live Animated Project Counter */}
        <div className="md:sticky md:top-[53px] z-30 mb-10 flex flex-wrap items-center justify-between gap-4 border-y border-zinc-900/15 bg-[#FAF8F3]/95 px-4 py-3.5 backdrop-blur-xs">
          <div className="flex items-baseline gap-3.5">
            <h2 className="font-display text-4xl sm:text-5xl font-extrabold uppercase tracking-tight text-zinc-900">
              Selected Work
            </h2>
            <span className="hidden sm:inline font-hand text-xl sm:text-2xl text-zinc-600">
              click folder to open
            </span>
          </div>

          <div className="flex items-center gap-3.5">
            <span className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-zinc-500 hidden sm:inline">
              {projectsList[visibleProjectIdx]?.category}
            </span>
            <div
              aria-live="polite"
              className="inline-flex items-center gap-1 border border-zinc-900 bg-[#F6C93B] px-3.5 py-1.5 font-mono text-xs sm:text-sm font-bold tabular-nums text-zinc-900 shadow-[2px_2px_0_#18181b]"
            >
              <span>{String(visibleProjectIdx + 1).padStart(2, '0')}</span>
              <span>/</span>
              <span>{String(projectsList.length).padStart(2, '0')}</span>
            </div>
          </div>
        </div>

        {/* 7 Stacked, Center-Aligned Landscape Project Folders */}
        <div
          ref={containerRef}
          className="relative mx-auto w-full flex flex-col pt-2 pb-10"
        >
          {projectsList.map((project, idx) => (
            <ProjectFolder
              key={project.id}
              project={project}
              index={idx}
              onOpen={handleOpen}
            />
          ))}
        </div>
      </div>

      {/* Expanded Folder Presentation Modal */}
      <ProjectDetailModal
        project={selectedProject}
        currentIndex={selectedIndex}
        totalProjects={projectsList.length}
        onClose={handleClose}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </section>
  );
}
