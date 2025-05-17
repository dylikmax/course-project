import { body } from "express-validator";

const ordersSchemas = {
  new: [
    body("address")
      .isLength({ min: 1 })
      .withMessage("Address must be written.")
  ]}

export default ordersSchemas;