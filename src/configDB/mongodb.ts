const { MongoClient, ServerApiVersion } = require("mongodb");

const uri =
  "mongodb+srv://mongobd:12345@cluster0.364im.mongodb.net/StoreFlow_DB?retryWrites=true&w=majority&appName=Cluster0";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version

export const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
