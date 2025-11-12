import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Briefcase, User, Mail, Linkedin, Github, Moon, Sun, X, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '../../lib/utils';
import contentData from '../../content.json';

type Project = {
  id: string;
  title: string;
  company: string;
  description: string; // Description shown in modal
  cardDescription?: string; // Optional: shorter description for card (falls back to description)
  image: string; // Image for the project card
  modalImage?: string; // Optional: separate image for the modal hero (falls back to image if not provided)
  tags: string[];
  year: string;
  role: string;
  category?: string;
  overview?: string; // Optional: only show if provided
  challenges?: string[]; // Optional: only show if provided
  solutions?: string[]; // Optional: only show if provided
  outcomes?: string[]; // Optional: only show if provided
  highlights?: string[]; // Optional: highlights section with bullet points
  toolsUsed?: string[]; // Optional: tools used section with bullet points (can contain HTML links)
  growthAndEvolution?: string; // Optional: growth and evolution section text
  externalUrl?: string; // Optional: external link URL (e.g., live site, demo)
  galleryImages?: string[]; // Optional: array of image URLs for gallery/carousel
  galleryFooter?: string; // Optional: footer text below image gallery
  hidden?: boolean; // Optional: hide project from display
  disabled?: boolean; // Optional: disable project card (placeholder, no modal)
};
type PortfolioWebsiteProps = {
  className?: string;
};

// Use content from content.json, fallback to mock data if not available
const getProjects = (): Project[] => {
  if (contentData?.projects && Array.isArray(contentData.projects) && contentData.projects.length > 0) {
    return contentData.projects as Project[];
  }
  // Fallback to mock data
  return [{
  id: '1',
  title: 'E-commerce Redesign',
  company: 'Amazon',
  description: 'Complete overhaul of the checkout experience, resulting in 25% increase in conversion',
  image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
  tags: ['UX Research', 'UI Design', 'Prototyping'],
  year: '2024',
  role: 'Lead UX Designer',
  overview: 'Led the redesign of the checkout flow to reduce cart abandonment and improve user confidence during purchase.',
  challenges: ['High cart abandonment rate at 68%', 'Complex multi-step checkout process', 'Lack of trust signals during payment'],
  solutions: ['Simplified checkout to 3 clear steps', 'Added progress indicators and trust badges', 'Implemented guest checkout option'],
  outcomes: ['25% increase in conversion rate', '40% reduction in cart abandonment', '15% increase in average order value']
}, {
  id: '2',
  title: 'Mobile Banking App',
  company: 'Chase',
  description: 'Designed an intuitive mobile banking experience for millennial and Gen Z users',
  image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop',
  tags: ['Mobile Design', 'Financial UX', 'User Testing'],
  year: '2023',
  role: 'Senior UX Designer',
  overview: 'Created a modern, user-friendly mobile banking app that makes financial management accessible and engaging.',
  challenges: ['Complex financial features overwhelming users', 'Low engagement with budget tracking tools', 'Security concerns affecting adoption'],
  solutions: ['Progressive disclosure of advanced features', 'Gamified savings and budget tools', 'Clear security messaging and biometric auth'],
  outcomes: ['4.8 star rating', '60% increase in daily active users', '3x increase in budget tool usage']
}, {
  id: '3',
  title: 'Healthcare Portal',
  company: 'Mayo Clinic',
  description: 'Patient portal redesign focused on accessibility and ease of appointment scheduling',
  image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop',
  tags: ['Accessibility', 'Healthcare', 'Information Architecture'],
  year: '2023',
  role: 'UX Designer',
  overview: 'Redesigned the patient portal to make healthcare information more accessible and appointment booking seamless.',
  challenges: ['WCAG AA compliance requirements', 'Complex medical terminology confusing users', 'Fragmented appointment scheduling process'],
  solutions: ['Full WCAG AAA accessibility implementation', 'Plain language medical content with tooltips', 'Unified scheduling system with calendar view'],
  outcomes: ['100% WCAG AAA compliance', '50% reduction in support calls', '35% increase in online appointment bookings']
}, {
  id: '4',
  title: 'SaaS Dashboard',
  company: 'Salesforce',
  description: 'Enterprise analytics dashboard with customizable widgets and real-time data visualization',
  image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
  tags: ['Data Visualization', 'Enterprise UX', 'Dashboard Design'],
  year: '2024',
  role: 'Product Designer',
  overview: 'Designed a powerful yet intuitive analytics dashboard for enterprise sales teams to track performance metrics.',
  challenges: ['Information overload with 50+ metrics', 'Rigid layout limiting customization', 'Slow data loading affecting usability'],
  solutions: ['Customizable widget system with drag-and-drop', 'Smart defaults based on user role', 'Progressive loading with skeleton screens'],
  outcomes: ['45% increase in dashboard usage', '30% reduction in time to insight', '90% user satisfaction score']
}, {
  id: '5',
  title: 'Learning Platform',
  company: 'Google',
  description: 'Online learning platform focused on interactive courses and skill development',
  image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop',
  tags: ['EdTech', 'Interactive Design', 'Gamification'],
  year: '2023',
  role: 'UX/UI Designer',
  overview: 'Created an engaging online learning experience that keeps users motivated through their educational journey.',
  challenges: ['Low course completion rates at 15%', 'Lack of learner engagement', 'Difficulty tracking progress'],
  solutions: ['Progress tracking with visual milestones', 'Bite-sized lessons with interactive elements', 'Achievement system and social features'],
  outcomes: ['65% course completion rate', '4x increase in daily engagement', '50k+ active learners in first quarter']
}, {
  id: '6',
  title: 'Travel Booking App',
  company: 'Airbnb',
  description: 'Streamlined travel booking experience with personalized recommendations',
  image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop',
  tags: ['Mobile App', 'Personalization', 'Search UX'],
  year: '2024',
  role: 'Lead Product Designer',
  overview: 'Redesigned the travel booking flow to make finding and booking accommodations faster and more personalized.',
  challenges: ['Overwhelming search results', 'Complex filtering system', 'Booking anxiety and decision fatigue'],
  solutions: ['AI-powered personalized recommendations', 'Smart filters that learn preferences', 'Detailed property previews with virtual tours'],
  outcomes: ['40% faster booking time', '55% increase in booking conversion', 'NPS score increased from 42 to 68']
  }];
};

