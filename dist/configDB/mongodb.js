"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = "mongodb+srv://yeaminhs11:eCD0Pu1vavorEgdm@assignment6thsense.wacz7ri.mongodb.net/StoreFlow?retryWrites=true&w=majority";


exports.client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});
