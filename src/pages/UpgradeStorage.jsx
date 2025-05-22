import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getIcon } from '../utils/iconUtils';
import { motion } from 'framer-motion';

const UpgradeStorage = () => {
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });
  const [errors, setErrors] = useState({});

  // Icons
  const ArrowLeftIcon = getIcon('arrow-left');
  const CheckIcon = getIcon('check');
  const XIcon = getIcon('x');
  const LockIcon = getIcon('lock');
  const CreditCardIcon = getIcon('credit-card');
  const DatabaseIcon = getIcon('database');
  const ShieldIcon = getIcon('shield');
  const ServerIcon = getIcon('server');
  const BoltIcon = getIcon('zap');

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      storage: '10 GB',
      price: '$5.99',
      period: 'month',
      features: [
        'Up to 10 GB of storage',
        '250 MB max file size',
        'Basic file sharing',
        'Email support'
      ],
      icon: DatabaseIcon
    },
    {
      id: 'pro',
      name: 'Pro',
      storage: '100 GB',
      price: '$12.99',
      period: 'month',
      popular: true,
      features: [
        'Up to 100 GB of storage',
        '2 GB max file size',
        'Advanced file sharing',
        'Password protected links',
        'Priority support'
      ],
      icon: ServerIcon
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      storage: '500 GB',
      price: '$29.99',
      period: 'month',
      features: [
        'Up to 500 GB of storage',
        'Unlimited file size',
        'Team collaboration features',
        'Custom branding',
        'Advanced security features',
        '24/7 dedicated support'
      ],
      icon: ShieldIcon
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo({
      ...paymentInfo,
      [name]: value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!paymentInfo.cardNumber.trim()) {
      newErrors.cardNumber = 'Card number is required';
    } else if (!/^\d{16}$/.test(paymentInfo.cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = 'Please enter a valid 16-digit card number';
    }
    
    if (!paymentInfo.cardName.trim()) {
      newErrors.cardName = 'Cardholder name is required';
    }
    
    if (!paymentInfo.expiryDate.trim()) {
      newErrors.expiryDate = 'Expiry date is required';
    } else if (!/^\d{2}\/\d{2}$/.test(paymentInfo.expiryDate)) {
      newErrors.expiryDate = 'Please use MM/YY format';
    }
    
    if (!paymentInfo.cvv.trim()) {
      newErrors.cvv = 'CVV is required';
    } else if (!/^\d{3,4}$/.test(paymentInfo.cvv)) {
      newErrors.cvv = 'CVV must be 3 or 4 digits';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please correct the errors in the form');
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      
      // Show success message (90% success rate to simulate occasional failures)
      if (Math.random() < 0.9) {
        toast.success(`Successfully upgraded to ${selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)} plan!`);
      } else {
        toast.error('Payment processing failed. Please try again or contact support.');
      }
    }, 2000);
  };

  const selectedPlanDetails = plans.find(plan => plan.id === selectedPlan);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white dark:bg-surface-800 shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center">
            <Link to="/" className="text-surface-600 hover:text-surface-900 dark:text-surface-400 dark:hover:text-white flex items-center">
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-4">Upgrade Your Storage</h1>
            <p className="text-surface-600 dark:text-surface-400 max-w-2xl mx-auto">
              Choose a plan that works for you. All plans include secure file transfer, 
              encryption, and our reliable cloud storage infrastructure.
            </p>
          </div>

          {/* Plans Selection */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {plans.map(plan => (
              <div 
                key={plan.id}
                className={`card relative hover:shadow-lg transition-all cursor-pointer
                  ${selectedPlan === plan.id ? 'ring-2 ring-primary' : 'hover:scale-105'}
                  ${plan.popular ? 'md:transform md:scale-105 md:shadow-lg' : ''}
                `}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-accent text-white text-xs font-bold py-1 px-3 rounded-full">
                    Most Popular
                  </div>
                )}
                
                <div className="text-center">
                  <div className="inline-flex items-center justify-center p-3 bg-primary/10 dark:bg-primary/20 rounded-full mb-4">
                    <plan.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <div className="text-3xl font-bold mb-1">{plan.price}</div>
                  <div className="text-surface-500 dark:text-surface-400 text-sm mb-4">per {plan.period}</div>
                  <div className="text-lg font-semibold mb-4">{plan.storage}</div>
                </div>
                
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                {selectedPlan === plan.id && (
                  <div className="flex justify-center">
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="bg-primary text-white text-sm px-3 py-1 rounded-full flex items-center"
                    >
                      <CheckIcon className="h-4 w-4 mr-1" />
                      Selected
                    </motion.div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Payment Form */}
          <div className="card mb-8">
            <div className="flex items-center mb-6">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-4">
                <CreditCardIcon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Payment Information</h3>
                <p className="text-surface-500 dark:text-surface-400 text-sm">
                  Secure payment processing. Your information is protected.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="cardNumber" className="block text-sm font-medium mb-2">
                    Card Number
                  </label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={paymentInfo.cardNumber}
                    onChange={handleInputChange}
                    className={`input ${errors.cardNumber ? 'border-red-500 dark:border-red-500' : ''}`}
                  />
                  {errors.cardNumber && (
                    <p className="mt-1 text-sm text-red-500">{errors.cardNumber}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="cardName" className="block text-sm font-medium mb-2">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    id="cardName"
                    name="cardName"
                    placeholder="John Smith"
                    value={paymentInfo.cardName}
                    onChange={handleInputChange}
                    className={`input ${errors.cardName ? 'border-red-500 dark:border-red-500' : ''}`}
                  />
                  {errors.cardName && (
                    <p className="mt-1 text-sm text-red-500">{errors.cardName}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="expiryDate" className="block text-sm font-medium mb-2">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    id="expiryDate"
                    name="expiryDate"
                    placeholder="MM/YY"
                    value={paymentInfo.expiryDate}
                    onChange={handleInputChange}
                    className={`input ${errors.expiryDate ? 'border-red-500 dark:border-red-500' : ''}`}
                  />
                  {errors.expiryDate && (
                    <p className="mt-1 text-sm text-red-500">{errors.expiryDate}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="cvv" className="block text-sm font-medium mb-2">
                    CVV
                  </label>
                  <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    placeholder="123"
                    value={paymentInfo.cvv}
                    onChange={handleInputChange}
                    className={`input ${errors.cvv ? 'border-red-500 dark:border-red-500' : ''}`}
                  />
                  {errors.cvv && (
                    <p className="mt-1 text-sm text-red-500">{errors.cvv}</p>
                  )}
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="flex items-center text-surface-500 dark:text-surface-400 mb-4 md:mb-0">
                  <LockIcon className="h-4 w-4 mr-2" />
                  <span className="text-sm">Your payment is secure and encrypted</span>
                </div>
                <button 
                  type="submit" 
                  className={`btn-primary ${isProcessing ? 'opacity-75 cursor-not-allowed' : ''}`}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>Purchase {selectedPlanDetails?.name} Plan</>
                  )}
                </button>
              </div>
            </form>
          </div>

          <div className="text-center text-surface-500 dark:text-surface-400 text-sm">
            <p>
              Need help choosing? <a href="#" className="text-primary hover:underline">Contact our support team</a> for assistance.
            </p>
          </div>
        </div>
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

export default UpgradeStorage;