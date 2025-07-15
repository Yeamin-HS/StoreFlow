const { MongoClient, ServerApiVersion } = require("mongodb");


const uri = "mongodb+srv://yeaminhs11:eCD0Pu1vavorEgdm@assignment6thsense.wacz7ri.mongodb.net/StoreFlow?retryWrites=true&w=majority";

export const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
