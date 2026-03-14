import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  const itemsPerPage = 10;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = page * itemsPerPage;

  const currentData = data.slice(startIndex, endIndex);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        );
        setData(response.data);
      } catch (error) {
        console.log("failed to fetch data", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1 style={{ textAlign: "center" }}>Employee Data Table</h1>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "20px",
        }}
      >
        <thead style={{ backgroundColor: "#009879", color: "white" }}>
          <tr>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>ID</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Name</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Email</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Role</th>
          </tr>
        </thead>

        <tbody>
          {currentData.map((item) => (
            <tr key={item.id}>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {item.id}
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {item.name}
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {item.email}
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {item.role}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "center",
          gap: "15px",
          alignItems: "center",
        }}
      >
        <button
          onClick={handlePrevious}
          disabled={page === 1}
          style={{ padding: "8px 15px", cursor: "pointer" }}
        >
          Previous
        </button>

        <span>Page {page}</span>

        <button
          onClick={handleNext}
          disabled={page === totalPages}
          style={{ padding: "8px 15px", cursor: "pointer" }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;