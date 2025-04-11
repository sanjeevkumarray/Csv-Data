/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios";

function Viewdata() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/viewdata")
      .then((response) => setStudents(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const sortedStudents = [...students].sort((a, b) => a.ID - b.ID); //To Display ID wiseley its optional to keep

  return (
    <div>
      <h3 align="center">View Data Here</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Mail</th>
            <th>MobileNumber</th>
          </tr>
        </thead>
        <tbody>
          {students.map(
            (
              student //In place of students we can write sortedstudents so the table will have sorted IDs
            ) => (
              <tr key={student.ID}>
                <td>{student.ID}</td>
                <td>{student.Name}</td>
                <td>{student.mail}</td>
                <td>{student.mobilenumber}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Viewdata;
