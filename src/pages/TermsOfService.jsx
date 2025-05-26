import { Link } from 'react-router-dom';
import { getIcon } from '../utils/iconUtils';

const TermsOfService = () => {
  const ArrowLeftIcon = getIcon('arrow-left');
  const LogoIcon = getIcon('database');
  const FileTextIcon = getIcon('file-text');
  const AlertTriangleIcon = getIcon('alert-triangle');
  const CheckCircleIcon = getIcon('check-circle');
  const XCircleIcon = getIcon('x-circle');

  return (

    <div className="min-h-screen bg-surface-50 dark:bg-surface-900">

      {/* Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center p-3 bg-primary/10 dark:bg-primary/20 rounded-full mb-4">
              <FileTextIcon className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
            <p className="text-surface-600 dark:text-surface-400 text-lg">
              Please read these terms carefully before using our service. By using DropVault, you agree to these terms.
            </p>
            <p className="text-surface-500 dark:text-surface-500 text-sm mt-2">
              Last updated: December 2023
            </p>
          </div>

          <div className="space-y-8">
            {/* Acceptance of Terms */}
            <div className="card">
              <div className="flex items-center mb-4">
                <div className="h-8 w-8 bg-primary/10 dark:bg-primary/20 rounded-lg flex items-center justify-center mr-3">
                  <CheckCircleIcon className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-xl font-semibold">Acceptance of Terms</h2>
              </div>
              
              <p className="text-surface-600 dark:text-surface-400 text-sm">
                By accessing and using DropVault, you accept and agree to be bound by the terms and provision 
                of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </div>

            {/* Use of Service */}
            <div className="card">
              <h2 className="text-xl font-semibold mb-4">Use of Service</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2 text-green-600 dark:text-green-400">Permitted Uses</h3>
                  <ul className="space-y-1 text-surface-600 dark:text-surface-400 text-sm">
                    <li>• Store and share your personal and business files</li>
                    <li>• Collaborate with others on shared content</li>
                    <li>• Access your files from multiple devices</li>
                    <li>• Use our API for legitimate integrations</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2 text-red-600 dark:text-red-400">Prohibited Uses</h3>
                  <ul className="space-y-1 text-surface-600 dark:text-surface-400 text-sm">
                    <li>• Upload illegal, harmful, or infringing content</li>
                    <li>• Share copyrighted material without permission</li>
                    <li>• Use the service for spam or malicious activities</li>
                    <li>• Attempt to gain unauthorized access to our systems</li>
                    <li>• Reverse engineer or modify our software</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* User Obligations */}
            <div className="card">
              <div className="flex items-center mb-4">
                <div className="h-8 w-8 bg-primary/10 dark:bg-primary/20 rounded-lg flex items-center justify-center mr-3">
                  <AlertTriangleIcon className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-xl font-semibold">User Obligations</h2>
              </div>
              
              <div className="space-y-4">
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                  <h3 className="font-medium mb-2 text-yellow-800 dark:text-yellow-200">Account Security</h3>
                  <p className="text-yellow-700 dark:text-yellow-300 text-sm">
                    You are responsible for maintaining the confidentiality of your account credentials and 
                    for all activities that occur under your account.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Content Responsibility</h3>
                  <p className="text-surface-600 dark:text-surface-400 text-sm">
                    You retain ownership of your content and are solely responsible for the content you upload, 
                    store, or share through our service. You must ensure you have the right to use and share any content.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Compliance</h3>
                  <p className="text-surface-600 dark:text-surface-400 text-sm">
                    You agree to comply with all applicable laws and regulations when using our service. 
                    This includes data protection laws, intellectual property rights, and export control regulations.
                  </p>
                </div>
              </div>
            </div>

            {/* Service Limitations */}
            <div className="card">
              <h2 className="text-xl font-semibold mb-4">Service Limitations</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Storage Limits</h3>
                  <p className="text-surface-600 dark:text-surface-400 text-sm">
                    Each account has storage limits based on your subscription plan. We may suspend or 
                    terminate accounts that exceed their allocated storage.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">File Types and Sizes</h3>
                  <p className="text-surface-600 dark:text-surface-400 text-sm">
                    We may restrict certain file types or impose file size limits. We reserve the right 
                    to scan files for security purposes and may block or remove files that violate our policies.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Service Availability</h3>
                  <p className="text-surface-600 dark:text-surface-400 text-sm">
                    While we strive for high availability, we do not guarantee uninterrupted service. 
                    We may perform maintenance, updates, or experience downtime that temporarily affects access.
                  </p>
                </div>
              </div>
            </div>

            {/* Termination */}
            <div className="card">
              <div className="flex items-center mb-4">
                <div className="h-8 w-8 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center mr-3">
                  <XCircleIcon className="h-5 w-5 text-red-600" />
                </div>
                <h2 className="text-xl font-semibold">Termination</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Termination by You</h3>
                  <p className="text-surface-600 dark:text-surface-400 text-sm">
                    You may terminate your account at any time through your account settings. 
                    Upon termination, your files will be deleted within 30 days.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Termination by Us</h3>
                  <p className="text-surface-600 dark:text-surface-400 text-sm">
                    We may suspend or terminate your account if you violate these terms, fail to pay fees, 
                    or if we determine that your use of the service poses a security risk or violates applicable laws.
                  </p>
                </div>
              </div>
            </div>

            {/* Disclaimers */}
            <div className="card">
              <h2 className="text-xl font-semibold mb-4">Disclaimers and Limitation of Liability</h2>
              
              <div className="bg-surface-50 dark:bg-surface-700/50 p-4 rounded-lg">
                <p className="text-surface-600 dark:text-surface-400 text-sm mb-4">
                  THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND. WE DISCLAIM ALL WARRANTIES, 
                  EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
                </p>
                
                <p className="text-surface-600 dark:text-surface-400 text-sm">
                  IN NO EVENT SHALL DROPVAULT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, 
                  OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, 
                  OR OTHER INTANGIBLE LOSSES.
                </p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="card">
              <h2 className="text-xl font-semibold mb-4">Questions About These Terms</h2>
              <p className="text-surface-600 dark:text-surface-400 text-sm mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              
              <div className="space-y-2 text-sm">
                <p className="text-surface-600 dark:text-surface-400">
                  <strong>Email:</strong> legal@dropvault.com
                </p>
                <p className="text-surface-600 dark:text-surface-400">
                  <strong>Address:</strong> 123 Cloud Street, Data City, DC 12345
                </p>
                <p className="text-surface-600 dark:text-surface-400">
                  <strong>Phone:</strong> +1 (555) 123-4567
                </p>
              </div>
            </div>
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

export default TermsOfService;