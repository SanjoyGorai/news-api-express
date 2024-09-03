import { body, validationResult } from 'express-validator';

export const newsValidationRules = () => [
  body('author').isString().trim().escape(),
  body('title').isString().trim().escape(),
  body('content').isString().trim().escape(),
];

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
