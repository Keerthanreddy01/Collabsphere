/**
 * Validation Utilities
 * Production-ready validation helpers
 */

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate strong password
 * At least 8 chars, 1 uppercase, 1 lowercase, 1 number
 */
export const isStrongPassword = (password: string): boolean => {
  const minLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  return minLength && hasUppercase && hasLowercase && hasNumber;
};

/**
 * Validate username format
 */
export const isValidUsername = (username: string): boolean => {
  if (username.length < 3 || username.length > 30) return false;
  const usernameRegex = /^[a-zA-Z0-9_-]+$/;
  return usernameRegex.test(username);
};

/**
 * Validate URL format
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
 * Check if string is empty or whitespace
 */
export const isEmpty = (value: string | null | undefined): boolean => {
  return !value || value.trim().length === 0;
};

/**
 * Validate phone number
 */
export const isValidPhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;
  return phoneRegex.test(phone);
};

/**
 * Validate file size
 */
export const isValidFileSize = (bytes: number, maxMB: number = 5): boolean => {
  const maxBytes = maxMB * 1024 * 1024;
  return bytes <= maxBytes;
};
