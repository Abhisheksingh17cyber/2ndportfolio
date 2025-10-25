import React, { useState } from 'react';
import { 
  Mail, Phone, MapPin, Github, Linkedin, 
  ExternalLink, Calendar, Code, 
  GraduationCap, Database,
  Globe, Shield, Terminal, Cpu, TrendingUp, 
  Zap, ChevronDown, ChevronUp, Menu, X
} from 'lucide-react';

const MinimalistPortfolio = () => {
  const [expandedSection, setExpandedSection] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Data from GamePortfolio.js
  const certifications = [
    { name: 'Model Context Protocol', org: 'Anthropic', date: 'Sep 2025', id: '9vmhe84mkwt4', icon: Cpu },
    { name: 'ReactJS Foundations', org: 'ScholarHat', date: 'Aug 2025', id: 'JFWX120825', icon: Code },
    { name: 'Generative AI', org: 'Google Cloud', date: 'Aug 2025', id: '8776454', icon: Cpu },
    { name: 'Prompt Engineering', org: 'Simplilearn', date: 'Aug 2025', id: '8776030', icon: Terminal },
    { name: 'AI for Beginners', org: 'HP LIFE', date: 'Aug 2025', icon: Zap },
    { name: 'Cybersecurity Fundamentals', org: 'Tech Mahindra', date: 'Aug 2025', icon: Shield },
    { name: 'AI-Powered Shopping Ads', org: 'Google', date: 'Jul 2025', id: '154672281', icon: TrendingUp },
    { name: 'Data Analysis in Excel', org: 'Open University', date: 'Jul 2025', icon: Database },
    { name: 'Web Applications Architecture', org: 'Open University', date: 'Jul 2025', icon: Globe },
    { name: 'AI-Powered Marketer', org: 'Semrush', date: 'Jul 2026', id: 'b4b295d293', icon: TrendingUp }
  ];

  const experiences = [
    {
      title: 'Business Development Specialist',
      company: 'Edu-versity (AMG Technologies)',
      period: 'Oct 2025 - Jan 2026',
      type: 'Internship Offer',
      details: [
        'INR 25,000/month stipend (Fixed: 15K + Incentives: 10K + Bonus: 5K)',
        'Pre Placement Offer with 8 LPA CTC',
        'Comprehensive 15-day training period',
        'Location: Bengaluru, Karnataka',
        'Early full-time opportunity for exceptional performers'
      ],
      skills: ['Business Strategy', 'Client Relations', 'Sales', 'Marketing']
    },
    {
      title: 'Web Developer Intern',
      company: 'Zidio Development',
      period: 'Sep 2025 - Nov 2025',
      type: 'Internship Offer',
      details: [
        'Up to INR 12,000/month stipend',
        'Working on AI advancement projects',
        'Remote work with flexible timing',
        'Mentorship from experienced professionals',
        'Evening training sessions'
      ],
      skills: ['React', 'Node.js', 'AI Integration', 'Full Stack']
    },
    {
      title: 'Front-End Development Intern',
      company: 'Indolike',
      period: 'Sep 2025 - Oct 2025',
      type: 'Internship Offer',
      details: [
        '1-month virtual internship',
        'Front-end development focus',
        '100% Remote work',
        'Skills development program',
        'Supportive team environment'
      ],
      skills: ['HTML/CSS', 'JavaScript', 'React', 'UI/UX']
    },
    {
      title: 'Web Development Intern',
      company: 'Labmentix',
      period: 'Sep 2025',
      type: 'Internship Offer',
      details: [
        '1-month intensive program',
        'Professional development resources',
        'Location: Bengaluru, Karnataka',
        'Mentorship opportunities',
        'Future career prospects'
      ],
      skills: ['Web Development', 'APIs', 'Database', 'Testing']
    },
    {
      title: 'Social Awareness Intern',
      company: 'We Hope We Care Foundation',
      period: 'May 2024 - Aug 2024',
      type: 'Completed',
      details: [
        'Successfully completed 3-month internship',
        'Community outreach initiatives',
        'On-field awareness campaigns',
        'Leadership skills development',
        'Multiple program execution'
      ],
      skills: ['Communication', 'Leadership', 'Project Management', 'Social Impact']
    }
  ];

  const projects = [
    {
      title: 'AI Content Generator Platform',
      tech: ['React', 'Node.js', 'OpenAI API', 'MongoDB'],
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

  const skills = {
    'Programming Languages': ['JavaScript', 'Python', 'Java', 'HTML/CSS', 'SQL'],
    'Frameworks & Libraries': ['React.js', 'Node.js', 'Express.js', 'Tailwind CSS', 'Bootstrap'],
    'Tools & Technologies': ['Git', 'GitHub', 'VS Code', 'MongoDB', 'MySQL', 'REST APIs'],
    'AI/ML & Data': ['Machine Learning', 'Generative AI', 'Prompt Engineering', 'Data Analysis'],
    'Digital Marketing': ['SEO', 'Content Marketing', 'Social Media Marketing', 'Google Ads'],
    'Soft Skills': ['Leadership', 'Communication', 'Problem Solving', 'Project Management']
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white border-b border-gray-200 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="font-bold text-xl">Abhishek Singh</div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              <button onClick={() => scrollToSection('about')} className="hover:text-gray-600 transition-colors">About</button>
              <button onClick={() => scrollToSection('experience')} className="hover:text-gray-600 transition-colors">Experience</button>
              <button onClick={() => scrollToSection('projects')} className="hover:text-gray-600 transition-colors">Projects</button>
              <button onClick={() => scrollToSection('certificates')} className="hover:text-gray-600 transition-colors">Certificates</button>
              <button onClick={() => scrollToSection('skills')} className="hover:text-gray-600 transition-colors">Skills</button>
              <button onClick={() => scrollToSection('contact')} className="hover:text-gray-600 transition-colors">Contact</button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <div className="flex flex-col space-y-3">
                <button onClick={() => scrollToSection('about')} className="text-left hover:text-gray-600 transition-colors">About</button>
                <button onClick={() => scrollToSection('experience')} className="text-left hover:text-gray-600 transition-colors">Experience</button>
                <button onClick={() => scrollToSection('projects')} className="text-left hover:text-gray-600 transition-colors">Projects</button>
                <button onClick={() => scrollToSection('certificates')} className="text-left hover:text-gray-600 transition-colors">Certificates</button>
                <button onClick={() => scrollToSection('skills')} className="text-left hover:text-gray-600 transition-colors">Skills</button>
                <button onClick={() => scrollToSection('contact')} className="text-left hover:text-gray-600 transition-colors">Contact</button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Full Stack Developer & AI Enthusiast
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Computer Science Engineering student with expertise in React.js, AI/ML technologies, 
            and digital marketing. Passionate about creating innovative solutions and driving social impact.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="px-4 py-2 border border-gray-300 rounded-full">React.js</span>
            <span className="px-4 py-2 border border-gray-300 rounded-full">AI/ML</span>
            <span className="px-4 py-2 border border-gray-300 rounded-full">Full Stack</span>
            <span className="px-4 py-2 border border-gray-300 rounded-full">Digital Marketing</span>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">About Me</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-gray-700 mb-6">
                As a motivated Computer Science Engineering student, I bring hands-on experience in modern web 
                technologies, AI/ML concepts, and digital marketing. My portfolio demonstrates strong technical 
                skills through multiple certifications and practical project work, combined with community 
                engagement through social awareness campaigns.
              </p>
              <p className="text-lg text-gray-700">
                Demonstrated expertise through 10+ professional certifications spanning React.js, AI technologies, 
                SEO optimization, and cybersecurity. Strong foundation in programming with hands-on experience in 
                real-world project development and social impact initiatives.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <GraduationCap className="w-6 h-6" />
                <span>Computer Science Engineering</span>
              </div>
              <div className="flex items-center gap-3">
                <Code className="w-6 h-6" />
                <span>Full Stack Developer</span>
              </div>
              <div className="flex items-center gap-3">
                <Cpu className="w-6 h-6" />
                <span>AI/ML Enthusiast</span>
              </div>
              <div className="flex items-center gap-3">
                <TrendingUp className="w-6 h-6" />
                <span>Digital Marketing Specialist</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Experience</h2>
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold">{exp.title}</h3>
                    <p className="text-lg text-gray-600">{exp.company}</p>
                    <p className="text-sm text-gray-500">{exp.period}</p>
                  </div>
                  <span className={`mt-2 sm:mt-0 px-3 py-1 text-sm rounded-full ${
                    exp.type === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {exp.type}
                  </span>
                </div>
                
                <button
                  onClick={() => toggleSection(`exp-${index}`)}
                  className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors mb-4"
                >
                  <span>View Details</span>
                  {expandedSection === `exp-${index}` ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                {expandedSection === `exp-${index}` && (
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Key Highlights:</h4>
                      <ul className="space-y-1">
                        {exp.details.map((detail, i) => (
                          <li key={i} className="text-gray-700">• {detail}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Skills:</h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map((skill, i) => (
                          <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Projects</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold">{project.title}</h3>
                  <span className={`px-3 py-1 text-sm rounded-full ${
                    project.status === 'Production' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {project.status}
                  </span>
                </div>
                
                <p className="text-gray-700 mb-4">{project.description}</p>
                
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Technologies:</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, i) => (
                      <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => toggleSection(`proj-${index}`)}
                  className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors mb-4"
                >
                  <span>View Features</span>
                  {expandedSection === `proj-${index}` ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                {expandedSection === `proj-${index}` && (
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Key Features:</h4>
                      <ul className="space-y-1">
                        {project.features.map((feature, i) => (
                          <li key={i} className="text-gray-700">• {feature}</li>
                        ))}
                      </ul>
                    </div>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Impact:</span> {project.impact}
                    </p>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-black hover:text-gray-600 transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      View on GitHub
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificates Section - Prominently Displayed */}
      <section id="certificates" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Certifications</h2>
          <p className="text-center text-gray-600 mb-8">Professional certifications showcasing expertise across various technologies</p>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => {
              const Icon = cert.icon;
              return (
                <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-gray-100 rounded-lg">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold mb-2">{cert.name}</h3>
                      <p className="text-gray-600 mb-2">{cert.org}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                        <Calendar className="w-4 h-4" />
                        <span>{cert.date}</span>
                      </div>
                      {cert.id && (
                        <p className="text-xs text-gray-400 font-mono">
                          ID: {cert.id}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Skills</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(skills).map(([category, skillList]) => (
              <div key={category} className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="font-bold mb-4">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skillList.map((skill, i) => (
                    <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Contact</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-bold mb-6">Get In Touch</h3>
              <p className="text-gray-700 mb-6">
                Open to internships, freelance projects, and full-time positions in Web Development, AI/ML, and Digital Marketing.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5" />
                  <span>abhishekkumar17singh17@gmail.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5" />
                  <span>+91-8318990847</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5" />
                  <span>Bhopal, Madhya Pradesh, India</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-6">Connect Online</h3>
              <div className="space-y-4">
                <a
                  href="https://linkedin.com/in/abhisheksingh17cyber"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                >
                  <Linkedin className="w-6 h-6" />
                  <div>
                    <p className="font-semibold">LinkedIn</p>
                    <p className="text-sm text-gray-600">abhisheksingh17cyber</p>
                  </div>
                  <ExternalLink className="w-4 h-4 ml-auto" />
                </a>
                
                <a
                  href="https://github.com/Abhisheksingh17cyber"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                >
                  <Github className="w-6 h-6" />
                  <div>
                    <p className="font-semibold">GitHub</p>
                    <p className="text-sm text-gray-600">Abhisheksingh17cyber</p>
                  </div>
                  <ExternalLink className="w-4 h-4 ml-auto" />
                </a>
              </div>
              
              <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                <h4 className="font-bold mb-4">Available For</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm">Full Stack Development</span>
                  <span className="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm">React.js Projects</span>
                  <span className="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm">AI Integration</span>
                  <span className="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm">Digital Marketing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-50 border-t border-gray-200">
        <div className="max-w-6xl mx-auto text-center text-gray-600">
          <p className="mb-2">© 2025 Abhishek Singh - Minimalist Portfolio</p>
          <p className="text-sm">Built with React & Tailwind CSS</p>
        </div>
      </footer>
    </div>
  );
};

export default MinimalistPortfolio;