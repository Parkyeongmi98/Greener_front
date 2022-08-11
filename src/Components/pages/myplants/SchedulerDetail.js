import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Button } from "react-bootstrap";


function SchedulerDetail() {

    const [data, setData] = useState([]);
    
    useEffect(() => {
        console.log(data);
        axios.defaults.headers.common['accessToken'] = `Bearer ${localStorage.getItem("access")}`;
        axios.get(`/api/v1/my-plants/${myPlantsId}/detail`)
        
        .then((response)  => { 
          setData(response.data);

        })
        
      }, [])
    
    const {myPlantsId} = useParams();

    return (
        <div className="w-full h-full flex justify-center items-center">
        {data && (

            <>
            <div className="dataform">


                이름 <input value={data.name}/><br/>
                등록일 <input value={data.bornDate}/><br/>


            </div>
            <Button variant="success" href="/myplantswrite">&nbsp; 수정 &nbsp;</Button>
            <Button variant="danger" href="/myplantswrite">&nbsp; 삭제 &nbsp;</Button>
            </>         
            

            )
        }
        </div>
    )
}

export default SchedulerDetail;