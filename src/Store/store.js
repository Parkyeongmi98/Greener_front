import MyplantsTab from "./MyPlantsTab";
import Button from 'react-bootstrap/Button';



function Store() {

    return (
        <>
        <MyplantsTab />


        <div className= "main"> 
          <div className="maintxt">
            <h1>누구나</h1>
            <h1>쉽고 예쁘게</h1>
          </div> 
          <Button id="myplantsbtn" variant="outline-success" href="/myplantswrite">&nbsp;<i class="fa-solid fa-circle-plus"></i> 등록하기 &nbsp;</Button>{' '}
        </div>

        </>
    )
}

export default Store;

