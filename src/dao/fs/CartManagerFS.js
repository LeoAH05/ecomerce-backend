const fs = require("fs");
const path = require("path");

class CartManager {
  constructor() {
    this.path = path.join(__dirname, "carts.json");
    this.init();
  }

  init() {
    if (!fs.existsSync(this.path)) {
      fs.writeFileSync(this.path, JSON.stringify([]));
    }
  }

  getCarts() {
    const data = fs.readFileSync(this.path, "utf-8");
    return JSON.parse(data);
  }

  createCart() {
    const carts = this.getCarts();
    const newCart = { id: Date.now().toString(), products: [] };
    carts.push(newCart);
    fs.writeFileSync(this.path, JSON.stringify(carts, null, 2));
    return newCart;
  }

  getCartById(id) {
    const carts = this.getCarts();
    return carts.find((c) => c.id === id);
  }

  addProductToCart(cartId, productId) {
    const carts = this.getCarts();
    const cartIndex = carts.findIndex((c) => c.id === cartId);
    if (cartIndex === -1) return null;

    const productIndex = carts[cartIndex].products.findIndex(
      (p) => p.product === productId
    );

    if (productIndex === -1) {
      carts[cartIndex].products.push({ product: productId, quantity: 1 });
    } else {
      carts[cartIndex].products[productIndex].quantity++;
    }

    fs.writeFileSync(this.path, JSON.stringify(carts, null, 2));
    return carts[cartIndex];
  }

  removeProductFromCart(cartId, productId) {
    const carts = this.getCarts();
    const cartIndex = carts.findIndex((c) => c.id === cartId);
    if (cartIndex === -1) return null;

    carts[cartIndex].products = carts[cartIndex].products.filter(
      (p) => p.product !== productId
    );

    fs.writeFileSync(this.path, JSON.stringify(carts, null, 2));
    return carts[cartIndex];
  }

  clearCart(cartId) {
    const carts = this.getCarts();
    const cartIndex = carts.findIndex((c) => c.id === cartId);
    if (cartIndex === -1) return null;

    carts[cartIndex].products = [];
    fs.writeFileSync(this.path, JSON.stringify(carts, null, 2));
    return carts[cartIndex];
  }
}

module.exports = CartManager;