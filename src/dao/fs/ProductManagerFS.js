const fs = require("fs");
const path = require("path");

class ProductManager {
  constructor() {
    this.path = path.join(__dirname, "products.json");
    this.init();
  }

  init() {
    if (!fs.existsSync(this.path)) {
      fs.writeFileSync(this.path, JSON.stringify([]));
    }
  }

  getProducts() {
    const data = fs.readFileSync(this.path, "utf-8");
    return JSON.parse(data);
  }

  getProductById(id) {
    const products = this.getProducts();
    return products.find((p) => p.id === id);
  }

  addProduct(data) {
    const products = this.getProducts();
    const newProduct = { id: Date.now().toString(), ...data };
    products.push(newProduct);
    fs.writeFileSync(this.path, JSON.stringify(products, null, 2));
    return newProduct;
  }

  updateProduct(id, data) {
    const products = this.getProducts();
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) return null;
    products[index] = { ...products[index], ...data, id };
    fs.writeFileSync(this.path, JSON.stringify(products, null, 2));
    return products[index];
  }

  deleteProduct(id) {
    const products = this.getProducts();
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) return null;
    const deleted = products.splice(index, 1);
    fs.writeFileSync(this.path, JSON.stringify(products, null, 2));
    return deleted[0];
  }
}

module.exports = ProductManager;