// src/utils/generateId.ts
export const generateId = (prefix = "") => {
  return (
    prefix +
    Math.random().toString(36).substring(2, 10) +
    Date.now().toString(36)
  );
};
