import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const dbPath = path.resolve('data', 'db.json');

// In a real production app, this lives in a .env file
const JWT_SECRET = "skyline_super_secure_secret_key_2026";

// Helper to safely read/write the DB specifically for users
const getUsers = () => {
    const db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
    return db.users || [];
};
const saveUsers = (users) => {
    const db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
    db.users = users;
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
};

// 1. REGISTER a new user
export const register = async (req, res) => {
    const { email, password, role } = req.body;
    const users = getUsers();

    // Check if user already exists
    if (users.find(u => u.email === email)) {
        return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password for security
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save the new user
    const newUser = { email, password: hashedPassword, role: role || 'customer' };
    users.push(newUser);
    saveUsers(users);

    res.status(201).json({ message: "User registered successfully" });
};

// 2. LOGIN an existing user
export const login = async (req, res) => {
    const { email, password } = req.body;
    const users = getUsers();

    // Find the user
    const user = users.find(u => u.email === email);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate the JWT Token (The "Digital ID Card")
    const token = jwt.sign(
        { email: user.email, role: user.role }, 
        JWT_SECRET, 
        { expiresIn: '1h' }
    );

    res.status(200).json({ 
        message: "Login successful", 
        token, 
        user: { email: user.email, role: user.role } 
    });
};