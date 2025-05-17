import { body } from "express-validator";

const cartSchemas = {
  delete: [
    body("deleteCount")
      .optional()
      .isInt()
      .isLength({ min: 1 })
      .withMessage("Delete count should be more than zero.")
  ]}

export default cartSchemas;