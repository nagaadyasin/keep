import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

// ✅ MongoDB URI
const uri = "mongodb+srv://ftayasin:fta12345@cluster0.peekonz.mongodb.net/keep?appName=Cluster0";
async function connectDb() {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("✅ MongoDB connected");
    } catch (error) {
        console.error("❌ Error connecting to MongoDB:", error);
    }

    mongoose.connection.on("connected", () => {
        console.log("✅ MongoDB Connection is open");
        console.log(req)
    });

    mongoose.connection.on("error", (err) => {
        console.error("❌ MongoDB Connection Error:", err);
    });
}

connectDb();

// ✅ Define Schema & Model
const noteSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
});
const Note = mongoose.model("Note", noteSchema);

// ✅ Routes
app.get("/notes", async (req, res) => {
    try {
        const notes = await Note.find();
        res.json(notes);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error", error: err.message });
    }
});

app.post("/notes", async (req, res) => {
    try {
        const newNote = new Note(req.body);
        await newNote.save();
        res.json(newNote);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error", error: err.message });
    }
});
app.delete("/notes/:id", async (req, res) => {
    try {
        const { id } = req.params
        const deletedNote = await Note.findByIdAndDelete(id)
        res.json(deletedNote)
    } catch (error) {
      console.error(error)
    }

})

// ✅ Start server
const PORT = 1000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

