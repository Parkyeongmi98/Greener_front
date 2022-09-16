import Nav from 'react-bootstrap/Nav';
import styled from 'styled-components';


function MyplantsTab() {
  const Style = styled.div`
  margin-top: 20px;
  margin-left: 30px;
  margin-bottom: 5px;
  font-size: 40px;
  font-family: "Jua";
  color: #5D5D5D;
  `

  const Navbar = styled.div`
  display: flex;
  justify-content: space-between;
  `
  
  const Icons = styled.div`
  display: flex;
  margin-right: 2%;
  `

  return (
    <>
      <Style><i class="fa-solid fa-quote-left"></i> 🪴 MY PLANTS <i class="fa-solid fa-quote-right"></i></Style>
      <Navbar>
        <Nav variant="tabs" >
          <Nav.Item>
            <Nav.Link href="/myplantslist">내 식물</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/planner">달력</Nav.Link>
          </Nav.Item>
        </Nav>
        <Icons className='icons' >
            <Nav.Link href="/myplantswrite"><i class="fa-solid fa-circle-plus"></i></Nav.Link>
            <Nav.Link href="/myplants"><i class="fa-solid fa-circle-left"></i></Nav.Link>
        </Icons>
      </Navbar>
    </>
  );
}

export default MyplantsTab;