const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(__dirname));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/list", (req, res) => {
    res.sendFile(path.join(__dirname, "list.html"));
});

app.listen(3005, () => {
    console.log("Server running on http://localhost:3005");
});