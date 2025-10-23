import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { Award, Briefcase, Code, Mail, Linkedin, Github, MapPin, Phone, BookOpen, Trophy, Zap, Star, ChevronRight, Home, User, Rocket, Terminal, Database, Cpu, Globe, TrendingUp, Coffee, Shield, GamepadIcon, Heart, Sparkles, Crown, Timer, Compass, MessageCircle, Target, Calendar } from 'lucide-react';

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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [hoveredElement, setHoveredElement] = useState(null);
  const [animatedCounters, setAnimatedCounters] = useState({});
  const [visibleElements, setVisibleElements] = useState(new Set());
  const [glowEffect, setGlowEffect] = useState({ x: 0, y: 0, active: false });
  const [, setGameStats] = useState({
    sectionsVisited: 0,
    clickCount: 0,
    totalInteractions: 0,
    achievementsUnlocked: 0
  });

  const audioContextRef = useRef(null);
  const timerRef = useRef(null);
  const containerRef = useRef(null);
  const intersectionObserverRef = useRef(null);

  const fullText = "⚡ ABHISHEK SINGH - ELITE PROFESSIONAL PORTFOLIO ⚡";

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

  // Advanced mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setGlowEffect({ x: e.clientX, y: e.clientY, active: true });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Intersection Observer for animations on scroll
  useEffect(() => {
    intersectionObserverRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    return () => {
      if (intersectionObserverRef.current) {
        intersectionObserverRef.current.disconnect();
      }
    };
  }, []);

  // Animated counter effect
  const animateCounter = useCallback((targetValue, duration = 2000, key) => {
    const startTime = Date.now();
    
    const updateCounter = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(easeOutQuart * targetValue);
      
      setAnimatedCounters(prev => ({ ...prev, [key]: current }));
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    };
    
    requestAnimationFrame(updateCounter);
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
        size: Math.random() * 4 + 1,
        speed: Math.random() * 3 + 1,
        opacity: Math.random() * 0.6 + 0.2,
        color: ['#ffffff', '#f3f4f6', '#d1d5db', '#9ca3af'][Math.floor(Math.random() * 4)]
      }]);
    }, 200);
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
      name: '⚡ COMMAND CENTER', 
      icon: Rocket, 
      color: 'from-gray-900 via-gray-800 to-black', 
      gradient: 'bg-gradient-to-br',
      description: 'Elite Operations Hub',
      difficulty: '█████',
      rewards: '+100 XP',
      accent: 'border-white/20 hover:border-white/40'
    },
    about: { 
      name: '🎯 PROFILE DATA', 
      icon: User, 
      color: 'from-black via-gray-900 to-gray-800', 
      gradient: 'bg-gradient-to-tr',
      description: 'Executive Summary',
      difficulty: '██████',
      rewards: '+150 XP',
      accent: 'border-gray-500/30 hover:border-gray-300/50'
    },
    skills: { 
      name: '⚔️ TECH ARSENAL', 
      icon: Cpu, 
      color: 'from-gray-800 via-black to-gray-900', 
      gradient: 'bg-gradient-to-bl',
      description: 'Professional Capabilities',
      difficulty: '███████',
      rewards: '+200 XP',
      accent: 'border-gray-400/20 hover:border-gray-200/40'
    },
    projects: { 
      name: '🏆 PROJECT VAULT', 
      icon: Terminal, 
      color: 'from-black via-gray-900 to-gray-700', 
      gradient: 'bg-gradient-to-tl',
      description: 'Elite Portfolio Collection',
      difficulty: '████████',
      rewards: '+250 XP',
      accent: 'border-white/15 hover:border-white/35'
    },
    experience: { 
      name: '� MISSION LOG', 
      icon: Briefcase, 
      color: 'from-gray-900 via-black to-gray-800', 
      gradient: 'bg-gradient-to-br',
      description: 'Professional Timeline',
      difficulty: '███████',
      rewards: '+180 XP',
      accent: 'border-gray-600/25 hover:border-gray-400/45'
    },
    certifications: { 
      name: '👑 HONORS HALL', 
      icon: Award, 
      color: 'from-gray-800 via-gray-900 to-black', 
      gradient: 'bg-gradient-to-tr',
      description: 'Elite Certifications',
      difficulty: '█████████',
      rewards: '+300 XP',
      accent: 'border-gray-300/20 hover:border-white/40'
    },
    contact: { 
      name: '🌐 CONNECT PORTAL', 
      icon: Globe, 
      color: 'from-black via-gray-800 to-gray-900', 
      gradient: 'bg-gradient-to-bl',
      description: 'Professional Network',
      difficulty: '██████',
      rewards: '+120 XP',
      accent: 'border-gray-500/20 hover:border-gray-200/40'
    }
  }), []);

  const skillCategories = [
    {
      category: '⚡ FRONTEND MASTERY',
      icon: Code,
      color: 'from-gray-900 to-black',
      level: 'EXPERT',
      borderColor: 'border-white/20',
      skills: [
        { name: 'React.js', level: 95, projects: 12, mastery: 'MASTER', color: 'bg-gradient-to-r from-gray-800 to-gray-900' },
        { name: 'JavaScript ES6+', level: 92, projects: 15, mastery: 'EXPERT', color: 'bg-gradient-to-r from-gray-700 to-gray-800' },
        { name: 'HTML5 & CSS3', level: 98, projects: 20, mastery: 'GRANDMASTER', color: 'bg-gradient-to-r from-black to-gray-800' },
        { name: 'Tailwind CSS', level: 90, projects: 14, mastery: 'EXPERT', color: 'bg-gradient-to-r from-gray-800 to-black' },
        { name: 'Responsive Design', level: 95, projects: 18, mastery: 'MASTER', color: 'bg-gradient-to-r from-gray-900 to-gray-700' }
      ]
    },
    {
      category: '🚀 BACKEND DEVELOPMENT',
      icon: Database,
      color: 'from-black to-gray-800',
      level: 'ADVANCED',
      borderColor: 'border-gray-400/25',
      skills: [
        { name: 'Node.js', level: 85, projects: 10, mastery: 'ADVANCED', color: 'bg-gradient-to-r from-gray-800 to-black' },
        { name: 'REST APIs', level: 88, projects: 12, mastery: 'EXPERT', color: 'bg-gradient-to-r from-gray-900 to-gray-800' },
        { name: 'Database Management', level: 82, projects: 8, mastery: 'ADVANCED', color: 'bg-gradient-to-r from-black to-gray-900' },
        { name: 'Python', level: 87, projects: 11, mastery: 'EXPERT', color: 'bg-gradient-to-r from-gray-700 to-gray-900' },
        { name: 'Java', level: 80, projects: 9, mastery: 'ADVANCED', color: 'bg-gradient-to-r from-gray-800 to-gray-700' }
      ]
    },
    {
      category: '🤖 AI & MACHINE LEARNING',
      icon: Cpu,
      color: 'from-gray-800 to-gray-900',
      level: 'EXPERT',
      borderColor: 'border-gray-300/30',
      skills: [
        { name: 'Generative AI', level: 90, projects: 6, mastery: 'EXPERT', color: 'bg-gradient-to-r from-gray-900 to-black' },
        { name: 'Prompt Engineering', level: 95, projects: 8, mastery: 'MASTER', color: 'bg-gradient-to-r from-black to-gray-800' },
        { name: 'AI Integration', level: 88, projects: 7, mastery: 'EXPERT', color: 'bg-gradient-to-r from-gray-800 to-gray-900' },
        { name: 'Model Context Protocol', level: 85, projects: 4, mastery: 'ADVANCED', color: 'bg-gradient-to-r from-gray-700 to-black' }
      ]
    },
    {
      category: '📈 DIGITAL MARKETING & SEO',
      icon: TrendingUp,
      color: 'from-gray-900 to-gray-700',
      level: 'EXPERT',
      borderColor: 'border-gray-500/25',
      skills: [
        { name: 'SEO Optimization', level: 92, projects: 15, mastery: 'EXPERT', color: 'bg-gradient-to-r from-gray-800 to-gray-900' },
        { name: 'Content Strategy', level: 88, projects: 12, mastery: 'EXPERT', color: 'bg-gradient-to-r from-black to-gray-800' },
        { name: 'AI-Powered Ads', level: 85, projects: 10, mastery: 'ADVANCED', color: 'bg-gradient-to-r from-gray-900 to-gray-700' },
        { name: 'SEM', level: 83, projects: 11, mastery: 'ADVANCED', color: 'bg-gradient-to-r from-gray-700 to-gray-900' }
      ]
    },
    {
      category: '🛡️ SECURITY & DEVOPS',
      icon: Shield,
      color: 'from-black to-gray-900',
      level: 'ADVANCED',
      borderColor: 'border-white/15',
      skills: [
        { name: 'Cybersecurity', level: 82, projects: 6, mastery: 'ADVANCED', color: 'bg-gradient-to-r from-gray-800 to-black' },
        { name: 'Git & GitHub', level: 96, projects: 25, mastery: 'GRANDMASTER', color: 'bg-gradient-to-r from-gray-900 to-gray-800' },
        { name: 'Google Cloud', level: 78, projects: 8, mastery: 'ADVANCED', color: 'bg-gradient-to-r from-black to-gray-700' },
        { name: 'Network Security', level: 75, projects: 5, mastery: 'INTERMEDIATE', color: 'bg-gradient-to-r from-gray-700 to-gray-800' }
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

  // Advanced hover effects
  const handleElementHover = useCallback((elementId, isEntering = true) => {
    setHoveredElement(isEntering ? elementId : null);
    if (isEntering) {
      playSound(220, 100, 'sine');
    }
  }, [playSound]);

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

  // Initialize intersection observer for skill animations
  useEffect(() => {
    if (!isLoading && containerRef.current) {
      const elements = containerRef.current.querySelectorAll('[id]');
      elements.forEach(element => {
        if (intersectionObserverRef.current) {
          intersectionObserverRef.current.observe(element);
        }
      });
    }
  }, [isLoading, currentLevel]);

  // Trigger counter animations for visible elements
  useEffect(() => {
    visibleElements.forEach(elementId => {
      if (elementId.startsWith('skill-') && !animatedCounters[elementId]) {
        const skillElement = document.getElementById(elementId);
        if (skillElement) {
          // Extract skill level from element or use default
          animateCounter(85, 2000, elementId);
        }
      }
    });
  }, [visibleElements, animatedCounters, animateCounter]);

  // Loading Screen Component
  const LoadingScreen = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="text-center">
        <div className="relative mb-8">
          <div className="w-40 h-40 border-8 border-white/10 rounded-full animate-spin">
            <div className="w-32 h-32 border-8 border-gray-400/20 rounded-full animate-spin absolute top-2 left-2" style={{animationDirection: 'reverse'}}>
              <div className="w-24 h-24 border-8 border-white/30 rounded-full animate-spin absolute top-2 left-2">
                <div className="w-16 h-16 bg-gradient-to-r from-white to-gray-300 rounded-full flex items-center justify-center absolute top-2 left-2">
                  <GamepadIcon className="w-8 h-8 text-black animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <h1 className="text-4xl font-black text-white mb-4 tracking-wider">
          ⚡ ELITE PORTFOLIO SYSTEM ⚡
        </h1>
        <p className="text-xl text-gray-300 mb-6 font-mono">INITIALIZING PROFESSIONAL INTERFACE...</p>
        <div className="w-80 h-4 bg-gray-800 rounded-full overflow-hidden mx-auto border border-gray-600">
          <div className="h-full bg-gradient-to-r from-white via-gray-300 to-white rounded-full transition-all duration-300 animate-pulse" 
               style={{width: '100%'}}></div>
        </div>
        <p className="text-sm text-gray-500 mt-4 animate-pulse font-mono">LOADING EXECUTIVE EXPERIENCE...</p>
      </div>
    </div>
  );

  // Game HUD Component
  const GameHUD = () => (
    <div className="fixed top-4 left-4 right-4 z-40 pointer-events-none">
      <div className="flex justify-between items-start">
        {/* Left HUD */}
        <div className="bg-black/90 backdrop-blur-sm rounded-xl p-4 border-2 border-white/20 pointer-events-auto shadow-2xl">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-12 bg-gradient-to-r from-white to-gray-300 rounded-full flex items-center justify-center text-black font-bold text-lg border-2 border-gray-400">
              AS
            </div>
            <div>
              <h3 className="text-white font-bold">LEVEL {playerLevel} DEVELOPER</h3>
              <p className="text-gray-300 text-sm font-mono">ABHISHEK SINGH</p>
            </div>
          </div>
          
          {/* Health Bar */}
          <div className="mb-2">
            <div className="flex items-center gap-2 mb-1">
              <Heart className="w-4 h-4 text-gray-300" />
              <span className="text-sm text-gray-200 font-mono">SYSTEM</span>
            </div>
            <div className="w-32 h-2 bg-gray-800 rounded-full border border-gray-600">
              <div className="h-full bg-gradient-to-r from-white to-gray-300 rounded-full transition-all duration-300" 
                   style={{width: `${health}%`}}></div>
            </div>
          </div>
          
          {/* Energy Bar */}
          <div className="mb-2">
            <div className="flex items-center gap-2 mb-1">
              <Zap className="w-4 h-4 text-gray-300" />
              <span className="text-sm text-gray-200 font-mono">ENERGY</span>
            </div>
            <div className="w-32 h-2 bg-gray-800 rounded-full border border-gray-600">
              <div className="h-full bg-gradient-to-r from-gray-300 to-white rounded-full transition-all duration-300" 
                   style={{width: `${energy}%`}}></div>
            </div>
          </div>
          
          {/* XP Bar */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Star className="w-4 h-4 text-gray-300" />
              <span className="text-sm text-gray-200 font-mono">EXPERIENCE</span>
            </div>
            <div className="w-32 h-2 bg-gray-800 rounded-full border border-gray-600">
              <div className="h-full bg-gradient-to-r from-gray-400 to-white rounded-full transition-all duration-300" 
                   style={{width: `${(exp / 500) * 100}%`}}></div>
            </div>
            <p className="text-xs text-gray-400 mt-1 font-mono">{exp}/500 XP</p>
          </div>
        </div>
        
        {/* Right HUD */}
        <div className="bg-black/90 backdrop-blur-sm rounded-xl p-4 border-2 border-white/20 pointer-events-auto shadow-2xl">
          <div className="text-right mb-3">
            <div className="flex items-center gap-2 justify-end mb-2">
              <Trophy className="w-5 h-5 text-gray-300" />
              <span className="text-white font-bold font-mono">{score.toLocaleString()} XP</span>
            </div>
            <div className="flex items-center gap-2 justify-end mb-2">
              <Award className="w-5 h-5 text-gray-300" />
              <span className="text-white font-bold font-mono">{achievements.length}/7</span>
            </div>
            <div className="flex items-center gap-2 justify-end mb-2">
              <Timer className="w-4 h-4 text-gray-300" />
              <span className="text-gray-200 text-sm font-mono">{Math.floor(timeSpent / 60)}:{(timeSpent % 60).toString().padStart(2, '0')}</span>
            </div>
          </div>
          
          {combo > 0 && (
            <div className="text-white font-bold text-lg animate-pulse font-mono">
              ⚡ {combo}x COMBO!
            </div>
          )}
        </div>
      </div>
      
      {/* Quest Log */}
      <div className="mt-4 max-w-md mx-auto">
        <div className="bg-black/90 backdrop-blur-sm rounded-xl p-3 border-2 border-gray-400/30 pointer-events-auto shadow-2xl">
          <div className="flex items-center gap-2 mb-2">
            <Compass className="w-4 h-4 text-gray-300" />
            <span className="text-gray-200 font-semibold text-sm font-mono">CURRENT MISSION</span>
          </div>
          <p className="text-white text-sm font-mono">{currentQuest}</p>
        </div>
      </div>
    </div>
  );

  // Enhanced particle rendering with interactive effects
  const ParticleSystem = () => (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Dynamic glow effect following mouse */}
      {glowEffect.active && (
        <div
          className="absolute pointer-events-none transition-all duration-300 ease-out"
          style={{
            left: glowEffect.x - 100,
            top: glowEffect.y - 100,
            width: '200px',
            height: '200px',
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(20px)',
          }}
        />
      )}
      
      {/* Interactive particles */}
      {particles.map(particle => {
        const distanceFromMouse = Math.sqrt(
          Math.pow((mousePosition.x / window.innerWidth * 100) - particle.x, 2) +
          Math.pow((mousePosition.y / window.innerHeight * 100) - particle.y, 2)
        );
        const isNearMouse = distanceFromMouse < 15;
        
        return (
          <div
            key={particle.id}
            className="absolute transition-all duration-300 ease-out"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size + (isNearMouse ? 3 : 0)}px`,
              height: `${particle.size + (isNearMouse ? 3 : 0)}px`,
              backgroundColor: isNearMouse ? '#ffffff' : ['#ffffff', '#f3f4f6', '#d1d5db', '#9ca3af'][Math.floor(Math.random() * 4)],
              opacity: (particle.opacity * 0.4) + (isNearMouse ? 0.3 : 0),
              borderRadius: '50%',
              boxShadow: isNearMouse ? '0 0 20px rgba(255,255,255,0.5)' : 'none',
              animation: `float ${particle.speed}s ease-in-out infinite`,
              transform: `scale(${isNearMouse ? 1.2 : 1}) translate(${isNearMouse ? (mousePosition.x - particle.x * window.innerWidth / 100) * 0.1 : 0}px, ${isNearMouse ? (mousePosition.y - particle.y * window.innerHeight / 100) * 0.1 : 0}px)`
            }}
          />
        );
      })}
      
      {/* Parallax background elements */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(255,255,255,0.1) 1px, transparent 1px),
            radial-gradient(circle at 80% 70%, rgba(255,255,255,0.1) 1px, transparent 1px),
            radial-gradient(circle at 40% 80%, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '200px 200px, 300px 300px, 250px 250px',
          transform: `translateY(${scrollY * 0.1}px)`,
          transition: 'transform 0.1s ease-out'
        }}
      />
    </div>
  );

  // Content rendering functions
  const renderHome = () => (
    <div className="space-y-12">
      {/* Ultra-Elite Hero Section */}
      <div className="ultra-elite-container text-center">
        {/* Professional Avatar with Premium Effects */}
        <div className="inline-block mb-8 relative">
          <div className="relative">
            <div className="w-48 h-48 bg-gradient-to-br from-white via-gray-100 to-gray-300 rounded-full flex items-center justify-center text-8xl font-black text-black shadow-2xl border-4 border-white/50 backdrop-blur-sm relative overflow-hidden">
              {/* Animated shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-pulse" 
                   style={{ animation: 'diamondShine 3s ease-in-out infinite' }} />
              <span className="relative z-10">AK</span>
            </div>
            
            {/* Floating achievement badges */}
            <div className="absolute -top-4 -right-4 bg-gradient-to-br from-white to-gray-200 rounded-full p-4 animate-bounce shadow-xl border-2 border-gray-300">
              <Crown className="w-10 h-10 text-black" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-gradient-to-br from-gray-100 to-gray-300 rounded-full p-4 shadow-xl border-2 border-gray-400" 
                 style={{ animation: 'professionalFloat 4s ease-in-out infinite' }}>
              <Zap className="w-10 h-10 text-black" />
            </div>
            <div className="absolute top-1/2 -right-6 bg-gradient-to-br from-white to-gray-100 rounded-full p-3 shadow-lg border-2 border-gray-200" 
                 style={{ animation: 'professionalFloat 3s ease-in-out infinite 1s' }}>
              <Star className="w-8 h-8 text-black" />
            </div>
          </div>
        </div>
        
        {/* Ultra-Premium Title */}
        <h1 className="text-7xl md:text-8xl lg:text-9xl font-black mb-8 ultra-elite-text leading-tight tracking-wide">
          ABHISHEK KUMAR
        </h1>
        
        {/* Professional Divider */}
        <div className="flex items-center justify-center mb-8">
          <div className="h-1 w-20 bg-gradient-to-r from-transparent to-white/50"></div>
          <div className="mx-6 w-3 h-3 bg-white rounded-full animate-pulse"></div>
          <div className="h-1 w-20 bg-gradient-to-l from-transparent to-white/50"></div>
        </div>
        
        {/* Elite Subtitle */}
        <p className="text-3xl md:text-4xl lg:text-5xl font-black mb-12 ultra-elite-text tracking-wider">
          ELITE FRONTEND ARCHITECT
        </p>
        
        {/* Professional Tags */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {[
            { label: 'FULL STACK ENGINEER', icon: Code, gradient: 'from-white/20 to-gray-200/20' },
            { label: 'AI INNOVATION SPECIALIST', icon: Sparkles, gradient: 'from-gray-100/20 to-white/20' },
            { label: 'DIGITAL TRANSFORMATION', icon: TrendingUp, gradient: 'from-gray-200/20 to-gray-100/20' }
          ].map((tag, index) => {
            const Icon = tag.icon;
            return (
              <div key={index} 
                   className={`px-6 py-3 bg-gradient-to-r ${tag.gradient} border-2 border-white/30 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-white/30 hover:border-white/50 flex items-center gap-2`}
                   style={{ animationDelay: `${index * 200}ms` }}>
                <Icon className="w-5 h-5" />
                <span className="text-white font-bold text-sm tracking-wider font-mono">{tag.label}</span>
              </div>
            );
          })}
        </div>
        
        {/* Luxury Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
          <button 
            className="luxury-button"
            onClick={() => setCurrentLevel('projects')}
          >
            <Rocket className="w-6 h-6 mr-2" />
            EXPLORE ELITE PROJECTS
          </button>
          <button 
            className="luxury-button"
            onClick={() => setCurrentLevel('contact')}
          >
            <MessageCircle className="w-6 h-6 mr-2" />
            CONNECT PROFESSIONALLY
          </button>
        </div>
        
        {/* Professional Status */}
        <div className="flex items-center justify-center gap-6 text-xl font-mono text-gray-200">
          <div className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-white" />
            <span className="text-white font-bold">LEVEL {playerLevel}</span>
          </div>
          <div className="w-2 h-2 bg-white/50 rounded-full"></div>
          <div className="flex items-center gap-2">
            <Zap className="w-6 h-6 text-white" />
            <span className="text-white font-bold animated-counter">{score.toLocaleString()}</span>
            <span className="text-gray-300">XP</span>
          </div>
          {combo > 5 && (
            <>
              <div className="w-2 h-2 bg-white/50 rounded-full"></div>
              <div className="flex items-center gap-2 animate-pulse">
                <Star className="w-6 h-6 text-white" />
                <span className="text-white font-bold">{combo}x STREAK</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Professional Achievement Dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { number: projectCount, label: 'Elite Projects', suffix: '+', icon: Terminal },
          { number: skillLevel, label: 'Mastery Level', suffix: '%', icon: Target },
          { number: experienceYears, label: 'Years Excellence', suffix: '+', icon: Calendar },
          { number: clientSatisfaction, label: 'Client Rating', suffix: '/5', icon: Heart }
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="premium-stat-card text-center group">
              <Icon className="w-8 h-8 mx-auto mb-4 text-white group-hover:animate-pulse" />
              <div className="text-4xl md:text-5xl font-black animated-counter mb-3">
                {stat.number}{stat.suffix}
              </div>
              <div className="text-sm md:text-base text-gray-300 font-bold uppercase tracking-wider font-mono">
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Level Selection Grid with Advanced Interactions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(levels).map(([key, level], index) => {
          if (key === 'home') return null;
          const Icon = level.icon;
          const isHovered = hoveredElement === key;
          const animationDelay = index * 100;
          
          return (
            <button
              key={key}
              onClick={() => navigateToLevel(key)}
              onMouseEnter={() => handleElementHover(key, true)}
              onMouseLeave={() => handleElementHover(key, false)}
              className={`group relative ${level.gradient} ${level.color} p-8 rounded-2xl shadow-2xl transform transition-all duration-500 border-2 ${level.accent} overflow-hidden`}
              style={{
                animationDelay: `${animationDelay}ms`,
                transform: `
                  scale(${isHovered ? 1.08 : 1}) 
                  rotateY(${isHovered ? '5deg' : '0deg'}) 
                  translateZ(${isHovered ? '20px' : '0px'})
                `,
                transformStyle: 'preserve-3d',
                perspective: '1000px'
              }}
            >
              {/* Animated background glow */}
              <div 
                className={`absolute inset-0 transition-all duration-500 ${isHovered ? 'bg-white/10' : 'bg-white/0'}`}
                style={{
                  background: isHovered 
                    ? `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.2), transparent)`
                    : 'transparent'
                }}
              />
              
              {/* Floating particles on hover */}
              {isHovered && (
                <>
                  {Array.from({length: 6}).map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-white rounded-full opacity-60"
                      style={{
                        left: `${20 + i * 15}%`,
                        top: `${10 + (i % 2) * 20}%`,
                        animation: `float ${1 + i * 0.2}s ease-in-out infinite`,
                        animationDelay: `${i * 0.1}s`
                      }}
                    />
                  ))}
                </>
              )}
              
              <div className="relative z-10">
                <div className="relative mb-4">
                  <Icon 
                    className={`w-16 h-16 mx-auto transition-all duration-500 text-white ${isHovered ? 'animate-pulse' : ''}`}
                    style={{
                      transform: `scale(${isHovered ? 1.2 : 1}) rotateY(${isHovered ? '15deg' : '0deg'})`,
                      filter: isHovered ? 'drop-shadow(0 0 20px rgba(255,255,255,0.5))' : 'none'
                    }}
                  />
                  {/* Icon glow effect */}
                  {isHovered && (
                    <div className="absolute inset-0 bg-white/20 rounded-full animate-ping" />
                  )}
                </div>
                
                <h3 className={`text-2xl font-bold mb-2 text-white font-mono transition-all duration-300 ${isHovered ? 'text-shadow-glow' : ''}`}>
                  {level.name}
                </h3>
                <p className="text-sm opacity-90 mb-3 text-gray-200 transition-opacity duration-300">
                  {level.description}
                </p>
                
                {/* Interactive progress bar */}
                <div className="w-full bg-gray-800/50 rounded-full h-2 mb-3 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-white to-gray-300 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: isHovered ? '100%' : '0%' }}
                  />
                </div>
                
                <div className="flex items-center justify-center gap-2">
                  <span className={`text-xs bg-white/10 px-3 py-1 rounded-full text-gray-200 font-mono transition-all duration-300 ${isHovered ? 'bg-white/20 scale-105' : ''}`}>
                    {level.rewards}
                  </span>
                  <ChevronRight 
                    className={`w-5 h-5 text-white transition-all duration-300 ${isHovered ? 'translate-x-2 scale-125' : 'animate-bounce'}`} 
                  />
                </div>
                <div className={`mt-2 text-xs text-gray-300 font-mono transition-all duration-300 ${isHovered ? 'text-white' : ''}`}>
                  {level.difficulty}
                </div>
              </div>
              
              {/* Border animation */}
              <div className={`absolute inset-0 rounded-2xl transition-all duration-300 ${isHovered ? 'shadow-2xl border-2 border-white/40' : ''}`} />
            </button>
          );
        })}
      </div>

      {/* Performance Dashboard with Animated Counters */}
      <div className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl rounded-3xl p-8 border-2 border-white/20 shadow-2xl relative overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(45deg, transparent 48%, rgba(255,255,255,0.1) 49%, rgba(255,255,255,0.1) 51%, transparent 52%),
              linear-gradient(-45deg, transparent 48%, rgba(255,255,255,0.05) 49%, rgba(255,255,255,0.05) 51%, transparent 52%)
            `,
            backgroundSize: '20px 20px',
            animation: 'slideBackground 20s linear infinite'
          }} />
        </div>
        
        <h3 className="text-3xl font-bold mb-6 flex items-center gap-3 text-white font-mono relative z-10">
          <Trophy className="w-8 h-8 text-gray-300 animate-pulse" />
          PERFORMANCE METRICS
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative z-10">
          {[
            { icon: Award, count: certifications.length, label: 'CERTIFICATIONS', key: 'certs' },
            { icon: Terminal, count: projects.length, label: 'PROJECTS', key: 'projects' },
            { icon: Code, count: skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0), label: 'TECH SKILLS', key: 'skills' },
            { icon: Briefcase, count: experiences.length, label: 'EXPERIENCES', key: 'exp' }
          ].map((item, index) => {
            const Icon = item.icon;
            const displayCount = animatedCounters[item.key] ?? 0;
            const isHovered = hoveredElement === `metric-${item.key}`;
            
            return (
              <div 
                key={item.key}
                className={`bg-gradient-to-br from-gray-800/50 to-black/50 rounded-xl p-6 text-center border-2 transition-all duration-500 cursor-pointer relative overflow-hidden ${
                  isHovered 
                    ? 'border-white/40 shadow-2xl transform scale-110' 
                    : 'border-gray-400/20 hover:scale-105'
                }`}
                onMouseEnter={() => {
                  handleElementHover(`metric-${item.key}`, true);
                  animateCounter(item.count, 1500, item.key);
                }}
                onMouseLeave={() => handleElementHover(`metric-${item.key}`, false)}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Animated background on hover */}
                {isHovered && (
                  <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5 animate-pulse" />
                )}
                
                {/* Floating particles on hover */}
                {isHovered && Array.from({length: 4}).map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full opacity-60"
                    style={{
                      left: `${10 + i * 25}%`,
                      top: `${10 + (i % 2) * 20}%`,
                      animation: `float ${1.5 + i * 0.3}s ease-in-out infinite`,
                      animationDelay: `${i * 0.2}s`
                    }}
                  />
                ))}
                
                <Icon 
                  className={`w-8 h-8 mx-auto mb-2 text-gray-300 transition-all duration-500 ${
                    isHovered ? 'animate-bounce text-white scale-125' : ''
                  }`}
                  style={{
                    filter: isHovered ? 'drop-shadow(0 0 15px rgba(255,255,255,0.6))' : 'none'
                  }}
                />
                
                {/* Animated counter */}
                <div className={`text-4xl font-bold font-mono transition-all duration-300 ${
                  isHovered ? 'text-white scale-110' : 'text-white'
                }`}>
                  {displayCount}
                  {isHovered && <span className="text-gray-300">+</span>}
                </div>
                
                {/* Progress bar */}
                <div className="w-full bg-gray-700/50 rounded-full h-1 mb-2 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-white to-gray-300 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: isHovered ? '100%' : `${(displayCount / item.count) * 100}%` }}
                  />
                </div>
                
                <div className={`text-sm font-mono transition-all duration-300 ${
                  isHovered ? 'text-white font-bold' : 'text-gray-300'
                }`}>
                  {item.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderAbout = () => (
    <div className="space-y-6">
      <h2 className="text-5xl font-black mb-8 flex items-center gap-4 text-white font-mono">
        <User className="w-12 h-12 text-gray-300" />
        PROFILE DATA
      </h2>
      
      <div className="bg-gradient-to-br from-black via-gray-900 to-gray-800 rounded-3xl p-10 border-2 border-white/20 backdrop-blur-xl shadow-2xl">
        <h3 className="text-3xl font-bold mb-6 flex items-center gap-2 text-white font-mono">
          <Coffee className="w-8 h-8 text-gray-300" />
          EXECUTIVE SUMMARY
        </h3>
        <div className="space-y-4 text-lg leading-relaxed">
          <p className="text-gray-200 font-mono">
            ⚡ <span className="text-white font-bold">COMPUTER SCIENCE ENGINEERING STUDENT</span> and aspiring <span className="text-gray-300 font-bold">FULL STACK DEVELOPER</span> with demonstrated expertise in modern web technologies, AI/ML integration, and digital marketing strategies.
          </p>
          <p className="text-gray-200 font-mono">
            � Professional foundation built through <span className="text-white font-bold">10+ ELITE CERTIFICATIONS</span> spanning React.js, AI technologies, SEO optimization, and cybersecurity. Proven track record in <span className="text-gray-300 font-bold">REAL-WORLD PROJECT DEVELOPMENT</span> and social impact initiatives.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-black/80 rounded-2xl p-8 border-2 border-gray-400/30 backdrop-blur-sm hover:scale-105 transition-transform shadow-xl">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white font-mono">
            <BookOpen className="w-7 h-7 text-gray-300" />
            EDUCATION
          </h3>
          <div className="space-y-3">
            <p className="text-xl font-bold text-white font-mono">BACHELOR OF TECHNOLOGY</p>
            <p className="text-lg text-gray-300 font-mono">COMPUTER SCIENCE ENGINEERING</p>
            <p className="text-gray-400 font-mono">BABU BANARASI DAS UNIVERSITY, LUCKNOW</p>
            <p className="text-gray-300 font-semibold font-mono">2022 - 2026</p>
          </div>
        </div>
        
        <div className="bg-gray-900/80 rounded-2xl p-8 border-2 border-white/20 backdrop-blur-sm hover:scale-105 transition-transform shadow-xl">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white font-mono">
            <MapPin className="w-7 h-7 text-gray-300" />
            LOCATION
          </h3>
          <div className="space-y-2">
            <p className="text-lg text-gray-200 font-mono">SS-165,166 SECTOR C-1 L.D.A. COLONY</p>
            <p className="text-gray-300 font-mono">KANPUR ROAD, LUCKNOW</p>
            <p className="text-gray-400 font-mono">UTTAR PRADESH - 226012</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSkills = () => (
    <div className="space-y-6">
      <h2 className="text-5xl font-black mb-8 flex items-center gap-4 text-white font-mono">
        <Cpu className="w-12 h-12 text-gray-300" />
        TECH ARSENAL
      </h2>
      
      {skillCategories.map((category, idx) => {
        const Icon = category.icon;
        return (
          <div key={idx} className={`bg-gradient-to-br ${category.color} bg-opacity-20 rounded-3xl p-8 border-2 ${category.borderColor} backdrop-blur-xl hover:scale-[1.02] transition-transform shadow-2xl`}>
            <h3 className="text-3xl font-bold mb-6 flex items-center gap-3 text-white font-mono">
              <Icon className="w-8 h-8 text-gray-300" />
              {category.category}
              <span className="text-sm bg-white/10 px-3 py-1 rounded-full ml-auto border border-gray-400">{category.level}</span>
            </h3>
            <div className="space-y-4">
              {category.skills.map((skill, i) => {
                const skillId = `skill-${category.category.replace(/[^a-zA-Z0-9]/g, '')}-${i}`;
                const isSkillHovered = hoveredElement === skillId;
                const animationDelay = i * 100;
                
                return (
                  <div 
                    key={i} 
                    className="bg-black/60 rounded-xl p-4 transition-all duration-500 border border-gray-600/30 interactive-card glass-effect"
                    onMouseEnter={() => handleElementHover(skillId, true)}
                    onMouseLeave={() => handleElementHover(skillId, false)}
                    style={{
                      animationDelay: `${animationDelay}ms`,
                      transform: isSkillHovered ? 'translateX(10px) scale(1.02)' : 'translateX(0) scale(1)',
                      boxShadow: isSkillHovered 
                        ? '0 10px 30px rgba(255,255,255,0.1), inset 0 1px 0 rgba(255,255,255,0.2)' 
                        : '0 4px 15px rgba(0,0,0,0.3)'
                    }}
                  >
                    {/* Hover glow effect */}
                    {isSkillHovered && (
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/5 to-transparent pointer-events-none" />
                    )}
                    
                    <div className="flex justify-between items-center mb-2 relative z-10">
                      <span className={`text-lg font-semibold font-mono transition-all duration-300 ${
                        isSkillHovered ? 'text-white neon-glow' : 'text-white'
                      }`}>
                        {skill.name}
                      </span>
                      <div className="flex gap-2">
                        <span className={`text-sm px-3 py-1 rounded-full font-mono transition-all duration-300 ${
                          isSkillHovered 
                            ? 'bg-white/20 text-white border-white/40 scale-105' 
                            : 'bg-white/10 text-gray-200 border-gray-500'
                        } border`}>
                          {skill.projects} PROJECTS
                        </span>
                        <span className={`text-sm px-3 py-1 rounded-full font-mono transition-all duration-300 ${
                          isSkillHovered 
                            ? 'bg-gray-600/70 text-white border-gray-300 scale-105' 
                            : 'bg-gray-700/50 text-gray-100 border-gray-400'
                        } border`}>
                          {skill.mastery}
                        </span>
                      </div>
                    </div>
                    
                    {/* Interactive skill bar with advanced animations */}
                    <div className="relative">
                      <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden border border-gray-600 relative">
                        {/* Background pattern */}
                        <div className="absolute inset-0 opacity-10" style={{
                          backgroundImage: 'linear-gradient(45deg, transparent 48%, rgba(255,255,255,0.1) 49%, rgba(255,255,255,0.1) 51%, transparent 52%)',
                          backgroundSize: '8px 8px'
                        }} />
                        
                        {/* Main progress bar */}
                        <div 
                          className={`h-full ${skill.color} transition-all duration-1000 border-r border-gray-400 skill-bar relative`}
                          style={{ 
                            width: visibleElements.has(skillId) || isSkillHovered ? `${skill.level}%` : '0%',
                            filter: isSkillHovered ? 'brightness(1.2) drop-shadow(0 0 10px rgba(255,255,255,0.3))' : 'brightness(1)'
                          }}
                        >
                          {/* Animated highlight */}
                          {isSkillHovered && (
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
                          )}
                        </div>
                        
                        {/* Skill level indicator */}
                        <div 
                          className={`absolute top-1/2 transform -translate-y-1/2 w-2 h-2 bg-white rounded-full transition-all duration-1000 ${
                            isSkillHovered ? 'scale-150 shadow-lg' : 'scale-100'
                          }`}
                          style={{ 
                            left: `${(visibleElements.has(skillId) || isSkillHovered ? skill.level : 0) - 1}%`,
                            boxShadow: isSkillHovered ? '0 0 15px rgba(255,255,255,0.8)' : 'none'
                          }}
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mt-2">
                      <div className={`text-sm font-mono transition-all duration-300 ${
                        isSkillHovered ? 'text-white font-bold' : 'text-gray-300'
                      }`}>
                        {skill.level}% MASTERY
                      </div>
                      
                      {/* Animated counter */}
                      <div className={`text-xs font-mono transition-all duration-300 ${
                        isSkillHovered ? 'text-white' : 'text-gray-400'
                      }`}>
                        {isSkillHovered ? `${animatedCounters[skillId] || skill.level}%` : `${skill.level}%`}
                      </div>
                    </div>
                    
                    {/* Floating particles on hover */}
                    {isSkillHovered && Array.from({length: 3}).map((_, particleIndex) => (
                      <div
                        key={particleIndex}
                        className="absolute w-1 h-1 bg-white rounded-full opacity-60 pointer-events-none"
                        style={{
                          left: `${10 + particleIndex * 30}%`,
                          top: `${20 + (particleIndex % 2) * 20}%`,
                          animation: `float ${1 + particleIndex * 0.3}s ease-in-out infinite`,
                          animationDelay: `${particleIndex * 0.15}s`
                        }}
                      />
                    ))}
                  </div>
                );
              })}
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
    <div ref={containerRef} className="min-h-screen relative overflow-hidden" style={{
      background: `
        linear-gradient(135deg, #000000 0%, #1a1a1a 25%, #2d2d30 50%, #1a1a1a 75%, #000000 100%),
        radial-gradient(circle at 20% 20%, rgba(255,255,255,0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 80%, rgba(255,255,255,0.05) 0%, transparent 50%),
        radial-gradient(circle at 40% 60%, rgba(255,255,255,0.03) 0%, transparent 50%)
      `,
      backgroundAttachment: 'fixed'
    }}>
      {/* Professional Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px'
      }} />
      
      {/* Professional Vignette Effect */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%)'
      }} />
      
      <ParticleSystem />
      {showGameHUD && <GameHUD />}
      
      {/* Enhanced Interactive Navigation */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-30">
        <div className="bg-black/95 backdrop-blur-xl rounded-2xl p-4 flex flex-wrap justify-center items-center border-2 border-white/20 gap-4 shadow-2xl glass-effect">
          {/* Home button with enhanced effects */}
          <button
            onClick={() => setCurrentLevel('home')}
            onMouseEnter={() => handleElementHover('nav-home', true)}
            onMouseLeave={() => handleElementHover('nav-home', false)}
            className={`px-4 py-2 bg-gradient-to-r from-white to-gray-300 text-black rounded-lg transition-all flex items-center gap-2 font-mono font-bold ripple-effect ${
              hoveredElement === 'nav-home' 
                ? 'hover:from-gray-200 hover:to-gray-400 scale-110 shadow-xl' 
                : 'hover:from-gray-200 hover:to-gray-400'
            }`}
            style={{
              transform: hoveredElement === 'nav-home' ? 'scale(1.1) translateY(-2px)' : 'scale(1)',
              boxShadow: hoveredElement === 'nav-home' 
                ? '0 10px 25px rgba(255,255,255,0.3)' 
                : '0 4px 15px rgba(0,0,0,0.3)'
            }}
          >
            <Home className={`w-5 h-5 transition-all duration-300 ${
              hoveredElement === 'nav-home' ? 'animate-bounce' : ''
            }`} />
            <span className="hidden sm:inline">{levels.home.name}</span>
          </button>
          
          {/* Navigation breadcrumb with typewriter effect */}
          <div className="hidden md:block relative">
            <div className="text-lg font-semibold text-white font-mono relative overflow-hidden">
              <span className="inline-block">
                {levels[currentLevel].name}
              </span>
              <span className="absolute right-0 top-0 bottom-0 w-1 bg-white animate-pulse" />
            </div>
            
            {/* Level progress indicator */}
            <div className="w-full bg-gray-700/50 rounded-full h-1 mt-2 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-white to-gray-300 rounded-full transition-all duration-1000"
                style={{ 
                  width: `${(Object.keys(levels).indexOf(currentLevel) / (Object.keys(levels).length - 1)) * 100}%` 
                }}
              />
            </div>
          </div>
          
          {/* Quick navigation dots */}
          <div className="flex gap-2 ml-4">
            {Object.entries(levels).map(([key, level], index) => (
              <button
                key={key}
                onClick={() => setCurrentLevel(key)}
                onMouseEnter={() => handleElementHover(`nav-dot-${key}`, true)}
                onMouseLeave={() => handleElementHover(`nav-dot-${key}`, false)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentLevel === key 
                    ? 'bg-white scale-125 shadow-lg' 
                    : hoveredElement === `nav-dot-${key}`
                      ? 'bg-gray-300 scale-110'
                      : 'bg-gray-500 hover:bg-gray-400'
                }`}
                style={{
                  boxShadow: currentLevel === key ? '0 0 15px rgba(255,255,255,0.6)' : 'none',
                  animationDelay: `${index * 50}ms`
                }}
                title={level.name}
              />
            ))}
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
        <p className="text-lg font-mono">© 2025 ABHISHEK SINGH - ELITE PROFESSIONAL PORTFOLIO</p>
        <p className="text-sm mt-2 font-mono">⚡ PROFESSIONAL GAMING INTERFACE DESIGN ⚡</p>
        <p className="text-xs mt-4 text-gray-600 font-mono">ENGINEERED WITH REACT, TAILWIND CSS & PREMIUM UI ARCHITECTURE</p>
      </div>
    </div>
  );
};

export default ProfessionalGamePortfolio;