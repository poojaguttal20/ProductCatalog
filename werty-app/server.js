const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 3001;

// Middleware to parse JSON requests
app.use(express.json());

// Add CORS middleware
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allow requests from any origin
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE"); // Allow the specified HTTP methods
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Allow the specified headers
  next();
});

app.get("/products", (req, res) => {
  try {
    // Read the products data from the JSON file
    const products = JSON.parse(fs.readFileSync("data.json"));
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// Endpoint to handle POST requests for adding new products
app.post("/add", (req, res) => {
  try {
    // Read existing product data from the JSON file, or initialize an empty array if the file doesn't exist
    let products = [];

    if (fs.existsSync("data.json")) {
      const data = fs.readFileSync("data.json", "utf8");
      if (data) {
        products = JSON.parse(data);
        if (!Array.isArray(products)) {
          throw new Error("Products data is not an array");
        }
      }
    }

    // Extract the new product data from the request body
    const newProduct = req.body;

    // Generate a unique ID for the new product (you may use a UUID library for this)
    newProduct.id = products.length + 1;

    // Add the new product to the existing products array
    products.push(newProduct);

    // Write the updated products data back to the JSON file
    fs.writeFileSync("data.json", JSON.stringify(products, null, 2));

    // Respond with a success message
    res.status(201).json({ message: "Product added successfully" });
  } catch (error) {
    // Handle errors and respond with an error message
    console.error("Error adding product:", error);
    res.status(500).json({ error: "Failed to add product" });
  }
});

app.get("/getproduct/:id", (req, res) => {
  try {
    // Read existing product data from the JSON file
    const products = JSON.parse(fs.readFileSync("data.json"));

    // Find the product with the specified ID
    const productId = parseInt(req.params.id);
    const product = products.find((p) => p.id === productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Respond with the details of the product
    res.json(product);
  } catch (error) {
    // Handle errors and respond with an error message
    console.error("Error fetching product:", error);
    res.status(500).json({ error: "Failed to fetch product" });
  }
});

app.put("/editproduct/:id", (req, res) => {
  try {
    // Extract the product ID from the request parameters
    const productId = req.params.id;

    // Read existing product data from the JSON file
    const products = JSON.parse(fs.readFileSync("data.json"));

    // Find the index of the product with the specified ID
    const productIndex = products.findIndex(
      (product) => product.id === parseInt(productId)
    );

    // If the product with the specified ID is found
    if (productIndex !== -1) {
      // Update the product details with the new data from the request body
      products[productIndex] = { ...products[productIndex], ...req.body };

      // Write the updated products data back to the JSON file
      fs.writeFileSync("data.json", JSON.stringify(products, null, 2));

      // Respond with a success message and the updated product data
      res
        .status(200)
        .json({
          message: "Product updated successfully",
          product: products[productIndex],
        });
    } else {
      // If the product with the specified ID is not found, respond with an error message
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    // Handle errors and respond with an error message
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Failed to update product" });
  }
});

app.delete("/deleteproduct/:id", (req, res) => {
  const productId = parseInt(req.params.id);

  // Read existing product data from the JSON file
  const products = JSON.parse(fs.readFileSync("data.json"));

  // Find the index of the product with the specified ID
  const productIndex = products.findIndex(
    (product) => product.id === parseInt(productId)
  );

  if (productIndex !== -1) {
    // Remove the product from the array
    products.splice(productIndex, 1);
    fs.writeFileSync('data.json', JSON.stringify(products, null, 2));
    
    res.status(200).json({
      message: "Product deleted successfully",
    });
  } else {
    // Product not found
    res.status(404).json({
      error: "Product not found",
    });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
