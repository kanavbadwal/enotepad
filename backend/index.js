const connectToMongo = require("./db");
const express = require("express");
var cors = require("cors");
const app = express();
const port = 4000;

connectToMongo();

// CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
app.use(cors());
app.use(express.json());

//Available routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

// app.get("/", (req, res) => {
//   res.send("Hello Kanav!");
// });

app.listen(port, () => {
  console.log(`eNotepad listening at http://localhost:${port}`);
});
