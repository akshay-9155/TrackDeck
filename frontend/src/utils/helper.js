export const cleanObject = obj => Object.fromEntries(
  Object.entries(obj).filter(([_, value]) => value !== null && value !== "")
);

export const delayCall = ms => new Promise(resolve => setTimeout(resolve, ms));