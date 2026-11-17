import { useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';
import type { BlueprintKind } from '../data/portfolioData';

interface ImagePlaceholderProps {
  label: string;
  placeholderPath: string;
  imageSrc?: string;
  aspectRatio?: '16:10' | '4:3' | '3:4' | '1:1';
  blueprint?: BlueprintKind;
  darkSurface?: boolean;
  compact?: boolean;
  className?: string;
  imgClassName?: string;
}

const aspectClasses: Record<NonNullable<ImagePlaceholderProps['aspectRatio']>, string> = {
  '16:10': 'aspect-[16/10]',
  '4:3': 'aspect-[4/3]',
  '3:4': 'aspect-[3/4]',
  '1:1': 'aspect-square',
};

function BlueprintArtwork({ kind, compact }: { kind: BlueprintKind; compact?: boolean }) {
  const stroke = '#18181B';

  switch (kind) {
    case 'portrait':
      return (
        <svg viewBox="0 0 180 180" className="w-full h-full max-w-[140px] max-h-[140px]" aria-hidden="true">
          <circle cx="90" cy="64" r="28" fill="#F6C93B" fillOpacity="0.45" stroke={stroke} strokeWidth="1.75" />
          <path
            d="M42 154 C42 118, 138 118, 138 154"
            fill="#F16D43"
            fillOpacity="0.28"
            stroke={stroke}
            strokeWidth="1.75"
          />
          <rect x="20" y="20" width="140" height="140" fill="none" stroke={stroke} strokeDasharray="4 4" strokeWidth="1" opacity="0.35" />
        </svg>
      );
    case 'packaging':
      return (
        <svg viewBox="0 0 220 140" className="w-full h-full max-w-[180px]" aria-hidden="true">
          <polygon points="55,38 110,18 165,38 110,58" fill="#FAF8F3" stroke={stroke} strokeWidth="1.75" />
          <polygon points="55,38 110,58 110,120 55,100" fill="#F6C93B" fillOpacity="0.65" stroke={stroke} strokeWidth="1.75" />
          <polygon points="165,38 110,58 110,120 165,100" fill="#E4DEC9" stroke={stroke} strokeWidth="1.75" />
          <line x1="68" y1="68" x2="98" y2="79" stroke={stroke} strokeWidth="1.5" />
          <line x1="68" y1="78" x2="92" y2="87" stroke={stroke} strokeWidth="1.5" />
        </svg>
      );
    case 'identity':
      return (
        <svg viewBox="0 0 220 140" className="w-full h-full max-w-[180px]" aria-hidden="true">
          <rect x="26" y="24" width="96" height="92" fill="#FAF8F3" stroke={stroke} strokeWidth="1.75" />
          <circle cx="74" cy="70" r="24" fill="#F16D43" fillOpacity="0.6" stroke={stroke} strokeWidth="1.75" />
          <rect x="134" y="24" width="60" height="40" fill="#F6C93B" stroke={stroke} strokeWidth="1.75" />
          <rect x="134" y="76" width="60" height="40" fill="#18181B" fillOpacity="0.1" stroke={stroke} strokeWidth="1.75" />
          <line x1="20" y1="70" x2="128" y2="70" stroke={stroke} strokeDasharray="3 3" strokeWidth="1" opacity="0.45" />
        </svg>
      );
    case 'social':
      return (
        <svg viewBox="0 0 220 140" className="w-full h-full max-w-[180px]" aria-hidden="true">
          <rect x="24" y="20" width="50" height="96" rx="4" fill="#FAF8F3" stroke={stroke} strokeWidth="1.75" />
          <rect x="85" y="20" width="50" height="96" rx="4" fill="#F4609B" fillOpacity="0.45" stroke={stroke} strokeWidth="1.75" />
          <rect x="146" y="20" width="50" height="96" rx="4" fill="#F6C93B" fillOpacity="0.55" stroke={stroke} strokeWidth="1.75" />
          <circle cx="49" cy="52" r="12" stroke={stroke} strokeWidth="1.5" fill="none" />
          <line x1="95" y1="54" x2="125" y2="54" stroke={stroke} strokeWidth="2" />
          <line x1="95" y1="66" x2="118" y2="66" stroke={stroke} strokeWidth="1.5" />
        </svg>
      );
    case 'uiux':
      return (
        <svg viewBox="0 0 220 140" className="w-full h-full max-w-[180px]" aria-hidden="true">
          <rect x="20" y="22" width="136" height="94" rx="5" fill="#FAF8F3" stroke={stroke} strokeWidth="1.75" />
          <line x1="20" y1="42" x2="156" y2="42" stroke={stroke} strokeWidth="1.5" />
          <rect x="34" y="54" width="52" height="46" fill="#2E5BFF" fillOpacity="0.25" stroke={stroke} strokeWidth="1.5" />
          <line x1="96" y1="58" x2="142" y2="58" stroke={stroke} strokeWidth="2" />
          <line x1="96" y1="70" x2="136" y2="70" stroke={stroke} strokeWidth="1.5" />
          <rect x="166" y="40" width="36" height="76" rx="5" fill="#F6C93B" fillOpacity="0.65" stroke={stroke} strokeWidth="1.75" />
        </svg>
      );
    case 'ai-visual':
    case 'ai-photo':
      return (
        <svg viewBox="0 0 220 140" className="w-full h-full max-w-[180px]" aria-hidden="true">
          <circle cx="110" cy="70" r="42" fill="#3FD095" fillOpacity="0.32" stroke={stroke} strokeWidth="1.75" />
          <circle cx="110" cy="70" r="24" fill="#C5AEF2" fillOpacity="0.55" stroke={stroke} strokeWidth="1.75" />
          <path d="M40 30 L56 30 M40 30 L40 46" stroke={stroke} strokeWidth="1.75" fill="none" />
          <path d="M180 30 L164 30 M180 30 L180 46" stroke={stroke} strokeWidth="1.75" fill="none" />
          <path d="M40 110 L56 110 M40 110 L40 94" stroke={stroke} strokeWidth="1.75" fill="none" />
          <path d="M180 110 L164 110 M180 110 L180 94" stroke={stroke} strokeWidth="1.75" fill="none" />
        </svg>
      );
    case 'banners':
      return (
        <svg viewBox="0 0 220 140" className="w-full h-full max-w-[180px]" aria-hidden="true">
          <rect x="20" y="22" width="180" height="52" fill="#F6C93B" fillOpacity="0.8" stroke={stroke} strokeWidth="1.75" />
          <line x1="36" y1="42" x2="120" y2="42" stroke={stroke} strokeWidth="3" />
          <rect x="148" y="36" width="38" height="22" fill="#18181B" />
          <rect x="20" y="86" width="84" height="34" fill="#FAF8F3" stroke={stroke} strokeWidth="1.75" />
          <rect x="116" y="86" width="84" height="34" fill="#FAF8F3" stroke={stroke} strokeWidth="1.75" />
        </svg>
      );
    case 'typography':
      return (
        <svg viewBox="0 0 200 140" className="w-full h-full max-w-[165px]" aria-hidden="true">
          <text x="26" y="92" fontSize="72" fontWeight="800" fill="#18181B" opacity="0.85">
            Aa
          </text>
          <line x1="20" y1="92" x2="180" y2="92" stroke="#F16D43" strokeWidth="1.5" strokeDasharray="4 3" />
          <line x1="20" y1="38" x2="180" y2="38" stroke={stroke} strokeWidth="1" opacity="0.35" />
        </svg>
      );
    case 'poster':
      return (
        <svg viewBox="0 0 180 180" className="w-full h-full max-w-[140px]" aria-hidden="true">
          <rect x="34" y="18" width="112" height="144" fill="#FAF8F3" stroke={stroke} strokeWidth="1.75" />
          <circle cx="90" cy="78" r="32" fill="#F16D43" fillOpacity="0.7" stroke={stroke} strokeWidth="1.75" />
          <line x1="50" y1="126" x2="130" y2="126" stroke={stroke} strokeWidth="3" />
          <line x1="50" y1="140" x2="108" y2="140" stroke={stroke} strokeWidth="2" />
        </svg>
      );
    case 'illustration':
      return (
        <svg viewBox="0 0 200 140" className="w-full h-full max-w-[160px]" aria-hidden="true">
          <path d="M40 100 Q80 22 115 80 T170 46" fill="none" stroke={stroke} strokeWidth="2.5" />
          <circle cx="84" cy="54" r="14" fill="#3FD095" fillOpacity="0.65" stroke={stroke} strokeWidth="1.75" />
          <polygon points="140,80 168,112 118,112" fill="#F6C93B" fillOpacity="0.75" stroke={stroke} strokeWidth="1.75" />
        </svg>
      );
    case 'collage':
      return (
        <svg viewBox="0 0 200 140" className="w-full h-full max-w-[160px]" aria-hidden="true">
          <rect x="34" y="28" width="76" height="86" transform="rotate(-6 72 71)" fill="#F4609B" fillOpacity="0.45" stroke={stroke} strokeWidth="1.75" />
          <rect x="82" y="24" width="80" height="86" transform="rotate(5 122 67)" fill="#F6C93B" fillOpacity="0.6" stroke={stroke} strokeWidth="1.75" />
          <circle cx="102" cy="70" r="18" fill="#FAF8F3" stroke={stroke} strokeWidth="1.75" />
        </svg>
      );
    case 'graphic':
    case 'snapshot':
    default:
      return (
        <svg viewBox="0 0 200 140" className="w-full h-full max-w-[160px]" aria-hidden="true">
          <rect x="30" y="24" width="140" height="92" fill="#FAF8F3" stroke={stroke} strokeWidth="1.75" />
          <path d="M36 104 L76 62 L108 92 L134 70 L164 104" fill="#3FD095" fillOpacity="0.35" stroke={stroke} strokeWidth="1.75" />
          {!compact && <circle cx="136" cy="48" r="11" fill="#F6C93B" stroke={stroke} strokeWidth="1.75" />}
        </svg>
      );
  }
}

export function ImagePlaceholder({
  label,
  placeholderPath,
  imageSrc,
  aspectRatio = '16:10',
  blueprint = 'graphic',
  darkSurface = false,
  compact = false,
  className = '',
  imgClassName = 'object-center',
}: ImagePlaceholderProps) {
  const [imgError, setImgError] = useState(false);
  const showImage = Boolean(imageSrc && !imgError);

  return (
    <div
      className={`relative w-full overflow-hidden border ${
        darkSurface ? 'border-zinc-700 bg-[#F3EFE4]' : 'border-zinc-900/20 bg-[#F3EFE4]'
      } ${aspectClasses[aspectRatio]} ${className}`}
    >
      {showImage ? (
        <img
          src={imageSrc}
          alt={label}
          referrerPolicy="no-referrer"
          onError={() => setImgError(true)}
          className={`h-full w-full object-cover ${imgClassName}`}
        />
      ) : (
        <div className="placeholder-grid relative flex h-full w-full flex-col items-center justify-center p-4 text-center text-zinc-900 select-none">
          {/* Corner registration marks */}
          <span className="pointer-events-none absolute top-2 left-2 h-2.5 w-2.5 border-t border-l border-zinc-900/35" />
          <span className="pointer-events-none absolute top-2 right-2 h-2.5 w-2.5 border-t border-r border-zinc-900/35" />
          <span className="pointer-events-none absolute bottom-2 left-2 h-2.5 w-2.5 border-b border-l border-zinc-900/35" />
          <span className="pointer-events-none absolute bottom-2 right-2 h-2.5 w-2.5 border-b border-r border-zinc-900/35" />

          <div className="flex flex-1 items-center justify-center w-full min-h-0 py-1">
            <BlueprintArtwork kind={blueprint} compact={compact} />
          </div>

          {!compact && (
            <div className="mt-1 flex flex-col items-center gap-0.5 max-w-full">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-wide uppercase text-zinc-900">
                <ImageIcon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span className="truncate">{label}</span>
              </div>
              <span className="font-mono text-[10px] text-zinc-600 truncate max-w-full px-2">
                {placeholderPath}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
