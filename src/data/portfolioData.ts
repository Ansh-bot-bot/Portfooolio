export type BlueprintKind =
  | 'portrait'
  | 'snapshot'
  | 'packaging'
  | 'identity'
  | 'social'
  | 'uiux'
  | 'ai-visual'
  | 'ai-photo'
  | 'banners'
  | 'typography'
  | 'illustration'
  | 'poster'
  | 'graphic'
  | 'collage';

export interface ProjectImageSlot {
  id: string;
  label: string;
  caption: string;
  /** Replace with your file inside /public (e.g. "/images/projects/01-cover.jpg") */
  imageSrc?: string;
  placeholderPath: string;
  aspectRatio: '16:10' | '4:3' | '3:4' | '1:1';
  blueprint: BlueprintKind;
  imgClassName?: string;
}

export interface CaseStudyScrollImage {
  id: string;
  label: string;
  imageSrc: string;
  mediaType?: 'image' | 'video';
  hideControls?: boolean;
}

export interface ProjectFolderItem {
  id: string;
  number: string;
  category: string;
  title: string;
  summary: string;
  overview: string;
  approach: string;
  deliverables: string[];
  tools: string[];
  yearPlaceholder: string;
  accentBg: string;
  tabBg: string;
  textColor: string;
  mutedTextColor: string;
  tabOffsetClass: string;
  isCharcoalYellow?: boolean;
  coverImage: ProjectImageSlot;
  gallery: ProjectImageSlot[];
  caseStudyScrollImages?: CaseStudyScrollImage[];
}

export type PlaygroundShapeKind =
  | 'circle'
  | 'semicircle'
  | 'rounded-rect'
  | 'capsule'
  | 'blob-a'
  | 'blob-b'
  | 'arch'
  | 'scallop'
  | 'diamond-pill';

export type PlaygroundPaletteColor =
  | '#FDBBF8'
  | '#FF5CA8'
  | '#03A864'
  | '#FFCA00'
  | '#1D5BD7'
  | '#FF4E00'
  | '#FFFFFF';

export interface PlaygroundItem {
  id: string;
  title: string;
  categoryLabel: string;
  description: string;
  shape: PlaygroundShapeKind;
  color: PlaygroundPaletteColor;
  /** Desktop initial position in % of canvas width/height */
  initialX: number;
  initialY: number;
  /** Mobile initial position in % of canvas width/height */
  mobileX: number;
  mobileY: number;
  width: number;
  height: number;
  rotationDeg: number;
  aspectRatio: '3:4' | '1:1' | '4:3' | '16:10';
  imageSrc?: string;
  scrollImages?: {
    id: string;
    alt: string;
    imageSrc: string;
  }[];
  placeholderPath: string;
  blueprint: BlueprintKind;
  isFiller?: boolean;
}

export interface SoftwareToolSticker {
  id: string;
  name: string;
  imageSrc: string;
  rotateDeg: number;
  offsetClass: string;
  sizeClass: string;
}

/**
 * Editable portfolio configuration.
 * Replace placeholder strings and add imageSrc paths once your files are in /public/images/.
 */
