import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { getIcon } from '../utils/iconUtils';

const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({ name: 'John Doe', email: 'john@example.com' });
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  
  const searchRef = useRef(null);
  const userMenuRef = useRef(null);
  const notificationRef = useRef(null);
  
  // Icons
  const LogoIcon = getIcon('database');
  const MenuIcon = getIcon('menu');
  const CloseIcon = getIcon('x');
  const SearchIcon = getIcon('search');
  const BellIcon = getIcon('bell');
  const UserIcon = getIcon('user');
  const ChevronDownIcon = getIcon('chevron-down');
  const DashboardIcon = getIcon('layout-dashboard');
  const FolderIcon = getIcon('folder');
  const SettingsIcon = getIcon('settings');
  const HelpIcon = getIcon('help-circle');
  const LogOutIcon = getIcon('log-out');
  const UploadIcon = getIcon('upload');
  const ShareIcon = getIcon('share-2');
  
  // Navigation items
  const navigationItems = [
    {
      label: 'Dashboard',
      icon: 'layout-dashboard',
      path: '/',
      dropdown: [
        { label: 'Overview', path: '/', icon: 'layout-dashboard' },
        { label: 'Analytics', path: '/analytics', icon: 'bar-chart-2' },
        { label: 'Recent Activity', path: '/activity', icon: 'clock' }
      ]
    },
    {
      label: 'Files',
      icon: 'folder-open',
      path: '/files',
      dropdown: [
        { label: 'My Files', path: '/files', icon: 'folder' },
        { label: 'Shared with Me', path: '/shared', icon: 'share-2' },
        { label: 'Recent', path: '/recent', icon: 'clock' },
        { label: 'Trash', path: '/trash', icon: 'trash-2' }
      ]
    },
    {
      label: 'Account',
      icon: 'user-circle',
      dropdown: [
        { label: 'Profile', path: '/profile', icon: 'user' },
        { label: 'Settings', path: '/settings', icon: 'settings' },
        { label: 'Billing', path: '/billing', icon: 'credit-card' },
        { label: 'Upgrade Storage', path: '/upgrade-storage', icon: 'zap' }
      ]
    },
    {
      label: 'Help',
      icon: 'help-circle',
      dropdown: [
        { label: 'FAQ', path: '/faq', icon: 'help-circle' },
        { label: 'Contact Support', path: '/contact', icon: 'mail' },
        { label: 'About', path: '/about', icon: 'info-circle' },
        { label: 'Documentation', path: '/docs', icon: 'book-open' }
      ]
    }
  ];

  
  // Mock notifications
  const notifications = [
    { id: 1, title: 'File uploaded successfully', message: 'document.pdf has been uploaded', time: '2 min ago', read: false },
    { id: 2, title: 'Storage almost full', message: 'You have used 90% of your storage', time: '1 hour ago', read: false },
    { id: 3, title: 'File shared', message: 'presentation.pptx was shared with you', time: '3 hours ago', read: true }
  ];
  
  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsNotificationOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!loginForm.email || !loginForm.password) {
      toast.error('Please fill in all fields');
      return;
    }
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsLoggedIn(true);
      setUser({ name: 'John Doe', email: loginForm.email });
      setIsLoginOpen(false);
      setLoginForm({ email: '', password: '' });
      toast.success('Successfully logged in!');
    } catch (error) {
      toast.error('Login failed. Please try again.');
    }
  };
  
  // Handle register
  const handleRegister = async (e) => {
    e.preventDefault();
    if (!registerForm.name || !registerForm.email || !registerForm.password) {
      toast.error('Please fill in all fields');
      return;
    }
    
    if (registerForm.password !== registerForm.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsLoggedIn(true);
      setUser({ name: registerForm.name, email: registerForm.email });
      setIsRegisterOpen(false);
      setRegisterForm({ name: '', email: '', password: '', confirmPassword: '' });
      toast.success('Account created successfully!');
    } catch (error) {
      toast.error('Registration failed. Please try again.');
    }
  };
  
  // Handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser({ name: '', email: '' });
    setIsUserMenuOpen(false);
    toast.success('Successfully logged out');
  };
  
  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast.info(`Searching for: ${searchQuery}`);
      // Implement search functionality here
    }
  };
  
  // Mark notification as read
  const markNotificationRead = (id) => {
    toast.success('Notification marked as read');
  };
  
  return (
    <header className="bg-white dark:bg-surface-800 shadow-sm sticky top-0 z-50 border-b border-surface-200 dark:border-surface-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white group-hover:scale-105 transition-transform duration-200">
              <LogoIcon className="h-6 w-6" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-surface-900 dark:text-surface-50 group-hover:text-primary transition-colors duration-200">
                DropVault
              </h1>
              <p className="text-xs text-surface-500 dark:text-surface-400">Secure File Storage</p>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const ItemIcon = getIcon(item.icon);
              const isActive = location.pathname === item.path || 
                (item.dropdown && item.dropdown.some(subItem => location.pathname === subItem.path));
              
              return (
                <div key={item.label} className="relative group">
                  <button className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive 
                      ? 'text-primary bg-primary/10 dark:bg-primary/20' 
                      : 'text-surface-700 dark:text-surface-300 hover:text-primary hover:bg-surface-100 dark:hover:bg-surface-700'
                  }`}>
                    <ItemIcon className="h-4 w-4" />
                    <span>{item.label}</span>
                    {item.dropdown && <ChevronDownIcon className="h-3 w-3 group-hover:rotate-180 transition-transform duration-200" />}
                  </button>
                  
                  {/* Dropdown Menu */}
                  {item.dropdown && (
                    <div className="absolute top-full left-0 mt-1 w-48 bg-white dark:bg-surface-800 rounded-lg shadow-lg border border-surface-200 dark:border-surface-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <div className="py-2">
                        {item.dropdown.map((subItem) => {
                          const SubIcon = getIcon(subItem.icon);
                          return (
                            <Link
                              key={subItem.path}
                              to={subItem.path}
                              className="flex items-center space-x-3 px-4 py-2 text-sm text-surface-700 dark:text-surface-300 hover:text-primary hover:bg-surface-50 dark:hover:bg-surface-700 transition-colors duration-200"
                            >
                              <SubIcon className="h-4 w-4" />
                              <span>{subItem.label}</span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
          
          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {/* Search */}
            <div ref={searchRef} className="relative hidden md:block">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 rounded-lg text-surface-600 dark:text-surface-400 hover:text-primary hover:bg-surface-100 dark:hover:bg-surface-700 transition-all duration-200"
              >
                <SearchIcon className="h-5 w-5" />
              </button>
              
              <AnimatePresence>
                {isSearchOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    className="absolute top-full right-0 mt-2 w-80 bg-white dark:bg-surface-800 rounded-lg shadow-lg border border-surface-200 dark:border-surface-700 p-4"
                  >
                    <form onSubmit={handleSearch} className="space-y-3">
                      <div className="relative">
                        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-surface-400" />
                        <input
                          type="text"
                          placeholder="Search files..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 border border-surface-300 dark:border-surface-600 rounded-lg bg-white dark:bg-surface-700 text-surface-900 dark:text-surface-100 focus:outline-none focus:ring-2 focus:ring-primary"
                          autoFocus
                        />
                      </div>
                      <div className="flex justify-between text-xs text-surface-500 dark:text-surface-400">
                        <span>Press Enter to search</span>
                        <span>ESC to close</span>
                      </div>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Notifications */}
            <div ref={notificationRef} className="relative">
              <button
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="relative p-2 rounded-lg text-surface-600 dark:text-surface-400 hover:text-primary hover:bg-surface-100 dark:hover:bg-surface-700 transition-all duration-200"
              >
                <BellIcon className="h-5 w-5" />
                {notifications.filter(n => !n.read).length > 0 && (
                  <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-[10px] text-white font-medium">
                      {notifications.filter(n => !n.read).length}
                    </span>
                  </span>
                )}
              </button>
              
              <AnimatePresence>
                {isNotificationOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    className="absolute top-full right-0 mt-2 w-80 bg-white dark:bg-surface-800 rounded-lg shadow-lg border border-surface-200 dark:border-surface-700 max-h-96 overflow-y-auto"
                  >
                    <div className="p-4 border-b border-surface-200 dark:border-surface-700">
                      <h3 className="font-semibold text-surface-900 dark:text-surface-100">Notifications</h3>
                    </div>
                    <div className="py-2">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`px-4 py-3 hover:bg-surface-50 dark:hover:bg-surface-700 cursor-pointer transition-colors duration-200 ${
                            !notification.read ? 'bg-primary/5 dark:bg-primary/10' : ''
                          }`}
                          onClick={() => markNotificationRead(notification.id)}
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <p className="text-sm font-medium text-surface-900 dark:text-surface-100">
                                {notification.title}
                              </p>
                              <p className="text-xs text-surface-600 dark:text-surface-400 mt-1">
                                {notification.message}
                              </p>
                            </div>
                            {!notification.read && (
                              <div className="h-2 w-2 bg-primary rounded-full ml-2 mt-1"></div>
                            )}
                          </div>
                          <p className="text-xs text-surface-500 dark:text-surface-500 mt-2">
                            {notification.time}
                          </p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* User Menu */}
            {isLoggedIn ? (
              <div ref={userMenuRef} className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 p-2 rounded-lg text-surface-600 dark:text-surface-400 hover:text-primary hover:bg-surface-100 dark:hover:bg-surface-700 transition-all duration-200"
                >
                  <div className="h-8 w-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {user.name.charAt(0)}
                  </div>
                  <ChevronDownIcon className="h-4 w-4" />
                </button>
                
                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      className="absolute top-full right-0 mt-2 w-64 bg-white dark:bg-surface-800 rounded-lg shadow-lg border border-surface-200 dark:border-surface-700"
                    >
                      <div className="p-4 border-b border-surface-200 dark:border-surface-700">
                        <p className="font-medium text-surface-900 dark:text-surface-100">{user.name}</p>
                        <p className="text-sm text-surface-600 dark:text-surface-400">{user.email}</p>
                      </div>
                      <div className="py-2">
                        <Link
                          to="/profile"
                          className="flex items-center space-x-3 px-4 py-2 text-sm text-surface-700 dark:text-surface-300 hover:text-primary hover:bg-surface-50 dark:hover:bg-surface-700 transition-colors duration-200"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <UserIcon className="h-4 w-4" />
                          <span>Profile</span>
                        </Link>
                        <Link
                          to="/settings"
                          className="flex items-center space-x-3 px-4 py-2 text-sm text-surface-700 dark:text-surface-300 hover:text-primary hover:bg-surface-50 dark:hover:bg-surface-700 transition-colors duration-200"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <SettingsIcon className="h-4 w-4" />
                          <span>Settings</span>
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="flex items-center space-x-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200 w-full text-left"
                        >
                          <LogOutIcon className="h-4 w-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsLoginOpen(true)}
                  className="px-4 py-2 text-sm font-medium text-surface-700 dark:text-surface-300 hover:text-primary transition-colors duration-200"
                >
                  Sign In
                </button>
                <button
                  onClick={() => setIsRegisterOpen(true)}
                  className="px-4 py-2 text-sm font-medium bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors duration-200"
                >
                  Sign Up
                </button>
              </div>
            )}
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-surface-600 dark:text-surface-400 hover:text-primary hover:bg-surface-100 dark:hover:bg-surface-700 transition-all duration-200"
            >
              {isMenuOpen ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-surface-200 dark:border-surface-700 py-4"
            >
              <nav className="space-y-2">
                {navigationItems.map((item) => {
                  const ItemIcon = getIcon(item.icon);
                  return (
                    <div key={item.label}>
                      <div className="flex items-center space-x-3 px-4 py-2 text-surface-700 dark:text-surface-300">
                        <ItemIcon className="h-4 w-4" />
                        <span className="font-medium">{item.label}</span>
                      </div>
                      {item.dropdown && (
                        <div className="ml-8 space-y-1">
                          {item.dropdown.map((subItem) => {
                            const SubIcon = getIcon(subItem.icon);
                            return (
                              <Link
                                key={subItem.path}
                                to={subItem.path}
                                onClick={() => setIsMenuOpen(false)}
                                className="flex items-center space-x-3 px-4 py-2 text-sm text-surface-600 dark:text-surface-400 hover:text-primary transition-colors duration-200"
                              >
                                <SubIcon className="h-3 w-3" />
                                <span>{subItem.label}</span>
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </nav>
              
              {/* Mobile Search */}
              <div className="px-4 py-3 border-t border-surface-200 dark:border-surface-700 mt-4">
                <form onSubmit={handleSearch}>
                  <div className="relative">
                    <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-surface-400" />
                    <input
                      type="text"
                      placeholder="Search files..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-surface-300 dark:border-surface-600 rounded-lg bg-white dark:bg-surface-700 text-surface-900 dark:text-surface-100 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Login Modal */}
      <AnimatePresence>
        {isLoginOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setIsLoginOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-surface-800 rounded-lg p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-semibold mb-4 text-surface-900 dark:text-surface-100">Sign In</h2>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-surface-700 dark:text-surface-300">Email</label>
                  <input
                    type="email"
                    value={loginForm.email}
                    onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                    className="input"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-surface-700 dark:text-surface-300">Password</label>
                  <input
                    type="password"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                    className="input"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsLoginOpen(false)}
                    className="btn-outline"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    Sign In
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Register Modal */}
      <AnimatePresence>
        {isRegisterOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setIsRegisterOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-surface-800 rounded-lg p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-semibold mb-4 text-surface-900 dark:text-surface-100">Create Account</h2>
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-surface-700 dark:text-surface-300">Full Name</label>
                  <input
                    type="text"
                    value={registerForm.name}
                    onChange={(e) => setRegisterForm({...registerForm, name: e.target.value})}
                    className="input"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-surface-700 dark:text-surface-300">Email</label>
                  <input
                    type="email"
                    value={registerForm.email}
                    onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
                    className="input"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-surface-700 dark:text-surface-300">Password</label>
                  <input
                    type="password"
                    value={registerForm.password}
                    onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
                    className="input"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-surface-700 dark:text-surface-300">Confirm Password</label>
                  <input
                    type="password"
                    value={registerForm.confirmPassword}
                    onChange={(e) => setRegisterForm({...registerForm, confirmPassword: e.target.value})}
                    className="input"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsRegisterOpen(false)}
                    className="btn-outline"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    Create Account
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;