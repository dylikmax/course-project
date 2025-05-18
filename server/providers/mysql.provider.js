import connection from "../connection/db.js";
import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);

class mysqlProvider {
  static #connection = connection;

  static addUser = async (user) => {
    const hashedPassword = bcrypt.hashSync(user.password, salt);

    try {
      const rows = await this.#connection.query(
        "INSERT INTO Users (login, password, create_time, email) VALUES (:login, :password, CURRENT_TIMESTAMP, :email);",
        { ...user, password: hashedPassword }
      );

      return rows;
    } catch (error) {
      if (error.errno === 1062) {
        throw new Error("User with this login is already exist.");
      }

      throw new Error(error.message);
    }
  };

  static authenticateUser = async (login, password) => {
    const [rows] = await this.#connection.query(
      "SELECT * FROM users WHERE login = ?",
      [login]
    );

    if (rows.length === 0) {
      throw new Error("Account with this login doesn`t exist.");
    }

    const user = rows[0];

    if (!bcrypt.compareSync(password, user.password)) {
      throw new Error("Wrong password.");
    }

    return user;
  };

  static changePassword = async (userId, oldPassword, newPassword) => {
    const [rows] = await this.#connection.query(
      "SELECT * FROM users WHERE id = ?",
      [userId]
    );

    if (rows[0].length === 0) {
      throw new Error("User doesn't exist.");
    }

    const { password: currentPassword } = rows[0];

    if (!bcrypt.compareSync(oldPassword, currentPassword)) {
      throw new Error("Wrong password.");
    }

    const hashedPassword = bcrypt.hashSync(newPassword, salt);
    await this.#connection.query(
      "UPDATE users SET password = ? WHERE id = ?;",
      [hashedPassword, userId]
    );
  };

  static getFullUserInfo = async (id) => {
    const [rows] = await this.#connection.query(
      "SELECT * FROM users WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      throw new Error("Account with this ID doesn`t exist.");
    }

    const user = rows[0];

    return user;
  };

  static addToken = async (token) => {
    await this.#connection.query(
      "INSERT INTO refresh_tokens (token) VALUES (?)",
      [token]
    );
  };

  static isValidToken = async (token) => {
    const result = await this.#connection.query(
      "SELECT * FROM refresh_tokens WHERE token = ?",
      [token]
    );

    return !!result[0].length;
  };

  static deleteToken = async (token) => {
    await this.#connection.query("DELETE FROM refresh_tokens WHERE token = ?", [
      token,
    ]);
  };

  static getProducts = async () => {
    const [rows] = await this.#connection.query("SELECT * FROM Products;");

    return rows;
  };

  static getProduct = async (id) => {
    const [rows] = await this.#connection.query(
      "SELECT * FROM Products WHERE id = ?;",
      [id]
    );

    if (rows.length === 0) {
      throw new Error("Product with this ID doesn`t exist.");
    }

    const product = rows[0];

    return product;
  };

  static getCart = async (userId) => {
    const [rows] = await this.#connection.query(
      "SELECT pic.id, p.id AS product_id, p.name, p.description, p.image_url, p.car, p.color, p.price, pic.count FROM Products p JOIN Products_in_cart pic ON p.id = pic.product_id WHERE pic.user_id = ?;",
      [userId]
    );

    return {
      products: rows,
      sum: +rows
        .reduce(
          (acc, currentProduct) =>
            acc + +currentProduct.price * currentProduct.count,
          0
        )
        .toFixed(2),
    };
  };

  static addToCart = async (userId, productId) => {
    const [rows] = await this.#connection.query(
      "SELECT * FROM Products WHERE id = ?;",
      [productId]
    );

    if (rows.length === 0) {
      throw new Error("Product with this ID doesn`t exist.");
    }

    const [duplicates] = await this.#connection.query(
      "SELECT * FROM Products_in_cart WHERE product_id = ? AND user_id = ?;",
      [productId, userId]
    );

    if (duplicates.length !== 0) {
      const duplicateId = duplicates[0].id;

      await this.#connection.query(
        "UPDATE Products_in_cart SET count = ? WHERE id = ?",
        [duplicates[0].count + 1, duplicateId]
      );

      return;
    }

    await this.#connection.query(
      "INSERT INTO Products_in_cart (product_id, user_id) VALUES (?, ?)",
      [productId, userId]
    );

    return;
  };

  static deleteFromCart = async (userId, inCartId, deleteCount) => {
    const [rows] = await this.#connection.query(
      "SELECT * FROM Products_in_cart WHERE id = ? AND user_id = ?;",
      [inCartId, userId]
    );

    if (rows.length === 0) {
      throw new Error("Product with this ID doesn`t exist in your cart.");
    }

    const productInCart = rows[0];
    if (deleteCount >= productInCart.count) {
      await this.#connection.query(
        "DELETE FROM Products_in_cart WHERE id = ?;",
        [inCartId]
      );

      return;
    }

    await this.#connection.query(
      "UPDATE Products_in_cart SET count = ? WHERE id = ?;",
      [productInCart.count - deleteCount, productInCart.id]
    );

    return;
  };

  static clearCart = async (userId) => {
    await this.#connection.query(
      "DELETE FROM Products_in_cart WHERE user_id = ?;",
      [userId]
    );
  };

  static newOrder = async (userId, address) => {
    const cart = await this.getCart(userId);

    if (cart.products.length === 0) {
      throw new Error("Order must be non empty.");
    }

    const [insert] = await this.#connection.query(
      "INSERT INTO Orders (user_id, price, status, address) VALUES (?, ?, ?, ?)",
      [userId, cart.sum, "Собирается", address]
    );

    const productValues = cart.products.map((prod) => [
      insert.insertId,
      prod.product_id,
      prod.count,
    ]);

    await this.#connection.query(
      "INSERT INTO Products_in_orders (order_id, product_id, count) VALUES ?",
      [productValues]
    );

    await this.#connection.query(
      "DELETE FROM Products_in_cart WHERE user_id = ?",
      [userId]
    );
  };

  static getOrders = async (userId) => {
    const [rows] = await this.#connection.query(
      "SELECT o.id AS order_id, o.price AS order_price, o.address AS order_address, o.status AS order_status, p.id AS product_id, p.name AS product_name, p.price AS product_price, poi.count AS product_count, p.image_url AS product_image_url, p.car AS product_car, p.description AS product_description, p.color AS product_color FROM Orders o JOIN Products_in_orders poi ON o.id = poi.order_id JOIN Products p ON poi.product_id = p.id WHERE o.user_id = ?;",
      [userId]
    );

    const orders = rows.reduce((acc, row) => {
      const { order_id, order_price, order_address, order_status, product_id, product_name, product_price, product_count, product_image_url, product_car, product_description, product_color } = row;
  
      let order = acc.find(o => o.id === order_id);
      if (!order) {
          order = {
              id: order_id,
              price: order_price,
              address: order_address,
              status: order_status,
              products: []
          };
          acc.push(order);
      }
  
      order.products.push({
          id: product_id,
          name: product_name,
          description: product_description,
          car: product_car,
          color: product_color,
          price: product_price,
          count: product_count,
          image_url: product_image_url
      });
  
      return acc;
  }, []);

  return orders;
  }

  static getOrder = async (userId, orderId) => {
    const [rows] = await this.#connection.query(
      "SELECT o.id AS order_id, o.price AS order_price, o.address AS order_address, o.status AS order_status, p.id AS product_id, p.name AS product_name, p.price AS product_price, poi.count AS product_count, p.image_url AS product_image_url, p.car AS product_car, p.description AS product_description, p.color AS product_color FROM Orders o JOIN Products_in_orders poi ON o.id = poi.order_id JOIN Products p ON poi.product_id = p.id WHERE o.id = ?;",
      [orderId]
    );

    if (rows.length === 0) {
      throw new Error("Order doesn`t exist.")
  } else {
      const orderData = rows[0];
      const order = {
          id: orderData.order_id,
          price: orderData.order_price,
          address: orderData.order_address,
          status: orderData.order_status,
          products: rows.map(row => ({
              id: row.product_id,
              name: row.product_name,
              price: row.product_price,
              count: row.product_count,
              description: row.product_description,
              car: row.product_car,
              color: row.product_color,
              image_url: row.product_image_url
          }))
      };

      return order;
    }
  }

  static deleteOrder = async (userId, orderId) => {
    const [deleteOrder] = await this.#connection.query(
      "DELETE FROM Orders WHERE id = ? AND user_id = ?",
      [orderId, userId]
    );
    
    if (deleteOrder.affectedRows === 0) {
      throw new Error("Order doesn`t exist.")
    }

    await this.#connection.query(
      "DELETE FROM Products_in_orders WHERE order_id = ?",
      [orderId]
    );
  }

  static getFilters = async () => {
    const [cars] = await this.#connection.query(
      "SELECT DISTINCT car FROM Products;"
    );

    const [colors] = await this.#connection.query(
      "SELECT DISTINCT color FROM Products;"
    );

    const [price] = await this.#connection.query(
      "SELECT MIN(price) AS min_price, MAX(price) AS max_price FROM Products;"
    );

    return {
      cars: cars.map(obj => obj.car).filter(obj => obj !== null).sort(),
      colors: colors.map(obj => obj.color).filter(obj => obj !== null).sort(),
      price: price[0]
    }
  }
}

export default mysqlProvider;