export const designerProfile = {
  initials: 'H',
  name: 'HARSHITA',
  handwrittenIntro: 'Hi, my name is',
  designation: 'Graphic & Visual Communication Designer',
  availabilityLabel: 'OPEN TO NEW WORK AND GOOD PROBLEMS',
  heroSummary: 'I design identities, experiences and visuals that make ideas stand out.',
  aboutHeading: 'Hey, nice to meet you',
  aboutMarginNote: 'About Me',
  aboutBio: [
    "I'm a graphic and visual communication designer who enjoys turning rough ideas into tactile, memorable visual systems. Whether it's a dieline for a physical box, a brand mark, or an experimental digital layout, I care deeply about craft, rhythm, and clarity.",
    'Outside client briefs, my desk is usually covered in type specimens, packaging mockups, and visual experiments exploring how traditional editorial grids meet emerging AI image workflows.',
  ],
  heroPortraitLeft: {
    id: 'hero-left',
    label: 'Studio Portrait 01',
    caption: 'Sketchbook session',
    placeholderPath: '/images/hero-portrait-1.jpg',
    aspectRatio: '1:1',
    blueprint: 'portrait',
  } as ProjectImageSlot,
  heroPortraitRight: {
    id: 'hero-right',
    label: 'Studio Portrait 02',
    caption: 'Desk detail',
    placeholderPath: '/images/hero-portrait-2.jpg',
    aspectRatio: '1:1',
    blueprint: 'snapshot',
  } as ProjectImageSlot,
  aboutMainPortrait: {
    id: 'about-main',
    label: 'Harshita portrait',
    caption: 'THE FACE BEHIND THE IDEAS.',
    imageSrc: '/assets/aistudio/Screenshot_2026-11-16_at_6.33.27_PM_7c82378b.png',
    placeholderPath: '/images/about-portrait.jpg',
    aspectRatio: '3:4',
    blueprint: 'portrait',
  } as ProjectImageSlot,
  aboutSnapshotTop: {
    id: 'about-snap-1',
    label: 'Workspace Snapshot',
    caption: 'my creative desk',
    placeholderPath: '/images/about-workspace.jpg',
    aspectRatio: '4:3',
    blueprint: 'snapshot',
  } as ProjectImageSlot,
  aboutSnapshotBottom: {
    id: 'about-snap-2',
    label: 'Print & Paper Study',
    caption: 'paper & swatches',
    placeholderPath: '/images/about-swatches.jpg',
    aspectRatio: '1:1',
    blueprint: 'packaging',
  } as ProjectImageSlot,
  contact: {
    heading: 'HAVE A PROJECT IN MIND?',
    invitation:
      "I'm always glad to discuss brand identities, packaging systems, digital campaigns, or visual experiments. Drop a note and let's build something thoughtful together.",
    email: 'Harshita.T0121@gmail.com',
    handwrittenNote: 'Usually replies within 1–2 days!',
    socials: [
      {
        label: 'LINKEDIN',
        href: 'https://www.linkedin.com/in/harshita-tanwar-8b2878280/',
      },
      {
        label: 'INSTAGRAM',
        href: 'https://www.instagram.com/harshitatanwarr?psln=dTUzcThhMjBkYzI2&utm_source=qr',
      },
      {
        label: 'BEHANCE',
        href: 'https://www.behance.net/harshitatanwar',
      },
    ],
  },
};

export const softwareToolsList: SoftwareToolSticker[] = [
  {
    id: 'tool-photoshop',
    name: 'Photoshop',
    imageSrc: '/assets/aistudio/PHOTOSHOP__IMAGE_1__ff292fea.webp',
    rotateDeg: -3.2,
    offsetClass: 'sm:-translate-y-1',
    sizeClass: 'h-14 w-14 sm:h-[4.25rem] sm:w-[4.25rem]',
  },
  {
    id: 'tool-illustrator',
    name: 'Illustrator',
    imageSrc: '/assets/aistudio/ILLUSTRATOR__Image_2__549cd689.webp',
    rotateDeg: 2.6,
    offsetClass: 'sm:translate-y-2',
    sizeClass: 'h-[3.25rem] w-[3.25rem] sm:h-16 sm:w-16',
  },
  {
    id: 'tool-figma',
    name: 'Figma',
    imageSrc: '/assets/aistudio/Figma_image_3_56612019.png',
    rotateDeg: -1.8,
    offsetClass: 'sm:-translate-y-1.5',
    sizeClass: 'h-[3.75rem] w-[3.75rem] sm:h-[4.5rem] sm:w-[4.5rem]',
  },
  {
    id: 'tool-adobe-xd',
    name: 'Adobe XD',
    imageSrc: '/assets/aistudio/XD__Image_4_.svg_854e1cfe.webp',
    rotateDeg: 3.1,
    offsetClass: 'sm:translate-y-1.5',
    sizeClass: 'h-[3.25rem] w-[3.25rem] sm:h-16 sm:w-16',
  },
  {
    id: 'tool-procreate',
    name: 'Procreate',
    imageSrc: '/assets/aistudio/Procreate__Image_5__e105c83c.png',
    rotateDeg: -2.6,
    offsetClass: 'sm:-translate-y-1',
    sizeClass: 'h-14 w-14 sm:h-[4.25rem] sm:w-[4.25rem]',
  },
  {
    id: 'tool-filmora',
    name: 'Filmora',
    imageSrc: '/assets/aistudio/Filmora_image_6.svg_a6b044f6.webp',
    rotateDeg: 2.1,
    offsetClass: 'sm:translate-y-2',
    sizeClass: 'h-[3.25rem] w-[3.25rem] sm:h-16 sm:w-16',
  },
  {
    id: 'tool-canva',
    name: 'Canva',
    imageSrc: '/assets/aistudio/Canva_image_7__03682712.png',
    rotateDeg: -1.5,
    offsetClass: 'sm:-translate-y-0.5',
    sizeClass: 'h-14 w-14 sm:h-[4.25rem] sm:w-[4.25rem]',
  },
];

