import React, { useState, useEffect} from 'react'
import ListItem from '../components/ListItem'
import AddButton from '../components/AddButton'
import MicroButton from '../components/MicroButton'

const NotesListPage = () => {

    let [notes, setNotes] = useState([]) 
        useEffect(() => {
            getNotes()
    }, [])

    let getNotes = async()=>{
        let response = await fetch('/api/notes')
        let data = await response.json() // Ждем выполнения response.json()

        console.log('DATA', data)
        setNotes(data)
    }

    return (
        <div className="notes">
            <div className="notes-header">
                <h2 className="notes-title">&#9782; Notes. Morg edition</h2>
                <p className="notes-count">{notes.length}</p>
            </div>
           <div className='notes-list'>
                {notes.map((note, index) => (
                   <ListItem key={index} note={note}/>
                ))}
            <AddButton />
            <MicroButton />
           </div>
           
        </div>
    )
}

export default NotesListPage
