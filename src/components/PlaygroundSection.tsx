import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, RotateCcw, RotateCw, X } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  playgroundItems,
  type PlaygroundItem,
  type PlaygroundShapeKind,
} from '../data/portfolioData';
import { useSound } from '../context/SoundContext';
import { ImagePlaceholder } from './ImagePlaceholder';

interface ShapeTransform {
  x: number;
  y: number;
  rotation: number;
  zIndex: number;
}

interface DragSession {
  id: string;
  pointerId: number;
  startClientX: number;
  startClientY: number;
  originX: number;
  originY: number;
  movedDistance: number;
}

function getResponsiveScale(canvasWidth: number) {
  if (canvasWidth < 480) return 0.68;
  if (canvasWidth < 768) return 0.82;
  if (canvasWidth < 960) return 1;
  if (canvasWidth < 1140) return 1.1;
  return 1.2;
}

function clamp(val: number, min: number, max: number) {
  return Math.max(min, Math.min(max, val));
}

function computeInitialLayout(
  canvasWidth: number,
  canvasHeight: number
): Record<string, ShapeTransform> {
  const isMobile = canvasWidth < 640;
  const scale = getResponsiveScale(canvasWidth);
  const pad = 12;

  const layout: Record<string, ShapeTransform> = {};
  playgroundItems.forEach((item, idx) => {
    const w = item.width * scale;
    const h = item.height * scale;
    const pctX = isMobile ? item.mobileX : item.initialX;
    const pctY = isMobile ? item.mobileY : item.initialY;

    const rawX = (pctX / 100) * canvasWidth;
    const rawY = (pctY / 100) * canvasHeight;

    layout[item.id] = {
      x: clamp(rawX, pad, Math.max(pad, canvasWidth - w - pad)),
      y: clamp(rawY, pad, Math.max(pad, canvasHeight - h - pad)),
      rotation: item.rotationDeg,
      zIndex: idx + 1,
    };
  });

  return layout;
}

