/**
 * String Formatting and Manipulation Utilities
 * Common string operations for UI display and data formatting
 */

/**
 * Format date to readable string
 * @param date - Date object or timestamp
 * @param format - Format type ('short', 'long', 'time', 'relative')
 * @returns Formatted date string
 */
export const formatDate = (
  date: Date | number,
  format: 'short' | 'long' | 'time' | 'relative' = 'short'
): string => {
  const dateObj = typeof date === 'number' ? new Date(date) : date;

  switch (format) {
    case 'short':
      return dateObj.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: dateObj.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined,
      });
    case 'long':
      return dateObj.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
    case 'time':
      return dateObj.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      });
    case 'relative':
      return formatRelativeDate(dateObj);
    default:
      return dateObj.toISOString();
  }
};

/**
 * Format relative date (e.g., "2 hours ago")
 * @param date - Date to format
 * @returns Relative date string
 */
const formatRelativeDate = (date: Date): string => {
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return `${seconds}s ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;

  return formatDate(date, 'short');
};

/**
 * Format number with thousands separator
 * @param num - Number to format
 * @param decimals - Decimal places (default: 0)
 * @returns Formatted number string
 */
export const formatNumber = (num: number, decimals: number = 0): string => {
  return num.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};

/**
 * Format number as currency
 * @param num - Number to format
 * @param currency - Currency code (default: 'USD')
 * @returns Formatted currency string
 */
export const formatCurrency = (num: number, currency: string = 'USD'): string => {
  return num.toLocaleString('en-US', {
    style: 'currency',
    currency,
  });
};

/**
 * Format file size in human-readable format
 * @param bytes - File size in bytes
 * @returns Formatted file size
 */
export const formatFileSize = (bytes: number): string => {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(2)} ${units[unitIndex]}`;
};

/**
 * Truncate string to maximum length with ellipsis
 * @param text - Text to truncate
 * @param maxLength - Maximum length
 * @param suffix - Suffix for truncated text (default: '...')
 * @returns Truncated string
 */
export const truncateText = (text: string, maxLength: number, suffix: string = '...'): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - suffix.length) + suffix;
};

/**
 * Convert string to URL-friendly slug
 * @param text - Text to convert
 * @returns URL slug
 */
export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
};

/**
 * Capitalize first letter
 * @param text - Text to capitalize
 * @returns Capitalized text
 */
export const capitalize = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

/**
 * Convert string to title case
 * @param text - Text to convert
 * @returns Title case string
 */
export const toTitleCase = (text: string): string => {
  return text
    .toLowerCase()
    .split(' ')
    .map((word) => capitalize(word))
    .join(' ');
};

/**
 * Format username with @ prefix
 * @param username - Username
 * @param includeAt - Include @ prefix (default: true)
 * @returns Formatted username
 */
export const formatUsername = (username: string, includeAt: boolean = true): string => {
  const cleaned = username.replace(/^@/, '').trim();
  return includeAt ? `@${cleaned}` : cleaned;
};

/**
 * Format hashtag
 * @param tag - Tag text
 * @param includeHash - Include # prefix (default: true)
 * @returns Formatted hashtag
 */
export const formatHashtag = (tag: string, includeHash: boolean = true): string => {
  const cleaned = tag.replace(/^#/, '').trim();
  return includeHash ? `#${cleaned}` : cleaned;
};

/**
 * Convert URL to display format
 * @param url - URL to format
 * @returns Display format URL
 */
export const formatUrl = (url: string): string => {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.replace('www.', '');
  } catch {
    return url;
  }
};

/**
 * Highlight text with specified word
 * @param text - Text to search in
 * @param highlight - Word to highlight
 * @returns Text with HTML highlighting
 */
export const highlightText = (text: string, highlight: string): string => {
  if (!highlight.trim()) return text;

  const regex = new RegExp(`(${highlight})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
};

/**
 * Remove HTML tags from string
 * @param html - HTML string
 * @returns Plain text
 */
export const stripHtml = (html: string): string => {
  const temp = document.createElement('div');
  temp.innerHTML = html;
  return temp.textContent || temp.innerText || '';
};

/**
 * Escape HTML special characters
 * @param text - Text to escape
 * @returns Escaped text
 */
export const escapeHtml = (text: string): string => {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
};

/**
 * Count words in text
 * @param text - Text to count
 * @returns Word count
 */
export const countWords = (text: string): number => {
  return text.trim().split(/\s+/).filter((word) => word.length > 0).length;
};

/**
 * Generate initials from name
 * @param name - Full name
 * @returns Initials (2 characters max)
 */
export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join('');
};

/**
 * Repeat string n times
 * @param text - Text to repeat
 * @param times - Number of times
 * @returns Repeated string
 */
export const repeatString = (text: string, times: number): string => {
  return text.repeat(Math.max(0, times));
};

/**
 * Reverse string
 * @param text - Text to reverse
 * @returns Reversed string
 */
export const reverseString = (text: string): string => {
  return text.split('').reverse().join('');
};
