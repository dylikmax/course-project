import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import mysqlProvider from "../providers/mysql.provider.js";

const usersRouter = express.Router();

usersRouter.get(
  "/me",
  authMiddleware,
  async (req, res) => {
    const user = await mysqlProvider.getFullUserInfo(req.user.id);

    res.json(user);
  },
);

usersRouter.get(
  "/:id",
  authMiddleware,
  async (req, res) => {
    try {
      const id = req.params.id;
      const user = await mysqlProvider.getFullUserInfo(id);

      res.json(user);
    } catch (error) {
      if (error.message === "Account with this ID doesn`t exist.") {
        return res.status(404).json();
      }

      res.status(500).json({ error: error.message });
    }
  },
);

usersRouter.get(
  "/me/orders",
  authMiddleware,
  (req, res) => {
    res.send("my orders");
  },
);

export default usersRouter;
