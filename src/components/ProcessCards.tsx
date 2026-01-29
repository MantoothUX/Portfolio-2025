'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useAnimationControls, PanInfo } from 'framer-motion';
import { 
  Search, 
  FileText, 
  Zap, 
  LayoutTemplate, 
  SlidersHorizontal, 
  Wrench, 
  Megaphone,
  X
} from 'lucide-react';

// Process card data with front and back content
const processCards = [
  {
    id: 1,
    title: 'Uncover problems',
    icon: Search,
    backContent: {
      heading: 'Discovery & Research',
      description: 'I analyze existing experiences, user needs, business goals, and competitive context to surface problems worth solving.',
      methods: ['Product teardowns', 'User interviews', 'Feedback analysis', 'UX heuristic audits', 'Competitive analysis']
    }
  },
  {
    id: 2,
    title: 'Synthesize and define',
    icon: FileText,
    backContent: {
      heading: 'Analysis & Framing',
      description: 'I transform research into actionable insights. By identifying patterns and prioritizing opportunities, I craft problem statements and experience principles that guide design decisions.',
      methods: ['Synthesis', 'Problem framing', 'Narrative writing', 'Experience principles']
    }
  },
  {
    id: 3,
    title: 'Brainstorm',
    icon: Zap,
    backContent: {
      heading: 'Ideation & Architecture',
      description: 'I explore the solution space through systems thinking, rapid ideation and collaborative design workshops.\n\nCollaborative brainstorms yield low fidelity solutions, user journeys and system diagrams that help align teams before investing in high-fidelity design.',
      methods: ['Journey mapping', 'Collaborative brainstorming', 'User flows', 'Concept sketching']
    }
  },
  {
    id: 4,
    title: ['Prototype.', 'Refine.', 'Align.'],
    icon: LayoutTemplate,
    backContent: {
      heading: 'Iteration & Validation',
      description: 'I bring ideas to life through prototypes through the design process. Each iteration is an opportunity to learn, refine, and build alignment with stakeholders.\n\nI also enjoy running team critiques and upleveling critique culture across the product organization.',
      methods: ['Rapid prototyping', 'Design critiques', 'Usability testing', 'Stakeholder reviews']
    }
  },
  {
    id: 5,
    title: 'Right-size the work',
    icon: SlidersHorizontal,
    backContent: {
      heading: 'Scoping & Prioritization',
      description: 'I balance ambition with pragmatism. By understanding constraints and trade-offs, I help teams ship meaningful improvements without getting stuck in perfection.',
      methods: ['Effort/impact analysis', 'MVP definition', 'Phased roadmaps', 'Technical feasibility']
    }
  },
  {
    id: 6,
    title: ['Build.', 'Test.', 'Ship.'],
    icon: Wrench,
    backContent: {
      heading: 'Execution & Delivery',
      description: 'I partner closely with engineering through implementation and even ship code (when they\'ll let me). QA testing, edge case handling, and attention to detail ensure we ship experiences users love.\n\nI also partner with product marketing to ensure clear communication of product releases to users.',
      methods: ['Dev handoff', 'Experience QA', 'Edge case design', 'Launch support', 'Marketing comms strategy']
    }
  },
  {
    id: 7,
    title: 'Share broadly at every stage',
    icon: Megaphone,
    backContent: {
      heading: 'Communication & Advocacy',
      description: 'I believe in open, transparent design. Sharing work early and often builds trust, gathers feedback, and creates advocates for design across the organization.\n\nI tailor demos and presentations for specific audiences, from SLT reviews to cross-team demos.',
      methods: ['Async videos', 'Code prototypes', 'Presentation design', 'Cross-team demos']
    }
  }
];

interface ProcessCardProps {
  card: typeof processCards[0];
  onClick: () => void;
  darkMode: boolean;
}

