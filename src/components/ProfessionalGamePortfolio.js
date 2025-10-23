import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { Award, Briefcase, Code, Mail, Linkedin, Github, MapPin, Phone, BookOpen, Trophy, Zap, Star, ChevronRight, Home, User, Rocket, Terminal, Database, Cpu, Globe, TrendingUp, Coffee, Shield, GamepadIcon, Heart, Sparkles, Crown, Timer, Compass } from 'lucide-react';

const ProfessionalGamePortfolio = () => {
  const [currentLevel, setCurrentLevel] = useState('home');
  const [score, setScore] = useState(0);
  const [achievements, setAchievements] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [particles, setParticles] = useState([]);
  const [typing, setTyping] = useState('');
  const [combo, setCombo] = useState(0);
  const [health] = useState(100);
  const [energy] = useState(100);
  const [playerLevel, setPlayerLevel] = useState(1);
  const [exp, setExp] = useState(0);
  const [soundEnabled] = useState(true);
  const [currentQuest, setCurrentQuest] = useState('Begin Your Digital Adventure');
  const [timeSpent, setTimeSpent] = useState(0);
  const [showGameHUD] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [, setGameStats] = useState({
    sectionsVisited: 0,
    clickCount: 0,
    totalInteractions: 0,
    achievementsUnlocked: 0
  });

  const audioContextRef = useRef(null);
  const timerRef = useRef(null);

  const fullText = "🎮 Welcome to Abhishek's Professional Digital Universe 🚀";

  // Initialize audio context for sound effects
  useEffect(() => {
    if (soundEnabled && !audioContextRef.current) {
      try {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      } catch (e) {
        console.log('Audio not supported');
      }
    }
  }, [soundEnabled]);

  // Game timer
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeSpent(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  // Loading screen effect
  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(loadingTimer);
  }, []);

  // Typing effect
  useEffect(() => {
    if (!isLoading) {
      let index = 0;
      const interval = setInterval(() => {
        if (index <= fullText.length) {
          setTyping(fullText.slice(0, index));
          index++;
        } else {
          clearInterval(interval);
        }
      }, 80);
      return () => clearInterval(interval);
    }
  }, [isLoading, fullText]);

  // Advanced particle system
  useEffect(() => {
    const particleInterval = setInterval(() => {
      setParticles(prev => [...prev.slice(-30), {
        id: Date.now() + Math.random(),
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 6 + 2,
        speed: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.8 + 0.2,
        color: ['#8b5cf6', '#ec4899', '#06d6a0', '#ffd60a', '#003566'][Math.floor(Math.random() * 5)]
      }]);
    }, 150);
    return () => clearInterval(particleInterval);
  }, []);

  // Sound effects
  const playSound = useCallback((frequency = 440, duration = 200, type = 'sine') => {
    if (!soundEnabled || !audioContextRef.current) return;
    
    try {
      const oscillator = audioContextRef.current.createOscillator();
      const gainNode = audioContextRef.current.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContextRef.current.destination);
      
      oscillator.frequency.setValueAtTime(frequency, audioContextRef.current.currentTime);
      oscillator.type = type;
      
      gainNode.gain.setValueAtTime(0.1, audioContextRef.current.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + duration / 1000);
      
      oscillator.start(audioContextRef.current.currentTime);
      oscillator.stop(audioContextRef.current.currentTime + duration / 1000);
    } catch (e) {
      console.log('Sound effect error:', e);
    }
  }, [soundEnabled]);

  // Calculate level from experience
  useEffect(() => {
    const newLevel = Math.floor(score / 500) + 1;
    if (newLevel > playerLevel) {
      setPlayerLevel(newLevel);
      playSound(880, 500, 'triangle'); // Level up sound
      addNotification('🎉 LEVEL UP! 🎉', 'success');
    }
    setExp(score % 500);
  }, [score, playerLevel, playSound]);

  // Notification system
  const addNotification = (message, type = 'info') => {
    const notification = document.createElement('div');
    notification.className = `fixed top-20 right-4 z-50 px-6 py-4 rounded-xl shadow-2xl font-bold text-lg animate-bounce ${
      type === 'success' ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
      type === 'warning' ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
      type === 'error' ? 'bg-gradient-to-r from-red-500 to-rose-500' :
      'bg-gradient-to-r from-blue-500 to-cyan-500'
    } text-white`;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 4000);
  };

  const levels = useMemo(() => ({
    home: { 
      name: '🏰 Command Nexus', 
      icon: Rocket, 
      color: 'from-indigo-600 via-purple-600 to-pink-600', 
      gradient: 'bg-gradient-to-br',
      description: 'Central Hub of Operations',
      difficulty: '⭐',
      rewards: '+100 XP'
    },
    about: { 
      name: '👨‍💻 Player Profile', 
      icon: User, 
      color: 'from-blue-600 via-cyan-600 to-teal-600', 
      gradient: 'bg-gradient-to-tr',
      description: 'Character Background Story',
      difficulty: '⭐⭐',
      rewards: '+150 XP'
    },
    skills: { 
      name: '⚔️ Skill Tree', 
      icon: Cpu, 
      color: 'from-green-600 via-emerald-600 to-teal-600', 
      gradient: 'bg-gradient-to-bl',
      description: 'Abilities & Tech Arsenal',
      difficulty: '⭐⭐⭐',
      rewards: '+200 XP'
    },
    projects: { 
      name: '🏆 Achievement Vault', 
      icon: Terminal, 
      color: 'from-orange-600 via-red-600 to-pink-600', 
      gradient: 'bg-gradient-to-tl',
      description: 'Legendary Projects Collection',
      difficulty: '⭐⭐⭐⭐',
      rewards: '+250 XP'
    },
    experience: { 
      name: '🗺️ Quest Log', 
      icon: Briefcase, 
      color: 'from-yellow-600 via-orange-600 to-red-600', 
      gradient: 'bg-gradient-to-br',
      description: 'Career Adventures Timeline',
      difficulty: '⭐⭐⭐',
      rewards: '+180 XP'
    },
    certifications: { 
      name: '👑 Honor Hall', 
      icon: Award, 
      color: 'from-purple-600 via-pink-600 to-rose-600', 
      gradient: 'bg-gradient-to-tr',
      description: 'Certification Trophies',
      difficulty: '⭐⭐⭐⭐⭐',
      rewards: '+300 XP'
    },
    contact: { 
      name: '🌐 Communication Portal', 
      icon: Globe, 
      color: 'from-pink-600 via-rose-600 to-red-600', 
      gradient: 'bg-gradient-to-bl',
      description: 'Establish Network Connection',
      difficulty: '⭐⭐',
      rewards: '+120 XP'
    }
  }), []);

  const skillCategories = [
    {
      category: '⚡ Frontend Mastery',
      icon: Code,
      color: 'from-blue-500 to-cyan-500',
      level: 'Expert',
      skills: [
        { name: 'React.js', level: 95, projects: 12, mastery: 'Master' },
        { name: 'JavaScript ES6+', level: 92, projects: 15, mastery: 'Expert' },
        { name: 'HTML5 & CSS3', level: 98, projects: 20, mastery: 'Grandmaster' },
        { name: 'Tailwind CSS', level: 90, projects: 14, mastery: 'Expert' },
        { name: 'Responsive Design', level: 95, projects: 18, mastery: 'Master' }
      ]
    },
    {
      category: '🚀 Backend Development',
      icon: Database,
      color: 'from-green-500 to-emerald-500',
      level: 'Advanced',
      skills: [
        { name: 'Node.js', level: 85, projects: 10, mastery: 'Advanced' },
        { name: 'REST APIs', level: 88, projects: 12, mastery: 'Expert' },
        { name: 'Database Management', level: 82, projects: 8, mastery: 'Advanced' },
        { name: 'Python', level: 87, projects: 11, mastery: 'Expert' },
        { name: 'Java', level: 80, projects: 9, mastery: 'Advanced' }
      ]
    },
    {
      category: '🤖 AI & Machine Learning',
      icon: Cpu,
      color: 'from-purple-500 to-pink-500',
      level: 'Expert',
      skills: [
        { name: 'Generative AI', level: 90, projects: 6, mastery: 'Expert' },
        { name: 'Prompt Engineering', level: 95, projects: 8, mastery: 'Master' },
        { name: 'AI Integration', level: 88, projects: 7, mastery: 'Expert' },
        { name: 'Model Context Protocol', level: 85, projects: 4, mastery: 'Advanced' }
      ]
    },
    {
      category: '📈 Digital Marketing & SEO',
      icon: TrendingUp,
      color: 'from-orange-500 to-red-500',
      level: 'Expert',
      skills: [
        { name: 'SEO Optimization', level: 92, projects: 15, mastery: 'Expert' },
        { name: 'Content Strategy', level: 88, projects: 12, mastery: 'Expert' },
        { name: 'AI-Powered Ads', level: 85, projects: 10, mastery: 'Advanced' },
        { name: 'SEM', level: 83, projects: 11, mastery: 'Advanced' }
      ]
    },
    {
      category: '🛡️ Security & DevOps',
      icon: Shield,
      color: 'from-red-500 to-rose-500',
      level: 'Advanced',
      skills: [
        { name: 'Cybersecurity', level: 82, projects: 6, mastery: 'Advanced' },
        { name: 'Git & GitHub', level: 96, projects: 25, mastery: 'Grandmaster' },
        { name: 'Google Cloud', level: 78, projects: 8, mastery: 'Advanced' },
        { name: 'Network Security', level: 75, projects: 5, mastery: 'Intermediate' }
      ]
    }
  ];

  const projects = [
    {
      title: '🤖 AI-Powered E-Commerce Empire',
      tech: ['React', 'Node.js', 'OpenAI API', 'MongoDB', 'AWS'],
      description: 'Revolutionary full-stack e-commerce solution with AI-powered product recommendations, intelligent chatbot support, and predictive analytics',
      features: ['Real-time inventory management', 'Smart product search', 'AI customer service bot', 'Advanced payment gateway', 'Predictive analytics dashboard'],
      status: 'Production',
      impact: '15,000+ active users',
      difficulty: '⭐⭐⭐⭐⭐',
      completion: 100,
      github: 'https://github.com/Abhisheksingh17cyber',
      category: 'Enterprise Project'
    },
    {
      title: '📊 Social Media Analytics Command Center',
      tech: ['React', 'D3.js', 'Python', 'FastAPI', 'ML Models'],
      description: 'Advanced real-time analytics dashboard for social media metrics with AI-powered predictive insights and automated reporting',
      features: ['Live data visualization', 'AI trend analysis', 'Predictive insights', 'Automated reports', 'Multi-platform integration'],
      status: 'Beta Testing',
      impact: '5,000+ beta users',
      difficulty: '⭐⭐⭐⭐',
      completion: 85,
      github: 'https://github.com/Abhisheksingh17cyber',
      category: 'Analytics Platform'
    },
    {
      title: '🎯 Smart Task Management Ecosystem',
      tech: ['React', 'Firebase', 'Material-UI', 'Node.js', 'AI'],
      description: 'Intelligent collaborative task management platform with AI-powered priority suggestions and team productivity optimization',
      features: ['Team collaboration hub', 'Smart notifications', 'Time tracking', 'Analytics dashboard', 'AI task prioritization'],
      status: 'Production',
      impact: '8,000+ teams using',
      difficulty: '⭐⭐⭐⭐',
      completion: 100,
      github: 'https://github.com/Abhisheksingh17cyber',
      category: 'Productivity Platform'
    },
    {
      title: '🎨 Portfolio Builder Universe',
      tech: ['React', 'Tailwind', 'Express', 'PostgreSQL', 'AWS'],
      description: 'Professional no-code platform for developers to create stunning, responsive portfolios with advanced customization options',
      features: ['Drag-and-drop builder', 'Custom themes', 'SEO optimization', 'Analytics dashboard', 'Performance monitoring'],
      status: 'Production',
      impact: '3,500+ portfolios created',
      difficulty: '⭐⭐⭐⭐',
      completion: 100,
      github: 'https://github.com/Abhisheksingh17cyber',
      category: 'Creative Platform'
    },
    {
      title: '✨ AI Content Generation Studio',
      tech: ['React', 'GPT-4 API', 'Redis', 'Docker', 'Kubernetes'],
      description: 'Advanced content generation platform for blogs, social media, and marketing with multi-format output and AI optimization',
      features: ['Multi-format content', 'SEO optimization', 'Tone adjustment', 'Bulk generation', 'Quality analysis'],
      status: 'Production',
      impact: '2,500+ content pieces/day',
      difficulty: '⭐⭐⭐⭐⭐',
      completion: 95,
      github: 'https://github.com/Abhisheksingh17cyber',
      category: 'AI Platform'
    },
    {
      title: '💬 Secure Real-time Communication Hub',
      tech: ['React', 'Socket.io', 'Node.js', 'MongoDB', 'Encryption'],
      description: 'Enterprise-grade real-time messaging platform with end-to-end encryption, video calls, and advanced security features',
      features: ['Group chats', 'File sharing', 'Video conferencing', 'Message encryption', 'Admin controls'],
      status: 'Production',
      impact: '5,000+ daily active users',
      difficulty: '⭐⭐⭐⭐',
      completion: 100,
      github: 'https://github.com/Abhisheksingh17cyber',
      category: 'Communication Platform'
    }
  ];

  const certifications = [
    { name: 'Model Context Protocol Mastery', org: 'Anthropic', date: 'Sep 2025', id: '9vmhe84mkwt4', icon: Cpu, color: 'from-purple-500 to-pink-500', rarity: 'Legendary' },
    { name: 'ReactJS Advanced Foundations', org: 'ScholarHat', date: 'Aug 2025', id: 'JFWX120825', icon: Code, color: 'from-blue-500 to-cyan-500', rarity: 'Epic' },
    { name: 'Generative AI Specialist', org: 'Google Cloud', date: 'Aug 2025', id: '8776454', icon: Sparkles, color: 'from-green-500 to-emerald-500', rarity: 'Epic' },
    { name: 'Prompt Engineering Expert', org: 'Simplilearn', date: 'Aug 2025', id: '8776030', icon: Terminal, color: 'from-orange-500 to-red-500', rarity: 'Epic' },
    { name: 'AI Innovation Pioneer', org: 'HP LIFE', date: 'Aug 2025', icon: Zap, color: 'from-yellow-500 to-orange-500', rarity: 'Rare' },
    { name: 'Cybersecurity Guardian', org: 'Tech Mahindra', date: 'Aug 2025', icon: Shield, color: 'from-red-500 to-rose-500', rarity: 'Epic' },
    { name: 'AI-Powered Marketing Wizard', org: 'Google', date: 'Jul 2025', id: '154672281', icon: TrendingUp, color: 'from-pink-500 to-purple-500', rarity: 'Epic' },
    { name: 'Data Analysis Champion', org: 'Open University', date: 'Jul 2025', icon: Database, color: 'from-cyan-500 to-blue-500', rarity: 'Rare' },
    { name: 'Web Architecture Master', org: 'Open University', date: 'Jul 2025', icon: Globe, color: 'from-teal-500 to-green-500', rarity: 'Epic' },
    { name: 'Digital Marketing Grandmaster', org: 'Semrush', date: 'Jul 2026', id: 'b4b295d293', icon: Crown, color: 'from-indigo-500 to-purple-500', rarity: 'Legendary' }
  ];

  const experiences = [
    {
      title: '🚀 Business Development Specialist',
      company: 'Edu-versity (AMG Technologies)',
      period: 'Oct 2025 - Jan 2026',
      type: 'Elite Opportunity',
      icon: Briefcase,
      color: 'from-blue-500 to-cyan-500',
      details: [
        '💰 Premium Package: INR 25,000/month (Fixed: 15K + Performance: 10K + Bonus: 5K)',
        '🎯 Guaranteed Pre-Placement Offer with 8 LPA CTC',
        '🎓 Intensive 15-day professional training bootcamp',
        '🌟 Bengaluru, Karnataka - Tech Hub Location',
        '⚡ Fast-track to full-time for exceptional performers'
      ],
      skills: ['Business Strategy', 'Client Relations', 'Sales Excellence', 'Marketing Innovation'],
      difficulty: '⭐⭐⭐⭐',
      status: 'Confirmed'
    },
    {
      title: '💻 Senior Web Developer Intern',
      company: 'Zidio Development',
      period: 'Sep 2025 - Nov 2025',
      type: 'AI Innovation Role',
      icon: Code,
      color: 'from-green-500 to-emerald-500',
      details: [
        '💎 Premium Compensation: Up to INR 12,000/month',
        '🤖 Leading-edge AI advancement projects',
        '🌐 100% Remote flexibility with global collaboration',
        '👨‍🎓 Mentorship from industry veterans',
        '🎯 Specialized evening training sessions'
      ],
      skills: ['React Mastery', 'Node.js', 'AI Integration', 'Full Stack Architecture'],
      difficulty: '⭐⭐⭐⭐',
      status: 'Active'
    },
    {
      title: '🎨 Frontend Development Specialist',
      company: 'Indolike',
      period: 'Sep 2025 - Oct 2025',
      type: 'Creative Challenge',
      icon: Terminal,
      color: 'from-purple-500 to-pink-500',
      details: [
        '🚀 Intensive 1-month innovation sprint',
        '⚛️ Advanced frontend development focus',
        '🏠 100% Remote creative environment',
        '🎯 Accelerated skills development program',
        '👥 Collaborative team environment'
      ],
      skills: ['HTML5/CSS3', 'JavaScript ES6+', 'React', 'UI/UX Design'],
      difficulty: '⭐⭐⭐',
      status: 'Completed'
    },
    {
      title: '🌟 Web Development Expert',
      company: 'Labmentix',
      period: 'Sep 2025',
      type: 'Professional Sprint',
      icon: Globe,
      color: 'from-orange-500 to-red-500',
      details: [
        '⚡ High-intensity 1-month program',
        '📚 Professional development resources',
        '🏢 Bengaluru tech ecosystem exposure',
        '🎯 Mentorship and career guidance',
        '🔮 Future collaboration opportunities'
      ],
      skills: ['Web Development', 'API Integration', 'Database Design', 'Testing'],
      difficulty: '⭐⭐⭐',
      status: 'Completed'
    },
    {
      title: '🌍 Social Impact Leader',
      company: 'We Hope We Care Foundation',
      period: 'May 2024 - Aug 2024',
      type: 'Legendary Achievement',
      icon: Trophy,
      color: 'from-pink-500 to-rose-500',
      details: [
        '✅ Successfully completed 3-month leadership program',
        '🤝 Led community outreach initiatives',
        '📢 Organized large-scale awareness campaigns',
        '👔 Developed leadership and management skills',
        '🎯 Executed multiple high-impact programs'
      ],
      skills: ['Leadership', 'Communication', 'Project Management', 'Social Impact'],
      difficulty: '⭐⭐⭐⭐',
      status: 'Legendary'
    }
  ];

  // Achievement system with gaming elements
  const unlockAchievement = useCallback((type) => {
    if (achievements.includes(type)) return;
    
    const newAchievements = [...achievements, type];
    setAchievements(newAchievements);
    const baseXP = 150;
    const bonusXP = combo * 25;
    const totalXP = baseXP + bonusXP;
    setScore(prev => prev + totalXP);
    setCombo(prev => prev + 1);
    setGameStats(prev => ({
      ...prev,
      achievementsUnlocked: prev.achievementsUnlocked + 1
    }));
    
    const messages = {
      explorer: '🎮 ACHIEVEMENT UNLOCKED: Digital Explorer - Welcome to the adventure!',
      curious: '🔍 ACHIEVEMENT UNLOCKED: Curious Innovator - Master explorer detected!',
      dedicated: '💼 ACHIEVEMENT UNLOCKED: Career Hunter - Experience gained!',
      skilled: '⚡ ACHIEVEMENT UNLOCKED: Tech Wizard - Skills mastered!',
      certified: '🏆 ACHIEVEMENT UNLOCKED: Certification Master - Honor achieved!',
      builder: '🛠️ ACHIEVEMENT UNLOCKED: Project Architect - Creations discovered!',
      connected: '🌐 ACHIEVEMENT UNLOCKED: Network Guardian - Connection established!'
    };
    
    playSound(660, 800, 'square'); // Achievement sound
    addNotification(`${messages[type]} (+${totalXP} XP)`, 'success');
    
    // Update quest
    if (newAchievements.length >= 3) {
      setCurrentQuest('Become a Digital Legend');
    } else if (newAchievements.length >= 6) {
      setCurrentQuest('Master of the Digital Realm');
    }
  }, [achievements, combo, playSound]);

  const navigateToLevel = useCallback((level) => {
    setCurrentLevel(level);
    const baseXP = 75;
    const bonusXP = combo * 10;
    const totalXP = baseXP + bonusXP;
    setScore(prev => prev + totalXP);
    setCombo(prev => prev + 1);
    setGameStats(prev => ({
      ...prev,
      sectionsVisited: prev.sectionsVisited + 1,
      clickCount: prev.clickCount + 1,
      totalInteractions: prev.totalInteractions + 1
    }));
    
    playSound(440, 300, 'sine'); // Navigation sound
    
    // Achievement triggers
    if (level === 'experience' && !achievements.includes('dedicated')) unlockAchievement('dedicated');
    if (level === 'skills' && !achievements.includes('skilled')) unlockAchievement('skilled');
    if (level === 'certifications' && !achievements.includes('certified')) unlockAchievement('certified');
    if (level === 'projects' && !achievements.includes('builder')) unlockAchievement('builder');
    if (level === 'contact' && !achievements.includes('connected')) unlockAchievement('connected');
    
    if (achievements.length >= 5 && !achievements.includes('curious')) {
      unlockAchievement('curious');
    }
    
    addNotification(`Entered ${levels[level].name} (+${totalXP} XP)`, 'info');
  }, [achievements, combo, levels, playSound, unlockAchievement]);

  const openModal = useCallback((content) => {
    setModalContent(content);
    setShowModal(true);
    setScore(prev => prev + 50);
    setGameStats(prev => ({
      ...prev,
      clickCount: prev.clickCount + 1,
      totalInteractions: prev.totalInteractions + 1
    }));
    playSound(330, 200, 'sine');
  }, [playSound]);

  // Initialize first achievement
  useEffect(() => {
    if (!achievements.includes('explorer') && score === 0 && !isLoading) {
      setTimeout(() => unlockAchievement('explorer'), 2000);
    }
  }, [achievements, score, isLoading, unlockAchievement]);

  // Loading Screen Component
  const LoadingScreen = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <div className="text-center">
        <div className="relative mb-8">
          <div className="w-40 h-40 border-8 border-purple-500/30 rounded-full animate-spin">
            <div className="w-32 h-32 border-8 border-pink-500/50 rounded-full animate-spin absolute top-2 left-2">
              <div className="w-24 h-24 border-8 border-cyan-500/70 rounded-full animate-spin absolute top-2 left-2">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center absolute top-2 left-2">
                  <GamepadIcon className="w-8 h-8 text-white animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <h1 className="text-4xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent mb-4">
          🎮 PROFESSIONAL GAME PORTFOLIO 🚀
        </h1>
        <p className="text-xl text-gray-300 mb-6">Initializing Digital Universe...</p>
        <div className="w-80 h-4 bg-gray-700 rounded-full overflow-hidden mx-auto">
          <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-300 animate-pulse" 
               style={{width: '100%'}}></div>
        </div>
        <p className="text-sm text-gray-400 mt-4 animate-pulse">Loading epic experience...</p>
      </div>
    </div>
  );

  // Game HUD Component
  const GameHUD = () => (
    <div className="fixed top-4 left-4 right-4 z-40 pointer-events-none">
      <div className="flex justify-between items-start">
        {/* Left HUD */}
        <div className="bg-black/80 backdrop-blur-sm rounded-xl p-4 border border-purple-500/30 pointer-events-auto">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
              AS
            </div>
            <div>
              <h3 className="text-white font-bold">Level {playerLevel} Developer</h3>
              <p className="text-gray-400 text-sm">Abhishek Singh</p>
            </div>
          </div>
          
          {/* Health Bar */}
          <div className="mb-2">
            <div className="flex items-center gap-2 mb-1">
              <Heart className="w-4 h-4 text-red-400" />
              <span className="text-sm text-gray-300">Health</span>
            </div>
            <div className="w-32 h-2 bg-gray-700 rounded-full">
              <div className="h-full bg-gradient-to-r from-red-500 to-red-400 rounded-full transition-all duration-300" 
                   style={{width: `${health}%`}}></div>
            </div>
          </div>
          
          {/* Energy Bar */}
          <div className="mb-2">
            <div className="flex items-center gap-2 mb-1">
              <Zap className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-gray-300">Energy</span>
            </div>
            <div className="w-32 h-2 bg-gray-700 rounded-full">
              <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-300" 
                   style={{width: `${energy}%`}}></div>
            </div>
          </div>
          
          {/* XP Bar */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-gray-300">Experience</span>
            </div>
            <div className="w-32 h-2 bg-gray-700 rounded-full">
              <div className="h-full bg-gradient-to-r from-yellow-500 to-orange-400 rounded-full transition-all duration-300" 
                   style={{width: `${(exp / 500) * 100}%`}}></div>
            </div>
            <p className="text-xs text-gray-400 mt-1">{exp}/500 XP</p>
          </div>
        </div>
        
        {/* Right HUD */}
        <div className="bg-black/80 backdrop-blur-sm rounded-xl p-4 border border-purple-500/30 pointer-events-auto">
          <div className="text-right mb-3">
            <div className="flex items-center gap-2 justify-end mb-2">
              <Trophy className="w-5 h-5 text-yellow-400" />
              <span className="text-yellow-400 font-bold">{score.toLocaleString()} XP</span>
            </div>
            <div className="flex items-center gap-2 justify-end mb-2">
              <Award className="w-5 h-5 text-purple-400" />
              <span className="text-purple-400 font-bold">{achievements.length}/7</span>
            </div>
            <div className="flex items-center gap-2 justify-end mb-2">
              <Timer className="w-4 h-4 text-cyan-400" />
              <span className="text-cyan-400 text-sm">{Math.floor(timeSpent / 60)}:{(timeSpent % 60).toString().padStart(2, '0')}</span>
            </div>
          </div>
          
          {combo > 0 && (
            <div className="text-orange-400 font-bold text-lg animate-pulse">
              🔥 {combo}x COMBO!
            </div>
          )}
        </div>
      </div>
      
      {/* Quest Log */}
      <div className="mt-4 max-w-md mx-auto">
        <div className="bg-black/80 backdrop-blur-sm rounded-xl p-3 border border-green-500/30 pointer-events-auto">
          <div className="flex items-center gap-2 mb-2">
            <Compass className="w-4 h-4 text-green-400" />
            <span className="text-green-400 font-semibold text-sm">Current Quest</span>
          </div>
          <p className="text-white text-sm">{currentQuest}</p>
        </div>
      </div>
    </div>
  );

  // Enhanced particle rendering
  const ParticleSystem = () => (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute rounded-full animate-pulse"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            opacity: particle.opacity,
            animation: `float ${particle.speed}s ease-in-out infinite`
          }}
        />
      ))}
    </div>
  );

  // Content rendering functions
  const renderHome = () => (
    <div className="space-y-8">
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-900/40 via-purple-900/40 to-pink-900/40 rounded-3xl p-12 border-2 border-purple-500/30 backdrop-blur-xl">
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
            <span className="text-yellow-400 font-bold">Level {playerLevel} Developer</span>
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

      {/* Level Selection Grid */}
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
                <p className="text-sm opacity-90 mb-3">{level.description}</p>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-xs bg-white/20 px-3 py-1 rounded-full">{level.rewards}</span>
                  <ChevronRight className="w-5 h-5 animate-bounce" />
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Performance Dashboard */}
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
    </div>
  );

  const renderAbout = () => (
    <div className="space-y-6">
      <h2 className="text-5xl font-black mb-8 flex items-center gap-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
        <User className="w-12 h-12 text-blue-400" />
        Player Profile
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
          </div>
        </div>
      </div>
    </div>
  );

  const renderSkills = () => (
    <div className="space-y-6">
      <h2 className="text-5xl font-black mb-8 flex items-center gap-4 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
        <Cpu className="w-12 h-12 text-green-400" />
        Skill Tree
      </h2>
      
      {skillCategories.map((category, idx) => {
        const Icon = category.icon;
        return (
          <div key={idx} className={`bg-gradient-to-br ${category.color} bg-opacity-10 rounded-3xl p-8 border-2 border-opacity-30 backdrop-blur-xl hover:scale-[1.02] transition-transform`}>
            <h3 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Icon className="w-8 h-8" />
              {category.category}
              <span className="text-sm bg-white/20 px-3 py-1 rounded-full ml-auto">{category.level}</span>
            </h3>
            <div className="space-y-4">
              {category.skills.map((skill, i) => (
                <div key={i} className="bg-gray-900/50 rounded-xl p-4 hover:bg-gray-900/70 transition-colors">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-semibold">{skill.name}</span>
                    <div className="flex gap-2">
                      <span className="text-sm bg-white/10 px-3 py-1 rounded-full">{skill.projects} projects</span>
                      <span className="text-sm bg-purple-500/30 px-3 py-1 rounded-full">{skill.mastery}</span>
                    </div>
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
        Achievement Vault
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
              <div className="flex flex-col gap-1">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  project.status === 'Production' ? 'bg-green-600' : 'bg-yellow-600'
                }`}>
                  {project.status}
                </span>
                <span className="px-3 py-1 bg-purple-600/30 rounded-full text-xs font-semibold">
                  {project.difficulty}
                </span>
              </div>
            </div>
            
            <p className="text-gray-300 mb-4">{project.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tech.map((tech, i) => (
                <span key={i} className="px-3 py-1 bg-orange-600/30 rounded-full text-xs font-semibold">
                  {tech}
                </span>
              ))}
            </div>
            
            <div className="flex justify-between items-center pt-4 border-t border-gray-700">
              <span className="text-sm text-gray-400">Impact: {project.impact}</span>
              <Github className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderExperience = () => (
    <div className="space-y-6">
      <h2 className="text-5xl font-black mb-8 flex items-center gap-4 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
        <Briefcase className="w-12 h-12 text-yellow-400" />
        Quest Log
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
              <div className="flex flex-col gap-1">
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  exp.status === 'Legendary' ? 'bg-yellow-600' : 
                  exp.status === 'Completed' ? 'bg-green-600' : 'bg-blue-600'
                }`}>
                  {exp.type}
                </span>
                <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-semibold">
                  {exp.difficulty}
                </span>
              </div>
            </div>
            
            <div className="space-y-2 mb-4">
              {exp.details.slice(0, 3).map((detail, i) => (
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
        Honor Hall
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
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${cert.color} inline-block`}>
                  <Icon className="w-8 h-8" />
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  cert.rarity === 'Legendary' ? 'bg-yellow-600' :
                  cert.rarity === 'Epic' ? 'bg-purple-600' : 'bg-blue-600'
                }`}>
                  {cert.rarity}
                </span>
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
        Communication Portal
      </h2>
      
      <div className="bg-gradient-to-br from-pink-900/50 via-rose-900/50 to-red-900/50 rounded-3xl p-10 border-2 border-pink-500/30 backdrop-blur-xl">
        <h3 className="text-3xl font-bold mb-8 text-center">🚀 Let's Build Something Epic Together! 🎮</h3>
        
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
    </div>
  );

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white relative overflow-hidden">
      <ParticleSystem />
      {showGameHUD && <GameHUD />}
      
      {/* Navigation */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-30">
        <div className="bg-black/80 backdrop-blur-sm rounded-xl p-4 flex flex-wrap justify-center items-center border border-purple-500/30 gap-4">
          <button
            onClick={() => setCurrentLevel('home')}
            className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
          >
            <Home className="w-5 h-5" />
            <span className="hidden sm:inline">{levels.home.name}</span>
          </button>
          <div className="hidden md:block text-lg font-semibold text-purple-300">
            {levels[currentLevel].name}
          </div>
        </div>
      </div>
      
      <div className="pt-32 pb-16 px-4 md:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {currentLevel === 'home' && renderHome()}
          {currentLevel === 'about' && renderAbout()}
          {currentLevel === 'skills' && renderSkills()}
          {currentLevel === 'projects' && renderProjects()}
          {currentLevel === 'experience' && renderExperience()}
          {currentLevel === 'certifications' && renderCertifications()}
          {currentLevel === 'contact' && renderContact()}
        </div>
      </div>

      {/* Modal */}
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
            
            <button
              onClick={() => setShowModal(false)}
              className="mt-6 px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all w-full font-bold text-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="max-w-7xl mx-auto mt-12 text-center text-gray-400 pb-8 px-4">
        <p className="text-lg">© 2025 Abhishek Singh - Professional Gaming Portfolio</p>
        <p className="text-sm mt-2">🎮 Keep exploring to unlock all achievements! 🏆</p>
        <p className="text-xs mt-4 text-gray-500">Built with React, Tailwind CSS & Professional Gaming UI</p>
      </div>
    </div>
  );
};

export default ProfessionalGamePortfolio;