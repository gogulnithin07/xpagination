import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [counter, setCounter] = useState(10);
  let startI = counter === 10 ? 0 : counter - 10;
  useEffect(() => {
    getData();
  }, []);
  async function getData() {
    try {
      const req = await fetch(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      const res = await req.json();
      console.log(res);
      setData((c) => res);
    } catch (error) {
      alert("Failed to fetch data");
      console.error(error);
    }
  }
  return (
    <div className="App">
      <div className="container">
        <h1>Employee Data Table</h1>
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>email</th>
              <th>role</th>
            </tr>
          </thead>
          <tbody>
            {/* {} */}
            {data.slice(startI, counter).map((obj) => (
              <CreateTr
                key={crypto.randomUUID()}
                id={obj.id}
                name={obj.name}
                email={obj.email}
                role={obj.role}
              />
            ))}
          </tbody>
        </table>
        <div className="buttons">
          <button
            onClick={(e) => {
              if (counter === 10) {
              } else {
                setCounter((c) => c - 10);
              }
            }}>
            Previous
          </button>
          <p>{counter / 10}</p>
          <button
            onClick={(e) => {
              if (counter < data.length) setCounter((c) => c + 10);
            }}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
function CreateTr({ id, name, email, role }) {
  console.log(id, name);
  return (
    <>
      <tr className="row">
        <td>{id}</td>
        <td>{name}</td>
        <td>{email}</td>
        <td>{role}</td>
      </tr>
    </>
  );
}

export default App;