function ProcessCard({ card, onClick, darkMode }: ProcessCardProps) {
  const Icon = card.icon;
  const titleLines = Array.isArray(card.title) ? card.title : [card.title];
  
  return (
    <motion.div
      className={`
        relative flex flex-col gap-4 sm:gap-5 h-[200px] sm:h-[220px] md:h-[240px] w-[180px] sm:w-[200px] md:w-[220px] 
        px-4 sm:px-5 py-4 sm:py-5 cursor-pointer shrink-0 overflow-hidden
        border shadow-sm transition-all duration-300
        ${darkMode 
          ? 'bg-zinc-900 border-green-400/30 shadow-black/20 hover:shadow-md hover:shadow-black/30' 
          : 'bg-white border-[#13531C]/20 shadow-gray-500/5 hover:shadow-md hover:shadow-gray-500/10'
        }
      `}
      style={{ borderRadius: '12px' }}
      whileHover={{ 
        scale: 1.05,
        transition: { type: 'spring', stiffness: 400, damping: 25 }
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      {/* Icon container */}
      <div className={`
        flex items-center justify-center p-2.5 rounded-[10px] w-fit
        ${darkMode ? 'bg-zinc-800' : 'bg-gray-100'}
      `}>
        <Icon 
          className={`w-5 h-5 sm:w-6 sm:h-6 ${darkMode ? 'text-green-400' : 'text-[#13531C]'}`} 
          strokeWidth={1.5}
        />
      </div>
      
      {/* Title */}
      <div 
        className={`
          text-xl sm:text-2xl leading-[1.1]
          ${darkMode ? 'text-white' : 'text-gray-900'}
        `}
        style={{ fontFamily: "'Instrument Serif', serif" }}
      >
        {titleLines.map((line, index) => (
          <p key={index} className="mb-0">{line}</p>
        ))}
      </div>
    </motion.div>
  );
}

interface CardModalProps {
  card: typeof processCards[0];
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
}

function CardModal({ card, isOpen, onClose, darkMode }: CardModalProps) {
  const Icon = card.icon;
  const titleLines = Array.isArray(card.title) ? card.title : [card.title];
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Modal - Scale and morph animation */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <motion.div
              className={`
                relative w-full max-w-md pointer-events-auto
                rounded-[12px] overflow-hidden
                ${darkMode 
                  ? 'bg-gray-800 shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.5)]' 
                  : 'bg-white shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)]'
                }
              `}
              initial={{ 
                scale: 0.6,
                opacity: 0,
                y: 20
              }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                y: 0,
                transition: {
                  type: 'spring',
                  stiffness: 300,
                  damping: 25,
                  mass: 0.8
                }
              }}
              exit={{ 
                scale: 0.9, 
                opacity: 0,
                y: 10,
                transition: { 
                  duration: 0.2,
                  ease: 'easeOut'
                }
              }}
            >
              {/* Close button */}
              <motion.button
                className={`
                  absolute top-4 right-4 p-2 rounded-full z-10
                  ${darkMode 
                    ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }
                `}
                onClick={onClose}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5" />
              </motion.button>
              
              {/* Modal content */}
              <motion.div 
                className="p-5 sm:p-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { delay: 0.1, duration: 0.3 }
                }}
              >
                {/* Icon and title header - stacked vertically like the cards */}
                <div className="flex flex-col gap-4 mb-6">
                  <motion.div 
                    className={`
                      flex items-center justify-center p-3 rounded-[12px] w-fit
                      ${darkMode ? 'bg-gray-700' : 'bg-[#f4f4f4]'}
                    `}
                    initial={{ scale: 0.8 }}
                    animate={{ 
                      scale: 1,
                      transition: { delay: 0.15, type: 'spring', stiffness: 400 }
                    }}
                  >
                    <Icon 
                      className={`w-8 h-8 ${darkMode ? 'text-green-400' : 'text-[#13531C]'}`} 
                      strokeWidth={1.5}
                    />
                  </motion.div>
                  <div 
                    className={`text-2xl sm:text-3xl leading-tight ${darkMode ? 'text-white' : 'text-black'}`}
                    style={{ fontFamily: "'Instrument Serif', serif" }}
                  >
                    {titleLines.join(' ')}
                  </div>
                </div>
                
                {/* Description */}
                <motion.p 
                  className={`text-base leading-relaxed mb-6 whitespace-pre-line ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                  style={{ fontFamily: "'balto', sans-serif" }}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    transition: { delay: 0.2, duration: 0.3 }
                  }}
                >
                  {card.backContent.description}
                </motion.p>
                
                {/* Methods */}
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    transition: { delay: 0.25, duration: 0.3 }
                  }}
                >
                  <div className="flex flex-wrap gap-2">
                    {card.backContent.methods.map((method, index) => (
                      <motion.span
                        key={index}
                        className={`
                          px-3 py-1.5 rounded-full text-sm
                          ${darkMode 
                            ? 'bg-gray-700 text-gray-300' 
                            : 'bg-gray-100 text-gray-700'
                          }
                        `}
                        style={{ fontFamily: "'balto', sans-serif" }}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ 
                          opacity: 1, 
                          scale: 1,
                          transition: { delay: 0.3 + index * 0.05 }
                        }}
                      >
                        {method}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

interface ProcessCardsProps {
  darkMode: boolean;
}

export function ProcessCards({ darkMode }: ProcessCardsProps) {
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedCard, setSelectedCard] = useState<typeof processCards[0] | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimationControls();
  const x = useMotionValue(0);
  const dragStartX = useRef(0);
  
  // Triple the cards for seamless infinite scroll in both directions
  const tripleCards = [...processCards, ...processCards, ...processCards];
  
  // Card dimensions for calculations (matching smaller card size)
  const cardWidth = 220;
  const cardGap = 24;
  const singleSetWidth = (cardWidth + cardGap) * processCards.length;
  
  // Check if animation should be paused (hovering, dragging, or modal open)
  const shouldPause = isPaused || isDragging || selectedCard !== null;
  
  // Normalize position to keep it within the middle set of cards
  const normalizePosition = useCallback((position: number) => {
    // We want to keep the position within -singleSetWidth to -singleSetWidth*2
    // This keeps us in the "middle" set of the tripled cards
    let normalized = position;
    
    while (normalized > 0) {
      normalized -= singleSetWidth;
    }
    while (normalized < -singleSetWidth * 2) {
      normalized += singleSetWidth;
    }
    
    return normalized;
  }, [singleSetWidth]);
  
  // Start position in the middle set
  useEffect(() => {
    x.set(-singleSetWidth);
  }, [x, singleSetWidth]);
  
  // Handle the infinite scroll animation
  useEffect(() => {
    if (shouldPause) {
      controls.stop();
    } else {
      const currentX = x.get();
      const normalizedX = normalizePosition(currentX);
      
      // If position was normalized, update it
      if (normalizedX !== currentX) {
        x.set(normalizedX);
      }
      
      // Calculate remaining distance to complete one loop
      const targetX = normalizedX - singleSetWidth;
      const distance = Math.abs(targetX - normalizedX);
      const duration = (distance / singleSetWidth) * 30;
      
      controls.start({
        x: targetX,
        transition: {
          duration: duration,
          ease: 'linear',
          onComplete: () => {
            // Reset to middle position and continue
            x.set(-singleSetWidth);
          }
        }
      });
    }
    
    return () => {
      controls.stop();
    };
  }, [shouldPause, controls, x, singleSetWidth, normalizePosition]);
  
  // Handle drag start
  const handleDragStart = () => {
    setIsDragging(true);
    controls.stop();
    dragStartX.current = x.get();
  };
  
  // Handle drag
  const handleDrag = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    let newX = dragStartX.current + info.offset.x;
    
    // Normalize during drag to create infinite effect
    newX = normalizePosition(newX);
    x.set(newX);
  };
  
  // Handle drag end
  const handleDragEnd = () => {
    // Normalize position after drag
    const currentX = x.get();
    const normalizedX = normalizePosition(currentX);
    x.set(normalizedX);
    
    // Small delay before resuming animation to allow user to click
    setTimeout(() => {
      setIsDragging(false);
    }, 150);
  };
  
  return (
    <div className="my-12">
      <h2 
        className={`text-2xl mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}
        style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
      >
        Process
      </h2>
      
      {/* Marquee container */}
      <div 
        ref={containerRef}
        className="relative overflow-hidden cursor-grab active:cursor-grabbing"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => !isDragging && setIsPaused(false)}
      >
        {/* Gradient masks for fade effect */}
        <div 
          className={`
            absolute left-0 top-0 bottom-0 w-6 sm:w-10 z-10 pointer-events-none
            ${darkMode 
              ? 'bg-gradient-to-r from-[#1a1a2e] to-transparent' 
              : 'bg-gradient-to-r from-white to-transparent'
            }
          `} 
        />
        <div 
          className={`
            absolute right-0 top-0 bottom-0 w-6 sm:w-10 z-10 pointer-events-none
            ${darkMode 
              ? 'bg-gradient-to-l from-[#1a1a2e] to-transparent' 
              : 'bg-gradient-to-l from-white to-transparent'
            }
          `} 
        />
        
        {/* Draggable scrolling cards */}
        <motion.div
          className="flex gap-4 sm:gap-5 md:gap-6 py-4"
          style={{ x, width: 'fit-content' }}
          animate={controls}
          drag="x"
          dragConstraints={{ left: -singleSetWidth * 3, right: singleSetWidth }}
          dragElastic={0}
          dragMomentum={false}
          onDragStart={handleDragStart}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
        >
          {tripleCards.map((card, index) => (
            <ProcessCard
              key={`${card.id}-${index}`}
              card={card}
              onClick={() => !isDragging && setSelectedCard(card)}
              darkMode={darkMode}
            />
          ))}
        </motion.div>
      </div>
      
      {/* Modal */}
      <CardModal
        card={selectedCard || processCards[0]}
        isOpen={selectedCard !== null}
        onClose={() => setSelectedCard(null)}
        darkMode={darkMode}
      />
    </div>
  );
}

export default ProcessCards;
