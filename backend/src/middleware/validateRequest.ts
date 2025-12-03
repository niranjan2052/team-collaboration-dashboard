import { message } from './../../node_modules/aws-sdk/clients/customerprofiles.d';
// src/middleware/validateRequest.ts
import type { Request, Response, NextFunction } from "express";
import { z } from "zod";

export const validateRequest = (schema: z.ZodType<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      next();
    } catch (err: any) {
      return res.status(400).json({
        message: "Validation error",
        errors: err.message || err.errors,
      });
    }
  };
};
