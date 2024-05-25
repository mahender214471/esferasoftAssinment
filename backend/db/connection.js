const mongoose = require("mongoose");
module.exports = async () => {
  try {
    const dbURL = process?.env?.db;
    await mongoose.connect(dbURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoCreate: true,
    });
    console.log("Connected to databse succesfully");
  } catch (err) {
    console.log("Connection failed with database :-", err);
  }
};