export const projectsList: ProjectFolderItem[] = [
  {
    id: 'project-01',
    number: 'PROJECT 01',
    category: 'PACKAGING',
    title: 'PACKAGING',
    summary: "Bringing Jaipur's royal heritage and Ghewar traditions to life through packaging.",
    overview: "Bringing Jaipur's royal heritage and Ghewar traditions to life through packaging.",
    approach:
      'Rooted in royal Rajasthani motifs, tactile box construction, and heritage colour accents crafted for celebratory gifting.',
    deliverables: ['Structural Packaging', 'Festive Box System', 'Label Typography', 'Print Finishing'],
    tools: ['Adobe Illustrator', 'Adobe Photoshop', 'Print Production'],
    yearPlaceholder: '2026 · Selected Work',
    accentBg: '#057A5B',
    tabBg: '#F6C93B',
    textColor: '#FFFFFF',
    mutedTextColor: '#D1FAE5',
    tabOffsetClass: 'ml-0 md:ml-6',
    isCharcoalYellow: true,
    coverImage: {
      id: 'p1-cover',
      label: 'Ghewar Royal Heritage Packaging',
      caption: 'Rajasthani Ghewar packaging presentation',
      imageSrc: '/assets/aistudio/Artboard_1_de5696d4.jpg',
      placeholderPath: '/images/projects/01-packaging-cover.jpg',
      aspectRatio: '16:10',
      blueprint: 'packaging',
    },
    caseStudyScrollImages: [
      {
        id: 'p1-scroll-01',
        label: 'Ghewar Packaging Design — Celebrating Rajasthani Heritage',
        imageSrc: '/assets/aistudio/WORK_SCROLL-15_fed743b1.png',
        mediaType: 'image',
      },
      {
        id: 'p1-scroll-02',
        label: 'Ghewar Packaging 3D Showcase Animation',
        imageSrc: '/assets/ghewar-packaging-animation.gif',
        mediaType: 'image',
      },
      {
        id: 'p1-scroll-03',
        label: 'Ghewar Packaging Design — Open Box & Structure Details',
        imageSrc: '/assets/aistudio/WORK_SCROLL-27_dd6d2a2d.png',
        mediaType: 'image',
      },
      {
        id: 'p1-scroll-04',
        label: 'Ghewar Packaging Design — Dieline & Behind The Scenes',
        imageSrc: '/assets/aistudio/WORK_SCROLL-28_a546ba93.png',
        mediaType: 'image',
      },
    ],
    gallery: [
      {
        id: 'p1-g1',
        label: 'Box Structure & Elevation',
        caption: 'Primary packaging presentation',
        placeholderPath: '/images/projects/01-packaging-01.jpg',
        aspectRatio: '16:10',
        blueprint: 'packaging',
      },
      {
        id: 'p1-g2',
        label: 'Heritage Motif Detail',
        caption: 'Typography and pattern detail',
        placeholderPath: '/images/projects/01-packaging-02.jpg',
        aspectRatio: '4:3',
        blueprint: 'typography',
      },
      {
        id: 'p1-g3',
        label: 'Unboxing Experience',
        caption: 'Tactile finishes and inserts',
        placeholderPath: '/images/projects/01-packaging-03.jpg',
        aspectRatio: '4:3',
        blueprint: 'graphic',
      },
    ],
  },
  {
    id: 'project-02',
    number: 'PROJECT 02',
    category: 'BRANDING',
    title: 'BRANDING',
    summary: 'Building a bubbly brand identity with colour, character and personality.',
    overview: 'Building a bubbly brand identity with colour, character and personality.',
    approach:
      'Constructed around playful typography, expressive colour systems, and cohesive brand touchpoints full of warmth.',
    deliverables: ['Brand Identity', 'Logo & Mark System', 'Colour & Typography', 'Brand Guidelines'],
    tools: ['Adobe Illustrator', 'Figma', 'Adobe Photoshop'],
    yearPlaceholder: '2026 · Selected Work',
    accentBg: '#FF6B35',
    tabBg: '#EB5017',
    textColor: '#18181B',
    mutedTextColor: '#27272A',
    tabOffsetClass: 'ml-8 md:ml-36',
    coverImage: {
      id: 'p2-cover',
      label: 'Boba Baee — Branding Showcase',
      caption: 'Boba Baee branding thumbnail',
      imageSrc: '/assets/aistudio/Artboard_2_ec648a4b.jpg',
      placeholderPath: '/images/projects/02-branding-cover.jpg',
      aspectRatio: '16:10',
      blueprint: 'identity',
    },
    caseStudyScrollImages: [
      {
        id: 'p2-scroll-01',
        label: 'Boba Baee — Complete Branding Project Presentation',
        imageSrc: '/assets/aistudio/WORK_SCROLL-18.jpg_609cace9.jpeg',
        mediaType: 'image',
      },
      {
        id: 'p2-scroll-02',
        label: 'Boba Baee — Business Card Showcase Animation',
        imageSrc: '/assets/boba-baee-business-card.gif',
        mediaType: 'image',
      },
      {
        id: 'p2-scroll-03',
        label: 'Boba Baee — Brand Applications, Caps & Packaging Showcase (Work Scroll 19)',
        imageSrc: '/assets/aistudio/WORK_SCROLL-19_81cfce79.png',
        mediaType: 'image',
      },
      {
        id: 'p2-scroll-04',
        label: 'Boba Baee — Apron, Coasters & Gift Bags Showcase (Work Scroll 20)',
        imageSrc: '/assets/aistudio/WORK_SCROLL-20_abe8c9ba.png',
        mediaType: 'image',
      },
      {
        id: 'p2-scroll-05',
        label: 'Boba Baee — Mobile App & Digital Experience Showcase Animation',
        imageSrc: '/assets/boba-baee-phone.gif',
        mediaType: 'image',
      },
      {
        id: 'p2-scroll-06',
        label: 'Boba Baee — Social Media Posts & Thank You',
        imageSrc: '/assets/aistudio/Artboard_1_8c59e807.jpg',
        mediaType: 'image',
      },
    ],
    gallery: [
      {
        id: 'p2-g1',
        label: 'Identity System',
        caption: 'Primary mark and logotype proportions',
        placeholderPath: '/images/projects/02-branding-01.jpg',
        aspectRatio: '16:10',
        blueprint: 'identity',
      },
      {
        id: 'p2-g2',
        label: 'Brand Applications',
        caption: 'Stationery, stickers, and collateral',
        placeholderPath: '/images/projects/02-branding-02.jpg',
        aspectRatio: '4:3',
        blueprint: 'graphic',
      },
      {
        id: 'p2-g3',
        label: 'Palette & Visual Language',
        caption: 'Expressive brand colours and motifs',
        placeholderPath: '/images/projects/02-branding-03.jpg',
        aspectRatio: '4:3',
        blueprint: 'poster',
      },
    ],
  },
  {
    id: 'project-03',
    number: 'PROJECT 03',
    category: 'SOCIAL MEDIA',
    title: 'SOCIAL MEDIA',
    summary: 'Turning ordinary product visuals into attention-grabbing brand stories.',
    overview: 'Turning ordinary product visuals into attention-grabbing brand stories.',
    approach:
      'Designed with punchy visual hooks, clean product staging, and cohesive storytelling formats built for modern social feeds.',
    deliverables: ['Campaign Posts', 'Carousel Series', 'Story Graphics', 'Feed Art Direction'],
    tools: ['Adobe Photoshop', 'Figma', 'Canva'],
    yearPlaceholder: '2026 · Selected Work',
    accentBg: '#C41648',
    tabBg: '#9ED61A',
    textColor: '#FFFFFF',
    mutedTextColor: '#FFE4EC',
    tabOffsetClass: 'ml-16 md:ml-64',
    isCharcoalYellow: true,
    coverImage: {
      id: 'p3-cover',
      label: 'Social Media — Feed & Campaign Showcase',
      caption: 'Social media showcase thumbnail',
      imageSrc: '/assets/aistudio/Artboard_9_0cf6d9c8.jpg',
      placeholderPath: '/images/projects/03-social-cover.jpg',
      aspectRatio: '16:10',
      blueprint: 'social',
    },
    caseStudyScrollImages: [
      {
        id: 'p3-scroll-01',
        label: 'Social Media Designing — Campaign Showcase & Post Design',
        imageSrc: '/assets/aistudio/Artboard_5_17a53c60.jpg',
        mediaType: 'image',
      },
      {
        id: 'p3-scroll-02',
        label: 'Social Media Designing — Grid Design & Thank You For Scrolling',
        imageSrc: '/assets/aistudio/Artboard_9_4df636eb.jpg',
        mediaType: 'image',
      },
    ],
    gallery: [
      {
        id: 'p3-g1',
        label: 'Feed Layout',
        caption: 'Editorial social grid composition',
        placeholderPath: '/images/projects/03-social-01.jpg',
        aspectRatio: '16:10',
        blueprint: 'social',
      },
      {
        id: 'p3-g2',
        label: 'Carousel Storytelling',
        caption: 'Multi-slide product narrative',
        placeholderPath: '/images/projects/03-social-02.jpg',
        aspectRatio: '4:3',
        blueprint: 'typography',
      },
      {
        id: 'p3-g3',
        label: 'Story & Reel Visuals',
        caption: 'Vertical campaign compositions',
        placeholderPath: '/images/projects/03-social-03.jpg',
        aspectRatio: '4:3',
        blueprint: 'poster',
      },
    ],
  },
  {
    id: 'project-04',
    number: 'PROJECT 04',
    category: 'WEBSITE BANNERS',
    title: 'WEBSITE BANNERS',
    summary:
      'Creating cohesive digital visuals through thoughtful imagery, typography and art direction.',
    overview:
      'Creating cohesive digital visuals through thoughtful imagery, typography and art direction.',
    approach:
      'Balanced editorial typography, crisp focal hierarchy, and adaptable digital proportions across hero banners and campaign tiles.',
    deliverables: ['Hero Website Banners', 'Campaign Visuals', 'Display Graphics', 'Responsive Cropping'],
    tools: ['Figma', 'Adobe Photoshop', 'Adobe Illustrator'],
    yearPlaceholder: '2026 · Selected Work',
    accentBg: '#1E4EEB',
    tabBg: '#1334AD',
    textColor: '#FFFFFF',
    mutedTextColor: '#DBEAFE',
    tabOffsetClass: 'ml-4 md:ml-20',
    coverImage: {
      id: 'p4-cover',
      label: 'Blue Buddha — Website Banners Showcase',
      caption: 'Website banners thumbnail',
      imageSrc: '/assets/aistudio/Artboard_7_a7c3f335.jpg',
      placeholderPath: '/images/projects/04-banners-cover.jpg',
      aspectRatio: '16:10',
      blueprint: 'banners',
    },
    caseStudyScrollImages: [
      {
        id: 'p4-scroll-01',
        label: 'Website Banners — Complete Vertical Scroll Presentation',
        imageSrc: '/assets/aistudio/Untitled_design-2_7db6f0fa.jpg',
        mediaType: 'image',
      },
    ],
    gallery: [
      {
        id: 'p4-g1',
        label: 'Hero Banner Series',
        caption: 'Full-width homepage hero visuals',
        placeholderPath: '/images/projects/04-banners-01.jpg',
        aspectRatio: '16:10',
        blueprint: 'banners',
      },
      {
        id: 'p4-g2',
        label: 'Typography & Layout',
        caption: 'Digital hierarchy and CTA contrast',
        placeholderPath: '/images/projects/04-banners-02.jpg',
        aspectRatio: '4:3',
        blueprint: 'typography',
      },
      {
        id: 'p4-g3',
        label: 'Campaign Tiles',
        caption: 'Cohesive promotional formats',
        placeholderPath: '/images/projects/04-banners-03.jpg',
        aspectRatio: '4:3',
        blueprint: 'graphic',
      },
    ],
  },
  {
    id: 'project-05',
    number: 'PROJECT 05',
    category: 'AI SHOOTS',
    title: 'AI SHOOTS',
    summary:
      'Crafting realistic AI-powered shoots through precise styling, lighting and visual direction.',
    overview:
      'Crafting realistic AI-powered shoots through precise styling, lighting and visual direction.',
    approach:
      'Combining intentional styling direction, controlled lighting setups, and manual retouching for editorial realism.',
    deliverables: ['Editorial Lookbook', 'Lighting & Styling', 'Art Direction', 'Post-Production'],
    tools: ['Generative AI Workflows', 'Adobe Photoshop', 'Lightroom'],
    yearPlaceholder: '2026 · Selected Work',
    accentBg: '#16C97D',
    tabBg: '#0BA363',
    textColor: '#18181B',
    mutedTextColor: '#1F2937',
    tabOffsetClass: 'ml-12 md:ml-48',
    coverImage: {
      id: 'p5-cover',
      label: 'AI Shoots — Lookbook & Art Direction Showcase',
      caption: 'AI Shoots thumbnail',
      imageSrc: '/assets/aistudio/Artboard_6_81c32daf.jpg',
      placeholderPath: '/images/projects/05-ai-shoots-cover.jpg',
      aspectRatio: '16:10',
      blueprint: 'ai-photo',
    },
    caseStudyScrollImages: [
      {
        id: 'p5-scroll-01',
        label: 'AI Generated Shoots — Complete Vertical Presentation',
        imageSrc: '/assets/aistudio/Untitled_design_da043330.jpg',
        mediaType: 'image',
      },
    ],
    gallery: [
      {
        id: 'p5-g1',
        label: 'Editorial Frame 01',
        caption: 'Key studio lighting direction',
        placeholderPath: '/images/projects/05-ai-shoots-01.jpg',
        aspectRatio: '16:10',
        blueprint: 'ai-photo',
      },
      {
        id: 'p5-g2',
        label: 'Editorial Frame 02',
        caption: 'Set styling and atmosphere',
        placeholderPath: '/images/projects/05-ai-shoots-02.jpg',
        aspectRatio: '4:3',
        blueprint: 'ai-visual',
      },
      {
        id: 'p5-g3',
        label: 'Editorial Frame 03',
        caption: 'Close-up texture and tone study',
        placeholderPath: '/images/projects/05-ai-shoots-03.jpg',
        aspectRatio: '4:3',
        blueprint: 'portrait',
      },
    ],
  },
  {
    id: 'project-06',
    number: 'PROJECT 06',
    category: 'UI/UX',
    title: 'UI/UX',
    summary: 'Connecting people through shared roots, familiar places and common experiences.',
    overview: 'Connecting people through shared roots, familiar places and common experiences.',
    approach:
      'Human-centred user flows and approachable interface architecture grounded in warmth, familiarity, and clarity.',
    deliverables: ['User Experience Flows', 'Interface Design', 'Interactive Prototype', 'Design System'],
    tools: ['Figma', 'Adobe XD', 'Interactive Prototyping'],
    yearPlaceholder: '2026 · Selected Work',
    accentBg: '#C5AEF2',
    tabBg: '#B196E8',
    textColor: '#18181B',
    mutedTextColor: '#27272A',
    tabOffsetClass: 'ml-6 md:ml-28',
    coverImage: {
      id: 'p6-cover',
      label: 'UniBond — UI/UX App Showcase',
      caption: 'UniBond UI/UX thumbnail',
      imageSrc: '/assets/aistudio/Artboard_4_38c22222.jpg',
      placeholderPath: '/images/projects/06-uiux-cover.jpg',
      aspectRatio: '16:10',
      blueprint: 'uiux',
    },
    caseStudyScrollImages: [
      {
        id: 'p6-scroll-01',
        label: 'UniBond — UI/UX Project Presentation Part 1',
        imageSrc: '/assets/aistudio/WORK_SCROLL-21_11554ec8.png',
        mediaType: 'image',
      },
      {
        id: 'p6-scroll-02',
        label: 'UniBond — Problem & Solution (Work Scroll 22)',
        imageSrc: '/assets/aistudio/WORK_SCROLL-22_a34ac62d.png',
        mediaType: 'image',
      },
      {
        id: 'p6-scroll-03',
        label: 'UniBond — Audience Analysis, Persona, Empathy Map, IA & Wireframe (Work Scroll 23)',
        imageSrc: '/assets/aistudio/WORK_SCROLL-23_1f4973bf.png',
        mediaType: 'image',
      },
      {
        id: 'p6-scroll-04',
        label: 'UniBond — Mid-Fidelity Wireframes, Colors & Typography (Work Scroll 18)',
        imageSrc: '/assets/aistudio/Artboard_18_48be1edf.png',
        mediaType: 'image',
      },
      {
        id: 'p6-scroll-05',
        label: 'UniBond — High-Fidelity Screens (Work Scroll 21)',
        imageSrc: '/assets/aistudio/Artboard_21_f29a0e37.jpg',
        mediaType: 'image',
      },
    ],
    gallery: [
      {
        id: 'p6-g1',
        label: 'Core Interface Screens',
        caption: 'Key user journeys and screens',
        placeholderPath: '/images/projects/06-uiux-01.jpg',
        aspectRatio: '16:10',
        blueprint: 'uiux',
      },
      {
        id: 'p6-g2',
        label: 'Experience Mapping',
        caption: 'Navigation and connection flows',
        placeholderPath: '/images/projects/06-uiux-02.jpg',
        aspectRatio: '4:3',
        blueprint: 'identity',
      },
      {
        id: 'p6-g3',
        label: 'UI Components',
        caption: 'Interface patterns and tokens',
        placeholderPath: '/images/projects/06-uiux-03.jpg',
        aspectRatio: '4:3',
        blueprint: 'graphic',
      },
    ],
  },
  {
    id: 'project-07',
    number: 'PROJECT 07',
    category: 'ILLUSTRATION',
    title: 'ILLUSTRATION',
    summary: 'Illustrating the colours, culture and little stories of Jaipur.',
    overview: 'Illustrating the colours, culture and little stories of Jaipur.',
    approach:
      'Capturing architectural charm, everyday street vignettes, and vibrant Rajasthani colour palettes through expressive illustration.',
    deliverables: ['Editorial Illustrations', 'Cultural Motifs', 'Colour Studies', 'Print Series'],
    tools: ['Procreate', 'Adobe Illustrator', 'Adobe Photoshop'],
    yearPlaceholder: '2026 · Selected Work',
    accentBg: '#1E1E24',
    tabBg: '#F6C93B',
    textColor: '#FFFFFF',
    mutedTextColor: '#D4D4D8',
    tabOffsetClass: 'ml-14 md:ml-56',
    isCharcoalYellow: true,
    coverImage: {
      id: 'p7-cover',
      label: 'Kundan Jewellery Packaging — Illustration Showcase',
      caption: 'Illustration thumbnail',
      imageSrc: '/assets/aistudio/Artboard_5_e9e7084e.jpg',
      placeholderPath: '/images/projects/07-illustration-cover.jpg',
      aspectRatio: '16:10',
      blueprint: 'illustration',
    },
    caseStudyScrollImages: [
      {
        id: 'p7-scroll-01',
        label: 'Kundan Jewellery Packaging — Illustration Design',
        imageSrc: '/assets/aistudio/Artboard_18_123be8e3.jpg',
        mediaType: 'image',
      },
      {
        id: 'p7-scroll-02',
        label: 'Kundan Jewellery Packaging — Illustration Showcase Animation',
        imageSrc: '/assets/illustration-animation.gif',
        mediaType: 'image',
      },
      {
        id: 'p7-scroll-03',
        label: 'Kundan Jewellery Packaging — Final Box Views & Thank You',
        imageSrc: '/assets/aistudio/Artboard_21_3bae73d0.jpg',
        mediaType: 'image',
      },
    ],
    gallery: [
      {
        id: 'p7-g1',
        label: 'Jaipur Stories — Plate 01',
        caption: 'Architectural and street illustration',
        placeholderPath: '/images/projects/07-illustration-01.jpg',
        aspectRatio: '16:10',
        blueprint: 'illustration',
      },
      {
        id: 'p7-g2',
        label: 'Jaipur Stories — Plate 02',
        caption: 'Colour studies and cultural details',
        placeholderPath: '/images/projects/07-illustration-02.jpg',
        aspectRatio: '4:3',
        blueprint: 'poster',
      },
      {
        id: 'p7-g3',
        label: 'Jaipur Stories — Plate 03',
        caption: 'Linework and texture exploration',
        placeholderPath: '/images/projects/07-illustration-03.jpg',
        aspectRatio: '4:3',
        blueprint: 'collage',
      },
    ],
  },
];

