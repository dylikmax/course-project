import express from "express";
import schemaCheck from "../validations/schema-check.js";
import userSchemas from "../validations/user.schemas.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import mysqlProvider from "../providers/mysql.provider.js";
import statuses from "../enums/statuses.enum.js";
import userAccessManager from "../access-managers/user.access-manager.js";

const usersRouter = express.Router();

usersRouter.get(
  "/employees",
  authMiddleware(statuses["Товаровед"]),
  async (req, res) => {
    const employees = await mysqlProvider.filterByLargerStatus(
      statuses["Арендодатель"],
    );

    res.send(employees);
  },
);

usersRouter.get(
  "/me/cars",
  authMiddleware(statuses["Арендодатель"]),
  (req, res) => {
    res.send("my cars");
  },
);

usersRouter.get(
  "/me",
  authMiddleware(statuses["Заблокирован"]),
  async (req, res) => {
    const user = await mysqlProvider.getFullUserInfo(req.user.id);

    res.json(user);
  },
);

usersRouter.patch(
  "/me",
  schemaCheck(userSchemas.user),
  authMiddleware(statuses["Заблокирован"]),
  async (req, res) => {
    res.send("patched yourself");
  },
);

usersRouter.get(
  "/:id",
  authMiddleware(statuses["Не авторизован"]),
  async (req, res) => {
    try {
      const id = req.params.id;
      const user = await mysqlProvider.getFullUserInfo(id);

      const sentData = userAccessManager(user, req.user.status);
      res.json(sentData);
    } catch (error) {
      if (error.message === "Account with this ID doesn`t exist.") {
        return res.status(404).json();
      }

      res.status(500).json({ error: error.message });
    }
  },
);

usersRouter.get(
  "/:id/cars",
  authMiddleware(statuses["Не авторизован"]),
  (req, res) => {
    res.send("cars by user id");
  },
);

usersRouter.get(
  "/me/orders",
  authMiddleware(statuses["Заблокирован"]),
  (req, res) => {
    res.send("my orders");
  },
);

usersRouter.patch(
  "/me/cars/change-visible-all",
  authMiddleware(statuses["Арендодатель"]),
  (req, res) => {
    res.send("hide/show all my cars");
  },
);

usersRouter.patch(
  "/:id/cars/change-visible-all",
  authMiddleware(statuses["Товаровед"]),
  (req, res) => {
    res.send("hide/show all user`s cars");
  },
);

usersRouter.get(
  "/:id/orders",
  authMiddleware(statuses["Товаровед"]),
  (req, res) => {
    res.send("orders by user id");
  },
);

usersRouter.patch(
  "/:id",
  schemaCheck(userSchemas.user),
  authMiddleware(statuses["Заместитель директора"]),
  (req, res) => {
    res.send("patched user");
  },
);

usersRouter.patch(
  "/:id/ban",
  schemaCheck(userSchemas.ban),
  authMiddleware(statuses["Заместитель директора"]),
  async (req, res) => {
    try {
      const { banReason } = req.body;
      const { id } = req.params;
      const adminId = req.user.id;

      await mysqlProvider.changeUserBan(id, banReason, adminId);

      res.json();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
);

usersRouter.patch(
  "/:id/unban",
  authMiddleware(statuses["Заместитель директора"]),
  async (req, res) => {
    try {
      const { id } = req.params;

      await mysqlProvider.changeUserBan(id);

      res.json();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
);

usersRouter.patch(
  "/:id/dismiss",
  authMiddleware(statuses["Заместитель директора"]),
  (req, res) => {
    res.send("dismiss employee");
  },
);

usersRouter.get(
  "/",
  authMiddleware(statuses["Заместитель директора"]),
  (req, res) => {
    res.send("searched user");
  },
);

export default usersRouter;
