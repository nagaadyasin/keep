import { useState, useEffect } from "react";
import {
  Plus,
  Trash2,
  Moon,
  Sun,
  Search,
  RefreshCw,
  LayoutGrid,
  Settings,
} from "lucide-react";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // ✅ Fetch notes from backend
  useEffect(() => {
    async function fetchNote() {
      try {
        const res = await fetch("http://localhost:9000/notes");
        const data = await res.json();
        setNotes(data);
      } catch (error) {
        console.error("Error fetching notes:", err);
      }
    }
    fetchNote();
  }, []);

  // ✅ Add new note
  async function handleAddNote() {
    if (!title.trim() && !content.trim()) return;

    const response = await fetch("http://localhost:9000/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });

    const newNote = await response.json();
    setNotes([newNote, ...notes]);
    setTitle("");
    setContent("");
  }
  async function handleDeletNote(id) {
    try {
      const response = await fetch(`http://localhost:9000/notes/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      setNotes(notes.filter((note) => note._id !== data._id));
    } catch (error) {
      console.error(error);
    }
  }
  // ✅ Toggle dark mode
  function toggleTheme() {
    setDarkMode(!darkMode);
  }

  return (
    <div
      className={`min-h-screen transition-all duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* ===== Header ===== */}
      <header
        className={`flex items-center justify-between px-6 py-3 shadow-sm ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        {/* Left - Logo */}
        <div className="flex items-center gap-2">
          <div className="bg-yellow-400 w-8 h-8 rounded flex items-center justify-center text-white font-bold text-lg">
            K
          </div>
          <h1 className="text-xl font-medium">Keepify</h1>
        </div>

        {/* Middle - Search bar */}
        <div
          className={`flex items-center rounded-lg px-3 py-2 w-full max-w-xl mx-8 ${
            darkMode ? "bg-gray-700" : "bg-gray-100"
          }`}
        >
          <Search className="text-gray-500" size={20} />
          <input
            type="text"
            placeholder="Search"
            className={`bg-transparent outline-none px-2 w-full ${
              darkMode ? "text-gray-200" : "text-gray-700"
            }`}
          />
        </div>

        {/* Right - Icons */}
        <div className="flex items-center gap-4 text-gray-600 dark:text-gray-300">
          <RefreshCw className="cursor-pointer hover:text-yellow-500" />
          <LayoutGrid className="cursor-pointer hover:text-yellow-500" />
          <Settings className="cursor-pointer hover:text-yellow-500" />
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </header>

      {/* ===== Note Input ===== */}
      <div className="flex justify-center mt-10 px-4">
        <div
          className={`w-full max-w-2xl rounded-2xl shadow-md p-5 relative ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full font-semibold outline-none mb-1 ${
              darkMode ? "text-white" : "text-gray-800"
            }`}
          />
          <textarea
            placeholder="Take a note..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className={`w-full outline-none resize-none h-20 bg-transparent ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          />

          <div className="flex justify-end mt-2">
            <button
              onClick={handleAddNote}
              className="flex items-center gap-1 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-4 py-2 rounded-full transition"
            >
              <Plus size={18} /> Add
            </button>
          </div>
        </div>
      </div>

      {/* ===== Notes Grid ===== */}
      <div className="px-6 py-10 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {notes.map((note) => (
          <div
            key={note._id}
            className={`relative rounded-xl shadow p-4 hover:shadow-lg transition ${
              darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"
            }`}
          >
            <h2 className="font-semibold text-lg mb-1">{note.title}</h2>
            <p className="text-sm whitespace-pre-wrap">{note.content}</p>

            <button
              onClick={() => handleDeletNote(note._id)}
              className="absolute bottom-2 right-2 text-red-400 hover:text-red-600"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}

        {notes.length === 0 && (
          <p className="text-center text-gray-400 col-span-full">
            No notes yet...
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
