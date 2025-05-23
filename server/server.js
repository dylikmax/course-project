import express from "express";
import cors from "cors";
import authRouter from "./routers/auth.router.js";
import usersRouter from "./routers/users.router.js";
import cookieParser from "cookie-parser";
import productsRouter from "./routers/products.router.js";
import cartRouter from "./routers/cart.router.js";
import ordersRouter from "./routers/orders.router.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

const PORT = 3000;

app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/cart", cartRouter);
app.use("/orders", ordersRouter)

app.listen(PORT, () => {});
