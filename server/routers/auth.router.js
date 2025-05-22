import express from "express";
import schemaCheck from "../validations/schema-check.js";
import authSchemas from "../validations/auth.schemas.js";
import mysqlProvider from "../providers/mysql.provider.js";
import authProvider from "../providers/auth.provider.js";
import cookieProvider from "../providers/cookie.provider.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  schemaCheck(authSchemas.registration),
  async (req, res) => {
    try {
      const user = req.body;

      const result = await mysqlProvider.addUser(user);

      const userId = result[0].insertId;
      const tokens = await authProvider.createTokens(userId, 0);

      cookieProvider.setTokens(res, tokens);

      res.json();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
);

authRouter.post(
  "/login",
  schemaCheck(authSchemas.login),
  async (req, res) => {
    try {
      const { login, password } = req.body;

      const user = await mysqlProvider.authenticateUser(login, password);
      const tokens = await authProvider.createTokens(user.id, user.status);

      cookieProvider.setTokens(res, tokens);

      res.json();
    } catch (error) {
      if (error.message === "Wrong password.") {
        return res.status(400).json({ error: error.message });
      }
      res.status(404).json({ error: error.message });
    }
  },
);

authRouter.get(
  "/check-auth",
  authMiddleware,
  async (req, res) => {
    try {
      res.json({ isAuth: true });
    } catch (error) {
      res.json({ isAuth: false });
    }
  },
);

authRouter.patch(
  "/change-password",
  schemaCheck(authSchemas.changePassword),
  authMiddleware,
  async (req, res) => {
    try {
      const { oldPassword, newPassword } = req.body;

      await mysqlProvider.changePassword(req.user.id, oldPassword, newPassword);
      res.json();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
);

authRouter.post(
  "/logout",
  authMiddleware,
  async (req, res) => {
    await mysqlProvider.deleteToken(req.cookies.refresh_token);
    cookieProvider.deleteTokens(res);
    res.json();
  },
);

export default authRouter;
