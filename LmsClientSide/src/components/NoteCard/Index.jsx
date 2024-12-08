import React, { useState, useEffect } from 'react';

function NoteCard({ note, onUpdate, onDelete, setEditingNote, editingNote }) {
  const [editedNote, setEditedNote] = useState({
    title: note.title,
    description: note.description,
    categoryName: note.categoryName,
  });

  // When editingNote changes, update the local editedNote state
  useEffect(() => {
    if (editingNote && editingNote.id === note.id) {
      setEditedNote({
        title: editingNote.title,
        description: editingNote.description,
        categoryName: editingNote.categoryName,
      });
    }
  }, [editingNote, note.id]);

  const handleEdit = () => {
    if (editingNote && editingNote.id === note.id) {
      onUpdate(note.id, editedNote); // Correctly pass note.id for the PUT request
    } else {
      setEditingNote(note); // Set the note to be edited
    }
  };

 // Inside NoteCard component
return (
  <div className="note-card">
    {editingNote && editingNote.id === note.id ? (
      <div>
        <input
          type="text"
          value={editedNote.title}
          onChange={(e) => setEditedNote({ ...editedNote, title: e.target.value })}
        />
        <textarea
          value={editedNote.description}
          onChange={(e) => setEditedNote({ ...editedNote, description: e.target.value })}
        ></textarea>
        <input
          type="text"
          value={editedNote.categoryName}
          onChange={(e) => setEditedNote({ ...editedNote, categoryName: e.target.value })}
        />
      </div>
    ) : (
      <div>
        <h3>{note.title}</h3>
        <p>{note.description}</p>
        <small>{note.categoryName}</small>
      </div>
    )}

    <div className="note-actions">
      <button onClick={handleEdit}>
        {editingNote && editingNote.id === note.id ? 'Save' : 'Edit'}
      </button>
      <button onClick={() => onDelete(note.id)}>Delete</button>
    </div>
  </div>
);

}

export default NoteCard;
