import express from "express";
const app = express();

import { connection, database } from "./database.js";
import setupCollections from "./collections.js";
import router from "./routes/index.js";

let server;

app.use(express.static("public"));
app.use(express.json());
app.use("/api/v1", router);

connection
    .then(() => setupCollections(database))
    .then(() => {
        console.log("Success: connected to database!");
        server = app.listen(3000, () => console.log("Server ready"));
    });
