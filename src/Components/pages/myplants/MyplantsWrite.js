// import axios from "axios";
// import React, {useState} from "react";
// import { Form, FormGroup, Label, Col, Input, Button } from "reactstrap";
// import Plan from "./Plan";


// function MyplantsWrite() {
//   const [name, SetName] = useState("");
//   const [bornDate, SetBornDate] = useState("");
//   const [imagePath, SetImagePath] = useState("");

//     return (

//       <>
//         <Form noValidate >
//         <FormGroup row>
//           <Label
//             for="myplants"
//             sm={2}>
//             식물 이름
//           </Label>
//           <Col sm={10}>
//             <Input onChange={(e)=>{
//               SetName(e.target.value);
//             }}/>
//           </Col>
//         </FormGroup>
//         <FormGroup row>
//           <Label
//             for="date"
//             sm={2}>
//             등록일
//           </Label>
//           <Col sm={10}>
//             <Input onChange={(e)=>{
//               SetBornDate(e.target.value);
//             }}/>
//             {/* <Plan /> */}
//           </Col>
//         </FormGroup>
//         <FormGroup row>
//           <Label
//             for="imagePath"
//             sm={2}>
//             File
//           </Label>
//           <Col sm={10}>
//             <Input onChange={(e)=>{
//               SetImagePath(e.target.value);
//             }}/>
//           </Col>
//         </FormGroup>

            
//         <Button onClick={()=>{
//         axios.defaults.headers.common['accessToken'] = `Bearer ${localStorage.getItem("access")}`;
          
//         let data = {
//           name : name,
//           bornDate : bornDate,
//           imagePath: imagePath,
//         }
//         axios.post('/api/v1/my-plants',
//         JSON.stringify(data), {
//           headers: {
//             "Content-Type": `application/json`,
//           },
//         })
          
//           .then(response => response.json())

//             .then(response => {
//              console.log(response.data);
//             })
//         }
//       }
//         >등록</Button>
//       </Form>
//   </>
//   );
// }

// export default MyplantsWrite;


// import React from "react";
// import {Button, TextField, Link, Grid, Container, Typography} from "@material-ui/core";


// class MyplantsWrite extends React.Component {
//   constructor(props) {
//     super(props);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   handleSubmit(event) {
//     event.preventDefault();
//     // 오브젝트에서 form에 저장된 데이터를 맵의 형태로 바꿔줌.
//     const data = new FormData(event.target);
//     data.append("name", name);
//     data.append("bornDate", bornDate);
//     data.append("imagePath", imagePath);

//     axios.post('/api/v1/my-plants', data, {
//       headers: { "Content-Type": `application/json`,
//       accessToken: localStorage.getItem("access")
//     }
//         }
//     ).then(
//       (response) => {
        
//         window.location.href = "/myplants";
//         alert('등록되었습니다.')
//       }
//     );
//   }

//   render() {
//     return (
//       <Container component="main" maxWidth="xs" style={{ marginTop: "8%" }}>
//         <form noValidate onSubmit={this.handleSubmit}>
//           <Grid container spacing={2}>
//             <Grid item xs={12}>
//               <Typography component="h1" variant="h5">
//                 식물 등록
//               </Typography>
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 autoComplete="fname"
//                 name="name"
//                 variant="outlined"
//                 required
//                 fullWidth
//                 id="name"
//                 label="식물 이름"
//                 autoFocus
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 variant="outlined"
//                 name="bornDate"
//                 required
//                 fullWidth
//                 id="bornDate"
//                 label="등록일"
//                 autoFocus
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 variant="outlined"
//                 name="imagePath"
//                 required
//                 fullWidth
//                 label="이미지"
//                 id="imagePath"
//                 autoFocus
//               />
//             </Grid>

//             <Grid item xs={12}>
//               <Button
//                 type="submit"
//                 fullWidth
//                 variant="contained"
//                 color="primary"
//               >
//                 등록하기
//               </Button>
//             </Grid>
//           </Grid>
//         </form>
//       </Container>
//     );
//   }
// }

// export default MyplantsWrite;

import React from 'react';
import axios from 'axios';

export default class MyplantsWrite extends React.Component {
  state = {
    name: '',
    bornDate: '',
    imagePath: '',
    plantsId: ''
  }

  handleChange = event => {
    this.setState({ name: event.target.value });
    this.setState({ bornDate: event.target.value});
    this.setState({ imagePath: event.target.value});
    this.setState({ plantsId: event.target.value})
  }

  handleSubmit = event => {
    event.preventDefault();

    const myplants = {
      name: this.state.name,
      bornDate: this.state.bornDate,
      imagePath: this.state.imagePath,
      plantsId: this.state.plantsId
    };

    axios.post('/api/v1/my-plants', { myplants }, {
        headers: { "Content-Type": `application/json`,
        accessToken: `Bearer ${localStorage.getItem("access")}`
     }})
      .then(response => {
        console.log(response);
        console.log(response.data);
      })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            식물 이름: 
            <input type="text" name="name" onChange={this.handleChange} />
          </label>
          <label>
            등록일: 
            <input type="text" name="bornDate" onChange={this.handleChange} />
          </label>
          <label>
            이미지: 
            <input type="text" name="imagePath" onChange={this.handleChange} />
          </label>
          <label>
            식물아이디: 
            <input type="text" name="plantsId" onChange={this.handleChange} />
          </label>
          <button type="submit">등록</button>
        </form>
      </div>
    )
  }
}

