"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = "mongodb+srv://yeaminhs11:eCD0Pu1vavorEgdm@assignment6thsense.wacz7ri.mongodb.net/StoreFlow?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
exports.client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});
