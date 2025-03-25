require("dotenv").config();
const express = require("express")
const cors = require("cors")
const app = express()
const port = 8000

const config = require("./config.json")
const mongoose = require("mongoose")
const User = require("./models/user.model")
const Note = require("./models/note.modal") 
 

mongoose.connect(config.connectionString);

const jwt = require("jsonwebtoken")
const {authenticateToken} = require("./utilities")

app.use(express.json())
app.use(cors({
    origin: "*",
}))

app.post("/create-account", async(req, res) => {
    const {fullName, email, password} = req.body
       
    if(!fullName){
        return res.status(400).json({error: true, message: "Full Name is required"})
    }

    if(!email){
        return res.status(400).json({error: true, message: "Email is required"})
    }

    if(!password){
        return res.status(400).json({error: true, message: "Password is required"})
    }

    const isUser = await User.findOne({ email: email});

    if(isUser){
        return res.json({
            error: true,
            message: "User already exists"
        })
    }

    const user = new User({
        fullName,
        email,
        password    
    });

    await user.save();


    const accessToken = jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1d",
    })

    return res.json({
        error: false,
        user, 
        accessToken,
        message: "Registration Successful"
    }) 
    
})


app.get("/login", async(req, res) => {
    const {email , password} = req.body;

    if(!email){
        return res.status(400).json({error: true, message: "Email is required"})
    }
    if(!password){
        return res.status(400).json({error: true, message: "Password is required"})
    }

    const userInfo = await User.findOne({email: email});

    if(!userInfo){
        return res.status(400).json({error: true, message: "User not found"})
    }

    if(userInfo.email == email && userInfo.password == password){
        const user = {user: userInfo};
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "1d",
        })

        return res.json({
            error: false,
            message: "Login Successful",
            user: userInfo,
            email,
            accessToken,
        })

    }
    else{
        return res.status(400).json({error: true, message: "Invalid Credentials"})
    }
})


// Add Note
app.post("/add-note", authenticateToken, async (req, res) => {
    const { title, content, isPinned, tags = [] } = req.body;  // Added default value for tags
    const { user } = req.user;

    // Input validation
    if (!title) {
        return res.status(400).json({ error: true, message: "Title is required" });
    }

    if (!content) {
        return res.status(400).json({ error: true, message: "Content is required" });
    }

    try {
        const note = new Note({
            title,
            content,
            isPinned,           // Include isPinned field
            tags,               // Use the tags properly
            userId: user._id    // Accessing the user ID properly
        });

        await note.save();
        return res.json({
            error: false,
            message: "Note added successfully",
            note,
        });
    } catch (error) {  // Catching and logging the error properly
        console.error(error);  
        return res.status(500).json({ error: true, message: "Internal Server Error" });
    }
});

// Edit Note 
app.put("/edit-note/:id", authenticateToken, async (req, res) => {
   const { title, content, isPinned, tags = [] } = req.body;  // Added default value for tags
    const { user } = req.user;
    const { id } = req.params;

    if(!title && !content){
        return res.status(400).json({error: true, message: "Title, Content or both are required"})
    }

    try {
        const note = await Note.findOne({ _id: id, userId: user._id });

        if (!note) {
            return res.status(404).json({ error: true, message: "Note not found" });
        }

        // Only update fields if provided
        if (title) note.title = title;
        if (content) note.content = content;
        if (typeof isPinned !== "undefined") note.isPinned = isPinned; 
        if (tags.length) note.tags = tags;          

        await note.save();
        return res.json({
            error: false,
            message: "Note updated successfully",
            note,
        });
    } catch (error) {  // Catching and logging the error properly
        console.error(error);
        return res.status(500).json({ error: true, message: "Internal Server Error" });
    } 
})

app.get("/all-notes", authenticateToken, async(req, res) => {
    const { user } = req.user;

   try {
    const notes = await Note.find({ userId: user._id });

    return res.json({
        error: false,
        notes,
        message: "All notes fetched successfully",
    });
   } catch (error) {
    return res.status(500).json({ error: true, message: "Internal Server Error" });
   }
})

app.delete("/delete-note/:id", authenticateToken, async(req, res) => {
    const { user } = req.user;
    const { id } = req.params;

    try {
        const note = await Note.findOne({ _id: id, userId: user._id });

        if (!note) {
            return res.status(404).json({ error: true, message: "Note not found" });
        }

        await note.deleteOne({ _id: id , userId: user._id});
        return res.json({
            error: false,
            message: "Note deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({ error: true, message: "Internal Server Error" });
    }
})

app.get("/", (req, res) => {
    res.send("Hello World")
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`) 
})

module.exports = app ; 