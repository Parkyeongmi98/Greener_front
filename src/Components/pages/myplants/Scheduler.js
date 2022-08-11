import axios from "axios";
import React, { useState, useEffect } from "react";
import MyplantsTab from "./MyPlantsTab";
import { Link } from "react-router-dom";

function Scheduler() {
 
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.defaults.headers.common['accessToken'] = `Bearer ${localStorage.getItem("access")}`;
    axios.get('/api/v1/my-plants')
    .then((response) => {
      setData(response.data);

    })
    
    
  }, [])

  return (
    <>
    <MyplantsTab />
    
    
    <table className="table">
  <thead>
    <tr>
      <th>번호</th>
      <th>이름</th>
      <th>등록일</th>
      <th>#</th>
    </tr>
  </thead>
  <tbody className="table-group-divider">

    {data.map((data, id) => (

    <tr key={id}>
      <td>{id + 1}</td>
      <td >{data.name}</td>
      <td>{data.bornDate}</td>
      <td className="flex justify-center items-center space-x-4 mt-3">
        <Link to={`/schedulerdetail/${data.id}`}>view</Link>
        <button>edit</button>
        <button>delete</button>
      </td>
    </tr>
  ))}
  </tbody>
</table>

</>


)
}

export default Scheduler;