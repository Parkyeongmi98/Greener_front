import MyplantsTab from "./MyPlantsTab";
import Button from 'react-bootstrap/Button';
import "../css/Myplants.css";


function Myplants() {

    return (
        <>
        <MyplantsTab />


        <div className= "main"> 
          <div className="maintxt">
            <h1>누구나</h1>
            <h1>쉽고 예쁘게</h1>
            <h1> 키울 수 있도록!</h1><br/>
            <h3>"사랑스러운 식물을 추가하세요"</h3>
          </div> 
          <Button id="myplantsbtn" variant="outline-success" href="/myplantswrite">&nbsp;<i class="fa-solid fa-circle-plus"></i> 등록하기 &nbsp;</Button>{' '}
        </div>

        </>
    )
}

export default Myplants;

