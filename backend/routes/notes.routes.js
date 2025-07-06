const express = require("express");
const router = express.Router();
const { addNote, editNote, getAllNotes, deleteNote } = require("../controllers/notes.controller");
const { authenticateToken } = require("../middleware/auth.middleware");

router.post("/add-note", authenticateToken, addNote);
router.put("/edit-note/:id", authenticateToken, editNote);
router.get("/all-notes", authenticateToken, getAllNotes);
router.delete("/delete-note/:id", authenticateToken, deleteNote);

module.exports = router;
