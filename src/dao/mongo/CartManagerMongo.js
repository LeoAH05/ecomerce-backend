const Cart = require("../../models/cart.model");

class CartManager {
  async createCart() {
    return await Cart.create({ products: [] });
  }

  async getCartById(id) {
    return await Cart.findById(id).populate("products.product");
  }

  async addProductToCart(cartId, productId) {
    const cart = await Cart.findById(cartId);
    const productIndex = cart.products.findIndex(
      (p) => p.product.toString() === productId
    );

    if (productIndex === -1) {
      cart.products.push({ product: productId, quantity: 1 });
    } else {
      cart.products[productIndex].quantity++;
    }

    return await cart.save();
  }

  async removeProductFromCart(cartId, productId) {
    return await Cart.findByIdAndUpdate(
      cartId,
      { $pull: { products: { product: productId } } },
      { new: true }
    );
  }

  async updateCart(cartId, products) {
    return await Cart.findByIdAndUpdate(
      cartId,
      { products },
      { new: true }
    );
  }

  async updateProductQuantity(cartId, productId, quantity) {
    const cart = await Cart.findById(cartId);
    const productIndex = cart.products.findIndex(
      (p) => p.product.toString() === productId
    );

    if (productIndex !== -1) {
      cart.products[productIndex].quantity = quantity;
    }

    return await cart.save();
  }

  async clearCart(cartId) {
    return await Cart.findByIdAndUpdate(
      cartId,
      { products: [] },
      { new: true }
    );
  }
}

module.exports = CartManager;