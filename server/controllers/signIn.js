const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

exports.adminSignIn = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find admin by username
        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(401).json({ error: 'Invalid credentials from username' });
        }

        // Direct password comparison (no hashing)
        if (password !== admin.password) {
            return res.status(401).json({ error: 'Invalid credentials from password' });
        }

        // Generate JWT token if the password is correct
        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error' });
    }
};
