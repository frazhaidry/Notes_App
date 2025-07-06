const Note = require("../models/note.model");

exports.addNote = async (req, res) => {
    const { title, content, isPinned, tags = [] } = req.body;
    const { user } = req.user;

    if (!title || !content) return res.status(400).json({ error: true, message: "Title and Content are required" });

    const note = new Note({ title, content, isPinned, tags, userId: user._id });
    await note.save();

    return res.json({ error: false, message: "Note added successfully", note });
};

exports.editNote = async (req, res) => {
    const { id } = req.params;
    const { title, content, isPinned, tags = [] } = req.body;
    const { user } = req.user;

    const note = await Note.findOne({ _id: id, userId: user._id });
    if (!note) return res.status(404).json({ error: true, message: "Note not found" });

    if (title) note.title = title;
    if (content) note.content = content;
    if (typeof isPinned !== "undefined") note.isPinned = isPinned;
    if (tags.length) note.tags = tags;

    await note.save();

    return res.json({ error: false, message: "Note updated", note });
};

exports.getAllNotes = async (req, res) => {
    const { user } = req.user;
    const notes = await Note.find({ userId: user._id });

    return res.json({ error: false, notes, message: "Notes fetched" });
};

exports.deleteNote = async (req, res) => {
    const { id } = req.params;
    const { user } = req.user;

    const note = await Note.findOne({ _id: id, userId: user._id });
    if (!note) return res.status(404).json({ error: true, message: "Note not found" });

    await note.deleteOne();
    return res.json({ error: false, message: "Note deleted" });
};
