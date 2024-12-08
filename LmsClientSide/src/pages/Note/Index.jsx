import React, { useEffect, useState } from 'react';
import { getNotes, createNote, updateNote, deleteNote } from '../../services/notesApi';
import './index.css';
import NoteCard from '../../components/NoteCard/Index';

function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({
    title: '',
    description: '',
    categoryName: ''
  });
  const [editingNote, setEditingNote] = useState(null);  // Track which note is being edited
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('jwtToken');

  useEffect(() => {
    if (!token) return;
    const fetchNotes = async () => {
      try {
        const data = await getNotes(token);
        if (Array.isArray(data.items)) {
          setNotes(data.items);
        } else {
          setError('Invalid response format');
        }
        setLoading(false);
      } catch (error) {
        setError('Failed to load notes');
        setLoading(false);
      }
    };
    fetchNotes();
  }, [token]);

  const handleCreateNote = async () => {
    if (!newNote.title.trim() || !newNote.description.trim() || !newNote.categoryName.trim()) return;
    try {
      const createdNote = await createNote(newNote, token);
      setNotes([...notes, createdNote]);
      setNewNote({
        title: '',
        description: '',
        categoryName: ''
      });
    } catch (error) {
      setError('Error creating note: ' + error.message);
    }
  };

  const handleUpdateNote = async (id, updatedNote) => {
    try {
      const updatedNoteResponse = await updateNote(id, updatedNote, token);
      setNotes(notes.map(note => (note.id === id ? updatedNoteResponse : note)));
      setEditingNote(null);  // Clear editing after update
    } catch (error) {
      setError('Error updating note: ' + error.message);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await deleteNote(id, token);
      setNotes(notes.filter(note => note.id !== id));
    } catch (error) {
      setError('Error deleting note: ' + error.message);
    }
  };

  return (
    <div className="notes-page">
      <h1>My Notes</h1>
      {loading && <p>Loading notes...</p>}
      {error && <p className="error">{error}</p>}

      <div className="new-note">
        <input
          type="text"
          placeholder="Title"
          value={newNote.title}
          onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
        />
        <textarea
          placeholder="Description"
          value={newNote.description}
          onChange={(e) => setNewNote({ ...newNote, description: e.target.value })}
        />
        <input
          type="text"
          placeholder="Category"
          value={newNote.categoryName}
          onChange={(e) => setNewNote({ ...newNote, categoryName: e.target.value })}
        />
        <button onClick={handleCreateNote}>Add Note</button>
      </div>

      <div className="notes-list">
      <div className="notes-list">
  {notes.map(note => (
    <NoteCard
      key={note.id}  // Ensure this is unique
      note={note}
      onUpdate={handleUpdateNote}
      onDelete={handleDeleteNote}
      setEditingNote={setEditingNote}
      editingNote={editingNote}
    />
  ))}
</div>

      </div>
    </div>
  );
}

export default NotesPage;
