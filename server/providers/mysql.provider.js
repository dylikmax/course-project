import connection from "../connection/db.js";
import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);

const statusesNames = {
  "-1": "Заблокирован",
  0: "Пользователь",
  1: "Арендодатель",
  2: "Товаровед",
  3: "Заместитель директора",
  4: "Директор",
  44: "Папочка",
};

class mysqlProvider {
  static #connection = connection;

  static addUser = async (user) => {
    const hashedPassword = bcrypt.hashSync(user.password, salt);

    try {
      const rows = await this.#connection.query(
        "INSERT INTO Users (login, password, create_time, email) VALUES (:login, :password, CURRENT_TIMESTAMP, :email);",
        { ...user, password: hashedPassword },
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
      [login],
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
      [userId],
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
      [hashedPassword, userId],
    );
  };

  static getFullUserInfo = async (id) => {
    const [rows] = await this.#connection.query(
      "SELECT * FROM users WHERE id = ?",
      [id],
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
      [token],
    );
  };

  static isValidToken = async (token) => {
    const result = await this.#connection.query(
      "SELECT * FROM refresh_tokens WHERE token = ?",
      [token],
    );

    return !!result[0].length;
  };

  static deleteToken = async (token) => {
    await this.#connection.query("DELETE FROM refresh_tokens WHERE token = ?", [
      token,
    ]);
  };

  static getProducts = async () => {
      const [rows] = await this.#connection.query(
      "SELECT * FROM Products;"
    );

    return rows;
  }

  static getProduct = async (id) => {
    const [rows] = await this.#connection.query(
      "SELECT * FROM Products WHERE id = ?;", [id]
    );

    if (rows.length === 0) {
      throw new Error("Product with this ID doesn`t exist.");
    }

    const product = rows[0];

    return product;
  }

  static getCart = async (userId) => {
    const [rows] = await this.#connection.query(
      "SELECT p.id AS product_id, p.name, p.description, p.image_url, p.car, p.color, p.price, pic.id FROM Products p JOIN Products_in_cart pic ON p.id = pic.product_id WHERE pic.user_id = ?;", [userId]
    );

    return { products: rows, sum: +rows.reduce((acc, currentProduct) => acc + +currentProduct.price, 0).toFixed(2) }
  }

  static addToCart = async (userId, productId) => {
    const [rows] = await this.#connection.query(
      "SELECT * FROM Products WHERE id = ?;", [productId]
    );

    if (rows.length === 0) {
      throw new Error("Product with this ID doesn`t exist.");
    }

    const [insert] = await this.#connection.query(
      "INSERT INTO Products_in_cart (product_id, user_id) VALUES (?, ?)", [productId, userId]
    );

    return insert.insertId;
  }

  static deleteFromCart = async (userId, inCartId) => {
    const [rows] = await this.#connection.query(
      "SELECT * FROM Products_in_cart WHERE id = ? AND user_id = ?;", [inCartId, userId]
    );

    if (rows.length === 0) {
      throw new Error("Product with this ID doesn`t exist in your cart.");
    }

    await this.#connection.query(
      "DELETE FROM Products_in_cart WHERE id = ?;", [inCartId]
    );
  }

  static clearCart = async (userId) => {
      await this.#connection.query(
      "DELETE FROM Products_in_cart WHERE user_id = ?;", [userId]
    );
  }
}

export default mysqlProvider;
