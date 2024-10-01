const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const secretKey = "sdfjkler8jfeiwysadf89r9ajlkjf9";

const createToken = (user) => {
    return jwt.sign({ user }, secretKey, { expiresIn: "5h" });
};

exports.signup = async (req, res) => {
    const { accountType, firstName, lastName, phone, email, password } = req.body;

    // Validate password length
    if (password.length < 6) {
        return res.status(400).send("Password must be 6 characters long.");
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send("User already registered, please login.");
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            accountType,
            firstName,
            lastName,
            phone,
            email,
            password: hashPassword
        });
        const token = createToken({ id: newUser._id, email: newUser.email, accountType: newUser.accountType });
        res.status(201).send(token);
    } catch (error) {
        res.status(500).send("Server error");
    }
};


exports.signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send("User not registered, please Signup.");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send("Invalid password.");
        }

        const token = createToken({ id: user._id, email: user.email, accountType: user.accountType });
        res.status(200).send({ token });
    } catch (error) {
        res.status(500).send("Server error");
    }
};

exports.getuser = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).send("ID is missing from request parameters.");
        }

        // Look up the user by ID
        const user = await User.findOne({ _id: id });
        console.log("User ID from request: ", id);  // Log the user ID

        if (!user) {
            return res.status(404).send("User not found");
        }

        res.send(user);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Server error");
    }
};
