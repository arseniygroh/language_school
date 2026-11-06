const express = require('express');
const multer = require('multer');
const fs = require("fs/promises");
const path = require("path");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const crypto = require("crypto");
const cors = require("cors");

dotenv.config();
const upload = multer();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const usersPath = path.join(__dirname, "data/users.json");
const classesPath = path.join(__dirname, "data/classes.json");

const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
const jwt_key = process.env.JWT_SECRET;

async function getUsers() {
    try {
        const data = await fs.readFile(usersPath, "utf-8");
        return JSON.parse(data);
    } catch (e) {
        throw e;
    }
}

async function saveUsers(users) {
    await fs.writeFile(usersPath, JSON.stringify(users, null, 2));
}

async function getClasses() {
    try {
        const data = await fs.readFile(classesPath, "utf-8");
        return JSON.parse(data);
    } catch (e) {
        throw e;
    }
}

async function saveClasses(classes) {
    await fs.writeFile(classesPath, JSON.stringify(classes, null, 2));
}

app.post("/register", upload.none(), async (req, res) => {
    try {
        const {username, email, password, confirmPassword} = req.body;
        const errors = [];

        if (!emailPattern.test(email)) {
            errors.push("Invalid email format.");
        }
    
        if (!passwordPattern.test(password)) {
            errors.push("Your password must include at least 1 digit and letter and be minimum 8 characters long");
        }
    
        if (password !== confirmPassword) {
            errors.push("Passwords must match.");
        }
    
        if (!username || username.trim().length === 0) {
            errors.push("You must provide your username.");
        }
        
        if (errors.length > 0) return res.status(401).json({errors});

        const users = await getUsers();
        const user = users.find(u => u.email === email);
        if (user) return res.status(401).json({errors: ["This user already exists"]});

        const hashedPass = await bcrypt.hash(password, 10);
        
        const newUser = {
            id: crypto.randomUUID(),
            username,
            email,
            password: hashedPass,
            bookedClasses: []
        }
        users.push(newUser);
        await saveUsers(users);
        
        return res.status(201).json({message: "Registration successful"});
    } catch(e) {
        return res.status(500).json({errors: ["Internal server error, try again"]});
    }
});

app.post("/login", upload.none(), async (req, res) => {
    try {
        const {email, password} = req.body;
        const users = await getUsers();
        const user = users.find(u => u.email === email);
        const errors = [];
        if (!user) {
            return res.status(401).json({errors: ["User with this email doesn't exist"]});
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) errors.push("Passwords don't match");

        if (errors.length > 0) return res.status(401).json({errors});
        
        const token = jwt.sign({id: user.id, email, username: user.username}, jwt_key, {expiresIn: "24h"});

        return res.status(200).json({
            token,
            id: user.id,
            email,
            username: user.username,
        });
    } catch(e) {
        return res.status(500).json({errors: ["Internal server error, try again"]});
    }
});

app.get("/classes", async (req, res) => {
    try {
        const availableClasses = await getClasses();
        return res.status(200).json({classes: availableClasses});
    } catch(e) {
        return res.status(500).json({error: "Internal server error"});
    }
});


app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
});
