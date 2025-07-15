import express, { Application, Request, Response } from "express";
const app: Application = express();
import storeFlow from "./StoreFlow/storeflow.routes";
import path from "path";
import fs from "fs";


app.use(express.json());

// routes starting with '/store'
app.use("/store", storeFlow);

app.get("/", (req: Request, res: Response) => {
  res.send("Hellow World...");
});


app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Sorry, the route is not found" });
});

export default app;
