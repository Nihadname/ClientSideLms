import React, { useEffect, useState } from 'react';
import { createNote, deleteNote } from '../../services/notesApi';
import './index.css';
import NoteCard from '../../components/NoteCard/Index';
import axios from 'axios';

function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({
    title: '',
    description: '',
    categoryName: ''
  });
  const [editingNote, setEditingNote] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('jwtToken');
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 3;
  const [searchQuery, setSearchQuery] = useState('');  // State for search query

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://localhost:7032/api/Note', {
          params: {
            pageNumber: pageNumber,
            pageSize: pageSize,
            searchQuery: searchQuery, 
          },
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        console.log('API Response:', response.data); // Log the entire response to verify structure

        // Check if response.data and response.data.data are defined
        if (response.data && response.data.data) {
          setNotes(response.data.data.items || []); // Ensure notes is an array
          setTotalPages(response.data.data.totalPages || 1); // Default to 1 if undefined
        } else {
          console.error('Unexpected API response structure:', response.data);
          setNotes([]); // Set notes to an empty array if structure is unexpected
        }
      } catch (error) {
        console.error('Error fetching notes:', error);
        setNotes([]); // Set notes to an empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [pageNumber, searchQuery]);

  console.log(notes);  // Log notes to ensure each note has a unique ID

  const handleCreateNote = async () => {
    if (!newNote.title.trim() || !newNote.description.trim() || !newNote.categoryName.trim()) return;
    try {
      const createdNote = await createNote(newNote, token);
      console.log("Created note:", createdNote);  // Log the response to see if it includes the `id`
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

  const cleanObject = (obj) => {
    return Object.fromEntries(
      Object.entries(obj).filter(([_, value]) => value !== null && value !== undefined)
    );
  };

  const handleUpdateNote = async (id, updatedNote) => {
    if (!id) {
      console.error('Invalid note ID');
      return;
    }
    
    // Log the data just before sending the update request
    console.log("Sending updated note:", updatedNote);
  
    try {
      // Create a FormData object and append the fields
      const formData = new FormData();
      formData.append('id', id);
      formData.append('title', updatedNote.title);
      formData.append('description', updatedNote.description);
      formData.append('categoryName', updatedNote.categoryName);
  
      // Manually make the PUT request to update the note
      const response = await axios.put(`https://localhost:7032/api/Note/${id}`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data', // Set content type to multipart/form-data
        },
      });
  
      // Log the updated note response from the API
      console.log('Updated note response:', response.data);
  
      // Update the notes in state with the updated note
      setNotes(notes.map(note => (note.id === id ? response.data : note)));
      setEditingNote(null);
    } catch (error) {
      setError('Error updating note: ' + error.message);
    }
  };
  

  const handleDeleteNote = async (id) => {
    if (!id) {
      console.error('Invalid note ID');
      return;
    }
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
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search notes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}  // Update searchQuery state on input change
        />
      </div>
      <div className="notes-list" style={{marginBottom:"25px"}}>
        {Array.isArray(notes) && notes.map(note => {  // Ensure notes is an array
          if (!note.id) {
            console.error("Note has no ID", note);  // This will log notes that lack an ID
          }
          return (
            <NoteCard
              key={note.id}  // Ensure unique key prop
              note={note}
              onUpdate={handleUpdateNote}
              onDelete={handleDeleteNote}
              setEditingNote={setEditingNote}
              editingNote={editingNote}
            />
          );
        })}
      </div>

      <div className="pagination">
        <button 
          disabled={pageNumber === 1}
          onClick={() => setPageNumber(pageNumber - 1)}>
          Previous
        </button>
        <span>Page {pageNumber} of {totalPages}</span>
        <button 
          disabled={pageNumber === totalPages}
          onClick={() => setPageNumber(pageNumber + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}

export default NotesPage;
