// generator + validator for codes
export function generateCode(length = 6) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let s = "";
  for (let i = 0; i < length; i++)
    s += chars[Math.floor(Math.random() * chars.length)];
  return s;
}

export function validateCode(code: string) {
  return /^[A-Za-z0-9]{6,8}$/.test(code);
}
