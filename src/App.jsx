import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  const itemsPerPage = 10;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = page * itemsPerPage;

  const currentData = data.slice(startIndex, endIndex);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePrevious = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        );
        setData(response.data);
      } catch  {
  alert("Failed to fetch data");
}
    };
    fetchData();
  }, []);

  return (
    <div className="container">
      <h1>Employee Data Table</h1>

      <div className="tableWrapper">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>

          <tbody>
            {currentData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button onClick={handlePrevious} >
          Previous
        </button>

        <span>Page {page}</span>

        <button onClick={handleNext} >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;