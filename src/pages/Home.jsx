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


      
      {/* Footer */}
      <footer className="bg-white dark:bg-surface-800 py-4 border-t border-surface-200 dark:border-surface-700">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between text-sm text-surface-500">
            <p>© 2023 DropVault. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;