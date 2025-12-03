// src/utils/logger.ts
export const log = (...args: any[]) => {
  if (process.env.NODE_ENV !== "test") {
    console.log("[LOG]:", ...args);
  }
};

export const errorLog = (...args: any[]) => {
  if (process.env.NODE_ENV !== "test") {
    console.error("[ERROR]:", ...args);
  }
};
