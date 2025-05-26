import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getIcon } from '../utils/iconUtils';
import { motion, AnimatePresence } from 'framer-motion';

const FAQ = () => {
  const [openItems, setOpenItems] = useState(new Set([0])); // First item open by default
  
  const ArrowLeftIcon = getIcon('arrow-left');
  const LogoIcon = getIcon('database');
  const HelpCircleIcon = getIcon('help-circle');
  const ChevronDownIcon = getIcon('chevron-down');
  const SearchIcon = getIcon('search');
  const MessageCircleIcon = getIcon('message-circle');

  const [searchTerm, setSearchTerm] = useState('');

  const toggleItem = (index) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  const faqCategories = [
    {
      title: 'Getting Started',
      questions: [
        {
          question: 'How do I create an account?',
          answer: 'Creating an account is simple! Click the "Sign Up" button on our homepage, enter your email address and create a secure password. You\'ll receive a verification email to confirm your account. Once verified, you can start uploading files immediately with our free 5GB storage plan.'
        },
        {
          question: 'What file types can I upload?',
          answer: 'DropVault supports virtually all file types including documents (PDF, DOC, XLS), images (JPG, PNG, GIF), videos (MP4, AVI, MOV), archives (ZIP, RAR), and many more. We automatically scan files for security but don\'t restrict based on file type. However, certain file sizes may be limited based on your subscription plan.'
        },
        {
          question: 'How much storage do I get for free?',
          answer: 'New users receive 5GB of free storage when they sign up. This is perfect for storing documents, photos, and small files. If you need more space, our paid plans start at just $5.99/month for 10GB and go up to 500GB for teams and businesses.'
        }
      ]
    },
    {
      title: 'File Management',
      questions: [
        {
          question: 'How do I organize my files?',
          answer: 'You can create folders and subfolders to organize your files just like on your computer. Use the "New Folder" button in your file manager, give it a name, and drag files into it. You can also use tags and favorites to quickly find important files later.'
        },
        {
          question: 'Can I sync files with my computer?',
          answer: 'Yes! We offer desktop sync applications for Windows, Mac, and Linux. Once installed, you can designate a folder on your computer that automatically syncs with your DropVault account. Any changes made locally or in the cloud are automatically synchronized.'
        },
        {
          question: 'What happens if I accidentally delete a file?',
          answer: 'Don\'t worry! Deleted files are moved to your trash folder where they\'re kept for 30 days. You can restore them anytime during this period. After 30 days, files are permanently deleted. Pro and Enterprise users get extended trash retention of 90 days.'
        }
      ]
    },
    {
      title: 'Sharing & Collaboration',
      questions: [
        {
          question: 'How do I share files with others?',
          answer: 'There are several ways to share files: 1) Generate a secure link that you can send via email or messaging, 2) Invite specific people by email address to access files or folders, 3) Set password protection and expiration dates for extra security. You can also control whether recipients can view, comment, or edit shared content.'
        },
        {
          question: 'Can multiple people edit the same file?',
          answer: 'For supported file types (like Google Docs, Sheets, and some text files), multiple users can collaborate in real-time. For other file types, we use a check-in/check-out system to prevent conflicts. When someone opens a file for editing, others will see it\'s locked and can view a read-only version.'
        },
        {
          question: 'How do I control who can access my shared files?',
          answer: 'You have complete control over sharing permissions. You can set files to be private (only you), shared with specific people, shared with your team, or public with a link. For each share, you can specify whether people can view, comment, edit, or manage permissions. You can also revoke access or change permissions anytime.'
        }
      ]
    },
    {
      title: 'Security & Privacy',
      questions: [
        {
          question: 'How secure are my files?',
          answer: 'Security is our top priority. All files are encrypted during transfer (SSL/TLS) and at rest (AES-256 encryption). We use secure data centers with 24/7 monitoring, regular security audits, and comply with industry standards like SOC 2 and GDPR. Your files are protected against unauthorized access, and we never access your content without your explicit permission.'
        },
        {
          question: 'Can DropVault see my files?',
          answer: 'No, we cannot see the content of your files. All files are encrypted with your account-specific keys, and we have a zero-knowledge architecture. Our staff cannot access your file content, even for support purposes. We can only see metadata like file names and sizes, which helps us provide technical support when needed.'
        },
        {
          question: 'What happens to my data if I cancel?',
          answer: 'If you cancel your subscription, your account will downgrade to the free plan. If your storage usage exceeds the free limit, you\'ll have 30 days to either upgrade again or delete files to fit within the free storage quota. After 30 days, we may delete excess files, but we\'ll send multiple warnings before doing so.'
        }
      ]
    },
    {
      title: 'Billing & Plans',
      questions: [
        {
          question: 'How does billing work?',
          answer: 'We bill monthly or annually depending on your chosen plan. Payments are processed securely through our payment partners. You\'ll receive an email receipt for each payment, and you can view your billing history in your account settings. Annual plans include a discount compared to monthly billing.'
        },
        {
          question: 'Can I change my plan anytime?',
          answer: 'Yes! You can upgrade or downgrade your plan at any time from your account settings. Upgrades take effect immediately and you\'re only charged the prorated difference. Downgrades take effect at the end of your current billing period, so you can continue using your current features until then.'
        },
        {
          question: 'Do you offer refunds?',
          answer: 'We offer a 30-day money-back guarantee for new subscriptions. If you\'re not satisfied within the first 30 days, contact our support team for a full refund. For other situations, we evaluate refund requests on a case-by-case basis and work to find a fair solution.'
        }
      ]
    }
  ];

  // Flatten all questions for searching
  const allQuestions = faqCategories.flatMap((category, categoryIndex) => 
    category.questions.map((q, questionIndex) => ({
      ...q,
      categoryTitle: category.title,
      categoryIndex,
      questionIndex,
      globalIndex: categoryIndex * 10 + questionIndex // Simple unique index
    }))
  );

  // Filter questions based on search term
  const filteredQuestions = searchTerm 
    ? allQuestions.filter(q => 
        q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.categoryTitle.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

    <div className="min-h-screen bg-surface-50 dark:bg-surface-900 pt-8">

      {/* Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center p-3 bg-primary/10 dark:bg-primary/20 rounded-full mb-4">
              <HelpCircleIcon className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-surface-600 dark:text-surface-400 text-lg">
              Find answers to common questions about DropVault. Can't find what you're looking for? 
              <Link to="/contact" className="text-primary hover:underline ml-1">Contact our support team</Link>.
            </p>
          </div>

          {/* Search */}
          <div className="card mb-8">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-surface-400" />
              <input
                type="text"
                placeholder="Search for answers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-surface-300 dark:border-surface-700 bg-white dark:bg-surface-800 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          {/* Search Results */}
          {searchTerm && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">
                Search Results ({filteredQuestions.length} found)
              </h2>
              {filteredQuestions.length === 0 ? (
                <div className="card text-center py-8">
                  <p className="text-surface-600 dark:text-surface-400">
                    No results found for "{searchTerm}". Try different keywords or 
                    <Link to="/contact" className="text-primary hover:underline ml-1">contact support</Link> for help.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredQuestions.map((item, index) => (
                    <div key={index} className="card">
                      <div className="mb-2">
                        <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                          {item.categoryTitle}
                        </span>
                      </div>
                      <h3 className="font-semibold mb-2">{item.question}</h3>
                      <p className="text-surface-600 dark:text-surface-400 text-sm">{item.answer}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* FAQ Categories - only show if not searching */}
          {!searchTerm && (
            <div className="space-y-6">
              {faqCategories.map((category, categoryIndex) => (
                <div key={categoryIndex} className="card">
                  <h2 className="text-xl font-semibold mb-4">{category.title}</h2>
                  <div className="space-y-3">
                    {category.questions.map((item, questionIndex) => {
                      const globalIndex = categoryIndex * 10 + questionIndex;
                      const isOpen = openItems.has(globalIndex);
                      
                      return (
                        <div key={questionIndex} className="border border-surface-200 dark:border-surface-700 rounded-lg">
                          <button
                            onClick={() => toggleItem(globalIndex)}
                            className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-surface-50 dark:hover:bg-surface-700/50 transition-colors rounded-lg"
                          >
                            <span className="font-medium">{item.question}</span>
                            <motion.div
                              animate={{ rotate: isOpen ? 180 : 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <ChevronDownIcon className="h-5 w-5 text-surface-400" />
                            </motion.div>
                          </button>
                          
                          <AnimatePresence>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <div className="px-4 pb-3 text-surface-600 dark:text-surface-400 text-sm">
                                  {item.answer}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Contact CTA */}
          <div className="card mt-12 text-center">
            <div className="inline-flex items-center justify-center p-3 bg-primary/10 dark:bg-primary/20 rounded-full mb-4">
              <MessageCircleIcon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Still Need Help?</h3>
            <p className="text-surface-600 dark:text-surface-400 mb-4">
              Can't find the answer you're looking for? Our friendly support team is here to help.
            </p>
            <Link to="/contact" className="btn-primary">
              Contact Support
            </Link>
          </div>
        </div>
      </main>

      {/* Professional Footer */}
      <footer className="bg-white dark:bg-surface-800 border-t border-surface-200 dark:border-surface-700 mt-16">
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

export default FAQ;