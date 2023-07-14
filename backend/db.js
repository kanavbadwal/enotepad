const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env.local") });

const mongoURI = process.env.REACT_APP_DB;

const connectToMongo = async () => {
  try {
    mongoose.set("strictQuery", true);
    mongoose.connect(mongoURI);
    console.log("Database is connected.");
  } catch (error) {
    console.log(error);
    process.exit();
  }
};
// const connectToMongo = () => {
//   mongoose.connect(mongoURI, () => {
//     console.log("Connected to mongoose successfully.");
//   });
// };

module.exports = connectToMongo;
