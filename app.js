require("dotenv").config();
const express = require("express");
const { engine } = require("express-handlebars");
const { createServer } = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const path = require("path");

const productsRouter = require("./src/routes/products.router");
const cartsRouter = require("./src/routes/carts.router");
const viewsRouter = require("./src/routes/views.router");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "src/public")));

// Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "src/views"));

// Rutas
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);

// WebSockets
io.on("connection", async (socket) => {
  console.log("Cliente conectado");
  
  const ProductManager = require("./src/dao/mongo/ProductManagerMongo");
  const productManager = new ProductManager();
  const result = await productManager.getProducts({});
  socket.emit("updateProducts", result.payload);

  socket.on("disconnect", () => console.log("Cliente desconectado"));
});

// MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB conectado"))
  .catch((err) => console.error(err));

// Servidor
httpServer.listen(process.env.PORT, () => console.log(`Servidor corriendo en puerto ${process.env.PORT}`));

module.exports = { io };