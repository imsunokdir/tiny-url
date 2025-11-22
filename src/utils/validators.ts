export const isValidUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === "http:" || urlObj.protocol === "https:";
  } catch {
    return false;
  }
};

export const isValidCode = (code: string): boolean => {
  // Code must be 6-8 alphanumeric characters
  const codeRegex = /^[A-Za-z0-9]{6,8}$/;
  return codeRegex.test(code);
};

export const generateRandomCode = (length: number = 6): string => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};
