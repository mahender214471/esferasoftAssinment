require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const dbConnect = require("./db/connection");
const routes = require("./routes/index");
const app = express();
const port = process?.env?.PORT || 4044;
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "300mb" }));
app.use(express.static(`${path.resolve("../")}/dist`));
app.use(cors());
app.use("/api", routes);
app.get("*", (req, res) => {
  res.sendFile(`${path.resolve("../")}/dist/index.html`);
});
app.listen(port, () => {
  console.log(`Server lisnig at port : - ${port}`);
  dbConnect();
});
