import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { designerProfile } from '../data/portfolioData';
import { useSound } from '../context/SoundContext';
import { NameSpotlightEffect } from './NameSpotlightEffect';

interface HeroSectionProps {
  onContactClick: () => void;
}

export function HeroSection({ onContactClick }: HeroSectionProps) {
  const { playClick } = useSound();
  const prefersReducedMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const nameStageRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // Slight, independent scroll-responsive drift for each of the four stickers
  const topLeftScrollY = useTransform(scrollYProgress, [0, 1], [0, -14]);
  const topLeftScrollRot = useTransform(scrollYProgress, [0, 1], [0, -1.5]);

  const topRightScrollY = useTransform(scrollYProgress, [0, 1], [0, -10]);
  const topRightScrollRot = useTransform(scrollYProgress, [0, 1], [0, 1.5]);

  const bottomLeftScrollY = useTransform(scrollYProgress, [0, 1], [0, 10]);
  const bottomLeftScrollRot = useTransform(scrollYProgress, [0, 1], [0, -1.2]);

  const bottomRightScrollY = useTransform(scrollYProgress, [0, 1], [0, 13]);
  const bottomRightScrollRot = useTransform(scrollYProgress, [0, 1], [0, 1.2]);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative flex min-h-[calc(100svh-56px)] sm:min-h-[calc(100svh-76px)] lg:min-h-[calc(100svh-82px)] flex-col justify-between px-5 pt-8 pb-6 sm:px-10 sm:pt-10 sm:pb-8"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center text-center py-4 sm:py-6">
        {/* Handwritten intro line */}
        <div className="mb-3 sm:mb-4 inline-flex flex-col items-center">
          <span className="font-hand text-2xl sm:text-3xl lg:text-[2.25rem] font-semibold text-zinc-800">
            {designerProfile.handwrittenIntro}
          </span>
          <svg
            viewBox="0 0 110 10"
            className="w-24 sm:w-28 lg:w-32 h-2.5 text-zinc-800 -mt-1"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M4 6 C32 2, 76 8, 106 4"
              stroke="currentColor"
              strokeWidth="1.9"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Name stage with irregular hand-drawn frame + floating stickers */}
        <div
          ref={nameStageRef}
          className="relative mt-2 mb-7 lg:mb-8 inline-block px-7 py-5 sm:px-16 sm:py-8 lg:px-24 lg:py-10"
        >
          {/* Interactive illustrated desk lamp spotlight — remove this single line to disable */}
          <NameSpotlightEffect stageRef={nameStageRef} proximityRef={heroRef} />
          {/* Top-left floating sticker: CURIOUS BY DESIGN */}
          <motion.div
            data-hero-sticker="curious"
            style={
              prefersReducedMotion
                ? undefined
                : { y: topLeftScrollY, rotate: topLeftScrollRot }
            }
            className="hidden sm:block absolute -top-5 -left-10 lg:-top-6 lg:-left-14 z-20 will-change-transform"
          >
            <motion.div
              animate={
                prefersReducedMotion
                  ? { y: 0, rotate: -4 }
                  : {
                      y: [-3, 2.5, -3],
                      rotate: [-4.9, -3.1, -4.9],
                    }
              }
              transition={
                prefersReducedMotion
                  ? undefined
                  : {
                      duration: 5.4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }
              }
              className="inline-flex items-center rounded-[11px_13px_10px_12px] px-3.5 py-1.5 lg:px-4 lg:py-2 text-xs lg:text-[13px] font-bold tracking-wider uppercase border border-zinc-900/20 bg-[#FF4FA3] text-zinc-950 shadow-sm whitespace-nowrap select-none"
            >
              CURIOUS BY DESIGN
            </motion.div>
          </motion.div>

          {/* Top-right floating sticker: PACKED WITH IDEAS */}
          <motion.div
            data-hero-sticker="ideas"
            style={
              prefersReducedMotion
                ? undefined
                : { y: topRightScrollY, rotate: topRightScrollRot }
            }
            className="hidden sm:block absolute -top-4 -right-12 lg:-top-5 lg:-right-16 z-20 will-change-transform"
          >
            <motion.div
              animate={
                prefersReducedMotion
                  ? { y: 0, rotate: 3.5 }
                  : {
                      y: [2.5, -3.5, 2.5],
                      rotate: [2.6, 4.4, 2.6],
                    }
              }
              transition={
                prefersReducedMotion
                  ? undefined
                  : {
                      duration: 6.3,
                      delay: 0.4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }
              }
              className="inline-flex items-center rounded-[12px_10px_13px_11px] px-3.5 py-1.5 lg:px-4 lg:py-2 text-xs lg:text-[13px] font-bold tracking-wider uppercase border border-zinc-900/20 bg-[#FFD500] text-zinc-950 shadow-sm whitespace-nowrap select-none"
            >
              PACKED WITH IDEAS
            </motion.div>
          </motion.div>

          {/* Irregular hand-drawn rectangular SVG outline */}
          <svg
            viewBox="0 0 520 150"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 h-full w-full"
            aria-hidden="true"
          >
            <path
              d="M12 16 C140 8, 370 11, 506 14 C512 52, 510 102, 508 134 C355 141, 165 138, 10 136 C7 98, 9 54, 12 16 Z"
              fill="#FAF8F3"
              fillOpacity="0.6"
              stroke="#F16D43"
              strokeWidth="2.75"
              strokeLinejoin="round"
            />
          </svg>

          <h1 className="relative z-10 font-display text-6xl sm:text-8xl md:text-[8.5rem] lg:text-[10rem] xl:text-[10.75rem] font-extrabold uppercase tracking-tight leading-[0.88] text-zinc-900 select-none">
            {designerProfile.name}
          </h1>
        </div>

        {/* Designation label, centered availability label & handwritten arrows below name box */}
        <div className="relative flex flex-col sm:flex-row sm:flex-wrap lg:grid lg:grid-cols-[1fr_auto_1fr] items-center justify-center gap-3.5 sm:gap-5 lg:gap-7 w-full mb-10 lg:mb-11">
          <div className="inline-flex items-center justify-center lg:justify-self-end gap-2.5">
            <motion.div
              data-hero-sticker="visuals"
              style={
                prefersReducedMotion
                  ? undefined
                  : { y: bottomLeftScrollY, rotate: bottomLeftScrollRot }
              }
              className="will-change-transform"
            >
              <motion.span
                animate={
                  prefersReducedMotion
                    ? { y: 0, rotate: -1 }
                    : {
                        y: [-2.5, 3, -2.5],
                        rotate: [-2.1, -0.1, -2.1],
                      }
                }
                transition={
                  prefersReducedMotion
                    ? undefined
                    : {
                        duration: 5.9,
                        delay: 0.9,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }
                }
                className="inline-block rounded-[12px_10px_13px_11px] bg-[#00B978] border border-zinc-900/25 px-3.5 py-1.5 lg:px-4 lg:py-2 font-hand text-lg sm:text-xl lg:text-2xl font-bold text-zinc-950 shadow-xs text-center whitespace-nowrap select-none"
              >
                THINKING IN VISUALS
              </motion.span>
            </motion.div>
            <svg viewBox="0 0 28 24" className="hidden sm:block w-6 h-6 lg:w-7 lg:h-7 text-zinc-800 -mt-3 shrink-0" fill="none" aria-hidden="true">
              <path d="M4 20 Q16 14 20 4 M14 6 L20 4 L23 10" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <span className="inline-flex items-center justify-center justify-self-center px-3 py-1 text-center text-xs lg:text-sm font-semibold uppercase tracking-widest text-zinc-600">
            {designerProfile.availabilityLabel}
          </span>

          <div className="inline-flex items-center justify-center lg:justify-self-start gap-2.5">
            <svg viewBox="0 0 28 24" className="hidden sm:block w-6 h-6 lg:w-7 lg:h-7 text-zinc-800 -mt-3 shrink-0" fill="none" aria-hidden="true">
              <path d="M24 20 Q12 14 8 4 M14 6 L8 4 L5 10" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <motion.div
              data-hero-sticker="experimenting"
              style={
                prefersReducedMotion
                  ? undefined
                  : { y: bottomRightScrollY, rotate: bottomRightScrollRot }
              }
              className="will-change-transform"
            >
              <motion.span
                animate={
                  prefersReducedMotion
                    ? { y: 0, rotate: 1 }
                    : {
                        y: [3, -2.5, 3],
                        rotate: [0.1, 2.1, 0.1],
                      }
                }
                transition={
                  prefersReducedMotion
                    ? undefined
                    : {
                        duration: 6.8,
                        delay: 1.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }
                }
                className="inline-block rounded-[11px_13px_10px_12px] bg-[#4169FF] border border-zinc-900/25 px-3.5 py-1.5 lg:px-4 lg:py-2 font-hand text-lg sm:text-xl lg:text-2xl font-bold text-white shadow-xs text-center whitespace-nowrap select-none"
              >
                ALWAYS EXPERIMENTING
              </motion.span>
            </motion.div>
          </div>
        </div>

        {/* Core introduction */}
        <div className="relative w-full max-w-3xl flex items-center justify-center mb-10 lg:mb-12">
          <p className="max-w-2xl text-2xl sm:text-3xl lg:text-[2.25rem] font-bold tracking-tight leading-snug lg:leading-[1.25] text-zinc-900 text-balance">
            {designerProfile.heroSummary}
          </p>
        </div>

        {/* Primary CTA */}
        <div className="flex items-center justify-center">
          <button
            type="button"
            onClick={() => {
              playClick();
              onContactClick();
            }}
            className="group inline-flex items-center gap-3.5 bg-zinc-900 px-7 py-3.5 lg:px-8 lg:py-4 text-xs lg:text-sm font-bold tracking-widest uppercase text-white shadow-[5px_5px_0_#F6C93B] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[7px_7px_0_#F6C93B] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
          >
            <span className="inline-block h-3.5 w-3.5 lg:h-4 lg:w-4 bg-[#2E5BFF] border border-white/40 transition-transform group-hover:rotate-12" />
            <span>CONTACT ME</span>
          </button>
        </div>
      </div>

      {/* Gentle hand-drawn curved divider line */}
      <div className="mt-6 sm:mt-8 px-4">
        <svg viewBox="0 0 1000 24" className="w-full h-5 text-zinc-900/25" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 18 Q500 2 1000 18" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>
    </section>
  );
}
