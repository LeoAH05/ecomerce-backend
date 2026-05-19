const { Router } = require("express");
const ProductManager = require("../dao/mongo/ProductManagerMongo");
const CartManager = require("../dao/mongo/CartManagerMongo");

const router = Router();
const productManager = new ProductManager();
const cartManager = new CartManager();

// GET /products
router.get("/products", async (req, res) => {
  try {
    const { limit, page, query, sort } = req.query;
    const result = await productManager.getProducts({ limit, page, query, sort });
    res.render("products", { ...result });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

// GET /products/:pid
router.get("/products/:pid", async (req, res) => {
  try {
    const product = await productManager.getProductById(req.params.pid);
    if (!product) return res.status(404).json({ status: "error", message: "Producto no encontrado" });
    const productObj = product.toObject();
res.render("productDetail", { 
  title: productObj.title,
  description: productObj.description,
  price: productObj.price,
  category: productObj.category,
  stock: productObj.stock,
  code: productObj.code,
  status: productObj.status,
  _id: productObj._id.toString()
});
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

// GET /carts/:cid
router.get("/carts/:cid", async (req, res) => {
  try {
    const cart = await cartManager.getCartById(req.params.cid);
    if (!cart) return res.status(404).json({ status: "error", message: "Carrito no encontrado" });
    const cartObj = cart.toObject();
    console.log(JSON.stringify(cartObj, null, 2));
    res.render("cart", { ...cartObj });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

module.exports = router;