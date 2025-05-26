import { Link } from 'react-router-dom';

import { useState } from 'react';
import { getIcon } from '../utils/iconUtils';
import MainFeature from '../components/MainFeature';
import Chart from 'react-apexcharts';

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
          
          {/* Storage Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Overall Usage Donut Chart */}
            <div className="bg-white dark:bg-surface-800 rounded-xl p-6 shadow-card">
              <h3 className="text-lg font-semibold mb-4">Storage Overview</h3>
              <div className="flex items-center justify-center">
                <Chart
                  options={{
                    chart: {
                      type: 'donut',
                      background: 'transparent',
                      toolbar: { show: false }
                    },
                    theme: {
                      mode: document.documentElement.classList.contains('dark') ? 'dark' : 'light'
                    },
                    colors: ['#4f46e5', '#e2e8f0'],
                    labels: ['Used', 'Available'],
                    legend: {
                      position: 'bottom',
                      labels: {
                        colors: document.documentElement.classList.contains('dark') ? '#f1f5f9' : '#334155'
                      }
                    },
                    plotOptions: {
                      pie: {
                        donut: {
                          size: '70%',
                          labels: {
                            show: true,
                            total: {
                              show: true,
                              label: 'Total',
                              formatter: () => '5 GB'
                            },
                            value: {
                              show: true,
                              fontSize: '24px',
                              fontWeight: 600,
                              color: document.documentElement.classList.contains('dark') ? '#f1f5f9' : '#334155',
                              formatter: (val) => `${val}%`
                            }
                          }
                        }
                      }
                    },
                    dataLabels: {
                      enabled: false
                    },
                    tooltip: {
                      theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light'
                    }
                  }}
                  series={[48, 52]}
                  type="donut"
                  height={280}
                />
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm text-surface-600 dark:text-surface-400">
                  2.4 GB of 5 GB used
                </p>
              </div>
            </div>

            {/* File Types Breakdown Bar Chart */}
            <div className="bg-white dark:bg-surface-800 rounded-xl p-6 shadow-card">
              <h3 className="text-lg font-semibold mb-4">Storage by File Type</h3>
              <Chart
                options={{
                  chart: {
                    type: 'bar',
                    background: 'transparent',
                    toolbar: { show: false }
                  },
                  theme: {
                    mode: document.documentElement.classList.contains('dark') ? 'dark' : 'light'
                  },
                  colors: ['#4f46e5'],
                  plotOptions: {
                    bar: {
                      horizontal: true,
                      borderRadius: 4,
                      dataLabels: {
                        position: 'top'
                      }
                    }
                  },
                  dataLabels: {
                    enabled: true,
                    formatter: (val) => `${val} MB`,
                    style: {
                      colors: [document.documentElement.classList.contains('dark') ? '#f1f5f9' : '#334155']
                    }
                  },
                  xaxis: {
                    categories: ['Documents', 'Images', 'Videos', 'Archives', 'Other'],
                    labels: {
                      style: {
                        colors: document.documentElement.classList.contains('dark') ? '#cbd5e1' : '#64748b'
                      }
                    }
                  },
                  yaxis: {
                    labels: {
                      style: {
                        colors: document.documentElement.classList.contains('dark') ? '#cbd5e1' : '#64748b'
                      }
                    }
                  },
                  grid: {
                    borderColor: document.documentElement.classList.contains('dark') ? '#334155' : '#e2e8f0'
                  },
                  tooltip: {
                    theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light'
                  }
                }}
                series={[{
                  name: 'Storage Used',
                  data: [850, 720, 450, 280, 160]
                }]}
                type="bar"
                height={280}
              />
            </div>
          </div>


          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">

            <div className="bg-white dark:bg-surface-800 rounded-lg p-4 shadow-card text-center">
              <div className="text-2xl font-bold text-primary">156</div>
              <div className="text-sm text-surface-600 dark:text-surface-400">Total Files</div>
            </div>

            <div className="bg-white dark:bg-surface-800 rounded-lg p-4 shadow-card text-center">
              <div className="text-2xl font-bold text-secondary">12</div>
              <div className="text-sm text-surface-600 dark:text-surface-400">Folders</div>
            </div>
            <div className="bg-white dark:bg-surface-800 rounded-lg p-4 shadow-card text-center">
              <div className="text-2xl font-bold text-accent">8</div>
              <div className="text-sm text-surface-600 dark:text-surface-400">Shared</div>
            </div>
            <div className="bg-white dark:bg-surface-800 rounded-lg p-4 shadow-card text-center">
              <div className="text-2xl font-bold text-green-500">2.6 GB</div>
              <div className="text-sm text-surface-600 dark:text-surface-400">Available</div>
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

export default Home;