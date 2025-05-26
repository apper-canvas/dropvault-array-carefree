import * as LucideIcons from 'lucide-react';

export const getIcon = (iconName) => {
  // Handle null/undefined case
  if (!iconName) {
    console.warn('No icon name provided, using HelpCircle as fallback');
    return LucideIcons.HelpCircle;
  }
  
  // Step 1: Try direct match first (if already PascalCase)
  if (LucideIcons[iconName] && typeof LucideIcons[iconName] === 'function') {
    return LucideIcons[iconName];
  }
  
  // Step 2: Handle various transformations from kebab-case to PascalCase
  let componentName = '';
  if (iconName.includes('-')) {
    // Handle kebab-case with numbers (bar-chart-2 → BarChart2)
    componentName = iconName
      .split('-')
      .map(part => {
        // Check if the part is just a number and attach it without capitalization
        if (/^\d+$/.test(part)) {
          return part;
        }
        // Otherwise capitalize the first letter
        return part.charAt(0).toUpperCase() + part.slice(1);
      })
      .join('');
  } else {
    // For single word icons, just capitalize first letter
    componentName = iconName.charAt(0).toUpperCase() + iconName.slice(1);
  }
  
  // Step 3: Check if we have a valid component after transformation
  if (LucideIcons[componentName] && typeof LucideIcons[componentName] === 'function') {
    return LucideIcons[componentName];
  }
  
  // Step 4: Try removing spaces and underscores (user_circle → UserCircle)
  const noSpaces = iconName
    .replace(/[\s_-]+/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
  
  if (LucideIcons[noSpaces] && typeof LucideIcons[noSpaces] === 'function') {
    return LucideIcons[noSpaces];
  }
  
  // Step 5: Try comprehensive icon mappings
  const iconMappings = {
    // File type icons
    'file-audio': 'FileAudio',
    'file-image': 'Image',
    'image': 'Image',
    'file-video': 'FileVideo',
    'file-x': 'FileX',
    'file-spreadsheet': 'FileSpreadsheet',
    'file-presentation': 'FileImage', // Use FileImage as fallback for presentation
    
    // Common UI icons
    'upload-cloud': 'CloudUpload',
    'arrow-left': 'ArrowLeft',
    'check-circle': 'CheckCircle',
    'alert-circle': 'AlertCircle',
    'share-2': 'Share2',
    'folder': 'Folder',
    'file': 'File',
    'file-text': 'FileText',
    'archive': 'Archive',
    'video': 'Video',
    'download': 'Download',
    'share': 'Share',
    'loader': 'Loader',
    'pause': 'Pause',
    'play': 'Play',
    'clock': 'Clock',
    'x': 'X',
    'check': 'Check',
    'lock': 'Lock',
    'credit-card': 'CreditCard',
    'database': 'Database',
    'shield': 'Shield',
    'server': 'Server',
    'zap': 'Zap',
    'sun': 'Sun',
    'moon': 'Moon',
    'trash-2': 'Trash2',
    'help-circle': 'HelpCircle',
    'mail': 'Mail',
    'chevron-down': 'ChevronDown',
    
    // Navigation and Header icons - COMPREHENSIVE MAPPING
    'menu': 'Menu',
    'search': 'Search',
    'bell': 'Bell',
    'user': 'User',
    'users': 'Users',
    'settings': 'Settings',
    'log-out': 'LogOut',
    'upload': 'Upload',
    'layout-dashboard': 'LayoutDashboard',
    'bar-chart-3': 'BarChart3',
    'analytics': 'BarChart3',
    'activity': 'Activity',
    'recent': 'Clock',
    'shared': 'Share2',
    'trash': 'Trash2',
    'profile': 'User',
    'billing': 'CreditCard',
    'upgrade': 'Zap',
    'faq': 'HelpCircle',
    'contact': 'Mail',
    'support': 'Mail',
    'about': 'Info',
    'docs': 'Book',
    'documentation': 'Book',
    
    // Dashboard specific icons
    'overview': 'LayoutDashboard',
    'dashboard': 'LayoutDashboard',
    'chart': 'BarChart3',
    'bar-chart': 'BarChart3',
    'statistics': 'BarChart3',
    
    // File management icons
    'my-files': 'Folder',
    'files': 'Folder',
    'shared-with-me': 'Share2',
    'shared-files': 'Share2',
    'recent-files': 'Clock',
    'deleted': 'Trash2',
    'recycle-bin': 'Trash2',
    
    // Account management icons
    'account': 'User',
    'user-profile': 'User',
    'preferences': 'Settings',
    'configuration': 'Settings',
    'payment': 'CreditCard',
    'subscription': 'CreditCard',
    'upgrade-storage': 'Zap',
    'storage-upgrade': 'Zap',
    'premium': 'Zap',
    
    // Help and support icons
    'help': 'HelpCircle',
    'question': 'HelpCircle',
    'support-contact': 'Mail',
    'email': 'Mail',
    'information': 'Info',
    'guide': 'Book',
    'manual': 'Book',
    'tutorial': 'Book',
    
    // Additional common icons
    'globe': 'Globe',
    'trending-up': 'TrendingUp',
    'heart': 'Heart',
    'eye': 'Eye',
    'alert-triangle': 'AlertTriangle',
    'x-circle': 'XCircle',
    'message-circle': 'MessageCircle',
    'send': 'Send',
    'phone': 'Phone',
    'map-pin': 'MapPin',
    'book': 'Book',
    'info': 'Info',
    
    // Icon variations and aliases
    'dashboard-layout': 'LayoutDashboard',
    'layout': 'LayoutDashboard',
    'chart-bar': 'BarChart3',
    'bar-graph': 'BarChart3',
    'folder-open': 'FolderOpen',
    'folder-closed': 'Folder',
    'file-document': 'FileText',
    'document': 'FileText',
    'share-arrow': 'Share2',
    'external-link': 'ExternalLink',
    'link': 'Link',
    'copy': 'Copy',
    'duplicate': 'Copy',
    'edit': 'Edit',
    'pencil': 'Edit',
    'modify': 'Edit',
    'delete': 'Trash2',
    'remove': 'Trash2',
    'close': 'X',
    'exit': 'X',
    'cancel': 'X',
    'logout': 'LogOut',
    'sign-out': 'LogOut',
    'signin': 'LogIn',
    'login': 'LogIn',
    'log-in': 'LogIn'
  };



  const mappedName = iconMappings[iconName.toLowerCase()];
  if (mappedName && LucideIcons[mappedName] && typeof LucideIcons[mappedName] === 'function') {
    return LucideIcons[mappedName];
  }
  
  // Step 6: Fallback with console warning for debugging
  console.warn(`Icon "${iconName}" not found in Lucide (tried "${componentName}" and mappings), using HelpCircle instead`);
  return LucideIcons.HelpCircle;
};