const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 3001;


app.use(express.json());


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); 
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE"); 
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.get("/products", (req, res) => {
  try {
    const products = JSON.parse(fs.readFileSync("data.json"));
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

app.post("/add", (req, res) => {
  try {
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

  
    const newProduct = req.body;

    newProduct.id = products.length + 1;

    products.push(newProduct);

    fs.writeFileSync("data.json", JSON.stringify(products, null, 2));

    res.status(201).json({ message: "Product added successfully" });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ error: "Failed to add product" });
  }
});

app.get("/getproduct/:id", (req, res) => {
  try {

    const products = JSON.parse(fs.readFileSync("data.json"));
    const productId = parseInt(req.params.id);
    const product = products.find((p) => p.id === productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ error: "Failed to fetch product" });
  }
});

app.put("/editproduct/:id", (req, res) => {
  try {
    const productId = req.params.id;
    const products = JSON.parse(fs.readFileSync("data.json"));
    const productIndex = products.findIndex(
      (product) => product.id === parseInt(productId)
    );

    if (productIndex !== -1) {
      products[productIndex] = { ...products[productIndex], ...req.body };
      fs.writeFileSync("data.json", JSON.stringify(products, null, 2));
      res
        .status(200)
        .json({
          message: "Product updated successfully",
          product: products[productIndex],
        });
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Failed to update product" });
  }
});

app.delete("/deleteproduct/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const products = JSON.parse(fs.readFileSync("data.json"));

  
  const productIndex = products.findIndex(
    (product) => product.id === parseInt(productId)
  );

  if (productIndex !== -1) {
    products.splice(productIndex, 1);
    fs.writeFileSync('data.json', JSON.stringify(products, null, 2));
    
    res.status(200).json({
      message: "Product deleted successfully",
    });
  } else {
    res.status(404).json({
      error: "Product not found",
    });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
