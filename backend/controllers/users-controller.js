const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Registro de usuario
async function createUser(req, res) {
    try {
        const { name, email, password, role, isAdmin } = req.body;

        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hashedPassword,
            role,
            isAdmin: isAdmin || false
        });

        await user.save();

        return res.status(201).json(user);
    } catch (error) {
        console.error('CREATE USER ERROR:', error);
        return res.status(500).json({
            message: error.message || 'Error creating user'
        });
    }
}

// Login
async function login(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: 'Email and password are required'
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role,
                isAdmin: user.isAdmin
            },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        return res.status(200).json({ token, user });
    } catch (error) {
        console.error('LOGIN ERROR:', error);
        return res.status(500).json({
            message: error.message || 'Error login'
        });
    }
}

// Obtener usuarios
async function getUsers(req, res) {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({
            message: 'Error fetching users',
            error: error.message
        });
    }
}

// Eliminar usuario
async function deleteUser(req, res) {
    try {
        const { id } = req.params;

        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({
            message: 'User deleted successfully'
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error deleting user',
            error: error.message
        });
    }
}

// Actualizar usuario
async function updateUser(req, res) {
    try {
        const { id } = req.params;

        const user = await User.findByIdAndUpdate(id, req.body, { new: true });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({
            message: 'Error updating user',
            error: error.message
        });
    }
}

module.exports = {
    createUser,
    login,
    getUsers,
    deleteUser,
    updateUser
};