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
  
  // Step 4: Advanced retry - try various transformations if needed
  // Try removing spaces and underscores (user_circle → UserCircle)
  const noSpaces = componentName.replace(/[\s_]/g, '');
  if (LucideIcons[noSpaces] && typeof LucideIcons[noSpaces] === 'function') {
  // Step 5: Try common icon mappings
  const iconMappings = {
    // File type icons
    'file-audio': 'FileAudio',
    'file-image': 'FileImage',
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
    'image': 'Image',
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
    'help-circle': 'HelpCircle'
  };
  
  // Try the mapping
  if (iconMappings[iconName]) {
    const mappedName = iconMappings[iconName];
    if (LucideIcons[mappedName] && typeof LucideIcons[mappedName] === 'function') {
      return LucideIcons[mappedName];
    }
  }
  
  // Step 6: Try some common variations
  const variations = [
    componentName.replace(/Icon$/, ''), // Remove Icon suffix if present
    componentName + 'Icon', // Add Icon suffix
    iconName.replace(/-/g, '').toLowerCase(), // Remove dashes and lowercase
  ];
  
  // Fallback with console warning for debugging
  console.warn(`Icon "${iconName}" not found in Lucide (tried "${componentName}" and mappings), using HelpCircle instead`);
  return LucideIcons.HelpCircle;
  // Try inserting number without space (barChart2 → BarChart2)
  const numberPattern = /([A-Za-z])(\d+)$/;
  const withNumber = componentName.replace(numberPattern, '$1$2');
  if (LucideIcons[withNumber] && typeof LucideIcons[withNumber] === 'function') {
    return LucideIcons[withNumber];
  }
  
  // Fallback with console warning for debugging
  console.warn(`Icon "${iconName}" not found in Lucide (tried "${componentName}"), using Smile instead`);
  return LucideIcons.Smile;
};