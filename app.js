require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.static(__dirname));

mongoose.connect(process.env.MONGO_URL)
.then(() =>{ 
    console.log("MongoDB Connected");
    
    app.listen(3005, () => {
        console.log("Server running on http://localhost:3005");
    });
})
.catch(err => console.log(err));

const noteSchema = new mongoose.Schema({
    name: String,
    date: String,
    note: String
});

const Note = mongoose.model("Note", noteSchema);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/list", (req, res) => {
    res.sendFile(path.join(__dirname, "list.html"));
});

app.post("/add-note", async (req, res) => {
    console.log("REQUEST AAYI:", req.body);  // 👈 ADD THIS

    const { name, date, note } = req.body;

    await Note.create({
        name,
        date,
        note
    });

    res.json({
        message: "✅ Note Added Successfully!"
    });
});

app.get("/notes", async (req, res) => {
    const notes = await Note.find();
    res.json(notes);
});

app.delete("/delete-note/:id", async (req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    res.json({
        message: "🗑 Deleted Successfully"
    });
});

