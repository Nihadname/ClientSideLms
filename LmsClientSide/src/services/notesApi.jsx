// src/services/notesApi.js
import axios from 'axios';

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
    try {
      const response = await axios.put(`https://localhost:7032/api/Note/${id}`, updatedNote, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.data;  // Ensure that the updated note is returned here
    } catch (error) {
      console.error('Error updating note:', error);
      throw error;
    }
  };
  
  

  

export const deleteNote = async (id, token) => {
    if (!id) {
        console.error('Invalid note ID');
        return;
      }
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
