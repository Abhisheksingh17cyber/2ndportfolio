import React, { useState, useEffect } from 'react';
import { Home, User, Briefcase, Terminal, Cpu, Award, Globe, Volume2, VolumeX } from 'lucide-react';

const GamePortfolio = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentLevel, setCurrentLevel] = useState('home');
  const [score, setScore] = useState(0);
  const [health, setHealth] = useState(100);
  const [playerLevel, setPlayerLevel] = useState(1);
  const [exp, setExp] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [typing, setTyping] = useState('');
  const [particles, setParticles] = useState([]);
  const [achievements, setAchievements] = useState([]);

  const welcomeText = ">>> WELCOME TO ABHISHEK.EXE <<<";

  const levels = {
    home: { name: 'HOME BASE', icon: Home, description: 'Main Console' },
    about: { name: 'PLAYER INFO', icon: User, description: 'Character Data' },
    experience: { name: 'CAREER LOG', icon: Briefcase, description: 'Quest History' },
    projects: { name: 'PROJECT VAULT', icon: Terminal, description: 'Mission Archive' },
    skills: { name: 'TECH ARSENAL', icon: Cpu, description: 'Abilities' },
    certifications: { name: 'ACHIEVEMENTS', icon: Award, description: 'Unlocked Badges' },
    contact: { name: 'COMM LINK', icon: Globe, description: 'Network Portal' }
  };

  const gainScore = (points) => {
    setScore(prev => prev + points);
    setExp(prev => prev + points / 2);
  };

  const gainAchievement = (title, description) => {
    const newAchievement = { id: Date.now(), title, description };
    setAchievements(prev => [...prev, newAchievement]);
  };

  const handleNavigation = (level) => {
    setCurrentLevel(level);
    gainScore(50);
    
    // Achievement for exploring
    const visitedLevels = JSON.parse(localStorage.getItem('visitedLevels') || '[]');
    if (!visitedLevels.includes(level)) {
      visitedLevels.push(level);
      localStorage.setItem('visitedLevels', JSON.stringify(visitedLevels));
      gainAchievement('Explorer', `Discovered ${levels[level].name}`);
    }
  };

  const startGame = () => {
    setGameStarted(true);
    setSoundEnabled(true);
    gainAchievement('Game Start', 'Welcome to the Developer Matrix');
  };

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= welcomeText.length) {
        setTyping(welcomeText.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (exp >= playerLevel * 100) {
      setPlayerLevel(prev => prev + 1);
      setHealth(100);
      gainAchievement('Level Up!', `Reached Level ${playerLevel + 1}`);
    }
  }, [exp, playerLevel]);

  // Matrix particles
  useEffect(() => {
    const particleInterval = setInterval(() => {
      setParticles(prev => [...prev.slice(-10), {
        id: Date.now(),
        x: Math.random() * 100,
        y: Math.random() * 100,
        char: ['0', '1', '█', '▓'][Math.floor(Math.random() * 4)]
      }]);
    }, 500);
    return () => clearInterval(particleInterval);
  }, []);

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!gameStarted) return;
      
      const levelKeys = Object.keys(levels);
      const currentIndex = levelKeys.indexOf(currentLevel);
      
      switch (e.key.toLowerCase()) {
        case 'w':
        case 'arrowup':
          if (currentIndex > 0) handleNavigation(levelKeys[currentIndex - 1]);
          break;
        case 's':
        case 'arrowdown':
          if (currentIndex < levelKeys.length - 1) handleNavigation(levelKeys[currentIndex + 1]);
          break;
        case ' ':
          e.preventDefault();
          gainScore(10);
          break;
        case 'escape':
          setGameStarted(false);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameStarted, currentLevel, levels, handleNavigation, gainScore]);

  const GameMenu = () => (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute text-green-400 opacity-20 font-mono text-xs animate-pulse"
          style={{ left: `${particle.x}%`, top: `${particle.y}%` }}
        >
          {particle.char}
        </div>
      ))}
      
      <div className="text-center z-10">
        <div className="mb-8">
          <h1 className="text-5xl font-mono text-white mb-4 tracking-wider">
            {typing}<span className="animate-pulse">|</span>
          </h1>
          <p className="text-lg text-green-400 font-mono">
            A DEVELOPER'S INTERACTIVE EXPERIENCE
          </p>
        </div>
        
        <button 
          onClick={startGame}
          className="bg-white text-black px-8 py-4 font-mono text-xl border-4 border-white hover:bg-black hover:text-white transition-all duration-300 tracking-wider transform hover:scale-105"
        >
          {'>>>'} PRESS START {'<<<'}
        </button>
        
        <div className="text-center text-gray-400 font-mono text-sm mt-4">
          <p>CLICK TO NAVIGATE • SPACE TO INTERACT • ESC TO EXIT</p>
        </div>
      </div>
    </div>
  );

  const AchievementPanel = () => (
    achievements.length > 0 && (
      <div className="fixed bottom-4 right-4 bg-black border-2 border-green-400 p-4 max-w-sm z-50 font-mono">
        <h4 className="text-green-400 text-sm mb-2">RECENT ACHIEVEMENTS:</h4>
        {achievements.slice(-2).map((achievement) => (
          <div key={achievement.id} className="text-xs text-white mb-1">
            🏆 {achievement.title}: {achievement.description}
          </div>
        ))}
      </div>
    )
  );

  const GameHUD = () => (
    <div className="fixed top-0 left-0 right-0 z-50 bg-black border-b-4 border-white p-4 font-mono">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex space-x-6 text-sm">
          <div className="text-green-400">LVL: {playerLevel}</div>
          <div className="text-yellow-400">EXP: {exp}/{playerLevel * 100}</div>
          <div className="text-blue-400">SCORE: {score.toLocaleString()}</div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-red-400 text-sm flex items-center">
            HP: 
            <div className="ml-2 w-20 h-3 bg-gray-800 border border-white">
              <div className="h-full bg-red-500 transition-all" style={{ width: `${health}%` }}></div>
            </div>
          </div>
          <button 
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="text-white hover:text-yellow-400 transition-colors"
          >
            {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>
        </div>
      </div>
    </div>
  );

  const LevelNavigation = () => (
    <div className="bg-black border-4 border-white p-6 mb-8">
      <h2 className="text-xl font-mono text-white mb-4 text-center">
        {'>>>'} LEVEL SELECTION {'<<<'}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(levels).map(([key, level]) => {
          const Icon = level.icon;
          const isActive = currentLevel === key;
          return (
            <button
              key={key}
              onClick={() => handleNavigation(key)}
              className={`p-3 font-mono text-left border-2 transition-all duration-300 transform hover:scale-105 ${
                isActive 
                  ? 'bg-white text-black border-white shadow-lg' 
                  : 'bg-black text-white border-gray-400 hover:border-white hover:bg-gray-900'
              }`}
            >
              <Icon size={20} className="mb-2" />
              <div className="text-sm font-bold">{level.name}</div>
              <div className="text-xs opacity-70">{level.description}</div>
            </button>
          );
        })}
      </div>
    </div>
  );

  const AboutSection = () => (
    <div className="bg-black text-white p-8 border-4 border-white font-mono">
      <h2 className="text-2xl mb-6 text-center">{'>>>'} PLAYER PROFILE {'<<<'}</h2>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="border-2 border-gray-400 p-4">
          <h3 className="text-lg mb-4 text-green-400">CHARACTER_DATA:</h3>
          <div className="space-y-2 text-sm">
            <p>NAME: Abhishek Singh</p>
            <p>CLASS: Full Stack Developer</p>
            <p>SPECIALIZATION: AI/ML & React.js</p>
            <p>LOCATION: Bhopal, Madhya Pradesh</p>
            <p>LEVEL: Advanced</p>
            <p>QUEST: Computer Science Engineering</p>
          </div>
        </div>
        
        <div className="border-2 border-gray-400 p-4">
          <h3 className="text-lg mb-4 text-blue-400">CORE_ABILITIES:</h3>
          <div className="space-y-2">
            {[
              { name: 'Frontend Dev', level: 90 },
              { name: 'AI Integration', level: 85 },
              { name: 'Problem Solving', level: 95 },
              { name: 'Team Leadership', level: 80 }
            ].map((skill, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm">{skill.name}</span>
                <div className="w-20 h-2 bg-gray-800 border border-white">
                  <div 
                    className="h-full bg-green-500 transition-all duration-1000"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const ExperienceSection = () => (
    <div className="bg-black text-white p-8 border-4 border-white font-mono">
      <h2 className="text-2xl mb-6 text-center">{'>>>'} QUEST HISTORY {'<<<'}</h2>
      
      <div className="space-y-4">
        {[
          { title: 'Business Development Specialist', company: 'Edu-versity (AMG Tech)', period: 'Oct 2025 - Jan 2026', status: 'UPCOMING', xp: 500 },
          { title: 'Web Developer Intern', company: 'Zidio Development', period: 'Sep 2025 - Nov 2025', status: 'ACTIVE', xp: 400 },
          { title: 'Frontend Development Intern', company: 'Indolike', period: 'Sep 2025 - Oct 2025', status: 'ACTIVE', xp: 350 },
          { title: 'Web Development Intern', company: 'Labmentix', period: 'Sep 2025', status: 'ACTIVE', xp: 300 },
          { title: 'Social Awareness Intern', company: 'We Hope We Care Foundation', period: 'May 2024 - Aug 2024', status: 'COMPLETED', xp: 250 }
        ].map((quest, index) => (
          <div key={index} className="border-2 border-gray-400 p-4 hover:border-white transition-colors cursor-pointer" onClick={() => gainScore(20)}>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-base text-green-400">{quest.title}</h3>
                <p className="text-sm text-gray-300">{quest.company}</p>
                <p className="text-xs text-gray-400">{quest.period}</p>
              </div>
              <div className="text-right">
                <span className={`px-2 py-1 text-xs border ${
                  quest.status === 'COMPLETED' ? 'border-green-400 text-green-400' :
                  quest.status === 'ACTIVE' ? 'border-yellow-400 text-yellow-400' :
                  'border-blue-400 text-blue-400'
                }`}>
                  {quest.status}
                </span>
                <p className="text-xs mt-1 text-purple-400">+{quest.xp} XP</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const ProjectsSection = () => (
    <div className="bg-black text-white p-8 border-4 border-white font-mono">
      <h2 className="text-2xl mb-6 text-center">{'>>>'} PROJECT VAULT {'<<<'}</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        {[
          { name: 'AI Content Generator', status: 'BETA', tech: ['React', 'Node.js', 'OpenAI'], difficulty: 'HARD', completion: 85 },
          { name: 'Real-time Chat App', status: 'PROD', tech: ['React', 'Socket.io', 'MongoDB'], difficulty: 'MEDIUM', completion: 100 },
          { name: 'E-commerce Platform', status: 'DEV', tech: ['React', 'Express', 'PostgreSQL'], difficulty: 'HARD', completion: 70 },
          { name: 'Gaming Portfolio', status: 'ACTIVE', tech: ['React', 'Tailwind', 'Lucide'], difficulty: 'MEDIUM', completion: 95 }
        ].map((project, index) => (
          <div key={index} className="border-2 border-gray-400 p-4 hover:border-white transition-all transform hover:scale-105 cursor-pointer" onClick={() => gainScore(30)}>
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-base text-green-400">{project.name}</h3>
              <span className={`px-2 py-1 text-xs border ${
                project.status === 'PROD' ? 'border-green-400 text-green-400' :
                project.status === 'BETA' ? 'border-yellow-400 text-yellow-400' :
                'border-blue-400 text-blue-400'
              }`}>
                {project.status}
              </span>
            </div>
            
            <div className="mb-3">
              <p className="text-xs text-gray-400 mb-1">TECH_STACK:</p>
              <div className="flex flex-wrap gap-1">
                {project.tech.map((tech, i) => (
                  <span key={i} className="text-xs border border-white px-1 py-0.5 hover:bg-white hover:text-black transition-colors">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className={`text-xs ${
                project.difficulty === 'EASY' ? 'text-green-400' :
                project.difficulty === 'MEDIUM' ? 'text-yellow-400' :
                'text-red-400'
              }`}>
                {project.difficulty}
              </span>
              <div className="flex items-center space-x-2">
                <span className="text-xs">{project.completion}%</span>
                <div className="w-16 h-2 bg-gray-800 border border-white">
                  <div className="h-full bg-green-500 transition-all duration-500" style={{ width: `${project.completion}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const SkillsSection = () => (
    <div className="bg-black text-white p-8 border-4 border-white font-mono">
      <h2 className="text-2xl mb-6 text-center">{'>>>'} TECH ARSENAL {'<<<'}</h2>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { category: 'FRONTEND', skills: ['React.js: 90%', 'JavaScript: 85%', 'HTML/CSS: 95%', 'Tailwind: 88%'] },
          { category: 'BACKEND', skills: ['Node.js: 80%', 'Python: 82%', 'REST APIs: 85%', 'Databases: 75%'] },
          { category: 'AI/ML', skills: ['Generative AI: 85%', 'Prompt Engineering: 90%', 'AI Integration: 80%', 'MCP: 75%'] },
          { category: 'TOOLS', skills: ['Git: 92%', 'VS Code: 95%', 'Docker: 70%', 'AWS: 68%'] },
          { category: 'MARKETING', skills: ['SEO: 88%', 'Content Marketing: 85%', 'Digital Ads: 82%', 'Analytics: 80%'] },
          { category: 'SOFT_SKILLS', skills: ['Leadership: 85%', 'Communication: 88%', 'Problem Solving: 92%', 'Teamwork: 90%'] }
        ].map((category, index) => (
          <div key={index} className="border-2 border-gray-400 p-4 hover:border-white transition-colors cursor-pointer" onClick={() => gainScore(15)}>
            <h3 className="text-base text-green-400 mb-3">{category.category}:</h3>
            <div className="space-y-2">
              {category.skills.map((skill, i) => {
                const [name, percentage] = skill.split(': ');
                const percent = parseInt(percentage);
                return (
                  <div key={i} className="flex justify-between items-center">
                    <span className="text-xs">{name}</span>
                    <div className="w-16 h-2 bg-gray-800 border border-white">
                      <div className="h-full bg-green-500 transition-all duration-500" style={{ width: `${percent}%` }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const CertificationsSection = () => (
    <div className="bg-black text-white p-8 border-4 border-white font-mono">
      <h2 className="text-2xl mb-6 text-center">{'>>>'} ACHIEVEMENTS UNLOCKED {'<<<'}</h2>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { name: 'Model Context Protocol', issuer: 'Anthropic', date: 'Sep 2025', rarity: 'LEGENDARY' },
          { name: 'ReactJS Foundations', issuer: 'ScholarHat', date: 'Aug 2025', rarity: 'EPIC' },
          { name: 'Generative AI', issuer: 'Google Cloud', date: 'Aug 2025', rarity: 'EPIC' },
          { name: 'Prompt Engineering', issuer: 'Simplilearn', date: 'Aug 2025', rarity: 'RARE' },
          { name: 'AI for Beginners', issuer: 'HP LIFE', date: 'Aug 2025', rarity: 'COMMON' },
          { name: 'Cybersecurity Fundamentals', issuer: 'Tech Mahindra', date: 'Aug 2025', rarity: 'RARE' },
          { name: 'AI-Powered Shopping Ads', issuer: 'Google', date: 'Jul 2025', rarity: 'EPIC' },
          { name: 'Web Applications Architecture', issuer: 'Open University', date: 'Jul 2025', rarity: 'RARE' }
        ].map((cert, index) => (
          <div key={index} className="border-2 border-gray-400 p-3 hover:border-white transition-all transform hover:scale-105 cursor-pointer" onClick={() => gainScore(40)}>
            <div className="flex justify-between items-start mb-2">
              <h4 className="text-sm text-green-400 font-bold">{cert.name}</h4>
              <span className={`text-xs px-1 py-0.5 border ${
                cert.rarity === 'LEGENDARY' ? 'border-yellow-400 text-yellow-400' :
                cert.rarity === 'EPIC' ? 'border-purple-400 text-purple-400' :
                cert.rarity === 'RARE' ? 'border-blue-400 text-blue-400' :
                'border-gray-400 text-gray-400'
              }`}>
                {cert.rarity}
              </span>
            </div>
            <p className="text-xs text-gray-300">{cert.issuer}</p>
            <p className="text-xs text-gray-400">{cert.date}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const ContactSection = () => (
    <div className="bg-black text-white p-8 border-4 border-white font-mono">
      <h2 className="text-2xl mb-6 text-center">{'>>>'} ESTABLISH CONNECTION {'<<<'}</h2>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="border-2 border-gray-400 p-4">
          <h3 className="text-lg mb-4 text-green-400">CONTACT_PROTOCOLS:</h3>
          <div className="space-y-3 text-sm">
            <p>📧 abhishekkumar17singh17@gmail.com</p>
            <p>📱 +91-8318990847</p>
            <p>📍 Bhopal, Madhya Pradesh, India</p>
          </div>
        </div>
        
        <div className="border-2 border-gray-400 p-4">
          <h3 className="text-lg mb-4 text-blue-400">NETWORK_LINKS:</h3>
          <div className="space-y-3">
            <button 
              onClick={() => gainScore(25)}
              className="text-left hover:text-blue-400 transition-colors cursor-pointer"
            >
              🔗 LinkedIn Profile
            </button>
            <button 
              onClick={() => gainScore(25)}
              className="text-left hover:text-green-400 transition-colors cursor-pointer"
            >
              🔗 GitHub Repository
            </button>
          </div>
        </div>
      </div>
      
      <div className="mt-6 border-2 border-gray-400 p-4">
        <h3 className="text-lg mb-4 text-yellow-400">AVAILABLE_FOR:</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Full Stack Development', 'React.js Projects', 'AI Integration', 'Digital Marketing'].map((service, index) => (
            <div key={index} className="border border-gray-600 p-2 text-center text-sm hover:border-white hover:bg-gray-900 transition-all cursor-pointer" onClick={() => gainScore(10)}>
              {service}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCurrentLevel = () => {
    switch (currentLevel) {
      case 'about': return <AboutSection />;
      case 'experience': return <ExperienceSection />;
      case 'projects': return <ProjectsSection />;
      case 'skills': return <SkillsSection />;
      case 'certifications': return <CertificationsSection />;
      case 'contact': return <ContactSection />;
      default: 
        return (
          <div className="bg-black text-white p-8 border-4 border-white font-mono text-center">
            <h2 className="text-3xl mb-4">{'>>>'} MAIN CONSOLE {'<<<'}</h2>
            <p className="text-lg text-green-400 mb-6">SYSTEM INITIALIZED</p>
            <div className="text-base">
              <p className="mb-4">SELECT A MODULE TO BEGIN EXPLORATION</p>
              <div className="flex justify-center space-x-4 text-sm">
                <span>CLICK: Navigate</span>
                <span>|</span>
                <span>SPACE: Select</span>
                <span>|</span>
                <span>ESC: Exit</span>
              </div>
            </div>
            <div className="mt-6 p-4 border border-green-400">
              <p className="text-green-400 text-sm">💡 GAME TIP: Use W/S or Arrow Keys to navigate levels quickly!</p>
              <p className="text-yellow-400 text-sm">🎯 Current Score: {score} | Level: {playerLevel}</p>
            </div>
          </div>
        );
    }
  };

  if (!gameStarted) {
    return <GameMenu />;
  }

  return (
    <div className="min-h-screen bg-black text-white font-mono">
      <GameHUD />
      
      <div className="pt-24 p-8">
        <div className="max-w-6xl mx-auto">
          <LevelNavigation />
          {renderCurrentLevel()}
        </div>
      </div>
      
      <AchievementPanel />
    </div>
  );
};

export default GamePortfolio;