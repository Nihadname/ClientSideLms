// src/services/notesApi.js
const API_URL = 'https://localhost:7032/api/Note';

export const getNotes = async (token) => {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error('Error fetching notes');
    return await response.json();
  } catch (error) {
    console.error('Error fetching notes:', error);
    throw error;
  }
};

export const createNote = async (note, token) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(note),
    });
    if (!response.ok) throw new Error('Error creating note');
    return await response.json();
  } catch (error) {
    console.error('Error creating note:', error);
    throw error;
  }
};

// Update Note API request example
// Update Note API request example
export const updateNote = async (id, updatedNote, token) => {
    const response = await fetch(`https://localhost:7032/api/Note/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(updatedNote),
    });

    if (!response.ok) {
      throw new Error('Error updating note');
    }

    return await response.json();
};

  

export const deleteNote = async (id, token) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error('Error deleting note');
    return await response.text();
  } catch (error) {
    console.error('Error deleting note:', error);
    throw error;
  }
};
