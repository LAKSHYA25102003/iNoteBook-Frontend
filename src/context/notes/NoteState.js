import NoteContext from "./NoteContext";
import { useState } from "react";
import AlertContext from '../Alert/AlertContext';
import { useContext } from 'react';

const NoteState = (props) => {
    const context=useContext(AlertContext);
    const {handleAlert}=context;

    // const s1={
    //     name:"lakshya",
    //     class:"12"
    // }
    // const [state,setState]=useState(s1);
    // const update=()=>{
    //     const fn=()=>{
    //         setState({
    //             name:"neeraj",
    //             class:"10"
    //         })
    //     }
    //    setInterval(fn,1000);
    // }
    const notesInitial = [];

    const [notes, setNotes] = useState(notesInitial);


    // getNote
    const getNote = async () => {
        const url = "http://localhost:5000/api/notes/fetch-all-notes";
        const response = await fetch(url, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'auth-token': localStorage.getItem("Token")
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        const json = await response.json(); // parses JSON response into native JavaScript objects
        if(json.success)
        {
            setNotes(json.note);
        }
        
    }


    // function to add a note
    const addNote = async (title, description, tag) => {
        const data={
            title:title,
            description:description,
            tag:tag
        }
        const url = "http://localhost:5000/api/notes/add-notes";
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type':'application/json',
                'auth-token': localStorage.getItem("Token")
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data)
        });
        const json = await response.json();
        if(json.success)
        {
            handleAlert("Note is added successfully!","success");
        }
        else
        {
            handleAlert("Error: Note is not added.Please write atleast five character in every field!","danger");
        }
        getNote();
    }


    // function to delete note
    const deleteNote = async (id) => {
        const url = `http://localhost:5000/api/notes/delete-note/${id}`;
        const response = await fetch(url, {
            method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'auth-token': localStorage.getItem("Token")
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        const json = await response.json();
        if(json.success)
        {
            handleAlert("Note is deleted successfully!","success");   
        }
        else
        {
            handleAlert("Error:Note is note deleted!","danger");
        }
        getNote();

    }


    // function to update note
    const updateNote=async (id,title,description,tag)=>{
        
        const data={
            title:title,
            description:description,
            tag:tag
        }
        const url = `http://localhost:5000/api/notes/update-note/${id}`;
        const response = await fetch(url, {
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type':'application/json',
                'auth-token': localStorage.getItem("Token")
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data)
        });
        const json = await response.json();
        if(json.success)
        {
            handleAlert("Note is updated successfully!","success");   
        }
        else
        {
            handleAlert("Error:Note is note updated!","danger");
        }
        getNote();
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, getNote ,updateNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;