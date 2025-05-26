import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getIcon } from '../utils/iconUtils';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const ArrowLeftIcon = getIcon('arrow-left');
  const LogoIcon = getIcon('database');
  const MailIcon = getIcon('mail');
  const PhoneIcon = getIcon('phone');
  const MapPinIcon = getIcon('map-pin');
  const SendIcon = getIcon('send');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error('Name is required');
      return false;
    }
    if (!formData.email.trim()) {
      toast.error('Email is required');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return false;
    }
    if (!formData.subject.trim()) {
      toast.error('Subject is required');
      return false;
    }
    if (!formData.message.trim()) {
      toast.error('Message is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (

    <div className="min-h-screen bg-surface-50 dark:bg-surface-900">

      {/* Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
            <p className="text-surface-600 dark:text-surface-400 text-lg">
              We're here to help. Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div className="card">
              <h2 className="text-xl font-semibold mb-6">Get in Touch</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-primary/10 dark:bg-primary/20 rounded-lg flex items-center justify-center">
                      <MailIcon className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-surface-900 dark:text-surface-100">Email</h3>
                    <p className="text-surface-600 dark:text-surface-400">support@dropvault.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-primary/10 dark:bg-primary/20 rounded-lg flex items-center justify-center">
                      <PhoneIcon className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-surface-900 dark:text-surface-100">Phone</h3>
                    <p className="text-surface-600 dark:text-surface-400">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-primary/10 dark:bg-primary/20 rounded-lg flex items-center justify-center">
                      <MapPinIcon className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-surface-900 dark:text-surface-100">Address</h3>
                    <p className="text-surface-600 dark:text-surface-400">
                      123 Cloud Street<br />
                      Data City, DC 12345
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="card">
              <h2 className="text-xl font-semibold mb-6">Send us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="input"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="input"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="input"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="5"
                    className="input resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <SendIcon className="h-4 w-4 mr-2" />
                      Send Message
                    </span>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

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

      </main>
    </div>
  );
};

export default Contact;