const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./model/userSchema");
require('dotenv').config()

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(
    "mongodb://ec2-18-60-226-132.ap-south-2.compute.amazonaws.com:27017/aws",
);
// mongoose.connect(
//     "mongodb+srv://mmurugavel343:murugaveldev@cluster0.5d2r0r8.mongodb.net/aws"
// );


// Get the default connection
const db = mongoose.connection;

// Listen for a successful connection event
db.on("connected", () => {
    console.log("MongoDB connected successfully");
});

// Listen for connection errors
db.on("error", (err) => {
    console.log("MongoDB not connected", err);
});


app.get('/', (req, res) => {
    res.json({ status: 200, message: "server is runing..." })
})

// CREATE
app.post("/users", async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// READ
app.get("/users", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// UPDATE
app.put("/users/:id", async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE
app.delete("/users/:id", async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: "User deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start Server
app.listen(5000, () => console.log("🚀 Server running on port 5000"));
