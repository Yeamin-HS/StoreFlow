import express, { Application, Request, Response } from "express";
import { client } from "../../configDB/mongodb";
import { generateProductCode } from "./generateProductCode";

const storeFlow = express.Router();

storeFlow.get("/", async (req: Request, res: Response) => {
  const db = await client.db("StoreFlow");
  const collection = await db.collection("Product_store");

  const cursor = collection.find({});
  const allProduct = await cursor.toArray();
  res.json(allProduct);
  res.status(200).json({
    message: "All products fetched successfully",
    data: allProduct,
  });
});

// Create a product :-

storeFlow.post("/create-product", async (req: Request, res: Response) => {
  try {
    const { name, description, price, discount, image, status, category } =
      req.body;

    // Generate product code
    const product_id = generateProductCode(name);

    const db = await client.db("StoreFlow");
    const collection = await db.collection("Product_store");

    const createProduct = await collection.insertOne({
      name,
      description,
      price,
      discount,
      image,
      status,
      product_id,
      category,
    });

    res.status(201).json({
      message: "Product created successfully!",
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating product" });
  }
});

// update a product using the product id

storeFlow.put("/update-product/:productId",async (req: Request, res: Response) => {
    try {
      const { productId } = req.params; // Get the productId from the URL
      const { status, description, discount } = req.body; // Get updated values from request body

      const db = await client.db("StoreFlow");
      const collection = await db.collection("Product_store");

      // Find the product by its product_id
      const product = await collection.findOne({ product_id: productId });
      
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      console.log(productId);

      const updateProduct = await collection.updateOne(
        { product_id: productId }, // Find the product by product_id
        { $set: { status, description, discount } } // Set the updated fields
      );

      res.status(200).json({
        message: "Product updated successfully!",
        updateProduct,
      });
    } catch (error) {
      res.status(500).json({ message: "Error creating product" });
    }
  }
);

// category wise search:-

storeFlow.get("/products", async (req: Request, res: Response) => {
  try {
    const { category, search, minPrice, maxPrice } = req.query;

    const query: any = {};

    if (category) query.category = category;

    // Apply name search filter (case-insensitive)
    if (search) query.name = { $regex: search, $options: "i" };

    // Apply price range filters if provided
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice as string); // Minimum price
      if (maxPrice) query.price.$lte = parseFloat(maxPrice as string); // Maximum price
    }

    // Fetch products from the database
    const db = await client.db("StoreFlow");
    const collection = await db.collection("Product_store");
    const products = await collection.find(query).toArray();

    // Calculate final price
    const result = products.map(
      (product: { price: number; discount: number }) => ({
        ...product,
        finalPrice: (product.price * (1 - product.discount / 100)).toFixed(2), // Final price calculation
      })
    );

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching products" });
  }
});

export default storeFlow;
