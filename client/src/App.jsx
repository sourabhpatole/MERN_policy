import React, { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [policies, setPolicies] = useState([]);
  const [aggregate, setAggregate] = useState([]);

  const uploadFile = async () => {
    if (!file) {
      alert("Please select file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/policy/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      alert(res.data.message);
    } catch (err) {
      console.error(err.response?.data);
      alert("Upload failed");
    }
  };

  const searchPolicy = async () => {
    const res = await axios.get(
      `http://localhost:5000/api/policy/search?username=${username}`,
    );
    setPolicies(res.data);
  };

  const getAggregate = async () => {
    const res = await axios.get("http://localhost:5000/api/policy/aggregate");
    setAggregate(res.data);
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Upload CSV</h2>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={uploadFile}>Upload</button>

      <h2>Search Policy</h2>
      <input value={username} onChange={(e) => setUsername(e.target.value)} />
      <button onClick={searchPolicy}>Search</button>

      <pre>{JSON.stringify(policies, null, 2)}</pre>

      <h2>Aggregate</h2>
      <button onClick={getAggregate}>Get Aggregate</button>

      <pre>{JSON.stringify(aggregate, null, 2)}</pre>
    </div>
  );
}

export default App;
