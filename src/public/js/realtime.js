const socket = io();

socket.on("updateProducts", (products) => {
  const container = document.getElementById("products-container");
  if (!container) return;

  container.innerHTML = products.map(product => `
    <div class="col-md-4 mb-4">
      <div class="card h-100">
        <div class="card-body">
          <h5 class="card-title">${product.title}</h5>
          <p class="card-text">${product.description}</p>
          <p class="card-text"><strong>Precio:</strong> $${product.price}</p>
          <p class="card-text"><strong>Categoría:</strong> ${product.category}</p>
          <p class="card-text"><strong>Stock:</strong> ${product.stock}</p>
          <a href="/products/${product._id}" class="btn btn-primary">Ver detalle</a>
        </div>
      </div>
    </div>
  `).join("");
});