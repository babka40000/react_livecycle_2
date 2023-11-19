import React, { useEffect, useState } from 'react'
import './css/Notes.css'
import Note from '../Note/Note'

const Notes = () => {
  const [notes, setNotes] = useState([]);

  async function fetchData() {
    const url = 'http://localhost:7070/notes';
    let response = await fetch(url);

    if (response.ok) {
      let json = await response.json();
      setNotes(json);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const NewNoteHandler = async event => {
    event.preventDefault();
    await fetch('http://localhost:7070/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ content: event.target.content.value })
    });

    fetchData();
  }

  const refreshHandler = () => {
    fetchData();
  }

  const deleteNoneHandler = (event) => {
    setNotes(notes.toSpliced(notes.findIndex(record => record.id == event.target.id), 1));
  }

  return (
    <div>
      <div className='notes-header'>
        <div className='notes-header-word'>NOTES</div>
        <button onClick={refreshHandler} className='notes-refresh-button'>Обновить</button>
      </div>
      <div className='notes-notes'>
        {notes.map(item => (
          <Note key={item.id} index={item.id} content={item.content} deleteNoneHandler={deleteNoneHandler} />
        ))}
      </div>
      <form className='notes-new' onSubmit={NewNoteHandler}>
        <div className='notes-new-header'>New Note</div>
        <input type="text" name='content' />
        <button type="submit">Создать</button>
      </form>
    </div>
  )
}

export default Notes