import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import mysqlProvider from "../providers/mysql.provider.js";

const productsRouter = express.Router();

productsRouter.get("/", authMiddleware, async (req, res) => {
  const { name, cars, colors, price } = req.query;
  const products = await mysqlProvider.getProducts();

  const filteredProducts = products.filter((product) => {
    let isValid = true;

    if (name) {
      isValid =
        isValid && product.name.toLowerCase().includes(name.toLowerCase());
    }

    if (cars) {
      const carsArray = Array.isArray(cars) ? cars : [cars];
      isValid = isValid && carsArray.includes(product.car);
    }

    if (colors) {
      const colorsArray = Array.isArray(colors) ? colors : [colors];
      isValid = isValid && colorsArray.includes(product.color);
    }

    if (price) {
      const [minPrice, maxPrice] = price.split(",").map(Number);
      isValid =
        isValid && product.price >= minPrice && product.price <= maxPrice;
    }

    return isValid;
  });
  
  res.json(filteredProducts);
});

productsRouter.get("/filters", authMiddleware, async (req, res) => {
    const filters = await mysqlProvider.getFilters();
    res.json(filters);
});

productsRouter.get("/:id", authMiddleware, async (req, res) => {
  try {
    const id = req.params.id;
    const product = await mysqlProvider.getProduct(id);

    res.json(product);
  } catch (error) {
    if (error.message === "Product with this ID doesn`t exist.") {
      return res.status(404).json();
    }

    res.status(500).json({ error: error.message });
  }
});

productsRouter.post("/:id/to-cart", authMiddleware, async (req, res) => {
  try {
    const productId = req.params.id;
    const userId = req.user.id;
    const id = await mysqlProvider.addToCart(userId, productId);

    res.status(200).json(id);
  } catch (error) {
    if (error.message === "Product with this ID doesn`t exist.") {
      return res.status(404).json();
    }

    res.status(500).json({ error: error.message });
  }
});

export default productsRouter;
