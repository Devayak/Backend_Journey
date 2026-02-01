

import { useState } from 'react'
import axios from 'axios';
import './App.css'

function App() {

const [notes,setNotes]=useState([
  {
    title:'Note-1',
    description:'This is note one'
  },
  {
    title:'Note-1',
    description:'This is note one'
  },
  {
    title:'Note-1',
    description:'This is note one'
  },
  {
    title:'Note-1',
    description:'This is note one'
  },
])
axios.get('http://localhost:3000/api/notes')
.then(res=>{
  setNotes(res.data.fetchData)
})

//post request,delete,patch request 
// fb
// 

  return (
    <div>
      <h1>Backend Frontend</h1>
      <main>
        
       {
        notes.map((note,idx)=>{
          return(
             <div className="notes" key={idx}>
          <h3>{note.title}</h3>
          <h4>{note.description}</h4>
        </div>
          )
        })
       }
      </main>
    </div>
  )
}

export default App
