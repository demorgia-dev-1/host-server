"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateRequest = (schema) => (req, res, next) => {
    try {
        schema.parse({ body: req.body });
        next();
    }
    catch (e) {
        next(e);
    }
};
exports.default = validateRequest;
