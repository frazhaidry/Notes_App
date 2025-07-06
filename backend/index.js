require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/auth.routes");
const notesRoutes = require("./routes/notes.routes");

const app = express();

connectDB();

app.use(express.json());
app.use(cors({ origin: "*" }));

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.use("/", authRoutes);
app.use("/", notesRoutes);

const port = process.env.PORT 

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;
