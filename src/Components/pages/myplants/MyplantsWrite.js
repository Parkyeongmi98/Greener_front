import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import styled from 'styled-components';

export default function MyplantsWrite(){

    const [searchItem, setSearchItem] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [plantsList, setPlantsList] = useState([])
    const [item, setItem] = useState('식물 종류를 선택해주세요');
    const [name, setName] = useState("");
    const [plantsId, setPlantsId] = useState("");

    const [img, setImg] = useState({
      image_file: "",
      preview_URL: "/img/default_image.png"
    });

    const saveImage = (e) => {
      e.preventDefault();
      if(e.target.files[0]){
        URL.revokeObjectURL(img.preview_URL);
        const preview_URL = URL.createObjectURL(e.target.files[0]);
        setImg(() => (
          {
            image_file: e.target.files[0],
            preview_URL: preview_URL
          }
        ))
      }
    }

    const deleteImage = () => {
      URL.revokeObjectURL(img.preview_URL);
      setImg({
        image_file: "",
        preview_URL: "/img/default_image.png"
      })
    }

    const onSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData();
        if(img.image_file){
          
          formData.append("file", img.image_file);}
    
          let dataSet = {
            name: name,
            plantsId : plantsId
          };
      
        const json = JSON.stringify(dataSet)
        const blob = new Blob([json], { type: "application/json" });
        formData.append("request", blob); 
        try {
        axios.defaults.headers.common['accessToken'] = `Bearer ${localStorage.getItem("access")}`;
        await axios.post("/api/v1/my-plants", formData, {
              headers: {
              "Content-Type": "multipart/form-data", 
          }}).then(response => {
            console.log(response.data)
            setName('');
            setPlantsId('');
            window.location.href = "/myplantslist";
            alert('등록되었습니다.');
            })} catch (error){
                       console.error(error.message);
                   }   
          }
      
    useEffect(() => {
      
      const fetchData = async() => {
          try{
            axios.defaults.headers.common['accessToken'] = `Bearer ${localStorage.getItem("access")}`;
              const {data: response} = await axios.get("/api/v1/plants");
              setPlantsList(response);
              } catch (error) {
                  console.error(error.message);
              }
   
      }
      fetchData();
      return () => {
        URL.revokeObjectURL(img.preview_URL)
      }
  }, []);

    return (
        <div style={{marginLeft: "5%", marginTop: "4%", marginRight: "5%", marginBottom: "3%"}}>
        <h1 style={{marginBottom: "5%", fontSize: "50px"}}>내 식물 등록페이지 🪴</h1>
        <form style={{width: "100%", fontSize: "26px", display: "flex"}}>
        
        <div className="img" style={{width: "50%"}}>
        <input 
          style={{marginBottom: "3%"}}
          type="file"
          accept="image/*"
          onChange={saveImage}
          onClick={(e) => e.target.value = null}
        /> 

        <div>
          <img src={img.preview_URL} style={{marginBottom: "2%", width:"65%", height:"50%" }}/>
          <Button color="error" variant="contained" onClick={deleteImage}>
            <i class="fa-solid fa-xmark"></i>
          </Button>
        </div>
        </div>


        <div className="text" style={{width: "50%"}}>
        <DropdownWrapper >
            <DropdownBox
                onClick={()=>{isOpen ? setIsOpen(false) : setIsOpen(true)}}
            >

            {/* {plantsList} */}
                {item}
                <Arrow><i class="fa-solid fa-caret-down"></i></Arrow>
            </DropdownBox>
            {isOpen ?  
                <SelectWrapper>
                    
                    <SelectInput
                        type="text"
                        placeholder="검색"
                        onChange={(e)=>{
                            setSearchItem(e.target.value);
                        }}

                    ></SelectInput><hr/>

                    {plantsList.filter((data)=> {
                        if(searchItem == ''){
                            return data
                        }else if(data.name.toString().includes(searchItem)){
                            return data
                        }
                    }).map(data => {
                        return <SelectOptions onClick={()=>{setItem(data.name); setIsOpen(false); setPlantsId(data.id)}}>{data.name}</SelectOptions>;
                    })
                
                    }
                    
                </SelectWrapper>
            :''}
        
        </DropdownWrapper>
            <div className='mb-2 mt-3' >
              식물에게 이름을 지어주세요
              <input 
                  style={{width: "95%", marginTop: "1%"}}
                   type={'text'}
                   placeholder='My Plants Name'
                   className='form-control'
                   value={name}
                   onChange={e => {
                       setName(e.target.value)
              }} />
            </div>
        </div>


        </form>
        <Button variant="success" onClick={onSubmit} style={{marginLeft: "63%", width: "120px"}}>
          등록
         </Button>
         <Button variant="secondary" href="/myplantslist" style={{marginLeft: "1%", width: "120px"}}>
          취소
        </Button>
        </div>
    );
}


const DropdownWrapper = styled.div`
    width: 95%;
    padding: 10px;
    margin-bottom: 5%;
    margin-top: 20%;
    border: 1px solid #c9c9c9;
    border-radius: 7px;
`
const DropdownBox = styled.div`
    width: 60%;
    padding: 10px 10px 10px 10px;
    margin: 0 20% 5px 20%;
    border: 1px solid var(--shadow);
    border-radius: 5px; 
    background: var(--white);
    line-height: 15px;
    cursor: pointer;
    position: relative;
`
const Arrow = styled.div`
    position: absolute;
    top: 1px;
    left: calc(100%);
    font-size: 0.6em;
`
const SelectWrapper = styled.div`
    width: 40%;
    margin-left: 2.2%;
    margin-top: 0.7%;
    padding-bottom: 10px;
    border: 1px solid var(--shadow);
    border-radius: 5px; 
    background: white;
    line-height: 15px;
    box-shadow: 0 1px 1px 0 var(--shadow), 0 1px 5px 0 var(--grey-light);
    transition: 0.2s ease-in-out;
    overflow: scroll;
    height: 300px;
    position: absolute;
`

const SelectInput = styled.input`
    width: 80%;
    margin-left: 20px;    
    padding: 10px 0 5px 10px;    
    border-radius: 5px;
    border-color: #c9c9c9;
    background: var(--white);
    line-height: 15px;
`
const SelectOptions = styled.div`
    width: 90%;
    padding: 12px;
    margin-left: 20px;
    background: var(--white);
    line-height: 15px;
    cursor: pointer;
    :hover {
        background: var(--white-second);
    }
`
  