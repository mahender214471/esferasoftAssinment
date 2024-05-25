const express = require("express");
const app = express.Router();
const controlers = require("../controllers/User.controlers");
app.post("/addAddress", controlers.addAddress);
app.get("/getUsers", controlers.getUsers);
app.get("/getAddress", controlers.getAddredd);
app.put("/updateAddress", controlers.deleteAddress);
module.exports = app;
