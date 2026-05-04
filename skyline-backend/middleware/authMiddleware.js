import jwt from 'jsonwebtoken';

const JWT_SECRET = "skyline_super_secure_secret_key_2026";

export const verifyToken = (req, res, next) => {
    // Look for the token in the headers
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: "Access Denied. No token provided." });
    }

    const token = authHeader.split(' ')[1];

    try {
        // Verify the token is real and hasn't expired
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // Attach the user info to the request
        next(); // Let them pass
    } catch (error) {
        return res.status(403).json({ message: "Invalid or expired token." });
    }
};

// Use this to restrict routes to Admins or Staff only
export const requireRole = (role) => {
    return (req, res, next) => {
        if (!req.user || req.user.role !== role) {
            return res.status(403).json({ message: `Access Denied. Requires ${role} privileges.` });
        }
        next();
    };
};