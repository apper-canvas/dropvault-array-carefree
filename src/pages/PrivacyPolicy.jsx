import { Link } from 'react-router-dom';
import { getIcon } from '../utils/iconUtils';

const PrivacyPolicy = () => {
  const ArrowLeftIcon = getIcon('arrow-left');
  const LogoIcon = getIcon('database');

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-900">
      {/* Header */}
      <header className="bg-white dark:bg-surface-800 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white">
                <LogoIcon className="h-6 w-6" />
              </div>
              <h1 className="ml-3 text-xl font-bold">DropVault</h1>
            </Link>
            
            <Link 
              to="/" 
              className="flex items-center text-surface-600 dark:text-surface-400 hover:text-primary transition-colors"
            >
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="card">
            <h1 className="text-3xl font-bold mb-6 text-center">Privacy Policy</h1>
            <p className="text-surface-600 dark:text-surface-400 text-center mb-8">
              Last updated: December 2023
            </p>

            <div className="space-y-8">
              <section>
                <h2 className="text-xl font-semibold mb-4">1. Information We Collect</h2>
                <p className="text-surface-700 dark:text-surface-300 mb-4">
                  At DropVault, we collect information you provide directly to us, such as when you create an account, 
                  upload files, or contact us for support.
                </p>
                <ul className="list-disc list-inside text-surface-700 dark:text-surface-300 space-y-2">
                  <li>Account information (name, email address, password)</li>
                  <li>Files and content you upload to our service</li>
                  <li>Usage data and analytics</li>
                  <li>Device and browser information</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">2. How We Use Your Information</h2>
                <p className="text-surface-700 dark:text-surface-300 mb-4">
                  We use the information we collect to provide, maintain, and improve our services:
                </p>
                <ul className="list-disc list-inside text-surface-700 dark:text-surface-300 space-y-2">
                  <li>To provide and maintain the DropVault service</li>
                  <li>To process your transactions and send related information</li>
                  <li>To send technical notices and support messages</li>
                  <li>To improve our services and develop new features</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">3. Information Sharing</h2>
                <p className="text-surface-700 dark:text-surface-300 mb-4">
                  We do not sell, trade, or otherwise transfer your personal information to third parties except 
                  in the following circumstances:
                </p>
                <ul className="list-disc list-inside text-surface-700 dark:text-surface-300 space-y-2">
                  <li>With your explicit consent</li>
                  <li>To comply with legal obligations</li>
                  <li>To protect our rights and property</li>
                  <li>With trusted service providers who assist in our operations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">4. Data Security</h2>
                <p className="text-surface-700 dark:text-surface-300">
                  We implement appropriate security measures to protect your personal information against 
                  unauthorized access, alteration, disclosure, or destruction. This includes encryption of 
                  data in transit and at rest, regular security audits, and access controls.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">5. Your Rights</h2>
                <p className="text-surface-700 dark:text-surface-300 mb-4">
                  You have the right to:
                </p>
                <ul className="list-disc list-inside text-surface-700 dark:text-surface-300 space-y-2">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate information</li>
                  <li>Delete your account and associated data</li>
                  <li>Export your data</li>
                  <li>Opt out of marketing communications</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">6. Contact Us</h2>
                <p className="text-surface-700 dark:text-surface-300">
                  If you have any questions about this Privacy Policy, please contact us at:
                </p>
                <div className="mt-4 p-4 bg-surface-100 dark:bg-surface-700 rounded-lg">
                  <p className="text-surface-700 dark:text-surface-300">
                    Email: privacy@dropvault.com<br />
                    Address: 123 Cloud Street, Data City, DC 12345
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;