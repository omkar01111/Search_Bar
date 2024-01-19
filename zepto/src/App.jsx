import { useState } from "react";
import "./App.css";
import { X, Plus } from "lucide-react";
import { data } from "./data.js";

function App() {
  const [name, setName] = useState("");
  const [add, setAdd] = useState([]);
  const [filteredPeople, setFilteredPeople] = useState([]);

  const inputHandle = (e) => {
    const name = e.target.value;

    setName(name);
    const filteredData = data.pepole.filter((person) =>
      person.name.toLowerCase().includes(name.toLowerCase())
    );
    setFilteredPeople(filteredData);
  };

  const AddHandler = (person) => {
    if (!add.some((p) => p.name === person.name)) {
      const updatedData = data.pepole.filter((p) => p.name !== person.name);
      data.pepole = updatedData;
      setAdd([...add, person]);
    }
    // console.log(add);
    clearInput();
  };

  const removePerson = (index) => {
    const removedPerson = add[index];
    const updatedAdd = add.filter((p, i) => i !== index);
    setAdd(updatedAdd);
    data.pepole = [...data.pepole, removedPerson];
  };

  const clearInput = () => {
    setName("");
  };

  return (
    <>
      <div className="container">
        <div className="search_box">
          {add.map((person, index) => (
            <div className="prev_Search" key={index}>
              <img src={person.img} alt="" className="profile_img" />
              <h5>{person.name}</h5>
              <X
                className="remove"
                onClick={() => {
                  removePerson(index);
                  // console.log("Remove clicked");
                }}
              />
            </div>
          ))}

          <input
            type="text"
            name="name"
            value={name}
            className="search"
            onChange={inputHandle}
          />
        </div>
        <div className="search_list"></div>
      </div>

      <div className="searchresult">
        {filteredPeople.map((person, index) => (
          <div key={index} className="prev_Search">
            <img src={person.img} alt="" className="profile_img" />
            <h5>{person.name}</h5>
            <Plus
              style={{ color: "green" }}
              onClick={() => AddHandler(person)}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
