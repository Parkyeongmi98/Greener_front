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

  return (
    <>
      <Style><i class="fa-solid fa-quote-left"></i> 🪴MY PLANTS <i class="fa-solid fa-quote-right"></i></Style>
      <Nav variant="tabs" >
        <Nav.Item>
          <Nav.Link href="/scheduler">스케줄러</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/plan">달력</Nav.Link>
        </Nav.Item>
      </Nav>
    </>
  );
}

export default MyplantsTab;