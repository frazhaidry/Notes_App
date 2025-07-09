require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/auth.routes");
const notesRoutes = require("./routes/notes.routes");

const app = express();

connectDB();


// CORS configuration
const corsOptions = {
  origin: ['https://notes-app-lvja.vercel.app', 'http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
};

// Apply CORS
app.use(cors(corsOptions));

// Handle preflight (OPTIONS) requests
app.options('*', cors(corsOptions));


app.use(express.json());


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
