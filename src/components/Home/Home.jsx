import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';

export default function Home() {
  const [userNotes, setUserNotes] = useState([]);
  const [note, setNote] = useState({ title: '', body: '', id: '' });

  // Load notes from localStorage or API
  async function getUserNotes() {
    const savedNotes = localStorage.getItem('userNotes');
    if (savedNotes) {
      setUserNotes(JSON.parse(savedNotes));
    } else {
      try {
        const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5');
        setUserNotes(data);
        localStorage.setItem('userNotes', JSON.stringify(data));
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    }
  }

  function handleInputChange({ target }) {
    setNote({ ...note, [target.name]: target.value });
  }

  function addUserNote(e) {
    e.preventDefault();

    if (note.title.trim() === '' || note.body.trim() === '') {
      Swal.fire('Error', 'Title and body cannot be empty.', 'error');
      return;
    }

    const newNote = {
      id: Date.now(),
      title: note.title,
      body: note.body,
    };

    const updatedNotes = [newNote, ...userNotes];
    setUserNotes(updatedNotes);
    localStorage.setItem('userNotes', JSON.stringify(updatedNotes));
    setNote({ title: '', body: '', id: '' });

    Swal.fire('Success', 'Note added successfully!', 'success');
  }

  function getNoteId(index) {
    const selected = userNotes[index];
    setNote({ title: selected.title, body: selected.body, id: selected.id });
  }

  function editUserNote(e) {
    e.preventDefault();
    if (note.title.trim() === '' || note.body.trim() === '') {
        Swal.fire('Error', 'Title and body cannot be empty.', 'error');
        return;
      }
  
    const updatedNotes = userNotes.map(n =>
      n.id === note.id ? { ...n, title: note.title, body: note.body } : n
    );

    setUserNotes(updatedNotes);
    localStorage.setItem('userNotes', JSON.stringify(updatedNotes));
    Swal.fire('Updated!', 'Note updated successfully.', 'success');
  }

  function deleteNote(noteId) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This will delete the note.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      if (result.isConfirmed) {
        const updatedNotes = userNotes.filter(note => note.id !== noteId);
        setUserNotes(updatedNotes);
        localStorage.setItem('userNotes', JSON.stringify(updatedNotes));
        Swal.fire('Deleted!', 'Your note has been deleted.', 'success');
      }
    });
  }

  useEffect(() => {
    getUserNotes();
  }, []);

  return (
    <div className="container my-4">
      <button
        className="btn btn-info float-end mb-3"
        data-bs-toggle="modal"
        data-bs-target="#addNoteModal"
      >
        Add Note
      </button>

      {/* Add Note Modal */}
      <div className="modal fade" id="addNoteModal" aria-hidden="true">
        <div className="modal-dialog">
          <form className="modal-content" onSubmit={addUserNote}>
            <div className="modal-header">
              <h5 className="modal-title">Add Note</h5>
              <button className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <input
                className="form-control mb-2"
                name="title"
                placeholder="Title"
                value={note.title}
                onChange={handleInputChange}
              />
              <textarea
                className="form-control"
                name="body"
                rows="5"
                placeholder="Body"
                value={note.body}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button type="submit" className="btn btn-info" data-bs-dismiss="modal">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Edit Note Modal */}
      <div className="modal fade" id="editNoteModal" aria-hidden="true">
        <div className="modal-dialog">
          <form className="modal-content" onSubmit={editUserNote}>
            <div className="modal-header">
              <h5 className="modal-title">Edit Note</h5>
              <button className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <input
                className="form-control mb-2"
                name="title"
                placeholder="Title"
                value={note.title}
                onChange={handleInputChange}
              />
              <textarea
                className="form-control"
                name="body"
                rows="5"
                placeholder="Body"
                value={note.body}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button type="submit" className="btn btn-info" data-bs-dismiss="modal">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Notes Display */}
      <div className="row">
        {userNotes.map((note, index) => (
          <div key={note.id} className="col-md-4 mb-4">
            <div className="p-3 note rounded shadow-sm position-relative">
              <h5>{note.title}</h5>
              <p>{note.body}</p>
              <div className="dropdown position-absolute top-0 end-0 m-2">
                <i
                  className="fa-solid fa-ellipsis-vertical float-end bold pointer"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                ></i>
                <ul className="dropdown-menu pointer w-100">
                  <li
                    onClick={() => getNoteId(index)}
                    className="dropdown-item"
                    data-bs-toggle="modal"
                    data-bs-target="#editNoteModal"
                  >
                    Edit
                    <i className="fa-solid fa-pen-to-square float-end blue"></i>
                  </li>
                  <li
                    onClick={() => deleteNote(note.id)}
                    className="dropdown-item text-danger"
                  >
                    Delete
                    <i className="fa-solid fa-trash-can float-end red"></i>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
