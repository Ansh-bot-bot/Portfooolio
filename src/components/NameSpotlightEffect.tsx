import { useEffect, useId, useRef, useState, type RefObject } from 'react';
import { motion, useMotionValueEvent, useReducedMotion, useSpring, useTransform } from 'motion/react';
import { useSound } from '../context/SoundContext';

interface NameSpotlightEffectProps {
  /** Bounding container around the HARSHITA name box */
  stageRef: RefObject<HTMLDivElement | null>;
  /** Broader section used for cursor proximity detection */
  proximityRef?: RefObject<HTMLElement | null>;
}

/**
 * Self-contained illustrated desk lamp + warm spotlight effect for the hero name.
 * Remove this component and its single render call in HeroSection.tsx to disable cleanly.
 */
export function NameSpotlightEffect({ stageRef, proximityRef }: NameSpotlightEffectProps) {
  const uid = useId().replace(/:/g, '');
  const prefersReducedMotion = useReducedMotion();
  const { playTabTick } = useSound();

  const lampAnchorRef = useRef<HTMLButtonElement>(null);
  const lampHeadRef = useRef<SVGGElement>(null);

  const [isProximityLit, setIsProximityLit] = useState(false);
  const [isMobileLit, setIsMobileLit] = useState(false);
  const [isPinnedOn, setIsPinnedOn] = useState(false);

  // Smooth spring-driven lamp head tilt (in degrees) towards cursor
  const rawTilt = useSpring(0, {
    stiffness: prefersReducedMotion ? 500 : 185,
    damping: prefersReducedMotion ? 40 : 21,
    mass: 0.7,
  });

  // Derive subtle beam sweep & horizontal glow shift from lamp head tilt
  const beamRotate = useTransform(rawTilt, (deg) => deg * 0.48);
  const glowShiftX = useTransform(rawTilt, (deg) => -deg * 2.1);

  // Rotate lamp head strictly around SVG swivel pin (0, 0) without CSS fill-box drift
  useMotionValueEvent(rawTilt, 'change', (deg) => {
    if (lampHeadRef.current) {
      lampHeadRef.current.setAttribute('transform', `rotate(${deg.toFixed(2)})`);
    }
  });

  const isLit = isProximityLit || isMobileLit || isPinnedOn;

  // Desktop cursor proximity + directional head tracking
  useEffect(() => {
    const targetEl = proximityRef?.current ?? window;

    const handlePointerMove = (e: Event) => {
      const pe = e as PointerEvent;
      if (pe.pointerType === 'touch') return;
      const stage = stageRef.current;
      if (!stage) return;

      const rect = stage.getBoundingClientRect();
      const padX = 95;
      const padTop = 85;
      const padBottom = 70;

      const insideProximity =
        pe.clientX >= rect.left - padX &&
        pe.clientX <= rect.right + padX &&
        pe.clientY >= rect.top - padTop &&
        pe.clientY <= rect.bottom + padBottom;

      setIsProximityLit(insideProximity);

      if (!insideProximity || prefersReducedMotion) {
        if (!insideProximity) rawTilt.set(0);
        return;
      }

      // Compute angle from lamp head swivel toward cursor
      const lampRect = lampAnchorRef.current?.getBoundingClientRect();
      const originX = lampRect ? lampRect.left + lampRect.width * 0.5 : rect.left + rect.width * 0.74;
      const originY = lampRect ? lampRect.top + lampRect.height * 0.32 : rect.top;

      const dx = pe.clientX - originX;
      const dy = Math.max(45, pe.clientY - originY);
      const angleDeg = (Math.atan2(dx, dy) * 180) / Math.PI;

      // Positive angle rotates clockwise (tilts shade mouth left); negative tilts toward right
      const clampedTilt = Math.max(-16, Math.min(16, -angleDeg * 0.3));
      rawTilt.set(clampedTilt);
    };

    const handlePointerLeave = () => {
      setIsProximityLit(false);
      rawTilt.set(0);
    };

    targetEl.addEventListener('pointermove', handlePointerMove, { passive: true });
    if (proximityRef?.current) {
      proximityRef.current.addEventListener('pointerleave', handlePointerLeave);
    } else {
      document.addEventListener('mouseleave', handlePointerLeave);
    }

    return () => {
      targetEl.removeEventListener('pointermove', handlePointerMove);
      if (proximityRef?.current) {
        proximityRef.current.removeEventListener('pointerleave', handlePointerLeave);
      } else {
        document.removeEventListener('mouseleave', handlePointerLeave);
      }
    };
  }, [proximityRef, stageRef, rawTilt, prefersReducedMotion]);

  // Mobile / touch: trigger when entering viewport OR when name is tapped
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const isTouchDevice = () =>
      window.matchMedia('(hover: none), (pointer: coarse)').matches || window.innerWidth < 640;

    let timer: number | undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!isTouchDevice()) return;
        const entry = entries[0];
        if (!entry) return;
        window.clearTimeout(timer);
        if (entry.isIntersecting) {
          timer = window.setTimeout(() => setIsMobileLit(true), 160);
        } else {
          setIsMobileLit(false);
        }
      },
      { threshold: 0.45 }
    );

    observer.observe(stage);

    const handleStageTap = (e: PointerEvent) => {
      if (e.pointerType !== 'touch' && window.innerWidth >= 640) return;
      if ((e.target as HTMLElement)?.closest('[data-hero-sticker]')) return;
      setIsMobileLit((prev) => {
        const next = !prev;
        if (next) playTabTick();
        return next;
      });
    };

    stage.addEventListener('pointerup', handleStageTap);

    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
      stage.removeEventListener('pointerup', handleStageTap);
    };
  }, [stageRef, playTabTick]);

  const beamGradId = `beam-grad-${uid}`;
  const beamGrainId = `beam-grain-${uid}`;
  const haloGradId = `halo-grad-${uid}`;
  const beamFeatherMaskId = `beam-feather-${uid}`;
  const beamFeatherGradId = `beam-feather-grad-${uid}`;

  return (
    <div
      data-name-spotlight
      data-lit={isLit ? 'true' : 'false'}
      className="pointer-events-none absolute inset-0"
      aria-hidden="false"
    >
      {/* 1. Soft warm illuminated paper halo + textured organic spotlight beam behind HARSHITA */}
      <div className="pointer-events-none absolute inset-0 overflow-visible z-[2]">
        {/* Soft warm glow around name */}
        <motion.div
          style={prefersReducedMotion ? undefined : { x: glowShiftX }}
          animate={{
            opacity: isLit ? 1 : 0,
            scale: isLit ? 1 : 0.94,
          }}
          transition={{ duration: prefersReducedMotion ? 0.15 : 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-x-3 inset-y-2 rounded-[36px]"
        >
          <svg viewBox="0 0 600 220" preserveAspectRatio="none" className="h-full w-full overflow-visible" aria-hidden="true">
            <defs>
              <radialGradient id={haloGradId} cx="52%" cy="52%" r="50%">
                <stop offset="0%" stopColor="#FFF282" stopOpacity="0.6" />
                <stop offset="48%" stopColor="#FFE14D" stopOpacity="0.32" />
                <stop offset="82%" stopColor="#F6C93B" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#F6C93B" stopOpacity="0" />
              </radialGradient>
            </defs>
            <ellipse cx="300" cy="112" rx="280" ry="92" fill={`url(#${haloGradId})`} />
          </svg>
        </motion.div>

        {/* Beam slot locked to exact same horizontal anchor as the lamp so apex meets the bulb at every viewport */}
        <div className="pointer-events-none absolute -top-[18px] right-[5%] h-[calc(100%+18px)] w-[58px] sm:-top-[22px] sm:right-[21%] sm:h-[calc(100%+22px)] sm:w-[70px] lg:-top-[24px] lg:right-[22%] lg:h-[calc(100%+24px)] lg:w-[76px]">
          <motion.div
            animate={{
              opacity: isLit ? 1 : 0,
              scaleY: isLit ? 1 : 0.88,
            }}
            transition={{ duration: prefersReducedMotion ? 0.15 : 0.42, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: '32% 0%' }}
            className="relative h-full w-full overflow-visible"
          >
            <motion.svg
              viewBox="-460 0 600 260"
              preserveAspectRatio="none"
              style={prefersReducedMotion ? undefined : { rotate: beamRotate, transformOrigin: '74% 2%' }}
              className="absolute -left-[431%] top-0 h-full w-[625%] overflow-visible sm:-left-[546%] sm:w-[780%] lg:-left-[554%] lg:w-[790%]"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id={beamGradId} x1="65%" y1="0%" x2="36%" y2="88%">
                  <stop offset="0%" stopColor="#FFF59D" stopOpacity="0.82" />
                  <stop offset="28%" stopColor="#FFE45E" stopOpacity="0.5" />
                  <stop offset="70%" stopColor="#F6C93B" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#F6C93B" stopOpacity="0" />
                </linearGradient>

                {/* Vertical feather mask so the bottom edge dissolves seamlessly inside the paper frame */}
                <linearGradient id={beamFeatherGradId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="white" stopOpacity="1" />
                  <stop offset="62%" stopColor="white" stopOpacity="0.9" />
                  <stop offset="82%" stopColor="white" stopOpacity="0.26" />
                  <stop offset="93%" stopColor="white" stopOpacity="0" />
                </linearGradient>
                <mask id={beamFeatherMaskId}>
                  <rect x="-500" y="0" width="700" height="260" fill={`url(#${beamFeatherGradId})`} />
                </mask>

                {/* Editorial risograph/paper stipple grain inside the beam */}
                <pattern id={beamGrainId} width="14" height="14" patternUnits="userSpaceOnUse">
                  <circle cx="3" cy="3" r="0.95" fill="#F16D43" fillOpacity="0.16" />
                  <circle cx="10" cy="7" r="0.8" fill="#D97706" fillOpacity="0.18" />
                  <circle cx="6" cy="12" r="0.7" fill="#18181B" fillOpacity="0.06" />
                </pattern>
              </defs>

              <g mask={`url(#${beamFeatherMaskId})`}>
                {/* Organic hand-drawn spotlight cone originating right at the bulb mouth */}
                <path
                  d="M-38 4 C-22 2, -6 4, 8 10 C56 76, 102 156, 134 252 C-12 260, -252 260, -430 248 C-320 156, -162 72, -38 4 Z"
                  fill={`url(#${beamGradId})`}
                />
                <path
                  d="M-38 4 C-22 2, -6 4, 8 10 C56 76, 102 156, 134 252 C-12 260, -252 260, -430 248 C-320 156, -162 72, -38 4 Z"
                  fill={`url(#${beamGrainId})`}
                />

                {/* Subtle hand-sketched beam edge wisps */}
                <path
                  d="M-44 14 C-138 72, -258 142, -372 222"
                  stroke="#EAB308"
                  strokeOpacity="0.45"
                  strokeWidth="1.5"
                  strokeDasharray="6 8"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M12 18 C46 76, 82 142, 110 218"
                  stroke="#F16D43"
                  strokeOpacity="0.34"
                  strokeWidth="1.5"
                  strokeDasharray="5 9"
                  strokeLinecap="round"
                  fill="none"
                />
              </g>
            </motion.svg>
          </motion.div>
        </div>
      </div>

      {/* 2. Subtle hand-drawn light rays & tiny warm sparkle ticks around HARSHITA */}
      <motion.svg
        viewBox="0 0 640 240"
        preserveAspectRatio="none"
        animate={{
          opacity: isLit ? 1 : 0,
          scale: isLit ? 1 : 0.96,
        }}
        transition={{ duration: prefersReducedMotion ? 0.15 : 0.38, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-none absolute -inset-x-5 -inset-y-3 h-[calc(100%+24px)] w-[calc(100%+40px)] z-[14] overflow-visible"
        aria-hidden="true"
      >
        <motion.g
          animate={
            prefersReducedMotion || !isLit
              ? { opacity: isLit ? 0.85 : 0 }
              : { opacity: [0.68, 0.96, 0.68], scale: [0.985, 1.015, 0.985] }
          }
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '320px 120px' }}
        >
          {/* Left & right delicate hand-drawn rays */}
          <path d="M52 84 L30 76" stroke="#18181B" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M46 118 L22 119" stroke="#F16D43" strokeWidth="1.9" strokeLinecap="round" />
          <path d="M58 154 L36 164" stroke="#EAB308" strokeWidth="2.1" strokeLinecap="round" />

          <path d="M588 86 L610 78" stroke="#EAB308" strokeWidth="2.1" strokeLinecap="round" />
          <path d="M594 122 L618 124" stroke="#18181B" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M584 156 L606 166" stroke="#F16D43" strokeWidth="1.9" strokeLinecap="round" />

          {/* Tiny four-point hand-drawn sparkle accents */}
          <path
            d="M114 48 Q116 55 123 57 Q116 59 114 66 Q112 59 105 57 Q112 55 114 48 Z"
            fill="#FFE14D"
            stroke="#18181B"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
          <path
            d="M542 182 Q543.5 187 549 188.5 Q543.5 190 542 195 Q540.5 190 535 188.5 Q540.5 187 542 182 Z"
            fill="#F16D43"
            fillOpacity="0.85"
            stroke="#18181B"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </motion.g>
      </motion.svg>

      {/* 3. Charming hand-drawn desk lamp perched cleanly on top of the orange frame */}
      <button
        ref={lampAnchorRef}
        type="button"
        data-hero-lamp
        aria-pressed={isLit}
        aria-label={isLit ? 'Turn off desk lamp spotlight' : 'Turn on desk lamp spotlight'}
        onClick={(e) => {
          e.stopPropagation();
          playTabTick();
          setIsPinnedOn((prev) => !prev);
        }}
        className="pointer-events-auto group absolute -top-[42px] right-[5%] h-[50px] w-[58px] sm:-top-[52px] sm:right-[21%] sm:h-[62px] sm:w-[70px] lg:-top-[56px] lg:right-[22%] lg:h-[68px] lg:w-[76px] z-[18] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 rounded-md"
      >
        <svg viewBox="0 0 96 86" className="h-full w-full overflow-visible" aria-hidden="true">
          {/* Lamp clamp / foot anchored right onto the top orange frame stroke */}
          <path
            d="M56 76 C56 70, 62 67, 70 67 C78 67, 83 70, 83 76 Z"
            fill="#FAF8F3"
            stroke="#18181B"
            strokeWidth="2.3"
            strokeLinejoin="round"
          />
          <path
            d="M52 76 L87 76"
            stroke="#18181B"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Tiny orange foot accent */}
          <circle cx="70" cy="72" r="2.2" fill="#F16D43" />

          {/* Articulated hand-drawn desk lamp arm */}
          <path
            d="M71 67 C76 53, 81 40, 77 31 C73 23, 60 22, 48 25"
            fill="none"
            stroke="#18181B"
            strokeWidth="2.6"
            strokeLinecap="round"
          />
          {/* Subtle coiled doodle cord */}
          <path
            d="M78 70 C86 68, 89 74, 84 78"
            fill="none"
            stroke="#18181B"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          {/* Elbow hinge pin with orange accent */}
          <circle
            cx="77"
            cy="32"
            r="3.8"
            fill="#F16D43"
            stroke="#18181B"
            strokeWidth="2"
          />

          {/* Pivoting Lamp Head centered mathematically at the swivel joint (48, 25) */}
          <g transform="translate(48, 25)">
            <g ref={lampHeadRef}>
              {/* Upper swivel screw at (0, 0) */}
              <circle
                cx="0"
                cy="0"
                r="3.2"
                fill="#FAF8F3"
                stroke="#18181B"
                strokeWidth="2"
              />

              {/* Click switch knob at top of lamp hood */}
              <motion.g
                animate={{ y: isLit ? 1.5 : 0 }}
                transition={{ duration: 0.16, ease: 'easeOut' }}
              >
                <path
                  d="M-6 -6 L-8 -12"
                  stroke="#18181B"
                  strokeWidth="2.3"
                  strokeLinecap="round"
                />
                <circle
                  cx="-8.5"
                  cy="-13.5"
                  r="2.4"
                  fill="#F16D43"
                  stroke="#18181B"
                  strokeWidth="1.7"
                />
              </motion.g>

              {/* Playful tiny switch-on spark ticks near the top button */}
              <motion.g
                animate={{
                  opacity: isLit ? [0, 1, 0.85] : 0,
                  scale: isLit ? [0.7, 1.08, 1] : 0.7,
                }}
                transition={{ duration: 0.35 }}
                style={{ transformOrigin: '-9px -14px' }}
              >
                <path d="M-17 -18 L-21 -21" stroke="#F16D43" strokeWidth="1.6" strokeLinecap="round" />
                <path d="M-9 -21 L-9 -25" stroke="#EAB308" strokeWidth="1.6" strokeLinecap="round" />
                <path d="M-2 -18 L2 -21" stroke="#18181B" strokeWidth="1.5" strokeLinecap="round" />
              </motion.g>

              {/* Glowing bulb peeking under the shade */}
              <motion.circle
                cx="-17"
                cy="18"
                r="5.8"
                animate={{
                  fill: isLit ? '#FFE45E' : '#FAF8F3',
                }}
                transition={{ duration: 0.25 }}
                stroke="#18181B"
                strokeWidth="2"
              />
              {/* Tiny filament sketch */}
              <path
                d="M-18.8 17 Q-17 19.5 -15.2 17"
                fill="none"
                stroke="#18181B"
                strokeWidth="1.2"
                strokeLinecap="round"
              />

              {/* Hand-drawn lamp cone shade */}
              <path
                d="M-1 -3 C-5 -7, -12 -7, -16 -3 L-33 14 C-35 17, -32 20, -26 22 C-16 25, -6 23, -2 18 L0 4 C0 1, 0 -2, -1 -3 Z"
                fill="#FAF8F3"
                stroke="#18181B"
                strokeWidth="2.3"
                strokeLinejoin="round"
              />
              {/* Warm inner shade glow when switched on */}
              <motion.path
                d="M-31 16 C-24 21, -9 21, -3 16 C-7 12, -23 12, -31 16 Z"
                animate={{
                  fill: isLit ? '#FFD500' : '#E7E2D8',
                  opacity: isLit ? 0.95 : 0.75,
                }}
                transition={{ duration: 0.25 }}
                stroke="#18181B"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
              {/* Subtle orange editorial stripe along the lamp shade rim */}
              <path
                d="M-29 11 C-22 14, -10 14, -2 11"
                fill="none"
                stroke="#F16D43"
                strokeWidth="2.3"
                strokeLinecap="round"
              />
              {/* Tiny ink hatch marks on the shade */}
              <path
                d="M-12 -1 L-15 3 M-8 0 L-11 4"
                stroke="#18181B"
                strokeWidth="1.3"
                strokeLinecap="round"
              />

              {/* Subtle radiating doodle rays right around the bulb mouth */}
              <motion.g
                animate={{
                  opacity: isLit ? 1 : 0,
                  scale: isLit ? 1 : 0.7,
                }}
                transition={{ duration: prefersReducedMotion ? 0.12 : 0.28, ease: 'easeOut' }}
                style={{ transformOrigin: '-17px 22px' }}
              >
                <path d="M-30 26 L-36 31" stroke="#18181B" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M-21 29 L-24 36" stroke="#F16D43" strokeWidth="1.9" strokeLinecap="round" />
                <path d="M-12 28 L-9 35" stroke="#EAB308" strokeWidth="2" strokeLinecap="round" />
                <path d="M-4 24 L2 28" stroke="#18181B" strokeWidth="1.7" strokeLinecap="round" />
              </motion.g>
            </g>
          </g>
        </svg>
      </button>
    </div>
  );
}
