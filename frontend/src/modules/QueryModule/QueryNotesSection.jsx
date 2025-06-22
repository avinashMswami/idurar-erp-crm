// src/modules/QueryModule/QueryNotesSection.jsx

import { useState } from 'react';
import { Input, Button, List, Popconfirm, message } from 'antd';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function QueryNotesSection({ notes = [], refresh }) {
  const [noteText, setNoteText] = useState('');
  const { id } = useParams();

  const handleAddNote = async () => {
    if (!noteText.trim()) return;
    try {
      await axios.post(`/queries/${id}/notes`, { text: noteText });
      message.success('Note added');
      setNoteText('');
      refresh();
    } catch (err) {
      message.error('Failed to add note');
    }
  };

  const handleDelete = async (noteId) => {
    try {
      await axios.delete(`/queries/${id}/notes/${noteId}`);
      message.success('Note deleted');
      refresh();
    } catch (err) {
      message.error('Failed to delete note');
    }
  };

  return (
    <>
      <h3 style={{ marginTop: 32 }}>Notes</h3>
      <Input.TextArea
        rows={3}
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
        placeholder="Write a note..."
      />
      <Button type="primary" onClick={handleAddNote} style={{ marginTop: 8 }}>
        Add Note
      </Button>

      <List
        header={`${notes.length} Notes`}
        dataSource={notes}
        style={{ marginTop: 16 }}
        renderItem={(note) => (
          <List.Item
            actions={[
              <Popconfirm
                title="Delete this note?"
                onConfirm={() => handleDelete(note._id)}
              >
                <Button type="link" danger>
                  Delete
                </Button>
              </Popconfirm>,
            ]}
          >
            {note.text}
          </List.Item>
        )}
      />
    </>
  );
}