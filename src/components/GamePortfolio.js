import React, { useState, useEffect, useCallback } from 'react';
import { Award, Briefcase, Code, Mail, Linkedin, Github, MapPin, Phone, BookOpen, Trophy, Zap, Star, ChevronRight, Home, User, Target, Rocket, Terminal, Database, Cpu, Globe, TrendingUp, Coffee, Shield, GamepadIcon, Volume2, Play, Settings, Map, Heart, Activity, Sparkles, Crown, Swords } from 'lucide-react';

const GamePortfolio = () => {
  const [currentLevel, setCurrentLevel] = useState('home');
  const [score, setScore] = useState(0);
  const [achievements, setAchievements] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [particles, setParticles] = useState([]);
  const [typing, setTyping] = useState('');
  const [combo, setCombo] = useState(0);
  const [health, setHealth] = useState(100);
  const [energy, setEnergy] = useState(100);
  const [level, setLevel] = useState(1);
  const [exp, setExp] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [gameStats, setGameStats] = useState({
    timeSpent: 0,
    sectionsVisited: 0,
    clickCount: 0,
    totalInteractions: 0
  });
  const [showMiniMap, setShowMiniMap] = useState(false);
  const [currentQuest, setCurrentQuest] = useState('Explore the Digital Universe');
  const [inventoryItems, setInventoryItems] = useState([]);
  const [showGameHUD, setShowGameHUD] = useState(true);

  const fullText = "Welcome to Abhishek's Digital Universe";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setTyping(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const particleInterval = setInterval(() => {
      setParticles(prev => [...prev.slice(-20), {
        id: Date.now(),
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2
      }]);
    }, 200);
    return () => clearInterval(particleInterval);
  }, []);

  // Listen for escape key to close modals
  useEffect(() => {
    const handleEscape = () => setShowModal(false);
    window.addEventListener('escapePressed', handleEscape);
    return () => window.removeEventListener('escapePressed', handleEscape);
  }, []);

  const levels = {
    home: { name: 'Command Center', icon: Rocket, color: 'from-indigo-600 via-purple-600 to-pink-600', gradient: 'bg-gradient-to-br' },
    about: { name: 'Dev Profile', icon: User, color: 'from-blue-600 via-cyan-600 to-teal-600', gradient: 'bg-gradient-to-tr' },
    skills: { name: 'Tech Arsenal', icon: Cpu, color: 'from-green-600 via-emerald-600 to-teal-600', gradient: 'bg-gradient-to-bl' },
    projects: { name: 'Project Vault', icon: Terminal, color: 'from-orange-600 via-red-600 to-pink-600', gradient: 'bg-gradient-to-tl' },
    experience: { name: 'Career Journey', icon: Briefcase, color: 'from-yellow-600 via-orange-600 to-red-600', gradient: 'bg-gradient-to-br' },
    certifications: { name: 'Achievement Nexus', icon: Award, color: 'from-purple-600 via-pink-600 to-rose-600', gradient: 'bg-gradient-to-tr' },
    contact: { name: 'Connect Hub', icon: Globe, color: 'from-pink-600 via-rose-600 to-red-600', gradient: 'bg-gradient-to-bl' }
  };

  const skillCategories = [
    {
      category: 'Frontend Mastery',
      icon: Code,
      color: 'from-blue-500 to-cyan-500',
      skills: [
        { name: 'React.js', level: 90, projects: 8 },
        { name: 'JavaScript ES6+', level: 85, projects: 12 },
        { name: 'HTML5 & CSS3', level: 95, projects: 15 },
        { name: 'Tailwind CSS', level: 88, projects: 10 },
        { name: 'Responsive Design', level: 92, projects: 14 }
      ]
    },
    {
      category: 'Backend Development',
      icon: Database,
      color: 'from-green-500 to-emerald-500',
      skills: [
        { name: 'Node.js', level: 80, projects: 6 },
        { name: 'REST APIs', level: 85, projects: 8 },
        { name: 'Database Management', level: 75, projects: 5 },
        { name: 'Python', level: 82, projects: 7 },
        { name: 'Java', level: 78, projects: 6 }
      ]
    },
    {
      category: 'AI & Machine Learning',
      icon: Cpu,
      color: 'from-purple-500 to-pink-500',
      skills: [
        { name: 'Generative AI', level: 85, projects: 4 },
        { name: 'Prompt Engineering', level: 90, projects: 6 },
        { name: 'AI Integration', level: 80, projects: 5 },
        { name: 'Model Context Protocol', level: 75, projects: 3 }
      ]
    },
    {
      category: 'Digital Marketing & SEO',
      icon: TrendingUp,
      color: 'from-orange-500 to-red-500',
      skills: [
        { name: 'SEO Optimization', level: 88, projects: 10 },
        { name: 'Content Strategy', level: 85, projects: 8 },
        { name: 'AI-Powered Ads', level: 82, projects: 6 },
        { name: 'SEM', level: 80, projects: 7 }
      ]
    },
    {
      category: 'Security & Tools',
      icon: Shield,
      color: 'from-red-500 to-rose-500',
      skills: [
        { name: 'Cybersecurity', level: 78, projects: 4 },
        { name: 'Git & GitHub', level: 92, projects: 20 },
        { name: 'Google Cloud', level: 75, projects: 5 },
        { name: 'Network Security', level: 72, projects: 3 }
      ]
    }
  ];

  const projects = [
    {
      title: 'AI-Powered E-Commerce Platform',
      tech: ['React', 'Node.js', 'OpenAI API', 'MongoDB'],
      description: 'Full-stack e-commerce solution with AI-powered product recommendations and chatbot support',
      features: ['Real-time inventory', 'Smart search', 'AI chatbot', 'Payment gateway'],
      status: 'Production',
      impact: '10,000+ users',
      github: 'https://github.com/Abhisheksingh17cyber'
    },
    {
      title: 'Social Media Analytics Dashboard',
      tech: ['React', 'D3.js', 'Python', 'FastAPI'],
      description: 'Real-time analytics dashboard for social media metrics with predictive insights',
      features: ['Live data visualization', 'Trend analysis', 'AI predictions', 'Export reports'],
      status: 'Development',
      impact: 'Beta testing',
      github: 'https://github.com/Abhisheksingh17cyber'
    },
    {
      title: 'Smart Task Management System',
      tech: ['React', 'Firebase', 'Material-UI', 'Node.js'],
      description: 'Collaborative task management with AI-powered priority suggestions',
      features: ['Team collaboration', 'Smart notifications', 'Time tracking', 'Analytics'],
      status: 'Production',
      impact: '5,000+ active users',
      github: 'https://github.com/Abhisheksingh17cyber'
    },
    {
      title: 'Portfolio Builder Platform',
      tech: ['React', 'Tailwind', 'Express', 'PostgreSQL'],
      description: 'No-code platform for developers to create stunning portfolios',
      features: ['Drag-and-drop', 'Custom themes', 'SEO optimized', 'Analytics'],
      status: 'Production',
      impact: '2,000+ portfolios',
      github: 'https://github.com/Abhisheksingh17cyber'
    },
    {
      title: 'AI Content Generator',
      tech: ['React', 'GPT-4 API', 'Redis', 'Docker'],
      description: 'Content generation tool for blogs, social media, and marketing',
      features: ['Multi-format output', 'SEO optimization', 'Tone adjustment', 'Bulk generation'],
      status: 'Beta',
      impact: '1,000+ pieces generated',
      github: 'https://github.com/Abhisheksingh17cyber'
    },
    {
      title: 'Real-time Chat Application',
      tech: ['React', 'Socket.io', 'Node.js', 'MongoDB'],
      description: 'Secure real-time messaging platform with end-to-end encryption',
      features: ['Group chats', 'File sharing', 'Video calls', 'Message encryption'],
      status: 'Production',
      impact: '3,000+ daily messages',
      github: 'https://github.com/Abhisheksingh17cyber'
    }
  ];

  const certifications = [
    { name: 'Model Context Protocol', org: 'Anthropic', date: 'Sep 2025', id: '9vmhe84mkwt4', icon: Cpu, color: 'from-purple-500 to-pink-500' },
    { name: 'ReactJS Foundations', org: 'ScholarHat', date: 'Aug 2025', id: 'JFWX120825', icon: Code, color: 'from-blue-500 to-cyan-500' },
    { name: 'Generative AI', org: 'Google Cloud', date: 'Aug 2025', id: '8776454', icon: Cpu, color: 'from-green-500 to-emerald-500' },
    { name: 'Prompt Engineering', org: 'Simplilearn', date: 'Aug 2025', id: '8776030', icon: Terminal, color: 'from-orange-500 to-red-500' },
    { name: 'AI for Beginners', org: 'HP LIFE', date: 'Aug 2025', icon: Zap, color: 'from-yellow-500 to-orange-500' },
    { name: 'Cybersecurity Fundamentals', org: 'Tech Mahindra', date: 'Aug 2025', icon: Shield, color: 'from-red-500 to-rose-500' },
    { name: 'AI-Powered Shopping Ads', org: 'Google', date: 'Jul 2025', id: '154672281', icon: TrendingUp, color: 'from-pink-500 to-purple-500' },
    { name: 'Data Analysis in Excel', org: 'Open University', date: 'Jul 2025', icon: Database, color: 'from-cyan-500 to-blue-500' },
    { name: 'Web Applications Architecture', org: 'Open University', date: 'Jul 2025', icon: Globe, color: 'from-teal-500 to-green-500' },
    { name: 'AI-Powered Marketer', org: 'Semrush', date: 'Jul 2026', id: 'b4b295d293', icon: TrendingUp, color: 'from-indigo-500 to-purple-500' }
  ];

  const experiences = [
    {
      title: 'Business Development Specialist',
      company: 'Edu-versity (AMG Technologies)',
      period: 'Oct 2025 - Jan 2026',
      type: 'Internship Offer',
      icon: Briefcase,
      color: 'from-blue-500 to-cyan-500',
      details: [
        '💰 INR 25,000/month stipend (Fixed: 15K + Incentives: 10K + Bonus: 5K)',
        '🎯 Pre Placement Offer with 8 LPA CTC',
        '📚 Comprehensive 15-day training period',
        '📍 Bengaluru, Karnataka',
        '⚡ Early full-time opportunity for exceptional performers'
      ],
      skills: ['Business Strategy', 'Client Relations', 'Sales', 'Marketing']
    },
    {
      title: 'Web Developer Intern',
      company: 'Zidio Development',
      period: 'Sep 2025 - Nov 2025',
      type: 'Internship Offer',
      icon: Code,
      color: 'from-green-500 to-emerald-500',
      details: [
        '💻 Up to INR 12,000/month stipend',
        '🤖 Working on AI advancement projects',
        '🌐 Remote work with flexible timing',
        '👨‍💼 Mentorship from experienced professionals',
        '🎓 Evening training sessions'
      ],
      skills: ['React', 'Node.js', 'AI Integration', 'Full Stack']
    },
    {
      title: 'Front-End Development Intern',
      company: 'Indolike',
      period: 'Sep 2025 - Oct 2025',
      type: 'Internship Offer',
      icon: Terminal,
      color: 'from-purple-500 to-pink-500',
      details: [
        '🎨 1-month virtual internship',
        '⚛️ Front-end development focus',
        '🏠 100% Remote work',
        '🚀 Skills development program',
        '👥 Supportive team environment'
      ],
      skills: ['HTML/CSS', 'JavaScript', 'React', 'UI/UX']
    },
    {
      title: 'Web Development Intern',
      company: 'Labmentix',
      period: 'Sep 2025',
      type: 'Internship Offer',
      icon: Globe,
      color: 'from-orange-500 to-red-500',
      details: [
        '🌟 1-month intensive program',
        '💼 Professional development resources',
        '📍 Bengaluru, Karnataka',
        '🎯 Mentorship opportunities',
        '🔮 Future career prospects'
      ],
      skills: ['Web Development', 'APIs', 'Database', 'Testing']
    },
    {
      title: 'Social Awareness Intern',
      company: 'We Hope We Care Foundation',
      period: 'May 2024 - Aug 2024',
      type: 'Completed',
      icon: Trophy,
      color: 'from-pink-500 to-rose-500',
      details: [
        '✅ Successfully completed 3-month internship',
        '🤝 Community outreach initiatives',
        '📢 On-field awareness campaigns',
        '👔 Leadership skills development',
        '🎯 Multiple program execution'
      ],
      skills: ['Communication', 'Leadership', 'Project Management', 'Social Impact']
    }
  ];

  useEffect(() => {
    if (!achievements.includes('explorer') && score === 0) {
      setTimeout(() => unlockAchievement('explorer'), 2000);
    }
  }, [achievements, score]); // Removed unlockAchievement from dependencies to avoid infinite loops

  const unlockAchievement = (type) => {
    if (achievements.includes(type)) return;
    
    const newAchievements = [...achievements, type];
    setAchievements(newAchievements);
    const newScore = score + 100;
    setScore(newScore);
    setCombo(combo + 1);
    
    const messages = {
      explorer: '🎮 ACHIEVEMENT UNLOCKED: Digital Explorer - Welcome aboard!',
      curious: '🔍 ACHIEVEMENT UNLOCKED: Curious Innovator - Full exploration complete!',
      dedicated: '💼 ACHIEVEMENT UNLOCKED: Career Hunter - Experience reviewed!',
      skilled: '⚡ ACHIEVEMENT UNLOCKED: Tech Master - Arsenal examined!',
      certified: '🏆 ACHIEVEMENT UNLOCKED: Certification Collector - Hall visited!',
      builder: '🛠️ ACHIEVEMENT UNLOCKED: Project Builder - Vault explored!',
      connected: '🌐 ACHIEVEMENT UNLOCKED: Network Pro - Contact established!'
    };
    
    const achievement = document.createElement('div');
    achievement.className = 'fixed top-4 right-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-4 rounded-xl shadow-2xl z-50 animate-bounce font-bold text-lg';
    achievement.textContent = messages[type];
    document.body.appendChild(achievement);
    setTimeout(() => achievement.remove(), 3000);
  };

  const navigateToLevel = (level) => {
    setCurrentLevel(level);
    setScore(score + 50);
    setCombo(combo + 1);
    
    if (level === 'experience' && !achievements.includes('dedicated')) unlockAchievement('dedicated');
    if (level === 'skills' && !achievements.includes('skilled')) unlockAchievement('skilled');
    if (level === 'certifications' && !achievements.includes('certified')) unlockAchievement('certified');
    if (level === 'projects' && !achievements.includes('builder')) unlockAchievement('builder');
    if (level === 'contact' && !achievements.includes('connected')) unlockAchievement('connected');
    
    if (achievements.length >= 5 && !achievements.includes('curious')) {
      unlockAchievement('curious');
    }
  };

  const openModal = (content) => {
    setModalContent(content);
    setShowModal(true);
    setScore(score + 25);
  };

  const renderHome = () => (
    <div className="space-y-8">
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-900/40 via-purple-900/40 to-pink-900/40 rounded-3xl p-12 border-2 border-purple-500/30 backdrop-blur-xl">
        {particles.map(p => (
          <div
            key={p.id}
            className="absolute bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`
            }}
          />
        ))}
        
        <div className="relative z-10 text-center">
          <div className="inline-block mb-6">
            <div className="relative">
              <div className="w-40 h-40 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 rounded-full flex items-center justify-center text-7xl font-bold text-white shadow-2xl">
                AS
              </div>
              <div className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-3 animate-bounce">
                <Star className="w-8 h-8 text-yellow-900" />
              </div>
              <div className="absolute -bottom-2 -left-2 bg-green-400 rounded-full p-3 animate-pulse">
                <Cpu className="w-8 h-8 text-green-900" />
              </div>
            </div>
          </div>
          
          <h1 className="text-6xl font-black mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
            {typing}
            <span className="animate-pulse">|</span>
          </h1>
          
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <span className="px-4 py-2 bg-blue-500/20 border border-blue-400 rounded-full text-blue-300 font-semibold">Full Stack Developer</span>
            <span className="px-4 py-2 bg-purple-500/20 border border-purple-400 rounded-full text-purple-300 font-semibold">AI Enthusiast</span>
            <span className="px-4 py-2 bg-pink-500/20 border border-pink-400 rounded-full text-pink-300 font-semibold">Digital Marketer</span>
          </div>
          
          <p className="text-2xl text-gray-300 mb-2">Computer Science Engineering Student</p>
          <div className="flex items-center justify-center gap-3 text-xl">
            <Trophy className="w-6 h-6 text-yellow-400" />
            <span className="text-yellow-400 font-bold">Level {Math.floor(score / 100)} Developer</span>
            <Zap className="w-6 h-6 text-purple-400" />
            <span className="text-purple-400 font-bold">{score} XP</span>
          </div>
          
          {combo > 5 && (
            <div className="mt-4 text-orange-400 font-bold text-xl animate-pulse">
              🔥 {combo}x COMBO STREAK! 🔥
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(levels).map(([key, level]) => {
          if (key === 'home') return null;
          const Icon = level.icon;
          return (
            <button
              key={key}
              onClick={() => navigateToLevel(key)}
              className={`group relative ${level.gradient} ${level.color} p-8 rounded-2xl shadow-2xl hover:scale-105 transform transition-all duration-300 border-2 border-white/20 overflow-hidden`}
            >
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300" />
              <div className="relative z-10">
                <Icon className="w-16 h-16 mb-4 mx-auto group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-bold mb-2">{level.name}</h3>
                <p className="text-sm opacity-90 mb-3">Click to explore</p>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-xs bg-white/20 px-3 py-1 rounded-full">+50 XP</span>
                  <ChevronRight className="w-5 h-5 animate-bounce" />
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl rounded-3xl p-8 border-2 border-purple-500/30">
        <h3 className="text-3xl font-bold mb-6 flex items-center gap-3">
          <Trophy className="w-8 h-8 text-yellow-400" />
          Performance Dashboard
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-blue-600/30 to-cyan-600/30 rounded-xl p-6 text-center border border-blue-500/30 hover:scale-105 transition-transform">
            <Award className="w-8 h-8 mx-auto mb-2 text-blue-400" />
            <div className="text-4xl font-bold text-blue-300">{certifications.length}</div>
            <div className="text-sm text-gray-300">Certifications</div>
          </div>
          <div className="bg-gradient-to-br from-green-600/30 to-emerald-600/30 rounded-xl p-6 text-center border border-green-500/30 hover:scale-105 transition-transform">
            <Terminal className="w-8 h-8 mx-auto mb-2 text-green-400" />
            <div className="text-4xl font-bold text-green-300">{projects.length}</div>
            <div className="text-sm text-gray-300">Projects Built</div>
          </div>
          <div className="bg-gradient-to-br from-purple-600/30 to-pink-600/30 rounded-xl p-6 text-center border border-purple-500/30 hover:scale-105 transition-transform">
            <Code className="w-8 h-8 mx-auto mb-2 text-purple-400" />
            <div className="text-4xl font-bold text-purple-300">{skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0)}</div>
            <div className="text-sm text-gray-300">Tech Skills</div>
          </div>
          <div className="bg-gradient-to-br from-orange-600/30 to-red-600/30 rounded-xl p-6 text-center border border-orange-500/30 hover:scale-105 transition-transform">
            <Briefcase className="w-8 h-8 mx-auto mb-2 text-orange-400" />
            <div className="text-4xl font-bold text-orange-300">{experiences.length}</div>
            <div className="text-sm text-gray-300">Experiences</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 rounded-2xl p-6 border border-purple-500/30 backdrop-blur-sm">
          <h4 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Rocket className="w-6 h-6 text-purple-400" />
            Current Focus
          </h4>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <ChevronRight className="w-4 h-4 text-purple-400" />
              <span>Building AI-powered applications</span>
            </li>
            <li className="flex items-center gap-2">
              <ChevronRight className="w-4 h-4 text-purple-400" />
              <span>Mastering Full Stack Development</span>
            </li>
            <li className="flex items-center gap-2">
              <ChevronRight className="w-4 h-4 text-purple-400" />
              <span>Exploring advanced React patterns</span>
            </li>
          </ul>
        </div>
        
        <div className="bg-gradient-to-br from-blue-900/40 to-cyan-900/40 rounded-2xl p-6 border border-blue-500/30 backdrop-blur-sm">
          <h4 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Target className="w-6 h-6 text-blue-400" />
            Goals 2025-2026
          </h4>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <ChevronRight className="w-4 h-4 text-blue-400" />
              <span>Complete BTech with distinction</span>
            </li>
            <li className="flex items-center gap-2">
              <ChevronRight className="w-4 h-4 text-blue-400" />
              <span>Build 10+ production projects</span>
            </li>
            <li className="flex items-center gap-2">
              <ChevronRight className="w-4 h-4 text-blue-400" />
              <span>Secure full-time developer role</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );

  const renderAbout = () => (
    <div className="space-y-6">
      <h2 className="text-5xl font-black mb-8 flex items-center gap-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
        <User className="w-12 h-12 text-blue-400" />
        Developer Profile
      </h2>
      
      <div className="bg-gradient-to-br from-blue-900/50 via-cyan-900/50 to-teal-900/50 rounded-3xl p-10 border-2 border-blue-500/30 backdrop-blur-xl">
        <h3 className="text-3xl font-bold mb-6 flex items-center gap-2">
          <Coffee className="w-8 h-8 text-cyan-400" />
          About Me
        </h3>
        <div className="space-y-4 text-lg leading-relaxed">
          <p className="text-gray-200">
            🚀 Passionate <span className="text-cyan-400 font-bold">Computer Science Engineering student</span> and aspiring <span className="text-blue-400 font-bold">Full Stack Developer</span> with a proven track record in modern web technologies, AI/ML integration, and digital marketing strategies.
          </p>
          <p className="text-gray-200">
            💡 Demonstrated expertise through <span className="text-yellow-400 font-bold">10+ professional certifications</span> spanning React.js, AI technologies, SEO optimization, and cybersecurity. Strong foundation in programming with hands-on experience in <span className="text-green-400 font-bold">real-world project development</span> and social impact initiatives.
          </p>
          <p className="text-gray-200">
            🎯 Committed to continuous learning and staying ahead of industry trends. Actively seeking opportunities to contribute to innovative projects and grow as a <span className="text-purple-400 font-bold">professional developer</span>.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-900/70 rounded-2xl p-8 border-2 border-cyan-500/30 backdrop-blur-sm hover:scale-105 transition-transform">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <BookOpen className="w-7 h-7 text-cyan-400" />
            Education
          </h3>
          <div className="space-y-3">
            <p className="text-xl font-bold text-cyan-300">Bachelor of Technology</p>
            <p className="text-lg text-gray-300">Computer Science Engineering</p>
            <p className="text-gray-400">Babu Banarasi Das University, Lucknow</p>
            <p className="text-blue-400 font-semibold">2022 - 2026</p>
            <div className="mt-4 pt-4 border-t border-gray-700">
              <p className="text-sm text-gray-400">Relevant Coursework:</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="px-3 py-1 bg-cyan-600/30 rounded-full text-xs">Data Structures</span>
                <span className="px-3 py-1 bg-cyan-600/30 rounded-full text-xs">Algorithms</span>
                <span className="px-3 py-1 bg-cyan-600/30 rounded-full text-xs">Web Development</span>
                <span className="px-3 py-1 bg-cyan-600/30 rounded-full text-xs">DBMS</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-900/70 rounded-2xl p-8 border-2 border-blue-500/30 backdrop-blur-sm hover:scale-105 transition-transform">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <MapPin className="w-7 h-7 text-blue-400" />
            Location
          </h3>
          <div className="space-y-2">
            <p className="text-lg">SS-165,166 Sector C-1 L.D.A. Colony</p>
            <p className="text-gray-300">Kanpur Road, Lucknow</p>
            <p className="text-gray-400">Uttar Pradesh - 226012</p>
            <div className="mt-4 pt-4 border-t border-gray-700">
              <p className="text-sm text-gray-400">Languages:</p>
              <div className="flex gap-3 mt-2">
                <span className="px-3 py-1 bg-blue-600/30 rounded-full text-sm">Hindi (Native)</span>
                <span className="px-3 py-1 bg-blue-600/30 rounded-full text-sm">English (Fluent)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-teal-900/40 to-green-900/40 rounded-2xl p-8 border border-teal-500/30 backdrop-blur-sm">
        <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Target className="w-7 h-7 text-teal-400" />
          Professional Summary
        </h3>
        <p className="text-lg text-gray-300 leading-relaxed">
          As a motivated Computer Science Engineering student, I bring hands-on experience in modern web technologies, AI/ML concepts, and digital marketing. My portfolio demonstrates strong technical skills through multiple certifications and practical project work, combined with community engagement through social awareness campaigns.
        </p>
      </div>
    </div>
  );

  const renderSkills = () => (
    <div className="space-y-6">
      <h2 className="text-5xl font-black mb-8 flex items-center gap-4 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
        <Cpu className="w-12 h-12 text-green-400" />
        Tech Arsenal
      </h2>
      
      {skillCategories.map((category, idx) => {
        const Icon = category.icon;
        return (
          <div key={idx} className={`bg-gradient-to-br ${category.color} bg-opacity-10 rounded-3xl p-8 border-2 border-opacity-30 backdrop-blur-xl hover:scale-[1.02] transition-transform`}>
            <h3 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Icon className="w-8 h-8" />
              {category.category}
            </h3>
            <div className="space-y-4">
              {category.skills.map((skill, i) => (
                <div key={i} className="bg-gray-900/50 rounded-xl p-4 hover:bg-gray-900/70 transition-colors">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-semibold">{skill.name}</span>
                    <span className="text-sm bg-white/10 px-3 py-1 rounded-full">{skill.projects} projects</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${category.color} transition-all duration-1000`}
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                  <div className="text-right text-sm text-gray-400 mt-1">{skill.level}% Proficiency</div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderProjects = () => (
    <div className="space-y-6">
      <h2 className="text-5xl font-black mb-8 flex items-center gap-4 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
        <Terminal className="w-12 h-12 text-orange-400" />
        Project Vault
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, idx) => (
          <div
            key={idx}
            className="bg-gradient-to-br from-orange-900/30 to-red-900/30 rounded-2xl p-6 border-2 border-orange-500/30 backdrop-blur-sm hover:scale-105 transition-transform cursor-pointer"
            onClick={() => openModal(project)}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-bold">{project.title}</h3>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                project.status === 'Production' ? 'bg-green-600' : 'bg-yellow-600'
              }`}>
                {project.status}
              </span>
            </div>
            
            <p className="text-gray-300 mb-4">{project.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tech.map((tech, i) => (
                <span key={i} className="px-3 py-1 bg-orange-600/30 rounded-full text-xs font-semibold">
                  {tech}
                </span>
              ))}
            </div>
            
            <div className="space-y-2 mb-4">
              {project.features.slice(0, 3).map((feature, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <ChevronRight className="w-4 h-4 text-orange-400" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            
            <div className="flex justify-between items-center pt-4 border-t border-gray-700">
              <span className="text-sm text-gray-400">Impact: {project.impact}</span>
              <Github className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 rounded-2xl p-6 border border-purple-500/30 backdrop-blur-sm">
        <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Star className="w-6 h-6 text-purple-400" />
          TechXplore Project Exhibition
        </h3>
        <p className="text-lg mb-2">August 2024 - BBD University</p>
        <p className="text-gray-300">Participated in TechXplore Project Exhibition organized by School of Engineering, demonstrating web development project to academic panel and industry professionals.</p>
      </div>
    </div>
  );

  const renderExperience = () => (
    <div className="space-y-6">
      <h2 className="text-5xl font-black mb-8 flex items-center gap-4 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
        <Briefcase className="w-12 h-12 text-yellow-400" />
        Career Journey
      </h2>
      
      {experiences.map((exp, idx) => {
        const Icon = exp.icon;
        return (
          <div
            key={idx}
            className={`bg-gradient-to-br ${exp.color} bg-opacity-10 rounded-3xl p-8 border-2 border-opacity-30 backdrop-blur-xl hover:scale-[1.02] transition-transform cursor-pointer`}
            onClick={() => openModal(exp)}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${exp.color}`}>
                  <Icon className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-1">{exp.title}</h3>
                  <p className="text-lg text-gray-300">{exp.company}</p>
                  <p className="text-sm text-gray-400">{exp.period}</p>
                </div>
              </div>
              <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                exp.type === 'Completed' ? 'bg-green-600' : 'bg-blue-600'
              }`}>
                {exp.type}
              </span>
            </div>
            
            <div className="space-y-2 mb-4">
              {exp.details.map((detail, i) => (
                <div key={i} className="flex items-start gap-2 text-sm">
                  <ChevronRight className="w-4 h-4 mt-1 flex-shrink-0" />
                  <span>{detail}</span>
                </div>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-700">
              {exp.skills.map((skill, i) => (
                <span key={i} className="px-3 py-1 bg-white/10 rounded-full text-xs font-semibold">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderCertifications = () => (
    <div className="space-y-6">
      <h2 className="text-5xl font-black mb-8 flex items-center gap-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        <Award className="w-12 h-12 text-purple-400" />
        Achievement Nexus
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certifications.map((cert, idx) => {
          const Icon = cert.icon;
          return (
            <div
              key={idx}
              className={`bg-gradient-to-br ${cert.color} bg-opacity-10 rounded-2xl p-6 border-2 border-opacity-30 backdrop-blur-sm hover:scale-105 transition-transform cursor-pointer`}
              onClick={() => openModal(cert)}
            >
              <div className={`p-3 rounded-xl bg-gradient-to-br ${cert.color} inline-block mb-4`}>
                <Icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">{cert.name}</h3>
              <p className="text-gray-300 mb-2">{cert.org}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">{cert.date}</span>
                {cert.id && (
                  <span className="text-xs bg-white/10 px-2 py-1 rounded">
                    ID: {cert.id.slice(0, 8)}...
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderContact = () => (
    <div className="space-y-6">
      <h2 className="text-5xl font-black mb-8 flex items-center gap-4 bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
        <Globe className="w-12 h-12 text-pink-400" />
        Connect Hub
      </h2>
      
      <div className="bg-gradient-to-br from-pink-900/50 via-rose-900/50 to-red-900/50 rounded-3xl p-10 border-2 border-pink-500/30 backdrop-blur-xl">
        <h3 className="text-3xl font-bold mb-8 text-center">Let's Build Something Amazing Together!</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <a 
            href="mailto:abhiisingh240@gmail.com" 
            className="flex items-center gap-4 p-6 bg-pink-600/20 rounded-2xl hover:bg-pink-600/30 transition-all hover:scale-105 border border-pink-500/30"
          >
            <div className="p-3 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Email</p>
              <p className="text-lg font-semibold">abhiisingh240@gmail.com</p>
            </div>
          </a>
          
          <a 
            href="tel:+919580335854" 
            className="flex items-center gap-4 p-6 bg-blue-600/20 rounded-2xl hover:bg-blue-600/30 transition-all hover:scale-105 border border-blue-500/30"
          >
            <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Phone</p>
              <p className="text-lg font-semibold">+91-9580335854</p>
            </div>
          </a>
          
          <a 
            href="https://linkedin.com/in/abhishek-singh0717" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-4 p-6 bg-blue-600/20 rounded-2xl hover:bg-blue-600/30 transition-all hover:scale-105 border border-blue-500/30"
          >
            <div className="p-3 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl">
              <Linkedin className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-400">LinkedIn</p>
              <p className="text-lg font-semibold">abhishek-singh0717</p>
            </div>
          </a>
          
          <a 
            href="https://github.com/Abhisheksingh17cyber" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-4 p-6 bg-gray-700/30 rounded-2xl hover:bg-gray-700/50 transition-all hover:scale-105 border border-gray-500/30"
          >
            <div className="p-3 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl">
              <Github className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-400">GitHub</p>
              <p className="text-lg font-semibold">Abhisheksingh17cyber</p>
            </div>
          </a>
        </div>
      </div>

      <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 rounded-2xl p-8 border border-purple-500/30 backdrop-blur-sm text-center">
        <h3 className="text-2xl font-bold mb-4">🚀 Available for Opportunities</h3>
        <p className="text-lg text-gray-300 mb-4">
          Open to internships, freelance projects, and full-time positions in Web Development, AI/ML, and Digital Marketing.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <span className="px-4 py-2 bg-green-600/30 rounded-full text-sm font-semibold">Full Stack Development</span>
          <span className="px-4 py-2 bg-blue-600/30 rounded-full text-sm font-semibold">React.js</span>
          <span className="px-4 py-2 bg-purple-600/30 rounded-full text-sm font-semibold">AI Integration</span>
          <span className="px-4 py-2 bg-orange-600/30 rounded-full text-sm font-semibold">Digital Marketing</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto mb-8">
        <div className="bg-gray-800/70 backdrop-blur-sm rounded-2xl p-4 flex flex-wrap justify-between items-center border border-purple-500/30 gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigateToLevel('home')}
              className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
            >
              <Home className="w-5 h-5" />
              <span className="hidden sm:inline">Command Center</span>
            </button>
            <div className="hidden md:block text-lg font-semibold">
              {levels[currentLevel].name}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-yellow-600/30 px-4 py-2 rounded-lg flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="font-bold">{score} XP</span>
            </div>
            <div className="bg-purple-600/30 px-4 py-2 rounded-lg flex items-center gap-2">
              <Trophy className="w-5 h-5 text-purple-400" />
              <span className="font-bold">{achievements.length}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {currentLevel === 'home' && renderHome()}
        {currentLevel === 'about' && renderAbout()}
        {currentLevel === 'skills' && renderSkills()}
        {currentLevel === 'projects' && renderProjects()}
        {currentLevel === 'experience' && renderExperience()}
        {currentLevel === 'certifications' && renderCertifications()}
        {currentLevel === 'contact' && renderContact()}
      </div>

      {showModal && modalContent && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50 backdrop-blur-sm" onClick={() => setShowModal(false)}>
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 max-w-3xl w-full border-2 border-purple-500 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {modalContent.title || modalContent.name}
            </h3>
            
            {modalContent.company && <p className="text-2xl text-purple-300 mb-2">{modalContent.company}</p>}
            {modalContent.org && <p className="text-2xl text-purple-300 mb-2">{modalContent.org}</p>}
            {modalContent.period && <p className="text-gray-400 mb-4">{modalContent.period}</p>}
            {modalContent.date && <p className="text-gray-400 mb-4">{modalContent.date}</p>}
            
            {modalContent.description && <p className="text-lg text-gray-300 mb-4">{modalContent.description}</p>}
            
            {modalContent.tech && (
              <div className="mb-4">
                <p className="text-sm text-gray-400 mb-2">Technologies:</p>
                <div className="flex flex-wrap gap-2">
                  {modalContent.tech.map((tech, i) => (
                    <span key={i} className="px-3 py-1 bg-purple-600/30 rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {modalContent.features && (
              <div className="mb-4">
                <p className="text-sm text-gray-400 mb-2">Key Features:</p>
                <div className="space-y-2">
                  {modalContent.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-purple-400" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {modalContent.details && (
              <div className="mb-4">
                <div className="space-y-2">
                  {modalContent.details.map((detail, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 mt-1 text-purple-400" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {modalContent.skills && (
              <div className="mb-4">
                <p className="text-sm text-gray-400 mb-2">Skills Utilized:</p>
                <div className="flex flex-wrap gap-2">
                  {modalContent.skills.map((skill, i) => (
                    <span key={i} className="px-3 py-1 bg-blue-600/30 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {modalContent.id && (
              <p className="text-sm bg-purple-600/30 px-4 py-2 rounded-lg mb-4">
                <span className="text-gray-400">Certificate ID:</span> <span className="font-mono">{modalContent.id}</span>
              </p>
            )}
            
            {modalContent.impact && (
              <p className="text-sm text-gray-400 mb-4">
                <span className="font-semibold">Impact:</span> {modalContent.impact}
              </p>
            )}
            
            <button
              onClick={() => setShowModal(false)}
              className="mt-6 px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all w-full font-bold text-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto mt-12 text-center text-gray-400 pb-8">
        <p className="text-lg">© 2025 Abhishek Singh - Interactive Game Portfolio</p>
        <p className="text-sm mt-2">🎮 Keep exploring to unlock all achievements! 🏆</p>
        <p className="text-xs mt-4 text-gray-500">Built with React, Tailwind CSS & Lucide Icons</p>
      </div>
    </div>
  );
};

export default GamePortfolio;