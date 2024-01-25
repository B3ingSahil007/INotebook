import React, { useContext, useState } from 'react'
import NoteContext from '../Context/notes/NoteContext'

const AddNote = (props) => {
    const context = useContext(NoteContext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" })

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag)
        setNote({ title: "", description: "", tag: "" })
        props.showAlert("Added Successfully", "success");
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <div className="container my-3">
            <h2>Add a Note :</h2>
            <form>
                <div className="row g-3 align-items-center">
                    <div className="col-auto">
                        <label htmlFor="title" name="title" className="form-label">Title :</label>
                        <input type="text" id="title" value={note.title} required minLength={5} name="title" className="form-control" onChange={onChange} />
                    </div>
                    <div className="col-auto">
                        <label htmlFor="description" className="col-form-label">Description :</label>
                        <input type="text" id="desc" value={note.description} required minLength={5} name="description" className="form-control" onChange={onChange} />
                    </div>
                    <div className="col-auto">
                        <label htmlFor="tag" className="col-form-label">Tag :</label>
                        <input type="text" id="tag" value={note.tag} name="tag" className="form-control" onChange={onChange} />
                    </div>
                    <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-outline-light" onClick={handleClick}>Add Note</button>
                </div>
            </form>
        </div>
    )
}

export default AddNote