function ShapeSvgSurface({
  shape,
  color,
  isActive,
}: {
  shape: PlaygroundShapeKind;
  color: string;
  isActive: boolean;
}) {
  const strokeColor = '#18181B';
  const strokeWidth = 2.2;
  const shadow = isActive
    ? 'drop-shadow(0 14px 18px rgba(24,24,27,0.24))'
    : 'drop-shadow(0 5px 0 rgba(24,24,27,0.14))';

  switch (shape) {
    case 'circle':
      return (
        <svg
          viewBox="0 0 180 180"
          className="h-full w-full overflow-visible"
          style={{ filter: shadow }}
          aria-hidden="true"
        >
          <circle cx="90" cy="90" r="84" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} />
        </svg>
      );

    case 'semicircle':
      return (
        <svg
          viewBox="0 0 224 132"
          className="h-full w-full overflow-visible"
          style={{ filter: shadow }}
          aria-hidden="true"
        >
          <path
            d="M 8,122 A 104,104 0 0,1 216,122 Z"
            fill={color}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'rounded-rect':
      return (
        <svg
          viewBox="0 0 210 152"
          className="h-full w-full overflow-visible"
          style={{ filter: shadow }}
          aria-hidden="true"
        >
          <rect
            x="6"
            y="6"
            width="198"
            height="140"
            rx="28"
            fill={color}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
          />
        </svg>
      );

    case 'capsule':
      return (
        <svg
          viewBox="0 0 216 92"
          className="h-full w-full overflow-visible"
          style={{ filter: shadow }}
          aria-hidden="true"
        >
          <rect
            x="6"
            y="6"
            width="204"
            height="80"
            rx="40"
            fill={color}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
          />
        </svg>
      );

    case 'blob-a':
      return (
        <svg
          viewBox="0 0 218 184"
          className="h-full w-full overflow-visible"
          style={{ filter: shadow }}
          aria-hidden="true"
        >
          <path
            d="M 48,26 C 88,6 154,10 186,44 C 216,76 212,134 176,160 C 138,186 68,182 34,150 C 2,120 8,46 48,26 Z"
            fill={color}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'blob-b':
      return (
        <svg
          viewBox="0 0 198 162"
          className="h-full w-full overflow-visible"
          style={{ filter: shadow }}
          aria-hidden="true"
        >
          <path
            d="M 38,34 C 72,8 134,14 168,38 C 198,60 192,114 162,138 C 126,164 62,154 28,128 C -2,104 4,60 38,34 Z"
            fill={color}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'arch':
      return (
        <svg
          viewBox="0 0 190 170"
          className="h-full w-full overflow-visible"
          style={{ filter: shadow }}
          aria-hidden="true"
        >
          <path
            d="M 14,160 L 14,88 A 81,81 0 0,1 176,88 L 176,160 Z"
            fill={color}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'diamond-pill':
      return (
        <svg
          viewBox="0 0 180 180"
          className="h-full w-full overflow-visible"
          style={{ filter: shadow }}
          aria-hidden="true"
        >
          <path
            d="M 90,8 C 102,58 122,78 172,90 C 122,102 102,122 90,172 C 78,122 58,102 8,90 C 58,78 78,58 90,8 Z"
            fill={color}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'scallop':
    default:
      return (
        <svg
          viewBox="0 0 192 192"
          className="h-full w-full overflow-visible"
          style={{ filter: shadow }}
          aria-hidden="true"
        >
          <path
            d="M 96,10 C 112,10 121,25 135,29 C 149,33 163,24 174,35 C 185,46 176,60 180,74 C 184,88 190,94 190,108 C 190,122 175,131 171,145 C 167,159 175,172 164,182 C 153,192 138,181 124,184 C 110,187 104,190 90,190 C 76,190 67,178 53,174 C 39,170 25,177 15,166 C 5,155 16,140 13,126 C 10,112 6,105 6,91 C 6,77 20,68 24,54 C 28,40 21,26 32,16 C 43,6 57,17 71,14 C 83,11 88,10 96,10 Z"
            fill={color}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
          />
        </svg>
      );
  }
}

export function PlaygroundSection() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const modalScrollRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<DragSession | null>(null);
  const topZRef = useRef<number>(playgroundItems.length + 1);
  const hasInitializedRef = useRef<boolean>(false);

  const [canvasSize, setCanvasSize] = useState({ width: 960, height: 640 });
  const [transforms, setTransforms] = useState<Record<string, ShapeTransform>>(() =>
    computeInitialLayout(960, 640)
  );
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragTilt, setDragTilt] = useState<number>(0);
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const [activeArtwork, setActiveArtwork] = useState<PlaygroundItem | null>(null);

  const prefersReducedMotion = useReducedMotion();
  const { playClick, playPaperTurn, playPaperClose, playTabTick } = useSound();

  // Measure canvas & keep shapes bounded inside canvas on resize
  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;

    const updateSize = () => {
      const rect = el.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;

      const isFirstMeasure = !hasInitializedRef.current;
      hasInitializedRef.current = true;

      setCanvasSize({ width: rect.width, height: rect.height });
      const scale = getResponsiveScale(rect.width);
      const pad = 12;

      setTransforms((prevTransforms) => {
        if (isFirstMeasure) {
          return computeInitialLayout(rect.width, rect.height);
        }
        const next: Record<string, ShapeTransform> = {};
        playgroundItems.forEach((item) => {
          const cur = prevTransforms[item.id];
          const w = item.width * scale;
          const h = item.height * scale;
          if (!cur) return;
          next[item.id] = {
            ...cur,
            x: clamp(cur.x, pad, Math.max(pad, rect.width - w - pad)),
            y: clamp(cur.y, pad, Math.max(pad, rect.height - h - pad)),
          };
        });
        return next;
      });
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleResetCanvas = useCallback(() => {
    playClick();
    topZRef.current = playgroundItems.length + 1;
    setFocusedId(null);
    setTransforms(computeInitialLayout(canvasSize.width, canvasSize.height));
  }, [canvasSize.height, canvasSize.width, playClick]);

  const handleRotateShape = useCallback(
    (id: string, deltaDeg = 14) => {
      playClick();
      topZRef.current += 1;
      setTransforms((prev) => {
        const cur = prev[id];
        if (!cur) return prev;
        return {
          ...prev,
          [id]: {
            ...cur,
            rotation: cur.rotation + deltaDeg,
            zIndex: topZRef.current,
          },
        };
      });
    },
    [playClick]
  );

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>, item: PlaygroundItem) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    // Ignore pointer down if user tapped the rotate button inside the shape
    if ((e.target as HTMLElement).closest('[data-rotate-control="true"]')) return;

    e.currentTarget.setPointerCapture(e.pointerId);
    playTabTick();

    topZRef.current += 1;
    const current = transforms[item.id] ?? { x: 20, y: 20, rotation: item.rotationDeg, zIndex: 1 };

    setTransforms((prev) => ({
      ...prev,
      [item.id]: {
        ...current,
        zIndex: topZRef.current,
      },
    }));

    dragRef.current = {
      id: item.id,
      pointerId: e.pointerId,
      startClientX: e.clientX,
      startClientY: e.clientY,
      originX: current.x,
      originY: current.y,
      movedDistance: 0,
    };

    setFocusedId(item.id);
    setDraggingId(item.id);
    setDragTilt(0);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>, item: PlaygroundItem) => {
    const session = dragRef.current;
    if (!session || session.id !== item.id || session.pointerId !== e.pointerId) return;

    const dx = e.clientX - session.startClientX;
    const dy = e.clientY - session.startClientY;
    session.movedDistance = Math.hypot(dx, dy);

    const scale = getResponsiveScale(canvasSize.width);
    const w = item.width * scale;
    const h = item.height * scale;
    const pad = 10;

    const nextX = clamp(session.originX + dx, pad, Math.max(pad, canvasSize.width - w - pad));
    const nextY = clamp(session.originY + dy, pad, Math.max(pad, canvasSize.height - h - pad));

    setDragTilt(clamp(dx * 0.06, -5, 5));

    setTransforms((prev) => {
      const cur = prev[item.id];
      if (!cur) return prev;
      return {
        ...prev,
        [item.id]: {
          ...cur,
          x: nextX,
          y: nextY,
        },
      };
    });
  };

  const handlePointerEnd = (e: React.PointerEvent<HTMLDivElement>, item: PlaygroundItem) => {
    const session = dragRef.current;
    if (!session || session.id !== item.id || session.pointerId !== e.pointerId) return;

    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }

    const wasClick = session.movedDistance < 6;
    dragRef.current = null;
    setDraggingId(null);
    setDragTilt(0);

    if (wasClick && !item.isFiller) {
      playPaperTurn();
      setActiveArtwork(item);
    }
  };

  const clickableItems = playgroundItems.filter((i) => !i.isFiller);

  const activeIndex = activeArtwork
    ? clickableItems.findIndex((i) => i.id === activeArtwork.id)
    : -1;

  const handlePrevArtwork = useCallback(() => {
    if (activeIndex < 0) return;
    playPaperTurn();
    const prevIdx = (activeIndex - 1 + clickableItems.length) % clickableItems.length;
    setActiveArtwork(clickableItems[prevIdx]);
  }, [activeIndex, clickableItems, playPaperTurn]);

  const handleNextArtwork = useCallback(() => {
    if (activeIndex < 0) return;
    playPaperTurn();
    const nextIdx = (activeIndex + 1) % clickableItems.length;
    setActiveArtwork(clickableItems[nextIdx]);
  }, [activeIndex, clickableItems, playPaperTurn]);

  const handleCloseArtwork = useCallback(() => {
    playPaperClose();
    setActiveArtwork(null);
  }, [playPaperClose]);

  useEffect(() => {
    if (modalScrollRef.current) {
      modalScrollRef.current.scrollTop = 0;
    }
  }, [activeArtwork?.id]);

  useEffect(() => {
    if (!activeArtwork) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleCloseArtwork();
      if (e.key === 'ArrowLeft') handlePrevArtwork();
      if (e.key === 'ArrowRight') handleNextArtwork();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [activeArtwork, handleCloseArtwork, handleNextArtwork, handlePrevArtwork]);

  const scale = getResponsiveScale(canvasSize.width);

  return (
    <section
      id="playground"
      className="relative border-t border-zinc-900/15 px-5 pt-16 pb-24 sm:px-10 sm:pt-24 sm:pb-28 lg:px-14"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header & Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-10">
          <div className="lg:col-span-6">
            <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight leading-none text-zinc-900">
              Playground
            </h2>
          </div>

          <div className="lg:col-span-6">
            <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-zinc-800 max-w-2xl">
              Not everything needs a brief, a deadline or a client. Some things are just made out
              of curiosity. This is where I keep them.
            </p>
          </div>
        </div>

        {/* Interactive Toolbar: Handwritten Prompt + Reset Canvas Button */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2.5">
            <span className="font-hand text-2xl sm:text-[1.75rem] font-bold text-zinc-900 -rotate-1">
              A little space to play. Drag things around!
            </span>
            <svg
              viewBox="0 0 36 22"
              className="hidden sm:block w-8 h-5 lg:w-9 lg:h-6 text-zinc-800 translate-y-1"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M3 4 Q18 6 24 18 M19 14 L24 19 L29 13"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <button
            type="button"
            onClick={handleResetCanvas}
            className="inline-flex items-center gap-2 border-[1.5px] border-zinc-900 bg-white px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-extrabold uppercase tracking-widest text-zinc-900 shadow-[3px_3px_0_#FFCA00] transition-all duration-150 hover:-translate-y-0.5 hover:bg-[#FFCA00] hover:shadow-[4px_4px_0_#18181b] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
          >
            <RotateCcw className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden="true" />
            <span>RESET CANVAS</span>
          </button>
        </div>

        {/* Draggable Geometric Moodboard Canvas (inherits ruled notebook paper background) */}
        <div
          ref={canvasRef}
          aria-label="Interactive playground canvas with draggable geometric shapes"
          className="relative w-full h-[640px] sm:h-[680px] lg:h-[760px] xl:h-[800px] overflow-hidden border-[1.5px] border-dashed border-zinc-900/30 bg-[#FAF8F3]/45 select-none"
        >
          {/* Corner registration marks for studio moodboard feel */}
          <span className="pointer-events-none absolute top-3.5 left-3.5 h-3.5 w-3.5 border-t-2 border-l-2 border-zinc-900/25" />
          <span className="pointer-events-none absolute top-3.5 right-3.5 h-3.5 w-3.5 border-t-2 border-r-2 border-zinc-900/25" />
          <span className="pointer-events-none absolute bottom-3.5 left-3.5 h-3.5 w-3.5 border-b-2 border-l-2 border-zinc-900/25" />
          <span className="pointer-events-none absolute bottom-3.5 right-3.5 h-3.5 w-3.5 border-b-2 border-r-2 border-zinc-900/25" />

          {/* Subtle bottom-right studio note */}
          <span className="pointer-events-none absolute bottom-3.5 right-6 font-hand text-lg sm:text-xl text-zinc-500">
            tap any shape to inspect · drag to rearrange
          </span>

          {playgroundItems.map((item) => {
            const t = transforms[item.id];
            if (!t) return null;

            const isDragging = draggingId === item.id;
            const isFocused = focusedId === item.id;
            const w = item.width * scale;
            const h = item.height * scale;
            const appliedRotation = t.rotation + (isDragging ? dragTilt : 0);

            const settleSpring = prefersReducedMotion
              ? { duration: 0.01 }
              : { type: 'spring' as const, stiffness: 400, damping: 16, mass: 0.8 };

            const isFiller = Boolean(item.isFiller);

            return (
              <motion.div
                key={item.id}
                data-playground-shape={isFiller ? 'filler' : 'category'}
                role={isFiller ? undefined : 'button'}
                tabIndex={isFiller ? undefined : 0}
                aria-hidden={isFiller ? true : undefined}
                aria-label={
                  isFiller
                    ? undefined
                    : `${item.categoryLabel}. Drag to move or click to open category viewer.`
                }
                onPointerDown={(e) => handlePointerDown(e, item)}
                onPointerMove={(e) => handlePointerMove(e, item)}
                onPointerUp={(e) => handlePointerEnd(e, item)}
                onPointerCancel={(e) => handlePointerEnd(e, item)}
                onFocus={isFiller ? undefined : () => setFocusedId(item.id)}
                onKeyDown={
                  isFiller
                    ? undefined
                    : (e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          playPaperTurn();
                          setActiveArtwork(item);
                        } else if (e.key.toLowerCase() === 'r') {
                          e.preventDefault();
                          handleRotateShape(item.id, 15);
                        }
                      }
                }
                initial={false}
                animate={{
                  x: t.x,
                  y: t.y - (isDragging && !prefersReducedMotion ? 4 : 0),
                  rotate: appliedRotation,
                  scale: isDragging ? 1.05 : 1,
                }}
                transition={
                  isDragging
                    ? {
                        x: { duration: 0 },
                        y: { duration: 0 },
                        rotate: { type: 'spring', stiffness: 420, damping: 24 },
                        scale: { type: 'spring', stiffness: 480, damping: 24 },
                      }
                    : settleSpring
                }
                style={{
                  width: `${w}px`,
                  height: `${h}px`,
                  zIndex: t.zIndex,
                  touchAction: 'none',
                }}
                className={`group absolute top-0 left-0 flex items-center justify-center ${
                  isFiller
                    ? ''
                    : 'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-900'
                } ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
              >
                <ShapeSvgSurface shape={item.shape} color={item.color} isActive={isDragging} />

                {!isFiller && (
                  <>
                    {/* Bold Black Category Typography Inside Clickable Shape */}
                    <div
                      className={`pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-4 text-center ${
                        item.shape === 'semicircle' || item.shape === 'arch' ? 'pt-7' : ''
                      }`}
                    >
                      <span className="font-display text-xl sm:text-2xl lg:text-[1.65rem] font-extrabold uppercase tracking-wider leading-[0.95] text-zinc-950 text-balance">
                        {item.categoryLabel}
                      </span>
                      <span className="mt-1 font-hand text-sm sm:text-base lg:text-lg font-semibold leading-none text-zinc-950/80 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                        open ↗
                      </span>
                    </div>

                    {/* Subtle Rotate Control on Hover / Focus */}
                    <button
                      type="button"
                      data-rotate-control="true"
                      aria-label={`Rotate ${item.categoryLabel} shape`}
                      title="Rotate shape slightly"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRotateShape(item.id, 15);
                      }}
                      className={`absolute -top-2 -right-2 flex h-7 w-7 lg:h-8 lg:w-8 items-center justify-center rounded-full border-[1.5px] border-zinc-900 bg-white text-zinc-900 shadow-xs transition-opacity duration-150 hover:bg-[#FFCA00] cursor-pointer ${
                        isFocused || isDragging ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                      }`}
                    >
                      <RotateCw className="h-3.5 w-3.5 lg:h-4 lg:w-4" aria-hidden="true" />
                    </button>
                  </>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Smooth Artwork Presentation Modal */}
      <AnimatePresence>
        {activeArtwork && (
          <motion.div
            key="playground-artwork-backdrop"
            role="dialog"
            aria-modal="true"
            aria-labelledby="playground-artwork-title"
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleCloseArtwork}
            className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/80 p-4 sm:p-6 backdrop-blur-xs"
          >
            <motion.div
              key={activeArtwork.id}
              initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97, y: 8 }}
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden border-[1.5px] border-zinc-900 bg-[#FAF8F3] shadow-2xl"
            >
              {/* Modal Top Bar */}
              <div className="shrink-0 flex items-center justify-between gap-3 border-b border-zinc-900/15 bg-white px-5 py-3">
                <div className="flex items-center gap-3">
                  <span
                    id={activeArtwork.scrollImages?.length ? 'playground-artwork-title' : undefined}
                    style={{ backgroundColor: activeArtwork.color }}
                    className="inline-block border border-zinc-900 px-2.5 py-0.5 text-xs font-extrabold uppercase tracking-wider text-zinc-950"
                  >
                    {activeArtwork.categoryLabel}
                  </span>
                  <span className="font-mono text-xs font-semibold tabular-nums text-zinc-500">
                    {String(activeIndex + 1).padStart(2, '0')} /{' '}
                    {String(clickableItems.length).padStart(2, '0')}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrevArtwork}
                    aria-label="Previous experiment"
                    className="inline-flex h-8 w-8 items-center justify-center border border-zinc-900/20 bg-white text-zinc-900 hover:bg-[#FFCA00] cursor-pointer focus-visible:outline-2 focus-visible:outline-zinc-900"
                  >
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextArtwork}
                    aria-label="Next experiment"
                    className="inline-flex h-8 w-8 items-center justify-center border border-zinc-900/20 bg-white text-zinc-900 hover:bg-[#FFCA00] cursor-pointer focus-visible:outline-2 focus-visible:outline-zinc-900"
                  >
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={handleCloseArtwork}
                    aria-label="Close artwork presentation"
                    className="inline-flex items-center gap-1.5 border border-zinc-900 bg-zinc-900 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-zinc-800 cursor-pointer focus-visible:outline-2 focus-visible:outline-white"
                  >
                    <X className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Close</span>
                  </button>
                </div>
              </div>

              {/* Artwork Presentation Content */}
              {activeArtwork.scrollImages && activeArtwork.scrollImages.length > 0 ? (
                <div ref={modalScrollRef} className="flex-1 overflow-y-auto scroll-smooth bg-[#FAF8F3]">
                  <div className="flex w-full flex-col gap-0">
                    {activeArtwork.scrollImages.map((art, idx) => (
                      <img
                        key={art.id}
                        src={art.imageSrc}
                        alt={art.alt}
                        referrerPolicy="no-referrer"
                        loading={idx === 0 ? 'eager' : 'lazy'}
                        className="block w-full h-auto select-none"
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div ref={modalScrollRef} className="overflow-y-auto p-5 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center">
                  <div className="md:col-span-7 bg-white p-2.5 sm:p-3 border border-zinc-900/15 shadow-sm">
                    <ImagePlaceholder
                      label={activeArtwork.title}
                      placeholderPath={activeArtwork.placeholderPath}
                      imageSrc={activeArtwork.imageSrc}
                      aspectRatio={activeArtwork.aspectRatio === '3:4' ? '3:4' : '4:3'}
                      blueprint={activeArtwork.blueprint}
                    />
                  </div>

                  <div className="md:col-span-5 space-y-4">
                    <h3
                      id="playground-artwork-title"
                      className="font-display text-4xl sm:text-5xl font-extrabold uppercase tracking-tight leading-[0.95] text-zinc-900"
                    >
                      {activeArtwork.title}
                    </h3>
                    <p className="text-sm sm:text-base leading-relaxed text-zinc-700">
                      {activeArtwork.description}
                    </p>
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={handleCloseArtwork}
                        className="inline-flex items-center gap-2 border-[1.5px] border-zinc-900 bg-white px-4 py-2 text-xs font-extrabold uppercase tracking-widest text-zinc-900 hover:bg-[#FFCA00] transition-colors cursor-pointer"
                      >
                        <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>Back to Playground</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
