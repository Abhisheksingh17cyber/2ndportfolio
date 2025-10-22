import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Award, Briefcase, Code, Mail, Linkedin, Github, MapPin, Phone, BookOpen, Trophy, Zap, Star, ChevronRight, Home, User, Target, Rocket, Terminal, Database, Cpu, Globe, TrendingUp, Coffee, Shield, GamepadIcon, Volume2, Play, Settings, Map, Heart, Activity, Sparkles, Crown, Swords, RotateCcw, Timer, Compass, Sword } from 'lucide-react';

const ProfessionalGamePortfolio = () => {
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
  const [playerLevel, setPlayerLevel] = useState(1);
  const [exp, setExp] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showMiniMap, setShowMiniMap] = useState(false);
  const [currentQuest, setCurrentQuest] = useState('Begin Your Digital Adventure');
  const [timeSpent, setTimeSpent] = useState(0);
  const [showGameHUD, setShowGameHUD] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [gameStats, setGameStats] = useState({
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

  const levels = {
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
  };

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

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white relative overflow-hidden">
      <ParticleSystem />
      {showGameHUD && <GameHUD />}
      
      {/* Rest of the component will continue in the next part... */}
      <div className="pt-32 pb-16 px-4 md:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Navigation will be added here */}
          <div className="text-center mb-12">
            <h1 className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              {typing}
              <span className="animate-pulse">|</span>
            </h1>
            <p className="text-2xl text-gray-300 mb-8">🎮 Professional Game Developer Portfolio 🚀</p>
          </div>
          
          {/* Level Selection Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(levels).map(([key, level]) => {
              if (key === 'home') return null;
              const Icon = level.icon;
              return (
                <button
                  key={key}
                  onClick={() => navigateToLevel(key)}
                  className={`group relative ${level.gradient} ${level.color} p-8 rounded-3xl shadow-2xl hover:scale-105 transform transition-all duration-500 border-2 border-white/20 overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300" />
                  <div className="relative z-10">
                    <Icon className="w-20 h-20 mb-6 mx-auto group-hover:scale-110 transition-transform duration-300" />
                    <h3 className="text-2xl font-bold mb-3">{level.name}</h3>
                    <p className="text-sm opacity-90 mb-3">{level.description}</p>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs bg-white/20 px-3 py-1 rounded-full">{level.difficulty}</span>
                      <span className="text-xs bg-yellow-500/30 px-3 py-1 rounded-full">{level.rewards}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <Play className="w-5 h-5 animate-bounce" />
                      <span className="font-semibold">ENTER LEVEL</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalGamePortfolio;