import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import mysqlProvider from "../providers/mysql.provider.js";

const cartRouter = express.Router();

cartRouter.get(
  "/",
  authMiddleware,
  async (req, res) => {
    const cart = await mysqlProvider.getCart(req.user.id);

    res.json(cart);
  },
);

cartRouter.delete(
  "/",
  authMiddleware,
  async (req, res) => {
    const userId = req.user.id;

    await mysqlProvider.clearCart(userId);
    res.json();
  },
);

cartRouter.delete(
  "/:id",
  authMiddleware,
  async (req, res) => {
    const id = req.params.id;
    const userId = req.user.id;

    try {
        await mysqlProvider.deleteFromCart(userId, id);
        res.status(200).json();
    } catch (error) {
        return res.status(404).json();
    }
  },
);

export default cartRouter