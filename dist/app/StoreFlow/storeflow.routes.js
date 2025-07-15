"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("../../configDB/mongodb");
const generateProductCode_1 = require("./generateProductCode");
const storeFlow = express_1.default.Router();
storeFlow.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield mongodb_1.client.db("StoreFlow");
    const collection = yield db.collection("Product_store");
    const cursor = collection.find({});
    const allProduct = yield cursor.toArray();
    res.json(allProduct);
    res.status(200).json({
        message: "All products fetched successfully",
        data: allProduct,
    });
}));
// Create a product :-
storeFlow.post("/create-product", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, price, discount, image, status, category } = req.body;
        // Generate product code
        const product_id = (0, generateProductCode_1.generateProductCode)(name);
        const db = yield mongodb_1.client.db("StoreFlow");
        const collection = yield db.collection("Product_store");
        const createProduct = yield collection.insertOne({
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
    }
    catch (error) {
        res.status(500).json({ message: "Error creating product" });
    }
}));
// update a product using the product id
storeFlow.put("/update-product/:productId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params; // Get the productId from the URL
        const { status, description, discount } = req.body; // Get updated values from request body
        const db = yield mongodb_1.client.db("StoreFlow");
        const collection = yield db.collection("Product_store");
        // Find the product by its product_id
        const product = yield collection.findOne({ product_id: productId });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        console.log(productId);
        const updateProduct = yield collection.updateOne({ product_id: productId }, // Find the product by product_id
        { $set: { status, description, discount } } // Set the updated fields
        );
        res.status(200).json({
            message: "Product updated successfully!",
            updateProduct,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error creating product" });
    }
}));
// category wise search:-
storeFlow.get("/products", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { category, search, minPrice, maxPrice } = req.query;
        const query = {};
        if (category)
            query.category = category;
        // Apply name search filter (case-insensitive)
        if (search)
            query.name = { $regex: search, $options: "i" };
        // Apply price range filters if provided
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice)
                query.price.$gte = parseFloat(minPrice); // Minimum price
            if (maxPrice)
                query.price.$lte = parseFloat(maxPrice); // Maximum price
        }
        // Fetch products from the database
        const db = yield mongodb_1.client.db("StoreFlow");
        const collection = yield db.collection("Product_store");
        const products = yield collection.find(query).toArray();
        // Calculate final price
        const result = products.map((product) => (Object.assign(Object.assign({}, product), { finalPrice: (product.price * (1 - product.discount / 100)).toFixed(2) })));
        res.status(200).json(result);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching products" });
    }
}));
exports.default = storeFlow;