export const playgroundItems: PlaygroundItem[] = [
  {
    id: 'pg-01',
    title: 'Other Side of Me',
    categoryLabel: 'OTHER SIDE OF ME',
    description:
      'Personal visual stories, candid explorations, and creative sides beyond client briefs.',
    shape: 'blob-a',
    color: '#FDBBF8',
    initialX: 9,
    initialY: 12,
    mobileX: 5,
    mobileY: 5,
    width: 224,
    height: 186,
    rotationDeg: -5,
    aspectRatio: '3:4',
    scrollImages: [
      {
        id: 'pg-01-artboard-13',
        alt: 'Other Side of Me — Part 1',
        imageSrc: '/assets/aistudio/Artboard_13_5ac0a373.jpg',
      },
      {
        id: 'pg-01-artboard-10',
        alt: 'Other Side of Me — Part 2',
        imageSrc: '/assets/aistudio/Artboard_10_9c23acae.jpg',
      },
    ],
    placeholderPath: '/images/playground/other-side-of-me.jpg',
    blueprint: 'portrait',
  },
  {
    id: 'pg-02',
    title: 'Lines of Thought',
    categoryLabel: 'LINES OF THOUGHT',
    description:
      'Sketchbook lines, typographic notes, and unhurried visual thinking captured on paper.',
    shape: 'rounded-rect',
    color: '#FFCA00',
    initialX: 59,
    initialY: 11,
    mobileX: 46,
    mobileY: 26,
    width: 224,
    height: 154,
    rotationDeg: 4,
    aspectRatio: '4:3',
    placeholderPath: '/images/playground/lines-of-thought.jpg',
    blueprint: 'typography',
    scrollImages: [
      {
        id: 'pg-02-artboard-9',
        alt: 'Lines of Thought',
        imageSrc: '/assets/aistudio/Artboard_9_47528aed.jpg',
      },
    ],
  },
  {
    id: 'pg-03',
    title: 'Custom',
    categoryLabel: 'CUSTOM',
    description:
      'Bespoke lettering, tactile craft studies, and one-off custom pieces made for pure experimentation.',
    shape: 'scallop',
    color: '#03A864',
    initialX: 16,
    initialY: 54,
    mobileX: 8,
    mobileY: 49,
    width: 202,
    height: 202,
    rotationDeg: -6,
    aspectRatio: '1:1',
    placeholderPath: '/images/playground/custom.jpg',
    blueprint: 'collage',
    scrollImages: [
      {
        id: 'pg-03-artboard-11',
        alt: 'Custom',
        imageSrc: '/assets/aistudio/Artboard_11_ae442be0.jpg',
      },
    ],
  },
  {
    id: 'pg-04',
    title: 'Visual Play',
    categoryLabel: 'VISUAL PLAY',
    description:
      'Playful colour, form, and experimental visual compositions driven purely by curiosity.',
    shape: 'blob-b',
    color: '#FF4E00',
    initialX: 62,
    initialY: 55,
    mobileX: 46,
    mobileY: 64,
    width: 218,
    height: 174,
    rotationDeg: 6,
    aspectRatio: '16:10',
    placeholderPath: '/images/playground/visual-play.jpg',
    blueprint: 'graphic',
    scrollImages: [
      {
        id: 'pg-04-artboard-12',
        alt: 'Visual Play',
        imageSrc: '/assets/aistudio/Artboard_12_573460bd.jpg',
      },
    ],
  },
  // Decorative draggable filler shapes (no text, no icons, non-clickable)
  {
    id: 'pg-filler-01',
    title: '',
    categoryLabel: '',
    description: '',
    shape: 'circle',
    color: '#1D5BD7',
    initialX: 41,
    initialY: 16,
    mobileX: 66,
    mobileY: 6,
    width: 116,
    height: 116,
    rotationDeg: -4,
    aspectRatio: '1:1',
    placeholderPath: '',
    blueprint: 'graphic',
    isFiller: true,
  },
  {
    id: 'pg-filler-02',
    title: '',
    categoryLabel: '',
    description: '',
    shape: 'capsule',
    color: '#FF4E00',
    initialX: 3,
    initialY: 43,
    mobileX: 6,
    mobileY: 32,
    width: 146,
    height: 62,
    rotationDeg: -10,
    aspectRatio: '4:3',
    placeholderPath: '',
    blueprint: 'graphic',
    isFiller: true,
  },
  {
    id: 'pg-filler-03',
    title: '',
    categoryLabel: '',
    description: '',
    shape: 'semicircle',
    color: '#FFCA00',
    initialX: 42,
    initialY: 71,
    mobileX: 10,
    mobileY: 82,
    width: 164,
    height: 98,
    rotationDeg: -6,
    aspectRatio: '4:3',
    placeholderPath: '',
    blueprint: 'graphic',
    isFiller: true,
  },
  {
    id: 'pg-filler-04',
    title: '',
    categoryLabel: '',
    description: '',
    shape: 'arch',
    color: '#03A864',
    initialX: 80,
    initialY: 36,
    mobileX: 68,
    mobileY: 46,
    width: 116,
    height: 104,
    rotationDeg: 9,
    aspectRatio: '1:1',
    placeholderPath: '',
    blueprint: 'graphic',
    isFiller: true,
  },
  {
    id: 'pg-filler-05',
    title: '',
    categoryLabel: '',
    description: '',
    shape: 'diamond-pill',
    color: '#FF5CA8',
    initialX: 46,
    initialY: 43,
    mobileX: 64,
    mobileY: 84,
    width: 102,
    height: 102,
    rotationDeg: 11,
    aspectRatio: '1:1',
    placeholderPath: '',
    blueprint: 'graphic',
    isFiller: true,
  },
];
