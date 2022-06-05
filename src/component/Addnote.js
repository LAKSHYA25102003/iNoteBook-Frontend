import React from "react";
import NoteContext from '../context/notes/NoteContext';
import { useContext } from 'react';
import { useState } from 'react';

const Addnote = () => {
    const context = useContext(NoteContext)
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" });
    const onChange = (event) => {
        event.preventDefault();
        setNote({ ...note, [event.target.name]: event.target.value });
    }

    const handleClick = (event) => {
        event.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNote({title: "", description: "", tag: ""});
    }

    return (
        <div className="container my-3">
            <h2>Add a Note</h2>
            <form className='my-3' onSubmit={handleClick}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input required minLength={5} value={note.title} type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input required minLength={5} value={note.description} type="text" className="form-control" id="description" name='description' onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="tag">Tag</label>
                    <input value={note.tag} type="text" className="form-control" id="tag" name='tag' onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary"  >Add Note</button>
            </form>
        </div>
    );
}

export default Addnote;
