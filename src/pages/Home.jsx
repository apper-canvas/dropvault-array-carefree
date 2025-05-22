import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getIcon } from '../utils/iconUtils';
import MainFeature from '../components/MainFeature';
import { motion } from 'framer-motion';

const Home = () => {
  const [activeTab, setActiveTab] = useState('upload');
  
  // Icons
  const UploadIcon = getIcon('upload-cloud');
  const FolderIcon = getIcon('folder');
  const ShareIcon = getIcon('share-2');
  const LogoIcon = getIcon('database');
  
  const tabs = [
    { id: 'upload', label: 'Upload', icon: 'upload-cloud' },
    { id: 'files', label: 'My Files', icon: 'folder' },
    { id: 'shared', label: 'Shared', icon: 'share-2' }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white dark:bg-surface-800 shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Logo */}
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white">
                <LogoIcon className="h-6 w-6" />
              </div>
              <h1 className="ml-3 text-xl font-bold">DropVault</h1>
            </div>
            
            {/* Navigation Tabs */}
            <nav className="flex space-x-1 bg-surface-100 dark:bg-surface-700 p-1 rounded-lg overflow-x-auto scrollbar-hide">
              {tabs.map((tab) => {
                const TabIcon = getIcon(tab.icon);
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative flex items-center px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ease-in-out 
                    ${activeTab === tab.id 
                      ? 'text-white' 
                      : 'text-surface-700 dark:text-surface-300 hover:text-surface-900 hover:dark:text-white'}`}
                  >
                    {activeTab === tab.id && (
                      <motion.div 
                        layoutId="activeTab"
                        className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-md"
                        initial={false}
                        transition={{ type: 'spring', duration: 0.5 }}
                      />
                    )}
                    <span className="flex items-center relative z-10">
                      <TabIcon className={`mr-2 h-4 w-4 ${activeTab === tab.id ? 'text-white' : ''}`} />
                      {tab.label}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Storage Status */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <h2 className="text-xl font-semibold">Your Storage</h2>
            <Link to="/upgrade-storage" className="btn-outline text-sm">
              <UploadIcon className="h-4 w-4 mr-2" />
              Upgrade Storage
            </Link>
          </div>
          
          <div className="bg-white dark:bg-surface-800 rounded-xl p-4 shadow-card">
            <div className="mb-2 flex justify-between items-center">
              <span className="text-sm font-medium">2.4 GB of 5 GB used</span>
              <span className="text-xs text-surface-500">48%</span>
            </div>
            <div className="h-2 bg-surface-200 dark:bg-surface-700 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full" style={{ width: '48%' }}></div>
            </div>
          </div>
        </div>
        
        {/* Content based on active tab */}
        {activeTab === 'upload' && (
          <MainFeature />
        )}
        
        {activeTab === 'files' && (
          <div className="card">
            <div className="flex items-center justify-center h-48 text-center">
              <div className="text-center">
                <FolderIcon className="h-12 w-12 mx-auto text-surface-400 mb-4" />
                <h3 className="text-lg font-medium mb-2">Your files will appear here</h3>
                <p className="text-surface-500 dark:text-surface-400 text-sm">
                  Upload files to see them in this section
                </p>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'shared' && (
          <div className="card">
            <div className="flex items-center justify-center h-48 text-center">
              <div className="text-center">
                <ShareIcon className="h-12 w-12 mx-auto text-surface-400 mb-4" />
                <h3 className="text-lg font-medium mb-2">No shared files yet</h3>
                <p className="text-surface-500 dark:text-surface-400 text-sm">
                  Files shared with you will appear here
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
      
      {/* Footer */}
      <footer className="bg-white dark:bg-surface-800 py-4 border-t border-surface-200 dark:border-surface-700">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between text-sm text-surface-500">
            <p>© 2023 DropVault. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-primary transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;