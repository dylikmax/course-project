import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import mysqlProvider from "../providers/mysql.provider.js";
import schemaCheck from "../validations/schema-check.js";
import ordersSchemas from "../validations/orders.schemas.js";

const ordersRouter = express.Router();

ordersRouter.get(
  "/",
  authMiddleware,
  async (req, res) => {
    const orders = await mysqlProvider.getOrders(req.user.id);

    res.json(orders);
  },
);

ordersRouter.get(
  "/:id",
  authMiddleware,
  async (req, res) => {
    const orderId = req.params.id
    try {
      const orders = await mysqlProvider.getOrder(req.user.id, orderId);
      
      res.json(orders);
    } catch (error) {
      res.status(404).json();
    }

  },
);

ordersRouter.delete(
  "/:id",
  authMiddleware,
  async (req, res) => {
    const orderId = req.params.id
    try {
      await mysqlProvider.deleteOrder(req.user.id, orderId);
      
      res.json();
    } catch (error) {
      res.status(404).json();
    }

  },
);

ordersRouter.post(
  "/",
  schemaCheck(ordersSchemas.new),
  authMiddleware,
  async (req, res) => {
    try {
      await mysqlProvider.newOrder(req.user.id, req.body.address);
  
      res.json();
    } catch (error) {
      if (error.message === "Order must be non empty") {
        res.status(400).json({ error: error.message })
      }

      res.status(500).json({ error: error.message })
    }
  },
);

export default ordersRouter;