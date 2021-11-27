import React from 'react';
import {useParams } from "react-router";
import {useState, useEffect} from 'react';
import { ReactComponent as ArrowLeft} from '../assets/chevron-left.svg'
import { ReactComponent as DeleteButton} from '../assets/remove.svg'
import { ReactComponent as FileButton} from '../assets/file.svg'
import { Link, Routes } from 'react-router-dom';

// new


const NotePage = ({match, history}) => {
    let params = useParams({match})
    let noteId = params.id
    
    console.log("noteId:", noteId)
    
    let [note, setNote] = useState(null)
    useEffect(() => {
        getNode()
    }, [noteId])

    let getNode = async ()=>{
        if (noteId === 'new') return
        let response = await fetch(`/api/notes/${noteId}/`)
        let data = await response.json()
        setNote(data)

    }

    let updateNote = async () =>{
        fetch(`/api/notes/${noteId}/`, {
            method:"PUT",
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(note) /* note!!!!! */
        })
    }

    let createNote = async () =>{
        fetch(`/api/notes/`, {
            method:"POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(note) /* note!!!!! */
        })
    }
        
    let handleSubmit = () => {
        if(noteId !== 'new' && !note.body){
            deleteNote()
        }
        else if(noteId !== 'new'){
            updateNote()
        }
        else if(noteId === 'new' && note.body !== null){
            createNote()
           
        }
    }

    let deleteNote = async ()=>{
        fetch(`/api/notes/${noteId}/`, {
            method:"DELETE",
            headers:{
                'Content-Type': 'application/json'
            }
           
        })
        
    }

    let handleChange = async (value)=>{
        setNote(note => ({...note, 'body':value}))
    }
    return (
        <div className = "note">
            <div className = "note-header">
                <h3>
                    <Link to="/"><ArrowLeft onClick={handleSubmit}/></Link>
                </h3>
            {noteId !== 'new' ? (
                <Link to="/"><h3><DeleteButton onClick={deleteNote}/> </h3></Link>
            ):(
                
                <Link to="/"><h3><FileButton onClick={handleSubmit}/></h3></Link>
            )}    
              
            </div> 
            <textarea onChange={(e) => {handleChange(e.target.value)}} value={note?.body}></textarea> {/* Знак вопроса означает проверку на содержимое: если что-то есть, то выставляем, если нет, то ничего не делаем */}
       </div>
    )
}

export default NotePage