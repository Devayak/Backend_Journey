import { useEffect, useState } from "react";
import axios from "axios";

import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [editId, setEditId] = useState(null);
  console.log("hello");
  console.log(notes);

  //!get method
  function fetchData() {
    axios.get("http://localhost:3000/api/notes").then((res) => {
      console.log(res.data.note);
      setNotes(res.data.note);
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const { title, description } = e.target;
    console.log(title.value);
    console.log(description.value);
    const data = {
      title: title.value,
      description: description.value,
    };
    if (editId) {
      axios
        .patch(`http://localhost:3000/api/notes/${editId}`, data)
        .then((res) => {
          console.log(res.data);
          fetchData();
          setEditId(null);
          e.target.reset();
        });
    } else {
      axios
        .post("http://localhost:3000/api/notes", {
          title: title.value,
          description: description.value,
        })
        .then((res) => {
          console.log(res.data);
          fetchData();
        });
    }
  }

  function handleDeleteNote(noteId) {
    console.log("Deleting note with ID:", noteId);
    axios.delete("http://localhost:3000/api/notes/" + noteId).then((res) => {
      console.log(res.data);
      fetchData();
    });
  }

  return (
    <>
      <main>
        <div className="post">
          <form onSubmit={handleSubmit}>
            <input type="text" name="title" placeholder="enter the title" />
            <input
              type="text"
              name="description"
              placeholder="enter the descrition"
            />
            <button type="submit">create note</button>
          </form>
        </div>
        <div className="notes">
          {notes.map((ele) => {
            console.log(ele);
            return (
              <div>
                <div className="cards" key={ele._id}>
                  <h3>{ele.title}</h3>
                  <h4>{ele.description}</h4>
                <div>
                    <button
                    onClick={() => {
                      handleDeleteNote(ele._id);
                    }}
                  >
                    delete
                  </button>
                  <button id="edit"
                    onClick={() => {
                      setEditId(ele._id);
                      document.querySelector("[name=title]").value = ele.title;
                      document.querySelector("[name=description]").value =
                        ele.description;
                    }}
                  >
                    edit
                  </button>
                </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}

export default App;
