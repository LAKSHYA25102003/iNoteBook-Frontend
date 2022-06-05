import React from 'react'
import NoteItem from './NoteItem';
import { useState } from 'react';
import NoteContext from '../context/notes/NoteContext';
import { useContext } from 'react';
import { useEffect } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';

function Note() {
    const navigate=useNavigate();
    const context = useContext(NoteContext);
    const { notes, getNote, updateNote } = context;
    useEffect(() => {
        if (localStorage.getItem("Token")) {
            getNote();
        }
        else
        {
            navigate("/login");
        }
    }, []);

    // to set the the state of modal 
    const [modalState, setModalState] = useState(false);
    const [currId, setCurrId] = useState(null);

    // this function will run when edit button icon is clicked and give the id
    const handleClick = (id) => {
        setCurrId(id);
        setModalState(true);
    }


    // this function run when update button clicked
    const handleUpdate = (event) => {
        event.preventDefault();
        updateNote(currId, currnote.title, currnote.description, currnote.tag);
        setModalState(false);
    }


    // we are making curr note which is to be write at the the place of previous note

    const [currnote, setcurrNote] = useState({ title: "", description: "", tag: "" })


    const onChange = (event) => {
        event.preventDefault();
        setcurrNote({ ...currnote, [event.target.name]: event.target.value });

    }
    const handleCancel = () => {
        setModalState(false);
    }

    return (
        <>
            <Modal isOpen={modalState}
                onRequestClose={() => {
                    setModalState(false);
                }}
                style={
                    {
                        content: {
                            backgroundColor: "rgb(87 145 204)",
                            color: "white",
                            width: "80%",
                            margin: "auto"
                        }
                    }
                }
            >
                <h2>Edit Note</h2>
                <form className='my-3' onSubmit={handleUpdate}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Title</label>
                        <input required minLength={5} type="text" className="form-control" id="etitle" name='title' aria-describedby="emailHelp" onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Description</label>
                        <input required minLength={5} type="text" className="form-control" id="edescription" name='description' onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Tag</label>
                        <input type="text" className="form-control" id="etag" name='tag' onChange={onChange} />
                    </div>
                    <button type="submit" className="btn btn-dark"  >Update</button>
                    <button className="btn btn-dark mx-2" onClick={handleCancel} >Cancel</button>

                </form>
            </Modal>
            <div className='container my-3'><h2>Your Notes</h2></div>
            <div className="container">
                {notes.length === 0 && 'No Notes to display'}
            </div>
            <div className="container row my-3" style={{ marginBottom: 5 }}>

                {notes.length !== 0 &&
                    notes.map((note) => {
                        return (
                            <NoteItem handleClick={handleClick} note={note} key={note._id} />
                        );
                    })
                }
            </div>

        </>
    )
}

export default Note

