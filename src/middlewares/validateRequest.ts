import { AnyZodObject } from "zod";
import { Request, Response, NextFunction } from "express";

const validateRequest =
  (schema: AnyZodObject) =>
  (req: Request<{}, {}, any>, res: Response, next: NextFunction) => {
    try {
      schema.parse({ body: req.body });

      next();
    } catch (e: any) {
      next(e);
    }
  };

export default validateRequest;
