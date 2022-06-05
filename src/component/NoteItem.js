import React from 'react'
import { useContext } from 'react';
import NoteContext from '../context/notes/NoteContext';


function NoteItem(props) {
    const context = useContext(NoteContext);
    const { deleteNote } = context;
    const note = props.note;
    return (
        <>
            
            <div className='col-md-4 my-1'>
                <div className="card" >
                    <div className="card-body">

                        <h5 className="card-title">{note.title}</h5>

                        <h6 className="card-subtitle mb-2 text-muted">{note.tag}</h6>
                        <p className="card-text">{note.description}</p>

                        <i className="fa fa-trash mx-2" aria-hidden="true" style={{ cursor: "pointer" }} onClick={(event) => {
                            event.preventDefault();
                            deleteNote(note._id);
                        }}></i>
                        <i className="fa fa-pencil-square-o mx-2 my-1" aria-hidden="true" style={{ cursor: "pointer" }} onClick={()=>{props.handleClick(note._id)}}></i>
                    </div>
                </div>
            </div>
        </>
    )
}



export default NoteItem

