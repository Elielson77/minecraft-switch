import "dotenv/config";
import express from "express";
import router from "./routers/index.js";

const port = parseInt(process.env.PORT);

const app = express();

app.set("view engine", "ejs");
app.use(router);

app.listen(port, () => {
  console.log(`Server is running on http://127.0.0.1:${port}`);
});
