import express from "express";
import authRouter from "./routers/auth.router.js";
import usersRouter from "./routers/users.router.js";
import cookieParser from "cookie-parser";
import productsRouter from "./routers/products.router.js";
import cartRouter from "./routers/cart.router.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

const PORT = 3000;

app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter)
app.use("/cart", cartRouter)

app.listen(PORT, () => {});
