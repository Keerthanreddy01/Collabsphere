/**
 * Client-side Validation Utilities
 * Used for form validation before sending to backend
 */

/**
 * Validate email format
 * @param email - Email address to validate
 * @returns true if valid
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
 * - At least 8 characters
 * - Must contain uppercase, lowercase, number, and special character
 * @param password - Password to validate
 * @returns true if strong
 */
export const isStrongPassword = (password: string): boolean => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

/**
 * Validate username format
 * - 3-20 characters
 * - Only alphanumeric and underscore
 * - Cannot start with number
 * @param username - Username to validate
 * @returns true if valid
 */
export const isValidUsername = (username: string): boolean => {
  const usernameRegex = /^[a-zA-Z_][a-zA-Z0-9_]{2,19}$/;
  return usernameRegex.test(username);
};

/**
 * Validate URL format
 * @param url - URL to validate
 * @returns true if valid
 */
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Check if string is empty or only whitespace
 * @param str - String to check
 * @returns true if empty
 */
export const isEmpty = (str: string): boolean => {
  return typeof str !== 'string' || str.trim().length === 0;
};

/**
 * Validate phone number (basic international format)
 * @param phone - Phone number to validate
 * @returns true if valid
 */
export const isValidPhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
  return phoneRegex.test(phone);
};

/**
 * Validate file size
 * @param fileSizeInBytes - File size in bytes
 * @param maxSizeInMb - Maximum allowed size in MB
 * @returns true if valid
 */
export const isValidFileSize = (fileSizeInBytes: number, maxSizeInMb: number): boolean => {
  const maxSizeInBytes = maxSizeInMb * 1024 * 1024;
  return fileSizeInBytes <= maxSizeInBytes;
};

/**
 * Validate file type
 * @param fileName - File name with extension
 * @param allowedExtensions - Array of allowed extensions (e.g., ['jpg', 'png', 'pdf'])
 * @returns true if valid
 */
export const isValidFileType = (fileName: string, allowedExtensions: string[]): boolean => {
  const fileExtension = fileName.split('.').pop()?.toLowerCase();
  return fileExtension ? allowedExtensions.includes(fileExtension) : false;
};

/**
 * Validate URL slug
 * - Only lowercase letters, numbers, and hyphens
 * - Cannot start or end with hyphen
 * @param slug - Slug to validate
 * @returns true if valid
 */
export const isValidSlug = (slug: string): boolean => {
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return slugRegex.test(slug) && !slug.startsWith('-') && !slug.endsWith('-');
};

/**
 * Validate hex color
 * @param color - Hex color code
 * @returns true if valid
 */
export const isValidHexColor = (color: string): boolean => {
  const hexColorRegex = /^#(?:[0-9a-fA-F]{3}){1,2}$/;
  return hexColorRegex.test(color);
};

/**
 * Validation helper object for form fields
 */
export const validators = {
  required: (value: string): boolean => !isEmpty(value),
  email: isValidEmail,
  password: isStrongPassword,
  username: isValidUsername,
  url: isValidUrl,
  phone: isValidPhoneNumber,
  slug: isValidSlug,
  hexColor: isValidHexColor,
  minLength: (value: string, length: number): boolean => value.length >= length,
  maxLength: (value: string, length: number): boolean => value.length <= length,
};

/**
 * Form field validator - chain multiple validators
 * @param value - Value to validate
 * @param rules - Array of validator rules
 * @returns error message or empty string
 */
export const validateField = (
  value: string,
  rules: Array<{ validator: (val: string) => boolean; message: string }>
): string => {
  for (const rule of rules) {
    if (!rule.validator(value)) {
      return rule.message;
    }
  }
  return '';
};
