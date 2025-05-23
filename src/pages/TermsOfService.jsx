import { Link } from 'react-router-dom';
import { getIcon } from '../utils/iconUtils';

const TermsOfService = () => {
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
            <h1 className="text-3xl font-bold mb-6 text-center">Terms of Service</h1>
            <p className="text-surface-600 dark:text-surface-400 text-center mb-8">
              Last updated: December 2023
            </p>

            <div className="space-y-8">
              <section>
                <h2 className="text-xl font-semibold mb-4">1. Acceptance of Terms</h2>
                <p className="text-surface-700 dark:text-surface-300">
                  By accessing and using DropVault, you accept and agree to be bound by the terms and 
                  provision of this agreement. If you do not agree to abide by the above, please do not 
                  use this service.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">2. Use License</h2>
                <p className="text-surface-700 dark:text-surface-300 mb-4">
                  Permission is granted to temporarily use DropVault for personal, non-commercial 
                  transitory viewing only. This is the grant of a license, not a transfer of title, and 
                  under this license you may not:
                </p>
                <ul className="list-disc list-inside text-surface-700 dark:text-surface-300 space-y-2">
                  <li>Modify or copy the materials</li>
                  <li>Use the materials for any commercial purpose or for any public display</li>
                  <li>Attempt to reverse engineer any software contained on the website</li>
                  <li>Remove any copyright or other proprietary notations from the materials</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">3. User Account</h2>
                <p className="text-surface-700 dark:text-surface-300 mb-4">
                  When you create an account with us, you must provide information that is accurate, 
                  complete, and current at all times. You are responsible for:
                </p>
                <ul className="list-disc list-inside text-surface-700 dark:text-surface-300 space-y-2">
                  <li>Safeguarding your password and all activities under your account</li>
                  <li>Notifying us immediately of any unauthorized use of your account</li>
                  <li>Ensuring your contact information is up to date</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">4. Prohibited Uses</h2>
                <p className="text-surface-700 dark:text-surface-300 mb-4">
                  You may not use DropVault:
                </p>
                <ul className="list-disc list-inside text-surface-700 dark:text-surface-300 space-y-2">
                  <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                  <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                  <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                  <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                  <li>To submit false or misleading information</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">5. Service Availability</h2>
                <p className="text-surface-700 dark:text-surface-300">
                  We strive to provide uninterrupted service, but we do not guarantee that the service will 
                  be available at all times. We may experience hardware, software, or other problems or 
                  need to perform maintenance related to the service, resulting in interruptions, delays, 
                  or errors.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">6. Disclaimer</h2>
                <p className="text-surface-700 dark:text-surface-300">
                  The materials on DropVault are provided on an 'as is' basis. DropVault makes no 
                  warranties, expressed or implied, and hereby disclaims and negates all other warranties 
                  including without limitation, implied warranties or conditions of merchantability, 
                  fitness for a particular purpose, or non-infringement of intellectual property or 
                  other violation of rights.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">7. Limitations</h2>
                <p className="text-surface-700 dark:text-surface-300">
                  In no event shall DropVault or its suppliers be liable for any damages (including, 
                  without limitation, damages for loss of data or profit, or due to business interruption) 
                  arising out of the use or inability to use the materials on DropVault, even if DropVault 
                  or an authorized representative has been notified orally or in writing of the possibility 
                  of such damage.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">8. Contact Information</h2>
                <p className="text-surface-700 dark:text-surface-300">
                  If you have any questions about these Terms of Service, please contact us at:
                </p>
                <div className="mt-4 p-4 bg-surface-100 dark:bg-surface-700 rounded-lg">
                  <p className="text-surface-700 dark:text-surface-300">
                    Email: legal@dropvault.com<br />
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

export default TermsOfService;