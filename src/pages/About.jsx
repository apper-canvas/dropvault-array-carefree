import { Link } from 'react-router-dom';
import { getIcon } from '../utils/iconUtils';

const About = () => {
  const ArrowLeftIcon = getIcon('arrow-left');
  const LogoIcon = getIcon('database');
  const UsersIcon = getIcon('users');
  const ShieldIcon = getIcon('shield');
  const ZapIcon = getIcon('zap');
  const GlobeIcon = getIcon('globe');
  const TrendingUpIcon = getIcon('trending-up');
  const HeartIcon = getIcon('heart');

  const stats = [
    { label: 'Active Users', value: '10K+', icon: UsersIcon },
    { label: 'Files Stored', value: '50M+', icon: LogoIcon },
    { label: 'Countries', value: '25+', icon: GlobeIcon },
    { label: 'Uptime', value: '99.9%', icon: TrendingUpIcon }
  ];

  const features = [
    {
      icon: ShieldIcon,
      title: 'Enterprise Security',
      description: 'End-to-end encryption, secure data centers, and compliance with industry standards.'
    },
    {
      icon: ZapIcon,
      title: 'Lightning Fast',
      description: 'Optimized upload and download speeds with global CDN for instant access worldwide.'
    },
    {
      icon: UsersIcon,
      title: 'Team Collaboration',
      description: 'Share files securely with team members and collaborate in real-time.'
    },
    {
      icon: GlobeIcon,
      title: 'Global Reach',
      description: 'Access your files from anywhere in the world with our reliable cloud infrastructure.'
    }
  ];

  const team = [
    {
      name: 'Sarah Chen',
      role: 'CEO & Founder',
      description: 'Former security engineer with 10+ years in cloud infrastructure.'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'CTO',
      description: 'Lead architect who designed our scalable and secure file storage system.'
    },
    {
      name: 'Emily Thompson',
      role: 'Head of Security',
      description: 'Cybersecurity expert ensuring the highest standards of data protection.'
    },
    {
      name: 'David Kim',
      role: 'Head of Product',
      description: 'Product strategist focused on creating intuitive user experiences.'
    }
  ];

  return (

    <div className="min-h-screen bg-surface-50 dark:bg-surface-900">

      {/* Hero Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 dark:bg-primary/20 rounded-full mb-6">
            <HeartIcon className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-6">About DropVault</h1>
          <p className="text-lg text-surface-600 dark:text-surface-400 max-w-3xl mx-auto mb-8">
            We're on a mission to make file storage and sharing simple, secure, and accessible to everyone. 
            Founded in 2020, DropVault has grown from a small startup to a trusted cloud storage solution 
            used by thousands of individuals and businesses worldwide.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center p-3 bg-primary/10 dark:bg-primary/20 rounded-full mb-3">
                    <IconComponent className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-2xl font-bold mb-1">{stat.value}</div>
                  <div className="text-surface-600 dark:text-surface-400 text-sm">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white dark:bg-surface-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-lg text-surface-600 dark:text-surface-400">
                To provide secure, reliable, and user-friendly cloud storage solutions that empower 
                individuals and teams to work efficiently from anywhere in the world.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="card">
                <h3 className="text-xl font-semibold mb-4">What We Believe</h3>
                <ul className="space-y-3 text-surface-600 dark:text-surface-400">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Privacy and security should never be compromised
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Technology should be accessible to everyone
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Innovation drives better user experiences
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Collaboration should be seamless and secure
                  </li>
                </ul>
              </div>
              
              <div className="card">
                <h3 className="text-xl font-semibold mb-4">Our Promise</h3>
                <p className="text-surface-600 dark:text-surface-400 mb-4">
                  We promise to keep your data safe, your experience smooth, and our service reliable. 
                  Every feature we build and every decision we make is guided by our commitment to 
                  protecting your privacy and providing exceptional value.
                </p>
                <p className="text-surface-600 dark:text-surface-400">
                  Your trust is the foundation of our business, and we work every day to earn and maintain it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose DropVault</h2>
            <p className="text-lg text-surface-600 dark:text-surface-400">
              We've built our platform with the features that matter most to our users.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="card text-center">
                  <div className="inline-flex items-center justify-center p-3 bg-primary/10 dark:bg-primary/20 rounded-full mb-4">
                    <IconComponent className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-3">{feature.title}</h3>
                  <p className="text-surface-600 dark:text-surface-400 text-sm">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white dark:bg-surface-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-lg text-surface-600 dark:text-surface-400">
              The passionate people behind DropVault who work every day to make your experience better.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {team.map((member, index) => (
              <div key={index} className="card text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full mx-auto mb-4 flex items-center justify-center text-white text-xl font-bold">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                <p className="text-primary text-sm font-medium mb-3">{member.role}</p>
                <p className="text-surface-600 dark:text-surface-400 text-sm">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-lg text-surface-600 dark:text-surface-400 mb-8">
              Join thousands of users who trust DropVault with their most important files. 
              Start with our free plan and upgrade as you grow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/" className="btn-primary">
                Start Free Trial
              </Link>
              <Link to="/contact" className="btn-outline">
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Footer */}
      <footer className="bg-white dark:bg-surface-800 border-t border-surface-200 dark:border-surface-700">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white">
                  <LogoIcon className="h-5 w-5" />
                </div>
                <h3 className="ml-2 text-lg font-bold">DropVault</h3>
              </div>
              <p className="text-surface-600 dark:text-surface-400 text-sm">
                Secure file transfers and cloud storage solution. Upload, manage, and share your files with enterprise-grade security.
              </p>
              <div className="text-sm text-surface-500 dark:text-surface-500">
                <p>© 2023 DropVault. All rights reserved.</p>
              </div>
            </div>

            {/* Resources */}
            <div className="space-y-4">
              <h4 className="font-semibold text-surface-900 dark:text-surface-100">Resources</h4>
              <div className="space-y-2">
                <Link to="/about" className="block text-surface-600 dark:text-surface-400 hover:text-primary transition-colors text-sm">
                  About Us
                </Link>
                <Link to="/faq" className="block text-surface-600 dark:text-surface-400 hover:text-primary transition-colors text-sm">
                  FAQ
                </Link>
                <Link to="/contact" className="block text-surface-600 dark:text-surface-400 hover:text-primary transition-colors text-sm">
                  Contact Support
                </Link>
                <Link to="/upgrade-storage" className="block text-surface-600 dark:text-surface-400 hover:text-primary transition-colors text-sm">
                  Upgrade Storage
                </Link>
              </div>
            </div>

            {/* Legal */}
            <div className="space-y-4">
              <h4 className="font-semibold text-surface-900 dark:text-surface-100">Legal</h4>
              <div className="space-y-2">
                <Link to="/privacy" className="block text-surface-600 dark:text-surface-400 hover:text-primary transition-colors text-sm">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="block text-surface-600 dark:text-surface-400 hover:text-primary transition-colors text-sm">
                  Terms of Service
                </Link>
                <a href="#" className="block text-surface-600 dark:text-surface-400 hover:text-primary transition-colors text-sm">
                  Security
                </a>
                <a href="#" className="block text-surface-600 dark:text-surface-400 hover:text-primary transition-colors text-sm">
                  Compliance
                </a>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h4 className="font-semibold text-surface-900 dark:text-surface-100">Contact</h4>
              <div className="space-y-2 text-sm">
                <div className="text-surface-600 dark:text-surface-400">
                  <p>support@dropvault.com</p>
                </div>
                <div className="text-surface-600 dark:text-surface-400">
                  <p>+1 (555) 123-4567</p>
                </div>
                <div className="text-surface-600 dark:text-surface-400">
                  <p>123 Cloud Street</p>
                  <p>Data City, DC 12345</p>
                </div>
              </div>
              
              {/* Social Links */}
              <div className="flex space-x-3 pt-2">
                <a href="#" className="text-surface-400 hover:text-primary transition-colors">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-surface-400 hover:text-primary transition-colors">
                  <span className="sr-only">GitHub</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-surface-400 hover:text-primary transition-colors">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M19 0H5a5 5 0 00-5 5v14a5 5 0 005 5h14a5 5 0 005-5V5a5 5 0 00-5-5zM8 19H5V8h3v11zM6.5 6.732c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zM20 19h-3v-5.604c0-3.368-4-3.113-4 0V19h-3V8h3v1.765c1.396-2.586 7-2.777 7 2.476V19z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;