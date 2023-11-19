import React, {useEffect} from 'react'
import './css/Note.css'

const Note = props => {
  useEffect(() => {
    return async () => {
      await fetch('http://localhost:7070/notes/' + props.index, {
        method: 'DELETE',
      });
    }
  }, [])

  return (
    <div className='note-main'>
      <div>{props.content}</div>
      <button id={props.index} onClick={props.deleteNoneHandler}>x</button>
    </div>
  )
}

export default Note