import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Briefcase, User, Mail, Linkedin, Github, Moon, Sun, X } from 'lucide-react';
import { cn } from '../../lib/utils';
type Project = {
  id: string;
  title: string;
  company: string;
  description: string;
  image: string;
  tags: string[];
  year: string;
  role: string;
  overview: string;
  challenges: string[];
  solutions: string[];
  outcomes: string[];
};
type PortfolioWebsiteProps = {
  className?: string;
};
const mockProjects: Project[] = [{
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
const Navigation = ({
  currentPage,
  onNavigate,
  darkMode,
  onToggleDarkMode
}: {
  currentPage: string;
  onNavigate: (page: string) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}) => {
  return <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50" data-magicpath-id="0" data-magicpath-path="PortfolioWebsite.tsx">
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
    }} className="bg-white/70 dark:bg-[#0a1f0d]/70 backdrop-blur-xl border border-green-200 dark:border-green-900/50 rounded-full shadow-lg shadow-green-500/10 dark:shadow-green-500/20" data-magicpath-id="1" data-magicpath-path="PortfolioWebsite.tsx">
        <div className="flex items-center gap-2 px-6 py-3" data-magicpath-id="2" data-magicpath-path="PortfolioWebsite.tsx">
          <button onClick={() => onNavigate('home')} className={cn('flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all rounded-full', currentPage === 'home' ? 'bg-[#13531C] dark:bg-green-700 text-white dark:text-green-50 shadow-md' : 'text-green-700 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/30')} data-magicpath-id="3" data-magicpath-path="PortfolioWebsite.tsx">
            <Briefcase className="w-4 h-4" data-magicpath-id="4" data-magicpath-path="PortfolioWebsite.tsx" />
            Work
          </button>
          <button onClick={() => onNavigate('about')} className={cn('flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all rounded-full', currentPage === 'about' ? 'bg-[#13531C] dark:bg-green-700 text-white dark:text-green-50 shadow-md' : 'text-green-700 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/30')} data-magicpath-id="5" data-magicpath-path="PortfolioWebsite.tsx">
            <User className="w-4 h-4" data-magicpath-id="6" data-magicpath-path="PortfolioWebsite.tsx" />
            About
          </button>
          <div className="w-px h-6 bg-green-200 dark:bg-green-900/50 mx-1" data-magicpath-id="7" data-magicpath-path="PortfolioWebsite.tsx" />
          <button onClick={onToggleDarkMode} className="p-2 rounded-full text-green-700 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/30 transition-colors" aria-label="Toggle dark mode" data-magicpath-id="8" data-magicpath-path="PortfolioWebsite.tsx">
            {darkMode ? <Sun className="w-5 h-5" data-magicpath-id="9" data-magicpath-path="PortfolioWebsite.tsx" /> : <Moon className="w-5 h-5" data-magicpath-id="10" data-magicpath-path="PortfolioWebsite.tsx" />}
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
  }} data-magicpath-id="11" data-magicpath-path="PortfolioWebsite.tsx">
      <div className="bg-white dark:bg-[#0f2912] overflow-hidden border border-green-200 dark:border-green-900/50 shadow-lg shadow-green-500/20 dark:shadow-green-500/30 hover:shadow-2xl hover:shadow-green-500/10 dark:hover:shadow-green-500/20 transition-all duration-300" style={{
      borderRadius: '12px'
    }} data-magicpath-id="12" data-magicpath-path="PortfolioWebsite.tsx">
        <div className="relative overflow-hidden bg-green-50 dark:bg-green-950/50 aspect-[4/3]" style={{
        borderRadius: '12px 12px 0 0'
      }} data-magicpath-id="13" data-magicpath-path="PortfolioWebsite.tsx">
          <motion.img src={project.image} alt={project.title} className="w-full h-full object-cover" whileHover={{
          scale: 1.05
        }} transition={{
          duration: 0.4
        }} data-magicpath-id="14" data-magicpath-path="PortfolioWebsite.tsx" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#13531C]/60 via-[#13531C]/0 to-[#13531C]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" data-magicpath-id="15" data-magicpath-path="PortfolioWebsite.tsx" />
        </div>
        <div className="p-4 space-y-2" style={{
        borderTopWidth: "0px",
        borderTopColor: "rgb(61, 71, 82)",
        borderRightWidth: "0px",
        borderRightColor: "rgb(61, 71, 82)",
        borderBottomWidth: "0px",
        borderBottomColor: "rgb(61, 71, 82)",
        borderLeftWidth: "0px",
        borderLeftColor: "rgb(61, 71, 82)",
        borderStyle: "solid",
        borderRadius: "0px"
      }} data-magicpath-id="16" data-magicpath-path="PortfolioWebsite.tsx">
          <div className="flex items-center justify-between" data-magicpath-id="17" data-magicpath-path="PortfolioWebsite.tsx">
            <span className="text-xs font-medium text-green-600 dark:text-green-400" data-magicpath-id="18" data-magicpath-path="PortfolioWebsite.tsx">{project.company}</span>
            <span className="text-xs text-green-500 dark:text-green-500" data-magicpath-id="19" data-magicpath-path="PortfolioWebsite.tsx">{project.year}</span>
          </div>
          <h3 className="text-base font-semibold text-[#13531C] dark:text-green-100 group-hover:text-green-700 dark:group-hover:text-green-300 transition-colors line-clamp-1" data-magicpath-id="20" data-magicpath-path="PortfolioWebsite.tsx">
            {project.title}
          </h3>
          <p className="text-xs text-green-700 dark:text-green-400 line-clamp-2" data-magicpath-id="21" data-magicpath-path="PortfolioWebsite.tsx">{project.description}</p>
          <div className="flex flex-wrap gap-1.5 pt-1" data-magicpath-id="22" data-magicpath-path="PortfolioWebsite.tsx">
            {project.tags.slice(0, 2).map(tag => <span key={tag} className="px-2 py-0.5 text-xs font-medium text-green-800 dark:text-green-300 bg-green-50 dark:bg-green-900/50 rounded-full" data-magicpath-id="23" data-magicpath-path="PortfolioWebsite.tsx">
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
  }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-8" onClick={onClose} data-magicpath-id="24" data-magicpath-path="PortfolioWebsite.tsx">
      {/* Scrim/Backdrop */}
      <motion.div initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} exit={{
      opacity: 0
    }} className="absolute inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm" data-magicpath-id="25" data-magicpath-path="PortfolioWebsite.tsx" />

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
    }} className="relative w-full max-w-6xl max-h-[90vh] bg-white dark:bg-[#0a1f0d] rounded-2xl shadow-2xl overflow-hidden flex flex-col" onClick={e => e.stopPropagation()} data-magicpath-id="26" data-magicpath-path="PortfolioWebsite.tsx">
        {/* Header with close button */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-white/95 dark:bg-[#0a1f0d]/95 backdrop-blur-sm border-b border-green-200 dark:border-green-900/50" data-magicpath-id="27" data-magicpath-path="PortfolioWebsite.tsx">
          <div className="flex items-center gap-3 text-sm text-green-600 dark:text-green-400" data-magicpath-id="28" data-magicpath-path="PortfolioWebsite.tsx">
            <span data-magicpath-id="29" data-magicpath-path="PortfolioWebsite.tsx">{project.company}</span>
            <span data-magicpath-id="30" data-magicpath-path="PortfolioWebsite.tsx">•</span>
            <span data-magicpath-id="31" data-magicpath-path="PortfolioWebsite.tsx">{project.year}</span>
            <span data-magicpath-id="32" data-magicpath-path="PortfolioWebsite.tsx">•</span>
            <span data-magicpath-id="33" data-magicpath-path="PortfolioWebsite.tsx">{project.role}</span>
          </div>
          <button onClick={onClose} className="flex items-center justify-center w-10 h-10 rounded-full text-green-700 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors" aria-label="Close modal" data-magicpath-id="34" data-magicpath-path="PortfolioWebsite.tsx">
            <X className="w-5 h-5" data-magicpath-id="35" data-magicpath-path="PortfolioWebsite.tsx" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto flex-1 px-6 py-8 sm:px-8 md:px-12" data-magicpath-id="36" data-magicpath-path="PortfolioWebsite.tsx">
          <motion.div initial={{
          y: 20,
          opacity: 0
        }} animate={{
          y: 0,
          opacity: 1
        }} transition={{
          delay: 0.1
        }} data-magicpath-id="37" data-magicpath-path="PortfolioWebsite.tsx">
            <div className="mb-6" data-magicpath-id="38" data-magicpath-path="PortfolioWebsite.tsx">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#13531C] dark:text-green-100 mb-4" data-magicpath-id="39" data-magicpath-path="PortfolioWebsite.tsx">
                {project.title}
              </h1>
              <p className="text-lg sm:text-xl text-green-700 dark:text-green-300" data-magicpath-id="40" data-magicpath-path="PortfolioWebsite.tsx">{project.description}</p>
            </div>

            <div className="flex flex-wrap gap-2 mb-8" data-magicpath-id="41" data-magicpath-path="PortfolioWebsite.tsx">
              {project.tags.map(tag => <span key={tag} className="px-4 py-2 text-sm font-medium text-green-800 dark:text-green-300 bg-green-50 dark:bg-[#0f2912] rounded-full border border-green-200 dark:border-green-900/50" data-magicpath-id="42" data-magicpath-path="PortfolioWebsite.tsx">
                  {tag}
                </span>)}
            </div>

            <div className="rounded-2xl overflow-hidden mb-12 border border-green-200 dark:border-green-900/50" data-magicpath-id="43" data-magicpath-path="PortfolioWebsite.tsx">
              <img src={project.image} alt={project.title} className="w-full h-auto" data-magicpath-id="44" data-magicpath-path="PortfolioWebsite.tsx" />
            </div>

            <div className="space-y-12" data-magicpath-id="45" data-magicpath-path="PortfolioWebsite.tsx">
              <section data-magicpath-id="46" data-magicpath-path="PortfolioWebsite.tsx">
                <h2 className="text-2xl font-bold text-[#13531C] dark:text-green-100 mb-4" data-magicpath-id="47" data-magicpath-path="PortfolioWebsite.tsx">Overview</h2>
                <p className="text-green-700 dark:text-green-300 leading-relaxed" data-magicpath-id="48" data-magicpath-path="PortfolioWebsite.tsx">{project.overview}</p>
              </section>

              <section data-magicpath-id="49" data-magicpath-path="PortfolioWebsite.tsx">
                <h2 className="text-2xl font-bold text-[#13531C] dark:text-green-100 mb-4" data-magicpath-id="50" data-magicpath-path="PortfolioWebsite.tsx">Challenges</h2>
                <ul className="space-y-3" data-magicpath-id="51" data-magicpath-path="PortfolioWebsite.tsx">
                  {project.challenges.map((challenge, index) => <li key={index} className="flex gap-3" data-magicpath-id="52" data-magicpath-path="PortfolioWebsite.tsx">
                      <span className="text-green-500 dark:text-green-500 font-medium flex-shrink-0" data-magicpath-id="53" data-magicpath-path="PortfolioWebsite.tsx">•</span>
                      <span className="text-green-700 dark:text-green-300" data-magicpath-id="54" data-magicpath-path="PortfolioWebsite.tsx">{challenge}</span>
                    </li>)}
                </ul>
              </section>

              <section data-magicpath-id="55" data-magicpath-path="PortfolioWebsite.tsx">
                <h2 className="text-2xl font-bold text-[#13531C] dark:text-green-100 mb-4" data-magicpath-id="56" data-magicpath-path="PortfolioWebsite.tsx">Solutions</h2>
                <ul className="space-y-3" data-magicpath-id="57" data-magicpath-path="PortfolioWebsite.tsx">
                  {project.solutions.map((solution, index) => <li key={index} className="flex gap-3" data-magicpath-id="58" data-magicpath-path="PortfolioWebsite.tsx">
                      <span className="text-green-500 dark:text-green-500 font-medium flex-shrink-0" data-magicpath-id="59" data-magicpath-path="PortfolioWebsite.tsx">•</span>
                      <span className="text-green-700 dark:text-green-300" data-magicpath-id="60" data-magicpath-path="PortfolioWebsite.tsx">{solution}</span>
                    </li>)}
                </ul>
              </section>

              <section data-magicpath-id="61" data-magicpath-path="PortfolioWebsite.tsx">
                <h2 className="text-2xl font-bold text-[#13531C] dark:text-green-100 mb-4" data-magicpath-id="62" data-magicpath-path="PortfolioWebsite.tsx">Outcomes</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" data-magicpath-id="63" data-magicpath-path="PortfolioWebsite.tsx">
                  {project.outcomes.map((outcome, index) => <div key={index} className="p-6 bg-green-50 dark:bg-[#0f2912] rounded-xl border border-green-200 dark:border-green-900/50" data-magicpath-id="64" data-magicpath-path="PortfolioWebsite.tsx">
                      <p className="text-[#13531C] dark:text-green-100 font-medium" data-magicpath-id="65" data-magicpath-path="PortfolioWebsite.tsx">{outcome}</p>
                    </div>)}
                </div>
              </section>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>;
};
const AboutPage = () => {
  return <motion.div initial={{
    opacity: 0
  }} animate={{
    opacity: 1
  }} exit={{
    opacity: 0
  }} className="min-h-screen pb-24" data-magicpath-id="66" data-magicpath-path="PortfolioWebsite.tsx">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12" data-magicpath-id="67" data-magicpath-path="PortfolioWebsite.tsx">
        <motion.div initial={{
        y: 20,
        opacity: 0
      }} animate={{
        y: 0,
        opacity: 1
      }} transition={{
        delay: 0.1
      }} className="space-y-12" data-magicpath-id="68" data-magicpath-path="PortfolioWebsite.tsx">
          <div data-magicpath-id="69" data-magicpath-path="PortfolioWebsite.tsx">
            <h1 className="text-4xl sm:text-5xl font-bold text-[#13531C] dark:text-green-100 mb-6" data-magicpath-id="70" data-magicpath-path="PortfolioWebsite.tsx">About Me</h1>
            <div className="space-y-4 text-green-700 dark:text-green-300 leading-relaxed" data-magicpath-id="71" data-magicpath-path="PortfolioWebsite.tsx">
              <p data-magicpath-id="72" data-magicpath-path="PortfolioWebsite.tsx">
                Hi! I'm a UX designer passionate about creating intuitive, delightful experiences that solve real user
                problems. With over 8 years of experience in the industry, I've had the privilege of working with
                leading companies to transform complex challenges into elegant solutions.
              </p>
              <p data-magicpath-id="73" data-magicpath-path="PortfolioWebsite.tsx">
                My approach combines deep user research, rapid prototyping, and close collaboration with engineering
                teams to deliver products that users love. I believe the best design is invisible—it just works.
              </p>
              <p data-magicpath-id="74" data-magicpath-path="PortfolioWebsite.tsx">
                When I'm not pushing pixels, you can find me mentoring junior designers, speaking at design conferences,
                or exploring new cities for creative inspiration.
              </p>
            </div>
          </div>

          <div data-magicpath-id="75" data-magicpath-path="PortfolioWebsite.tsx">
            <h2 className="text-2xl font-bold text-[#13531C] dark:text-green-100 mb-6" data-magicpath-id="76" data-magicpath-path="PortfolioWebsite.tsx">Skills & Expertise</h2>
            <div className="grid sm:grid-cols-2 gap-6" data-magicpath-id="77" data-magicpath-path="PortfolioWebsite.tsx">
              {[['User Research', 'Usability Testing', 'User Interviews', 'A/B Testing'], ['UI Design', 'Design Systems', 'Prototyping', 'Interaction Design'], ['Tools', 'Figma', 'Adobe XD', 'Principle', 'Framer'], ['Other', 'HTML/CSS', 'Design Thinking', 'Agile/Scrum']].map(([category, ...skills]) => <div key={category} className="space-y-3" data-magicpath-id="78" data-magicpath-path="PortfolioWebsite.tsx">
                  <h3 className="font-semibold text-[#13531C] dark:text-green-100" data-magicpath-id="79" data-magicpath-path="PortfolioWebsite.tsx">{category}</h3>
                  <ul className="space-y-2" data-magicpath-id="80" data-magicpath-path="PortfolioWebsite.tsx">
                    {skills.map(skill => <li key={skill} className="text-green-700 dark:text-green-300 text-sm flex items-center gap-2" data-magicpath-id="81" data-magicpath-path="PortfolioWebsite.tsx">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 dark:bg-green-500" data-magicpath-id="82" data-magicpath-path="PortfolioWebsite.tsx" />
                        {skill}
                      </li>)}
                  </ul>
                </div>)}
            </div>
          </div>

          <div data-magicpath-id="83" data-magicpath-path="PortfolioWebsite.tsx">
            <h2 className="text-2xl font-bold text-[#13531C] dark:text-green-100 mb-6" data-magicpath-id="84" data-magicpath-path="PortfolioWebsite.tsx">Let's Connect</h2>
            <div className="flex flex-wrap gap-4" data-magicpath-id="85" data-magicpath-path="PortfolioWebsite.tsx">
              <a href="mailto:hello@example.com" className="flex items-center gap-2 px-6 py-3 bg-[#13531C] dark:bg-green-700 text-white dark:text-green-50 rounded-full hover:bg-green-800 dark:hover:bg-green-600 transition-colors" data-magicpath-id="86" data-magicpath-path="PortfolioWebsite.tsx">
                <Mail className="w-5 h-5" data-magicpath-id="87" data-magicpath-path="PortfolioWebsite.tsx" />
                Email Me
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 border border-green-300 dark:border-green-700 text-[#13531C] dark:text-green-100 rounded-full hover:bg-green-50 dark:hover:bg-green-900/30 transition-colors" data-magicpath-id="88" data-magicpath-path="PortfolioWebsite.tsx">
                <Linkedin className="w-5 h-5" data-magicpath-id="89" data-magicpath-path="PortfolioWebsite.tsx" />
                LinkedIn
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 border border-green-300 dark:border-green-700 text-[#13531C] dark:text-green-100 rounded-full hover:bg-green-50 dark:hover:bg-green-900/30 transition-colors" data-magicpath-id="90" data-magicpath-path="PortfolioWebsite.tsx">
                <Github className="w-5 h-5" data-magicpath-id="91" data-magicpath-path="PortfolioWebsite.tsx" />
                GitHub
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>;
};
const HomePage = ({
  onProjectClick
}: {
  onProjectClick: (project: Project) => void;
}) => {
  const [selectedCompany, setSelectedCompany] = useState<string>('all');
  const companies = ['all', ...Array.from(new Set(mockProjects.map(p => p.company)))];
  const filteredProjects = selectedCompany === 'all' ? mockProjects : mockProjects.filter(p => p.company === selectedCompany);
  return <motion.div initial={{
    opacity: 0
  }} animate={{
    opacity: 1
  }} exit={{
    opacity: 0
  }} className="min-h-screen pb-24" data-magicpath-id="92" data-magicpath-path="PortfolioWebsite.tsx">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-[linear-gradient(to_right,#13531C12_1px,transparent_1px),linear-gradient(to_bottom,#13531C12_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#13531C40_1px,transparent_1px),linear-gradient(to_bottom,#13531C40_1px,transparent_1px)] bg-[size:20px_20px]" data-magicpath-id="93" data-magicpath-path="PortfolioWebsite.tsx">
        <motion.div initial={{
        y: 20,
        opacity: 0
      }} animate={{
        y: 0,
        opacity: 1
      }} transition={{
        delay: 0.1
      }} className="mb-12" data-magicpath-id="94" data-magicpath-path="PortfolioWebsite.tsx">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#13531C] dark:text-green-100 mb-4" data-magicpath-id="95" data-magicpath-path="PortfolioWebsite.tsx">Staff-level UX designer crafting impactful and delightful experiences</h1>
          <p className="text-xl text-green-700 dark:text-green-300 max-w-3xl" data-magicpath-id="96" data-magicpath-path="PortfolioWebsite.tsx" style={{
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
      }} className="mb-8" data-magicpath-id="97" data-magicpath-path="PortfolioWebsite.tsx">
          <div className="flex flex-wrap gap-2" data-magicpath-id="98" data-magicpath-path="PortfolioWebsite.tsx">
            {companies.map(company => <button key={company} onClick={() => setSelectedCompany(company)} className={cn('px-4 py-2 rounded-full text-sm font-medium transition-all', selectedCompany === company ? 'bg-[#13531C] dark:bg-green-700 text-white dark:text-green-50' : 'bg-green-50 dark:bg-[#0f2912] text-green-800 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900/50 border border-green-200 dark:border-green-900/50')} data-magicpath-id="99" data-magicpath-path="PortfolioWebsite.tsx">
                {company === 'all' ? 'All Projects' : company}
              </button>)}
          </div>
        </motion.div>

        <AnimatePresence mode="popLayout" data-magicpath-id="100" data-magicpath-path="PortfolioWebsite.tsx">
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" data-magicpath-id="101" data-magicpath-path="PortfolioWebsite.tsx">
            {filteredProjects.map(project => <ProjectCard key={project.id} project={project} onClick={() => onProjectClick(project)} data-magicpath-id="102" data-magicpath-path="PortfolioWebsite.tsx" />)}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>;
};

// @component: PortfolioWebsite
export const PortfolioWebsite = (props: PortfolioWebsiteProps) => {
  const [currentPage, setCurrentPage] = useState<'home' | 'about'>('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [darkMode, setDarkMode] = useState(true);
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);
  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
  };
  const handleCloseModal = () => {
    setSelectedProject(null);
  };
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // @return
  return <div className={cn('min-h-screen bg-white dark:bg-[#0a1f0d] transition-colors duration-300', props.className)} data-magicpath-id="103" data-magicpath-path="PortfolioWebsite.tsx">
      <Navigation currentPage={currentPage} onNavigate={page => setCurrentPage(page as 'home' | 'about')} darkMode={darkMode} onToggleDarkMode={toggleDarkMode} data-magicpath-id="104" data-magicpath-path="PortfolioWebsite.tsx" />
      
      <AnimatePresence mode="wait" data-magicpath-id="105" data-magicpath-path="PortfolioWebsite.tsx">
        {currentPage === 'home' && <HomePage key="home" onProjectClick={handleProjectClick} data-magicpath-id="106" data-magicpath-path="PortfolioWebsite.tsx" />}
        {currentPage === 'about' && <AboutPage key="about" data-magicpath-id="107" data-magicpath-path="PortfolioWebsite.tsx" />}
      </AnimatePresence>

      {/* Project Modal */}
      <AnimatePresence data-magicpath-id="108" data-magicpath-path="PortfolioWebsite.tsx">
        {selectedProject && <ProjectModal key="project-modal" project={selectedProject} onClose={handleCloseModal} data-magicpath-id="109" data-magicpath-path="PortfolioWebsite.tsx" />}
      </AnimatePresence>
    </div>;
};