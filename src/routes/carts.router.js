const { Router } = require("express");
const CartManager = require("../dao/mongo/CartManagerMongo");

const router = Router();
const cartManager = new CartManager();

// POST /api/carts
router.post("/", async (req, res) => {
  try {
    const cart = await cartManager.createCart();
    res.status(201).json({ status: "success", payload: cart });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

// GET /api/carts/:cid
router.get("/:cid", async (req, res) => {
  try {
    const cart = await cartManager.getCartById(req.params.cid);
    if (!cart) return res.status(404).json({ status: "error", message: "Carrito no encontrado" });
    res.json({ status: "success", payload: cart });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

// POST /api/carts/:cid/products/:pid
router.post("/:cid/products/:pid", async (req, res) => {
  try {
    const cart = await cartManager.addProductToCart(req.params.cid, req.params.pid);
    res.json({ status: "success", payload: cart });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

// DELETE /api/carts/:cid/products/:pid
router.delete("/:cid/products/:pid", async (req, res) => {
  try {
    const cart = await cartManager.removeProductFromCart(req.params.cid, req.params.pid);
    res.json({ status: "success", payload: cart });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

// PUT /api/carts/:cid
router.put("/:cid", async (req, res) => {
  try {
    const cart = await cartManager.updateCart(req.params.cid, req.body.products);
    res.json({ status: "success", payload: cart });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

// PUT /api/carts/:cid/products/:pid
router.put("/:cid/products/:pid", async (req, res) => {
  try {
    const cart = await cartManager.updateProductQuantity(req.params.cid, req.params.pid, req.body.quantity);
    res.json({ status: "success", payload: cart });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

// DELETE /api/carts/:cid
router.delete("/:cid", async (req, res) => {
  try {
    const cart = await cartManager.clearCart(req.params.cid);
    res.json({ status: "success", payload: cart });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

module.exports = router;