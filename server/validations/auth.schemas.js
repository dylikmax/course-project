import { body } from "express-validator";

const authSchemas = {
  registration: [
    body("login")
      .isLength({ min: 3 })
      .withMessage("Login should be at least 3 characters long.")
      .isLength({ max: 50 })
      .withMessage("Login should be no more than 50 characters long."),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password should be at least 8 characters long."),
    body("email")
      .isEmail()
      .withMessage("Wrong email format.")
  ],
  login: [
    body("login")
      .isLength({ min: 3 })
      .withMessage("Login should be at least 3 characters long.")
      .isLength({ max: 50 })
      .withMessage("Login should be no more than 50 characters long."),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password should be at least 8 characters long."),
  ],
  changePassword: [
    body("oldPassword")
      .isLength({ min: 8 })
      .withMessage("Password should be at least 8 characters long."),
    body("newPassword")
      .isLength({ min: 8 })
      .withMessage("Password should be at least 8 characters long."),
  ],
};

export default authSchemas;
