const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

exports.register = async (req, res) => {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
        return res.status(400).json({ error: true, message: "All fields are required" });
    }

    const isUser = await User.findOne({ email });
    if (isUser) return res.json({ error: true, message: "User already exists" });

    const user = new User({ fullName, email, password });
    await user.save();

    const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });

    return res.json({ error: false, user, accessToken, message: "Registration Successful" });
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ error: true, message: "All fields required" });

    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
        return res.status(400).json({ error: true, message: "Invalid credentials" });
    }

    const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });

    return res.json({ error: false, user, email, accessToken, message: "Login Successful" });
};

exports.getUser = async (req, res) => {
    const { user } = req.user;

    const isUser = await User.findOne({ email: user.email });
    if (!isUser) return res.sendStatus(401);

    return res.json({
        user: { fullName: isUser.fullName, email: isUser.email, _id: isUser._id, createdOn: isUser.createdOn },
        message: "User fetched successfully"
    });
};
exports.logout = (req, res) => {
    // Invalidate the token by not sending it back to the client
    return res.json({ error: false, message: "Logged out successfully" });
};