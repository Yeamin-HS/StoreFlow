"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const storeflow_routes_1 = __importDefault(require("./StoreFlow/storeflow.routes"));
app.use(express_1.default.json());
// routes starting with '/store'
app.use("/store", storeflow_routes_1.default);
app.get("/", (req, res) => {
    res.send("Hellow World...");
});
app.use((req, res) => {
    res.status(404).json({ message: "Sorry, the route is not found" });
});
exports.default = app;
