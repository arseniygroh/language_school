const express = require('express');
const multer = require('multer');
const fs = require("fs/promises");

const upload = multer();
const app = express();
const PORT = 3000;

app.use(express.json());
const usersPath = path.join(__dirname, "data/users.json");
const classesPath = path.join(__dirname, "data/classes.json");

const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

async function getUsers() {
    const data = await fs.readFile(usersPath, "utf-8");
    return JSON.parse(data);
}

async function saveUsers(users) {
    try {
        await fs.writeFile(usersPath, JSON.stringify(users, null, 2));
    } catch (e) {
        throw e;
    }
}

app.post("/login", upload.none(), (req, res) => {
    
});

app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
});
