import express from "express";
import { db } from "../Config/db.config";
import { router } from "../Routes/posts.routes";
import { routerUser } from "../Routes/user.routes";

const cors = require("cors");

const app = express();
var corsOptions = {
  origin: "http://localhost:8081",
};
app.use(cors(corsOptions));

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/api/v1/posts", router);
app.use("/api/v1/user", routerUser);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

//db connection then server connection
db.then(() => {
  app.listen(7070, () => console.log("Server is listening on port 7070"));
});
