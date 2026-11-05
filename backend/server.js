const express = require('express');
const multer = require('multer');
const fs = require("fs/promises");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const upload = multer();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
const usersPath = path.join(__dirname, "data/users.json");
const classesPath = path.join(__dirname, "data/classes.json");

const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
const jwt_key = process.env.JWT_SECRET;

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

app.post("/login", upload.none(), async (req, res) => {
    const {email, password} = req.body;
    const users = await getUsers();
    const user = users.find(u => u.email === email);
    const errors = [];

    if (!user) errors.push("User with this email doesn't exist");

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) errors.push("Passwords don't match");

    if (errors.length > 0) return res.status(401).json({errors});
    

    const token = jwt.sign({id: user.id, email, username: user.username}, jwt_key, {expiresIn: "24h"});

    return res.status(201).json({
        token,
        id: user.id,
        email,
        username: user.username,
    });
});

app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
});
