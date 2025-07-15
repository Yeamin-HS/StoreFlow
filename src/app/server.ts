import { client } from "../configDB/mongodb";
import app from "./app";

let server;

const port = 3000;

const bootstrap = async () => {
  
    await client.connect();
    console.log("connection to the mg")
    server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};

bootstrap();