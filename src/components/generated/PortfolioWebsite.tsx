import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Briefcase, User, Mail, Linkedin, Github, Moon, Sun, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '../../lib/utils';
import contentData from '../../content.json';

type Project = {
  id: string;
  title: string;
  company: string;
  description: string;
  image: string;
  tags: string[];
  year: string;
  role: string;
  category?: string;
  overview: string;
  challenges: string[];
  solutions: string[];
  outcomes: string[];
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
          <Link to="/work" className={cn('flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all rounded-full', isWork ? 'bg-[#13531C] dark:bg-green-700 text-white dark:text-green-50 shadow-md' : 'text-green-700 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/30')}>
            <Briefcase className="w-4 h-4" style={{
            display: "none"
          }} />
            Work
          </Link>
          <Link to="/about" className={cn('flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all rounded-full', isAbout ? 'bg-[#13531C] dark:bg-green-700 text-white dark:text-green-50 shadow-md' : 'text-green-700 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/30')}>
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
  return <motion.div layout initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} exit={{
    opacity: 0,
    y: 20
  }} transition={{
    duration: 0.3
  }} whileHover={{
    scale: 1.05,
    y: -8,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }} className="group cursor-pointer" onClick={onClick} style={{
    perspective: 1000
  }}>
      <div className="bg-white dark:bg-zinc-900 overflow-hidden border border-gray-200 dark:border-zinc-800 shadow-lg shadow-gray-500/10 dark:shadow-black/30 hover:shadow-2xl hover:shadow-gray-500/20 dark:hover:shadow-black/40 transition-all duration-300" style={{
      borderRadius: '12px'
    }}>
        <div className="relative overflow-hidden bg-gray-50 dark:bg-zinc-950/50 aspect-[4/3]" style={{
        borderRadius: '12px 12px 0 0'
      }}>
          <motion.img src={project.image} alt={project.title} className="w-full h-full object-cover" whileHover={{
          scale: 1.05
        }} transition={{
          duration: 0.4
        }} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-green-600 dark:text-green-400">{project.company}</span>
            <span className="text-xs text-green-500 dark:text-green-500">{project.year}</span>
          </div>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white group-hover:text-green-700 dark:group-hover:text-green-300 transition-colors line-clamp-1">
            {project.title}
          </h3>
          <p className="text-xs text-gray-700 dark:text-gray-300 line-clamp-2">{project.description}</p>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.tags.slice(0, 2).map(tag => <span key={tag} className="px-2 py-0.5 text-xs font-medium text-green-800 dark:text-green-300 bg-green-50 dark:bg-green-900/50 rounded-full">
                {tag}
              </span>)}
          </div>
        </div>
      </div>
    </motion.div>;
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
            <span>{project.year}</span>
            <span>•</span>
            <span>{project.role}</span>
          </div>
          <button onClick={onClose} className="flex items-center justify-center w-10 h-10 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors" aria-label="Close modal">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto flex-1 px-6 py-8 sm:px-8 md:px-12">
          <motion.div initial={{
          y: 20,
          opacity: 0
        }} animate={{
          y: 0,
          opacity: 1
        }} transition={{
          delay: 0.1
        }}>
            <div className="mb-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 font-serif-display">
                {project.title}
              </h1>
              <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300">{project.description}</p>
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {project.tags.map(tag => <span key={tag} className="px-4 py-2 text-sm font-medium text-green-800 dark:text-green-300 bg-green-50 dark:bg-green-900/50 rounded-full border border-green-200 dark:border-green-900/50">
                  {tag}
                </span>)}
            </div>

            <div className="rounded-2xl overflow-hidden mb-12 border border-gray-200 dark:border-zinc-800">
              <img src={project.image} alt={project.title} className="w-full h-auto" />
            </div>

            <div className="space-y-12">
              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 font-serif-display">Overview</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{project.overview}</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 font-serif-display">Challenges</h2>
                <ul className="space-y-3">
                  {project.challenges.map((challenge, index) => <li key={index} className="flex gap-3">
                      <span className="text-green-500 dark:text-green-500 font-medium flex-shrink-0">•</span>
                      <span className="text-gray-700 dark:text-gray-300">{challenge}</span>
                    </li>)}
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 font-serif-display">Solutions</h2>
                <ul className="space-y-3">
                  {project.solutions.map((solution, index) => <li key={index} className="flex gap-3">
                      <span className="text-green-500 dark:text-green-500 font-medium flex-shrink-0">•</span>
                      <span className="text-gray-700 dark:text-gray-300">{solution}</span>
                    </li>)}
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 font-serif-display">Outcomes</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {project.outcomes.map((outcome, index) => <div key={index} className="p-6 bg-gray-50 dark:bg-zinc-800 rounded-xl border border-gray-200 dark:border-zinc-700">
                      <p className="text-gray-900 dark:text-white font-medium">{outcome}</p>
                    </div>)}
                </div>
              </section>
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

  return <motion.div initial={{
    opacity: 0
  }} animate={{
    opacity: 1
  }} exit={{
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
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 font-serif-display" style={{
              color: darkMode ? "#7bf1a8" : "#13531C"
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
                              className="text-[#13531C] dark:text-green-400 hover:underline font-medium"
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

          <div>
            <h2 className="text-2xl font-bold mb-6 font-serif-display" style={{
              color: darkMode ? "#7bf1a8" : "#13531C"
            }}>Skills & Expertise</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {Object.entries(aboutContent.skills).map(([category, skills]) => <div key={category} className="space-y-3">
                  <h3 className="font-semibold text-gray-900 dark:text-white">{category}</h3>
                  <ul className="space-y-2">
                    {skills.map(skill => <li key={skill} className="text-gray-700 dark:text-gray-300 text-sm flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 dark:bg-green-500" />
                        {skill}
                      </li>)}
                  </ul>
                </div>)}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6 font-serif-display" style={{
              color: darkMode ? "#7bf1a8" : "#13531C"
            }}>Let's Connect</h2>
            <div className="flex flex-wrap gap-4">
              <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-2 px-6 py-3 bg-[#13531C] dark:bg-green-700 text-white dark:text-green-50 rounded-full hover:bg-green-800 dark:hover:bg-green-600 transition-colors">
                <Mail className="w-5 h-5" />
                Email Me
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
  const categories = ['all', 'Personal projects', 'Shopify', 'RigUp', 'Texas by Texas', 'Loom', 'Thread', 'Finish Line'];
  const filteredProjects = selectedCategory === 'all' ? projects : projects.filter(p => p.category === selectedCategory);
  return <motion.div initial={{
    opacity: 0
  }} animate={{
    opacity: 1
  }} exit={{
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
          <p className="text-lg sm:text-xl lg:text-2xl font-medium text-gray-700 dark:text-gray-300 mb-2">
            Josh Mantooth
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 font-serif-display" style={{
          color: darkMode ? "#7bf1a8" : "#13531C"
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
            {categories.map(category => <button key={category} onClick={() => setSelectedCategory(category)} className={cn('px-4 py-2 rounded-full text-sm font-medium transition-all', selectedCategory === category ? 'bg-[#13531C] dark:bg-green-700 text-white dark:text-green-50' : 'bg-green-50 dark:bg-green-900/50 text-green-800 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900/70 border border-green-200 dark:border-green-900/50')}>
                {category === 'all' ? 'All Projects' : category}
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
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      
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