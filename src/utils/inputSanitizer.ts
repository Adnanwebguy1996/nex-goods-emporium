
// Input sanitization utilities
export const sanitizeInput = (input: string): string => {
  // Remove potentially dangerous characters and HTML tags
  return input
    .replace(/[<>]/g, '') // Remove < and > to prevent HTML injection
    .replace(/['"]/g, '') // Remove quotes to prevent attribute injection
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers like onclick=
    .trim();
};

export const sanitizeNumber = (input: number): number => {
  // Ensure it's a valid positive number
  const num = Number(input);
  return isNaN(num) || num < 0 ? 0 : Math.round(num * 100) / 100; // Round to 2 decimal places
};

export const sanitizeUrl = (url: string): string => {
  // Basic URL validation and sanitization
  const sanitized = sanitizeInput(url);
  
  // Only allow http/https protocols
  if (sanitized && !sanitized.startsWith('http://') && !sanitized.startsWith('https://')) {
    return '';
  }
  
  return sanitized;
};

export const validateFormData = (data: any): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  // Check required fields
  if (!data.title || data.title.length < 2) {
    errors.push('Product title must be at least 2 characters long');
  }
  
  if (!data.description || data.description.length < 10) {
    errors.push('Product description must be at least 10 characters long');
  }
  
  if (!data.price || data.price <= 0) {
    errors.push('Price must be greater than 0');
  }
  
  if (data.externalLink && !data.externalLink.startsWith('http')) {
    errors.push('External link must be a valid URL starting with http:// or https://');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};
