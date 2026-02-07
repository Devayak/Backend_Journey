import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState(null);

  function getUsersData() {
    axios.get("http://localhost:3000/api/user").then((res) => {
      console.log(res.data);
      setUsers(res.data.userData);
    });
  }


  function handlesubmit(e) {
    e.precentDefault();
    const { name, age, address, contact_No } = e.target;
    const data = {
      name: name.value,
      age: age.value,
      address: address.value,
      contact_No: contact_No.value,
    };
    console.log(data);
    if(userId){
      axios.patch(`http://localhost:3000/api/users/${userId}`).then((res)=>{
        console.log(res.data);
        getUsersData()
        setUserId(null)
      })
    }
    else{
        axios.post("http://localhost:3000/api/user").then((res)=>{
          console.log(res.data);
          getUsersData()

        })
      }
    }
  


  function deleteData(id) {
    axios.delete(`http://localhost:3000/api/user/${id}`).then((res) => {
      console.log(res.data);
      getUsersData();
    });
  }

  useEffect(() => {
    getUsersData();
  }, []);

  return (
    <>
      <main>
        <div className="post">
          <form onSubmit={handlesubmit}>
            <input type="text" name="name" placeholder="enter the name" />
            <input
              type="text"
              name="age"
              placeholder="enter the age"
            />
            <input type="text" name="address" placeholder="enter your address" />
            <input type="text" name="contact_No" placeholder="enter ypur number" />
            <button type="submit">create note</button>
          </form>
        </div>
        <div className="notes">
          {users.map((ele) => {
            // console.log(ele);
            return (
              <div>
                <div className="cards" key={ele._id}>
                  <h3>{ele.name}</h3>
                  <h4>{ele.age}</h4>
                  <h4>{ele.address}</h4>
                  <h4>{ele.contact_No}</h4>
                  <div>
                    <button
                      onClick={() => {
                        deleteData(ele._id);
                      }}
                    >
                      delete
                    </button>
                    <button
                      id="edit"
                      onClick={() => {
                        setUserId(ele._id);
                        document.querySelector("[name=name]").value = ele.name;
                        document.querySelector("[name=age]").value = ele.age;
                        document.querySelector("[name=address]").value =
                          ele.address;
                        document.querySelector("[name=contact_No]").value =
                          ele.contact_No;
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
