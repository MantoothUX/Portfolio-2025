import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Briefcase, User, Mail, Linkedin, Github, ExternalLink } from 'lucide-react';
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
  outcomes: ['4.8 star app rating', '60% increase in daily active users', '3x increase in budget tool usage']
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
  onNavigate
}: {
  currentPage: string;
  onNavigate: (page: string) => void;
}) => {
  return <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200" data-magicpath-id="0" data-magicpath-path="PortfolioWebsite.tsx">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-magicpath-id="1" data-magicpath-path="PortfolioWebsite.tsx">
        <div className="flex justify-between items-center h-16" data-magicpath-id="2" data-magicpath-path="PortfolioWebsite.tsx">
          <button onClick={() => onNavigate('home')} className="text-xl font-bold text-gray-900 hover:text-gray-600 transition-colors" data-magicpath-id="3" data-magicpath-path="PortfolioWebsite.tsx">
            Portfolio
          </button>
          <div className="flex gap-8" data-magicpath-id="4" data-magicpath-path="PortfolioWebsite.tsx">
            <button onClick={() => onNavigate('home')} className={cn('flex items-center gap-2 text-sm font-medium transition-colors', currentPage === 'home' ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900')} data-magicpath-id="5" data-magicpath-path="PortfolioWebsite.tsx">
              <Briefcase className="w-4 h-4" data-magicpath-id="6" data-magicpath-path="PortfolioWebsite.tsx" />
              Work
            </button>
            <button onClick={() => onNavigate('about')} className={cn('flex items-center gap-2 text-sm font-medium transition-colors', currentPage === 'about' ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900')} data-magicpath-id="7" data-magicpath-path="PortfolioWebsite.tsx">
              <User className="w-4 h-4" data-magicpath-id="8" data-magicpath-path="PortfolioWebsite.tsx" />
              About
            </button>
          </div>
        </div>
      </div>
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
  }} whileHover={{
    y: -8
  }} transition={{
    duration: 0.3
  }} className="group cursor-pointer" onClick={onClick} data-magicpath-id="9" data-magicpath-path="PortfolioWebsite.tsx">
      <div className="relative overflow-hidden rounded-2xl bg-gray-100 aspect-[4/3]" data-magicpath-id="10" data-magicpath-path="PortfolioWebsite.tsx">
        <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" data-magicpath-id="11" data-magicpath-path="PortfolioWebsite.tsx" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" data-magicpath-id="12" data-magicpath-path="PortfolioWebsite.tsx" />
      </div>
      <div className="mt-4 space-y-2" data-magicpath-id="13" data-magicpath-path="PortfolioWebsite.tsx">
        <div className="flex items-center justify-between" data-magicpath-id="14" data-magicpath-path="PortfolioWebsite.tsx">
          <span className="text-sm text-gray-500" data-magicpath-id="15" data-magicpath-path="PortfolioWebsite.tsx">{project.company}</span>
          <span className="text-sm text-gray-400" data-magicpath-id="16" data-magicpath-path="PortfolioWebsite.tsx">{project.year}</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 group-hover:text-gray-600 transition-colors" data-magicpath-id="17" data-magicpath-path="PortfolioWebsite.tsx">
          {project.title}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-2" data-magicpath-id="18" data-magicpath-path="PortfolioWebsite.tsx">{project.description}</p>
        <div className="flex flex-wrap gap-2 pt-2" data-magicpath-id="19" data-magicpath-path="PortfolioWebsite.tsx">
          {project.tags.slice(0, 3).map(tag => <span key={tag} className="px-3 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded-full" data-magicpath-id="20" data-magicpath-path="PortfolioWebsite.tsx">
              {tag}
            </span>)}
        </div>
      </div>
    </motion.div>;
};
const ProjectDetail = ({
  project,
  onBack
}: {
  project: Project;
  onBack: () => void;
}) => {
  return <motion.div initial={{
    opacity: 0
  }} animate={{
    opacity: 1
  }} exit={{
    opacity: 0
  }} className="min-h-screen pt-16" data-magicpath-id="21" data-magicpath-path="PortfolioWebsite.tsx">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12" data-magicpath-id="22" data-magicpath-path="PortfolioWebsite.tsx">
        <button onClick={onBack} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-8" data-magicpath-id="23" data-magicpath-path="PortfolioWebsite.tsx">
          <ArrowLeft className="w-5 h-5" data-magicpath-id="24" data-magicpath-path="PortfolioWebsite.tsx" />
          Back to projects
        </button>

        <motion.div initial={{
        y: 20,
        opacity: 0
      }} animate={{
        y: 0,
        opacity: 1
      }} transition={{
        delay: 0.1
      }} data-magicpath-id="25" data-magicpath-path="PortfolioWebsite.tsx">
          <div className="mb-6" data-magicpath-id="26" data-magicpath-path="PortfolioWebsite.tsx">
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4" data-magicpath-id="27" data-magicpath-path="PortfolioWebsite.tsx">
              <span data-magicpath-id="28" data-magicpath-path="PortfolioWebsite.tsx">{project.company}</span>
              <span data-magicpath-id="29" data-magicpath-path="PortfolioWebsite.tsx">•</span>
              <span data-magicpath-id="30" data-magicpath-path="PortfolioWebsite.tsx">{project.year}</span>
              <span data-magicpath-id="31" data-magicpath-path="PortfolioWebsite.tsx">•</span>
              <span data-magicpath-id="32" data-magicpath-path="PortfolioWebsite.tsx">{project.role}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4" data-magicpath-id="33" data-magicpath-path="PortfolioWebsite.tsx">{project.title}</h1>
            <p className="text-xl text-gray-600" data-magicpath-id="34" data-magicpath-path="PortfolioWebsite.tsx">{project.description}</p>
          </div>

          <div className="flex flex-wrap gap-2 mb-8" data-magicpath-id="35" data-magicpath-path="PortfolioWebsite.tsx">
            {project.tags.map(tag => <span key={tag} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-full" data-magicpath-id="36" data-magicpath-path="PortfolioWebsite.tsx">
                {tag}
              </span>)}
          </div>

          <div className="rounded-2xl overflow-hidden mb-12" data-magicpath-id="37" data-magicpath-path="PortfolioWebsite.tsx">
            <img src={project.image} alt={project.title} className="w-full h-auto" data-magicpath-id="38" data-magicpath-path="PortfolioWebsite.tsx" />
          </div>

          <div className="space-y-12" data-magicpath-id="39" data-magicpath-path="PortfolioWebsite.tsx">
            <section data-magicpath-id="40" data-magicpath-path="PortfolioWebsite.tsx">
              <h2 className="text-2xl font-bold text-gray-900 mb-4" data-magicpath-id="41" data-magicpath-path="PortfolioWebsite.tsx">Overview</h2>
              <p className="text-gray-600 leading-relaxed" data-magicpath-id="42" data-magicpath-path="PortfolioWebsite.tsx">{project.overview}</p>
            </section>

            <section data-magicpath-id="43" data-magicpath-path="PortfolioWebsite.tsx">
              <h2 className="text-2xl font-bold text-gray-900 mb-4" data-magicpath-id="44" data-magicpath-path="PortfolioWebsite.tsx">Challenges</h2>
              <ul className="space-y-3" data-magicpath-id="45" data-magicpath-path="PortfolioWebsite.tsx">
                {project.challenges.map((challenge, index) => <li key={index} className="flex gap-3" data-magicpath-id="46" data-magicpath-path="PortfolioWebsite.tsx">
                    <span className="text-gray-400 font-medium" data-magicpath-id="47" data-magicpath-path="PortfolioWebsite.tsx">•</span>
                    <span className="text-gray-600" data-magicpath-id="48" data-magicpath-path="PortfolioWebsite.tsx">{challenge}</span>
                  </li>)}
              </ul>
            </section>

            <section data-magicpath-id="49" data-magicpath-path="PortfolioWebsite.tsx">
              <h2 className="text-2xl font-bold text-gray-900 mb-4" data-magicpath-id="50" data-magicpath-path="PortfolioWebsite.tsx">Solutions</h2>
              <ul className="space-y-3" data-magicpath-id="51" data-magicpath-path="PortfolioWebsite.tsx">
                {project.solutions.map((solution, index) => <li key={index} className="flex gap-3" data-magicpath-id="52" data-magicpath-path="PortfolioWebsite.tsx">
                    <span className="text-gray-400 font-medium" data-magicpath-id="53" data-magicpath-path="PortfolioWebsite.tsx">•</span>
                    <span className="text-gray-600" data-magicpath-id="54" data-magicpath-path="PortfolioWebsite.tsx">{solution}</span>
                  </li>)}
              </ul>
            </section>

            <section data-magicpath-id="55" data-magicpath-path="PortfolioWebsite.tsx">
              <h2 className="text-2xl font-bold text-gray-900 mb-4" data-magicpath-id="56" data-magicpath-path="PortfolioWebsite.tsx">Outcomes</h2>
              <div className="grid sm:grid-cols-3 gap-6" data-magicpath-id="57" data-magicpath-path="PortfolioWebsite.tsx">
                {project.outcomes.map((outcome, index) => <div key={index} className="p-6 bg-gray-50 rounded-xl" data-magicpath-id="58" data-magicpath-path="PortfolioWebsite.tsx">
                    <p className="text-gray-900 font-medium" data-magicpath-id="59" data-magicpath-path="PortfolioWebsite.tsx">{outcome}</p>
                  </div>)}
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </motion.div>;
};
const AboutPage = () => {
  return <motion.div initial={{
    opacity: 0
  }} animate={{
    opacity: 1
  }} exit={{
    opacity: 0
  }} className="min-h-screen pt-16" data-magicpath-id="60" data-magicpath-path="PortfolioWebsite.tsx">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12" data-magicpath-id="61" data-magicpath-path="PortfolioWebsite.tsx">
        <motion.div initial={{
        y: 20,
        opacity: 0
      }} animate={{
        y: 0,
        opacity: 1
      }} transition={{
        delay: 0.1
      }} className="space-y-12" data-magicpath-id="62" data-magicpath-path="PortfolioWebsite.tsx">
          <div data-magicpath-id="63" data-magicpath-path="PortfolioWebsite.tsx">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6" data-magicpath-id="64" data-magicpath-path="PortfolioWebsite.tsx">About Me</h1>
            <div className="space-y-4 text-gray-600 leading-relaxed" data-magicpath-id="65" data-magicpath-path="PortfolioWebsite.tsx">
              <p data-magicpath-id="66" data-magicpath-path="PortfolioWebsite.tsx">
                Hi! I'm a UX designer passionate about creating intuitive, delightful experiences that solve real user
                problems. With over 8 years of experience in the industry, I've had the privilege of working with
                leading companies to transform complex challenges into elegant solutions.
              </p>
              <p data-magicpath-id="67" data-magicpath-path="PortfolioWebsite.tsx">
                My approach combines deep user research, rapid prototyping, and close collaboration with engineering
                teams to deliver products that users love. I believe the best design is invisible—it just works.
              </p>
              <p data-magicpath-id="68" data-magicpath-path="PortfolioWebsite.tsx">
                When I'm not pushing pixels, you can find me mentoring junior designers, speaking at design conferences,
                or exploring new cities for creative inspiration.
              </p>
            </div>
          </div>

          <div data-magicpath-id="69" data-magicpath-path="PortfolioWebsite.tsx">
            <h2 className="text-2xl font-bold text-gray-900 mb-6" data-magicpath-id="70" data-magicpath-path="PortfolioWebsite.tsx">Skills & Expertise</h2>
            <div className="grid sm:grid-cols-2 gap-6" data-magicpath-id="71" data-magicpath-path="PortfolioWebsite.tsx">
              {[['User Research', 'Usability Testing', 'User Interviews', 'A/B Testing'], ['UI Design', 'Design Systems', 'Prototyping', 'Interaction Design'], ['Tools', 'Figma', 'Adobe XD', 'Principle', 'Framer'], ['Other', 'HTML/CSS', 'Design Thinking', 'Agile/Scrum']].map(([category, ...skills]) => <div key={category} className="space-y-3" data-magicpath-id="72" data-magicpath-path="PortfolioWebsite.tsx">
                  <h3 className="font-semibold text-gray-900" data-magicpath-id="73" data-magicpath-path="PortfolioWebsite.tsx">{category}</h3>
                  <ul className="space-y-2" data-magicpath-id="74" data-magicpath-path="PortfolioWebsite.tsx">
                    {skills.map(skill => <li key={skill} className="text-gray-600 text-sm flex items-center gap-2" data-magicpath-id="75" data-magicpath-path="PortfolioWebsite.tsx">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400" data-magicpath-id="76" data-magicpath-path="PortfolioWebsite.tsx" />
                        {skill}
                      </li>)}
                  </ul>
                </div>)}
            </div>
          </div>

          <div data-magicpath-id="77" data-magicpath-path="PortfolioWebsite.tsx">
            <h2 className="text-2xl font-bold text-gray-900 mb-6" data-magicpath-id="78" data-magicpath-path="PortfolioWebsite.tsx">Let's Connect</h2>
            <div className="flex flex-wrap gap-4" data-magicpath-id="79" data-magicpath-path="PortfolioWebsite.tsx">
              <a href="mailto:hello@example.com" className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-700 transition-colors" data-magicpath-id="80" data-magicpath-path="PortfolioWebsite.tsx">
                <Mail className="w-5 h-5" data-magicpath-id="81" data-magicpath-path="PortfolioWebsite.tsx" />
                Email Me
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-900 rounded-full hover:bg-gray-50 transition-colors" data-magicpath-id="82" data-magicpath-path="PortfolioWebsite.tsx">
                <Linkedin className="w-5 h-5" data-magicpath-id="83" data-magicpath-path="PortfolioWebsite.tsx" />
                LinkedIn
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-900 rounded-full hover:bg-gray-50 transition-colors" data-magicpath-id="84" data-magicpath-path="PortfolioWebsite.tsx">
                <Github className="w-5 h-5" data-magicpath-id="85" data-magicpath-path="PortfolioWebsite.tsx" />
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
  }} className="min-h-screen pt-16" data-magicpath-id="86" data-magicpath-path="PortfolioWebsite.tsx">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" data-magicpath-id="87" data-magicpath-path="PortfolioWebsite.tsx">
        <motion.div initial={{
        y: 20,
        opacity: 0
      }} animate={{
        y: 0,
        opacity: 1
      }} transition={{
        delay: 0.1
      }} className="mb-12" data-magicpath-id="88" data-magicpath-path="PortfolioWebsite.tsx">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4" data-magicpath-id="89" data-magicpath-path="PortfolioWebsite.tsx">
            UX Designer crafting delightful experiences
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl" data-magicpath-id="90" data-magicpath-path="PortfolioWebsite.tsx">
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
      }} className="mb-8" data-magicpath-id="91" data-magicpath-path="PortfolioWebsite.tsx">
          <div className="flex flex-wrap gap-2" data-magicpath-id="92" data-magicpath-path="PortfolioWebsite.tsx">
            {companies.map(company => <button key={company} onClick={() => setSelectedCompany(company)} className={cn('px-4 py-2 rounded-full text-sm font-medium transition-all', selectedCompany === company ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200')} data-magicpath-id="93" data-magicpath-path="PortfolioWebsite.tsx">
                {company === 'all' ? 'All Projects' : company}
              </button>)}
          </div>
        </motion.div>

        <AnimatePresence mode="popLayout" data-magicpath-id="94" data-magicpath-path="PortfolioWebsite.tsx">
          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8" data-magicpath-id="95" data-magicpath-path="PortfolioWebsite.tsx">
            {filteredProjects.map(project => <ProjectCard key={project.id} project={project} onClick={() => onProjectClick(project)} data-magicpath-id="96" data-magicpath-path="PortfolioWebsite.tsx" />)}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>;
};

// @component: PortfolioWebsite
export const PortfolioWebsite = (props: PortfolioWebsiteProps) => {
  const [currentPage, setCurrentPage] = useState<'home' | 'about' | 'project'>('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setCurrentPage('project');
  };
  const handleBackToHome = () => {
    setCurrentPage('home');
    setSelectedProject(null);
  };

  // @return
  return <div className={cn('min-h-screen bg-white', props.className)} data-magicpath-id="97" data-magicpath-path="PortfolioWebsite.tsx">
      <Navigation currentPage={currentPage} onNavigate={page => setCurrentPage(page as 'home' | 'about')} data-magicpath-id="98" data-magicpath-path="PortfolioWebsite.tsx" />
      
      <AnimatePresence mode="wait" data-magicpath-id="99" data-magicpath-path="PortfolioWebsite.tsx">
        {currentPage === 'home' && <HomePage key="home" onProjectClick={handleProjectClick} data-magicpath-id="100" data-magicpath-path="PortfolioWebsite.tsx" />}
        {currentPage === 'about' && <AboutPage key="about" data-magicpath-id="101" data-magicpath-path="PortfolioWebsite.tsx" />}
        {currentPage === 'project' && selectedProject && <ProjectDetail key="project" project={selectedProject} onBack={handleBackToHome} data-magicpath-id="102" data-magicpath-path="PortfolioWebsite.tsx" />}
      </AnimatePresence>
    </div>;
};