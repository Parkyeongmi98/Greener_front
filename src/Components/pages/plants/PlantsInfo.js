import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from "axios";


function PlantsInfo() {

    const [plantsList, setPlantsList] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const getPlantsList = async () => {
          axios.defaults.headers.common['accessToken'] = `Bearer ${localStorage.getItem("access")}`;
          const {data} = await axios.get("/api/v1/plants")
          return data
        }
        getPlantsList().then(result => setPlantsList(result));
    }, [])

    const onSearch = (e) => {
        e.preventDefault();
        if(search == null || search === "") {
            const getPlantsList = async () => {
                axios.defaults.headers.common['accessToken'] = `Bearer ${localStorage.getItem("access")}`;
                const {data} = await axios.get("/api/v1/plants")
                console.log(data)
                return data
              }
              getPlantsList().then(result => setPlantsList(result));
          } else {
            const filterData = plantsList.filter((row) => row.name.includes(search))
            setPlantsList(filterData)
          }
          setSearch('')
        }

    const onChangeSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value)
    }

    return(
        <>
        <h1 style={{marginLeft: "4%", marginTop: "2%", color: "#454545", fontSize: "50px"}}>식물 사전 <i class="fa-solid fa-book" style={{fontSize : "50px"}}></i></h1><br/>

        <form onSubmit={e => onSearch(e)} style={{marginLeft: "4%"}}>
            <input
            type="text"
            value={search}
            placeholder="식물을 검색하세요."
            onChange={onChangeSearch}
            style={{width: "400px", height: "50px"}}
            />
            <Button variant="secondary" type="submit" style={{width: "100px",height: "53px", marginLeft: "1%"}}>검색</Button>
        </form>

        <div
        style={{
          padding: "50px",
          width: "100%",
          display: "grid",
          gridTemplateRows: "1fr",
          gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
        }}
      >

        {plantsList.map((data) => (
            <div style={{margin: "5px", height: "700px"}}>
                <Card style={{ width: '13rem', height: "26rem"}}>
                <Card.Img variant="top" src={data.imgUrl} style={{height:"400px"}}></Card.Img>
                <Card.Body>
                    <Card.Title style={{textAlign: "center"}}>{data.name}</Card.Title><br/>
                    <Button variant="outline-success" href={`/plantsdetail/${data.id}`} style={{marginLeft: "27%"}}>상세보기</Button>
                </Card.Body>
                </Card>
            </div>
         ))}
         
        </div>
    </>
    ) 
} 

export default PlantsInfo