const projects = getProjects();

const Navigation = ({
  darkMode,
  onToggleDarkMode
}: {
  darkMode: boolean;
  onToggleDarkMode: () => void;
}) => {
  const location = useLocation();
  const isWork = location.pathname === '/' || location.pathname === '/work';
  const isAbout = location.pathname === '/about';

  return <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <motion.div initial={{
      y: 100,
      opacity: 0
    }} animate={{
      y: 0,
      opacity: 1
    }} transition={{
      type: "spring",
      stiffness: 260,
      damping: 20
    }} className="bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-green-200 dark:border-green-900/50 rounded-full shadow-lg shadow-green-500/10 dark:shadow-green-500/20">
        <div className="flex items-center gap-2 px-6 py-3">
          <Link to="/work" className={cn('flex items-center gap-2 px-4 py-2 text-sm font-semibold transition-all rounded-full', isWork ? 'bg-[#13531C] dark:bg-green-700 text-white dark:text-green-50 shadow-md' : 'text-green-700 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/30')}>
            <Briefcase className="w-4 h-4" style={{
            display: "none"
          }} />
            Work
          </Link>
          <Link to="/about" className={cn('flex items-center gap-2 px-4 py-2 text-sm font-semibold transition-all rounded-full', isAbout ? 'bg-[#13531C] dark:bg-green-700 text-white dark:text-green-50 shadow-md' : 'text-green-700 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/30')}>
            <User className="w-4 h-4" style={{
            display: "none"
          }} />
            About
          </Link>
          <div className="w-px h-6 bg-green-200 dark:bg-green-900/50 mx-1" />
          <button onClick={onToggleDarkMode} className="p-2 rounded-full text-green-700 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/30 transition-colors" aria-label="Toggle dark mode">
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </motion.div>
    </nav>;
};
const ProjectCard = ({
  project,
  onClick
}: {
  project: Project;
  onClick: () => void;
}) => {
  const isDisabled = project.disabled === true;
  
  return <motion.div layout initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: isDisabled ? 0.6 : 1,
    y: 0
  }} exit={{
    opacity: 0,
    y: 20
  }} transition={{
    duration: 0.3
  }} whileHover={isDisabled ? {} : {
    scale: 1.05,
    y: -8,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }} className={cn("group flex flex-col h-full", isDisabled ? "cursor-not-allowed" : "cursor-pointer")} onClick={isDisabled ? undefined : onClick} style={{
    perspective: 1000
  }}>
      <div className={cn("bg-white dark:bg-zinc-900 overflow-hidden border border-gray-200 dark:border-zinc-800 shadow-lg shadow-gray-500/10 dark:shadow-black/30 transition-all duration-300 flex flex-col h-full", !isDisabled && "hover:shadow-2xl hover:shadow-gray-500/20 dark:hover:shadow-black/40", isDisabled && "border-gray-300 dark:border-zinc-700")} style={{
      borderRadius: '12px'
    }}>
        <div className="relative overflow-hidden bg-gray-50 dark:bg-zinc-950/50 aspect-[4/3] flex-shrink-0" style={{
        borderRadius: '12px 12px 0 0'
      }}>
          <motion.img src={project.image} alt={project.title} className="w-full h-full object-cover" whileHover={isDisabled ? {} : {
          scale: 1.05
        }} transition={{
          duration: 0.4
        }} style={isDisabled ? { filter: 'grayscale(100%)' } : {}} />
          {!isDisabled && <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />}
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <h3 className={cn("text-base font-semibold line-clamp-1 mb-2 transition-colors", isDisabled ? "text-gray-400 dark:text-gray-500" : "text-gray-900 dark:text-white group-hover:text-green-700 dark:group-hover:text-green-300")}>
            {project.title}
          </h3>
          <p className={cn("text-xs line-clamp-2 min-h-[2.5rem] flex items-start", isDisabled ? "text-gray-400 dark:text-gray-500" : "text-gray-700 dark:text-gray-300")}>{project.cardDescription || project.description}</p>
          {project.year && (
            <div className="flex flex-wrap gap-1.5 pt-2 mt-auto">
              <span className={cn("px-2 py-0.5 text-xs font-semibold rounded-full", isDisabled ? "text-gray-400 dark:text-gray-600 bg-gray-50 dark:bg-gray-900" : "text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800")}>
                {project.year}
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>;
};

const ImageGallery = ({
  images,
  footer
}: {
  images: string[];
  footer?: string;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [isPreloading, setIsPreloading] = useState(true);

  // Preload all images when component mounts
  useEffect(() => {
    let loadedCount = 0;
    const totalImages = images.length;
    
    const preloadImages = () => {
      if (totalImages === 0) {
        setIsPreloading(false);
        return;
      }

      images.forEach((src) => {
        const img = new Image();
        img.onload = () => {
          setLoadedImages((prev) => {
            const next = new Set(prev);
            next.add(src);
            loadedCount++;
            // Once all images are loaded, hide preloading state
            if (loadedCount === totalImages) {
              setIsPreloading(false);
            }
            return next;
          });
        };
        img.onerror = () => {
          loadedCount++;
          if (loadedCount === totalImages) {
            setIsPreloading(false);
          }
        };
        img.src = src;
      });
    };
    
    preloadImages();
  }, [images]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return <div className="w-full max-w-full sm:max-w-2xl md:max-w-4xl mb-12">
      <div className="relative rounded-2xl overflow-hidden border border-gray-200 dark:border-zinc-800 bg-gray-100 dark:bg-zinc-900">
        {images.length > 1 && (
          <>
            <button onClick={goToPrevious} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/50 dark:bg-white/20 text-white dark:text-white hover:bg-black/70 dark:hover:bg-white/30 transition-colors" aria-label="Previous image">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button onClick={goToNext} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/50 dark:bg-white/20 text-white dark:text-white hover:bg-black/70 dark:hover:bg-white/30 transition-colors" aria-label="Next image">
              <ChevronRight className="w-6 h-6" />
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
              {images.map((_, index) => <button key={index} onClick={() => setCurrentIndex(index)} className={cn('w-2 h-2 rounded-full transition-all', index === currentIndex ? 'bg-white w-6' : 'bg-white/50')} aria-label={`Go to image ${index + 1}`} />)}
            </div>
          </>
        )}
        {/* Crossfade transition - all images preloaded and stacked */}
        <div className="relative w-full">
          {images.map((src, index) => {
            const isActive = index === currentIndex;
            const isLoaded = loadedImages.has(src);
            
            // Render all loaded images, or the active one if not yet loaded
            if (!isLoaded && !isActive) {
              return null;
            }
            
            return (
              <motion.img
                key={src}
                src={src}
                alt={`Gallery image ${index + 1}`}
                className={cn("w-full h-auto", isActive ? "relative block" : "absolute top-0 left-0 w-full h-auto")}
                style={{
                  pointerEvents: 'none',
                }}
                initial={false}
                animate={{
                  opacity: isActive && isLoaded ? 1 : 0,
                }}
                transition={{
                  duration: 0.5,
                  ease: "easeInOut"
                }}
                onLoad={() => {
                  if (!loadedImages.has(src)) {
                    setLoadedImages((prev) => {
                      const next = new Set(prev);
                      next.add(src);
                      return next;
                    });
                  }
                }}
              />
            );
          })}
        </div>
        {/* Loading indicator */}
        {(isPreloading || !loadedImages.has(images[currentIndex])) && (
          <div className="absolute inset-0 flex items-center justify-center z-0 bg-gray-100 dark:bg-zinc-900">
            <div className="w-8 h-8 border-2 border-gray-300 dark:border-gray-600 border-t-gray-600 dark:border-t-gray-400 rounded-full animate-spin" />
          </div>
        )}
      </div>
      {footer && (
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400 italic">{footer}</p>
        </div>
      )}
    </div>;
};

const ProjectModal = ({
  project,
  onClose
}: {
  project: Project;
  onClose: () => void;
}) => {
  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);
  return <motion.div initial={{
    opacity: 0
  }} animate={{
    opacity: 1
  }} exit={{
    opacity: 0
  }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-8" onClick={onClose}>
      {/* Scrim/Backdrop */}
      <motion.div initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} exit={{
      opacity: 0
    }} className="absolute inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm" />

      {/* Modal Content */}
      <motion.div initial={{
      opacity: 0,
      scale: 0.95,
      y: 20
    }} animate={{
      opacity: 1,
      scale: 1,
      y: 0
    }} exit={{
      opacity: 0,
      scale: 0.95,
      y: 20
    }} transition={{
      type: "spring",
      damping: 25,
      stiffness: 300
    }} className="relative w-full max-w-6xl max-h-[90vh] bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
        {/* Header with close button */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-zinc-800">
          <div className="flex items-center gap-3 text-sm text-green-600 dark:text-green-400">
            <span>{project.company}</span>
            <span>•</span>
            <span>{project.role}</span>
          </div>
          <button onClick={onClose} className="flex items-center justify-center w-10 h-10 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors" aria-label="Close modal">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto flex-1 px-4 py-8 sm:px-6 md:px-8 lg:px-12">
          <motion.div initial={{
          y: 20,
          opacity: 0
        }} animate={{
          y: 0,
          opacity: 1
        }} transition={{
          delay: 0.1
        }}>
            <div className="max-w-4xl mb-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-gray-900 dark:text-white mb-4 leading-tight">
                {project.title}
              </h1>
              <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 mb-3">{project.description}</p>
              {project.year && (
                <span className="inline-block px-4 py-2 rounded-full text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800">
                  {project.year}
                </span>
              )}
            </div>

            {/* Image carousel - show right after title/year if galleryImages exist */}
            {project.galleryImages && project.galleryImages.length > 0 && (
              <div className="mb-12">
                <ImageGallery images={project.galleryImages} footer={project.galleryFooter} />
              </div>
            )}

            {/* Hero image - show modalImage if available and no galleryImages */}
            {project.modalImage && (!project.galleryImages || project.galleryImages.length === 0) && (
              <div className="w-full max-w-full sm:max-w-2xl md:max-w-4xl rounded-2xl overflow-hidden mb-12 border border-gray-200 dark:border-zinc-800">
                <img src={project.modalImage} alt={project.title} className="w-full h-auto" />
              </div>
            )}

            <div className="max-w-4xl space-y-12">
              {project.overview && project.id !== "2" && (
                <section>
                  <h2 className="text-2xl text-gray-900 dark:text-white mb-4" style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}>Overview</h2>
                  {project.overview.includes('\n-') || project.overview.startsWith('-') ? (
                    <div className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                      {project.overview.split('\n').map((line, index) => {
                        if (line.trim().startsWith('-')) {
                          const bulletText = line.trim().substring(1).trim();
                          return (
                            <div key={index} className="flex gap-3 mb-3">
                              <span className="text-green-500 dark:text-green-500 font-semibold flex-shrink-0">•</span>
                              <span>{bulletText}</span>
                            </div>
                          );
                        } else if (line.trim()) {
                          return <p key={index} className="mb-3">{line.trim()}</p>;
                        }
                        return null;
                      })}
                    </div>
                  ) : (
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">{project.overview}</p>
                  )}
                  {project.externalUrl && (
                    <a 
                      href={project.externalUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#13531C] dark:bg-green-700 text-white dark:text-green-50 rounded-full hover:bg-green-800 dark:hover:bg-green-600 transition-colors font-semibold"
                    >
                      Play the game
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </section>
              )}

              {project.challenges && project.challenges.length > 0 && (
                <section>
                  <h2 className="text-2xl text-gray-900 dark:text-white mb-4" style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}>Challenges</h2>
                  {project.challenges.length === 1 ? (
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{project.challenges[0]}</p>
                  ) : (
                    <ul className="space-y-3">
                      {project.challenges.map((challenge, index) => <li key={index} className="flex gap-3">
                          <span className="text-green-500 dark:text-green-500 font-semibold flex-shrink-0">•</span>
                          <span className="text-gray-700 dark:text-gray-300">{challenge}</span>
                        </li>)}
                    </ul>
                  )}
                </section>
              )}

              {project.solutions && project.solutions.length > 0 && (
                <section>
                  <h2 className="text-2xl text-gray-900 dark:text-white mb-4" style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}>Solution</h2>
                  {project.solutions.length === 1 ? (
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{project.solutions[0]}</p>
                  ) : project.id === "2" ? (
                    <div>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">{project.solutions[0]}</p>
                      <ul className="space-y-3">
                        {project.solutions.slice(1).map((solution, index) => <li key={index} className="flex gap-3">
                            <span className="text-green-500 dark:text-green-500 font-semibold flex-shrink-0">•</span>
                            <span className="text-gray-700 dark:text-gray-300">{solution}</span>
                          </li>)}
                      </ul>
                    </div>
                  ) : (
                    <ul className="space-y-3">
                      {project.solutions.map((solution, index) => <li key={index} className="flex gap-3">
                          <span className="text-green-500 dark:text-green-500 font-semibold flex-shrink-0">•</span>
                          <span className="text-gray-700 dark:text-gray-300">{solution}</span>
                        </li>)}
                    </ul>
                  )}
                </section>
              )}

              {project.growthAndEvolution && (
                <section>
                  <h2 className="text-2xl text-gray-900 dark:text-white mb-4" style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}>Growth and evolution</h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{project.growthAndEvolution}</p>
                </section>
              )}

              {project.highlights && project.highlights.length > 0 && (
                <section>
                  <h2 className="text-2xl text-gray-900 dark:text-white mb-4" style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}>Highlights</h2>
                  <ul className="space-y-3">
                    {project.highlights.map((highlight, index) => <li key={index} className="flex gap-3">
                        <span className="text-green-500 dark:text-green-500 font-semibold flex-shrink-0">•</span>
                        <span className="text-gray-700 dark:text-gray-300">{highlight}</span>
                      </li>)}
                  </ul>
                </section>
              )}

              {project.toolsUsed && project.toolsUsed.length > 0 && (
                <section>
                  <h2 className="text-2xl text-gray-900 dark:text-white mb-4" style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}>Tools used</h2>
                  <ul className="space-y-3">
                    {project.toolsUsed.map((tool, index) => {
                      // Check if tool contains a URL pattern
                      const urlMatch = tool.match(/https?:\/\/[^\s]+/);
                      if (urlMatch) {
                        const url = urlMatch[0];
                        const parts = tool.split(url);
                        const beforeUrl = parts[0].trim();
                        const afterUrl = parts[1]?.trim() || '';
                        // If beforeUrl exists and is a single word, use it as link text
                        const linkText = beforeUrl && !beforeUrl.includes(' ') ? beforeUrl : (url.includes('github.com') ? 'Github' : url);
                        return (
                          <li key={index} className="flex gap-3">
                            <span className="text-green-500 dark:text-green-500 font-semibold flex-shrink-0">•</span>
                            <span className="text-gray-700 dark:text-gray-300">
                              {beforeUrl && beforeUrl.includes(' ') && <span>{beforeUrl} </span>}
                              <a href={url} target="_blank" rel="noopener noreferrer" className="text-[#13531C] dark:text-green-400 hover:underline">
                                {linkText}
                              </a>
                              {afterUrl && <span> {afterUrl}</span>}
                            </span>
                          </li>
                        );
                      }
                      return (
                        <li key={index} className="flex gap-3">
                          <span className="text-green-500 dark:text-green-500 font-semibold flex-shrink-0">•</span>
                          <span className="text-gray-700 dark:text-gray-300">{tool}</span>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              )}

              {project.outcomes && project.outcomes.length > 0 && (
                <section>
                  <h2 className="text-2xl text-gray-900 dark:text-white mb-4" style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}>Outcomes</h2>
                  {project.outcomes.length === 1 ? (
                    (() => {
                      const outcome = project.outcomes[0];
                      const attributionMatch = outcome.match(/^(.+?)\s*-\s*(.+)$/);
                      if (attributionMatch) {
                        const quote = attributionMatch[1].trim();
                        const attribution = attributionMatch[2].trim();
                        return (
                          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            {quote} - <span className="font-normal italic">{attribution}</span>
                          </p>
                        );
                      }
                      return <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{outcome}</p>;
                    })()
                  ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {project.outcomes.map((outcome, index) => {
                        const attributionMatch = outcome.match(/^(.+?)\s*-\s*(.+)$/);
                        if (attributionMatch) {
                          const quote = attributionMatch[1].trim();
                          const attribution = attributionMatch[2].trim();
                          return (
                            <div key={index} className="p-6 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700" style={{ borderRadius: '20px' }}>
                              <p className="text-gray-900 dark:text-white font-semibold">
                                {quote} - <span className="font-normal italic">{attribution}</span>
                              </p>
                            </div>
                          );
                        }
                        return (
                          <div key={index} className="p-6 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700" style={{ borderRadius: '20px' }}>
                            <p className="text-gray-900 dark:text-white font-semibold">{outcome}</p>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </section>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>;
};
const AboutPage = ({
  darkMode
}: {
  darkMode: boolean;
}) => {
  const aboutContent = contentData?.about || {
    headline: "About Me",
    photo: "",
    bio: [
      "Hi! I'm a UX designer passionate about creating intuitive, delightful experiences that solve real user problems. With over 8 years of experience in the industry, I've had the privilege of working with leading companies to transform complex challenges into elegant solutions.",
      "My approach combines deep user research, rapid prototyping, and close collaboration with engineering teams to deliver products that users love. I believe the best design is invisible—it just works.",
      "When I'm not pushing pixels, you can find me mentoring junior designers, speaking at design conferences, or exploring new cities for creative inspiration."
    ],
    resume: "",
    skills: {
      "User Research": ["Usability Testing", "User Interviews", "A/B Testing"],
      "UI Design": ["Design Systems", "Prototyping", "Interaction Design"],
      "Tools": ["Figma", "Adobe XD", "Principle", "Framer"],
      "Other": ["HTML/CSS", "Design Thinking", "Agile/Scrum"]
    }
  };

  const contactInfo = contentData?.contact || {
    email: "hello@example.com",
    linkedin: "https://linkedin.com",
    github: "https://github.com"
  };

  return <motion.div exit={{
    opacity: 0
  }} className="min-h-screen pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div initial={{
        y: 20,
        opacity: 0
      }} animate={{
        y: 0,
        opacity: 1
      }} transition={{
        delay: 0.1
      }} className="space-y-12">
          <div>
            <h1 className="mb-6 leading-tight" style={{
              color: darkMode ? "#7bf1a8" : "#13531C",
              fontFamily: "'Instrument Serif', serif",
              fontWeight: 400,
              fontSize: 'clamp(2.5rem, 5vw, 5rem)' // Responsive: 40px on small, 80px on large
            }}>{aboutContent.headline}</h1>
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {aboutContent.photo && (
                <div className="flex-shrink-0">
                  <img 
                    src={aboutContent.photo} 
                    alt="Josh Mantooth" 
                    className="w-64 h-80 sm:w-72 sm:h-96 object-cover"
                    style={{ borderRadius: '20px' }}
                    onError={(e) => {
                      console.error('Image failed to load:', aboutContent.photo);
                    }}
                  />
                </div>
              )}
              <div className="flex-1 space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                {aboutContent.bio.map((paragraph, index) => {
                  // Check if paragraph contains "resume" and we have a resume URL
                  if (paragraph.toLowerCase().includes("resume") && aboutContent.resume) {
                    const parts = paragraph.split(/(resume)/i);
                    return (
                      <p key={index}>
                        {parts[0]}
                        {parts[1] && (
                          <>
                            <a 
                              href={aboutContent.resume} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-[#13531C] dark:text-green-400 hover:underline font-semibold"
                            >
                              {parts[1]}
                            </a>
                            {parts[2]}
                          </>
                        )}
                      </p>
                    );
                  }
                  return <p key={index}>{paragraph}</p>;
                })}
              </div>
            </div>
          </div>

          <div className="my-12">
            <h2 className="text-2xl text-gray-900 dark:text-white mb-6" style={{
              fontFamily: "'Instrument Serif', serif",
              fontWeight: 400
            }}>Process</h2>
            {/* Mobile/vertical layout SVG */}
            <div className="md:hidden max-w-[192px]">
              <img 
                src={darkMode ? "/Process_diagram_vertical_dark.svg" : "/Process_diagram_vertical_light.svg"}
                alt="Design process"
                className="w-full h-auto"
              />
            </div>
            {/* Desktop/horizontal layout SVG */}
            <div className="hidden md:block max-w-6xl mx-auto">
              <img 
                src={darkMode ? "/Process_diagram_horizontal_dark.svg" : "/Process_diagram_horizontal_light.svg"}
                alt="Design process"
                className="w-full h-auto"
              />
            </div>
          </div>

          <div>
            <h2 className="text-2xl text-gray-900 dark:text-white mb-6" style={{
              fontFamily: "'Instrument Serif', serif",
              fontWeight: 400
            }}>Skills & Expertise</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {Object.entries(aboutContent.skills).map(([category, skills]) => <div key={category} className="space-y-3">
                  <h3 className="font-semibold text-gray-900 dark:text-white">{category}</h3>
                  <ul className="space-y-2">
                    {skills.map(skill => <li key={skill} className="text-gray-700 dark:text-gray-300 text-base leading-relaxed flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 dark:bg-green-500" />
                        {skill}
                      </li>)}
                  </ul>
                </div>)}
            </div>
          </div>

          <div>
            <h2 className="text-2xl text-gray-900 dark:text-white mb-6" style={{
              fontFamily: "'Instrument Serif', serif",
              fontWeight: 400
            }}>Let's connect</h2>
            <div className="flex flex-wrap gap-4">
              <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-2 px-6 py-3 bg-[#13531C] dark:bg-green-700 text-white dark:text-green-50 rounded-full hover:bg-green-800 dark:hover:bg-green-600 transition-colors">
                <Mail className="w-5 h-5" />
                Email
              </a>
              <a href={contactInfo.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 border border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white rounded-full hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors">
                <Linkedin className="w-5 h-5" />
                LinkedIn
              </a>
              <a href={contactInfo.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 border border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white rounded-full hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors">
                <Github className="w-5 h-5" />
                GitHub
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>;
};
const HomePage = ({
  onProjectClick,
  darkMode
}: {
  onProjectClick: (project: Project) => void;
  darkMode: boolean;
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const heroContent = contentData?.hero || {
    title: "Staff-level UX designer crafting impactful and delightful experiences",
    subtitle: "I help companies build products that users love through research-driven design and thoughtful interactions."
  };
  const categories = ['all', 'Shopify', 'RigUp', 'Texas by Texas', 'Loom', 'Thread', 'Finish Line', 'Personal'];
  const visibleProjects = projects.filter(p => !p.hidden);
  const filteredProjects = selectedCategory === 'all' 
    ? [...visibleProjects.filter(p => p.category !== 'Personal' && !p.disabled), ...visibleProjects.filter(p => p.category === 'Personal' && !p.disabled), ...visibleProjects.filter(p => p.disabled)]
    : visibleProjects.filter(p => p.category === selectedCategory).sort((a, b) => {
        // Move disabled projects to the end
        if (a.disabled && !b.disabled) return 1;
        if (!a.disabled && b.disabled) return -1;
        return 0;
      });
  return <motion.div exit={{
    opacity: 0
  }} className="min-h-screen pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div initial={{
        y: 20,
        opacity: 0
      }} animate={{
        y: 0,
        opacity: 1
      }} transition={{
        delay: 0.1
      }} className="mb-12">
          <p className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Josh Mantooth
          </p>
          <h1 className="mb-4 leading-tight" style={{
          color: darkMode ? "#7bf1a8" : "#13531C",
          fontFamily: "'Instrument Serif', serif",
          fontWeight: 400,
          fontSize: 'clamp(2.5rem, 5vw, 5rem)' // Responsive: 40px on small, 80px on large
        }}>{heroContent.title}</h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl" style={{
          display: "none"
        }}>
            I help companies build products that users love through research-driven design and thoughtful interactions.
          </p>
        </motion.div>

        <motion.div initial={{
        y: 20,
        opacity: 0
      }} animate={{
        y: 0,
        opacity: 1
      }} transition={{
        delay: 0.2
      }} className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map(category => <button key={category} onClick={() => setSelectedCategory(category)} className={cn('px-4 py-2 rounded-full text-sm font-semibold transition-all', selectedCategory === category ? 'bg-[#13531C] dark:bg-green-700 text-white dark:text-green-50' : 'bg-green-50 dark:bg-green-900/50 text-green-800 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900/70 border border-green-200 dark:border-green-900/50')}>
                {category === 'all' ? 'All' : category}
              </button>)}
          </div>
        </motion.div>

        <AnimatePresence mode="popLayout">
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProjects.map(project => <ProjectCard key={project.id} project={project} onClick={() => onProjectClick(project)} />)}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>;
};

// @component: PortfolioWebsite
export const PortfolioWebsite = (props: PortfolioWebsiteProps) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Scroll to top when route changes
  useEffect(() => {
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    });
  }, [location.pathname]);

  // Handle hash-based modal routing
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash && (location.pathname === '/' || location.pathname === '/work')) {
      const project = projects.find(p => p.id === hash || p.title.toLowerCase().replace(/\s+/g, '-') === hash);
      if (project && project.id !== selectedProject?.id) {
        setSelectedProject(project);
      }
    } else if (!hash && selectedProject) {
      // Hash was removed, close modal
      setSelectedProject(null);
    }
  }, [location.hash, location.pathname, selectedProject?.id]);

  const handleProjectClick = (project: Project) => {
    // Don't open modal for disabled/placeholder projects
    if (project.disabled) {
      return;
    }
    setSelectedProject(project);
    // Update hash for shareable URLs
    navigate(`/work#${project.id}`, { replace: true });
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
    // Remove hash when closing modal
    if (location.pathname === '/work' || location.pathname === '/') {
      navigate(location.pathname, { replace: true });
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // @return
  return <div className={cn('min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-300 relative', props.className)}>
      {/* Grid pattern background that fills entire viewport */}
      <div className="fixed inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      
      {/* Content layer */}
      <div className="relative z-10">
        <Navigation darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />
        
        <AnimatePresence mode="wait">
          {(location.pathname === '/' || location.pathname === '/work') && (
            <HomePage key="work" onProjectClick={handleProjectClick} darkMode={darkMode} />
          )}
          {location.pathname === '/about' && (
            <AboutPage key="about" darkMode={darkMode} />
          )}
        </AnimatePresence>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && <ProjectModal key="project-modal" project={selectedProject} onClose={handleCloseModal} />}
      </AnimatePresence>
    </div>;
};