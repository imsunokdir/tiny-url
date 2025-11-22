export const validateUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const validateCode = (code: string): boolean => {
  if (!code) return true; // optional
  return /^[A-Za-z0-9]{6,8}$/.test(code);
};
