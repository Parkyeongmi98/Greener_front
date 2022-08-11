import Accordion from 'react-bootstrap/Accordion';
import styled from 'styled-components';
import "./css/FAQ.css";

function AllCollapseExample() {
    const Style1 = styled.div`
    padding: 30px 40px;
    font-size: 50px;
    font-family: "Jua";
    `

    const Style2 = styled.div`
    padding: 10px; 20px;
    font-family: "Jua";
    `
    
    return (
    <>
    <Style1>자주하는 질문 <i class="fa-solid fa-person-circle-question" style={{fontSize: "40px"}}></i></Style1>
    <Style2>
    <Accordion defaultActiveKey="0" flus >
      <Accordion.Item eventKey="0" >
        <Accordion.Header># 식물을 따로 구매하고 싶습니다!</Accordion.Header>
        <Accordion.Body>
        저희는 식물을 따로 판매하는 업체가 아닙니다. 무료 분양하는 서비스를 제공하고 있으니 커뮤니티에 식물마켓을 둘러보시는걸 추천드립니다.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header># 식물 관리법</Accordion.Header>
        <Accordion.Body>
        hello world
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header># 세번째 질문</Accordion.Header>
        <Accordion.Body>
        hello world
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="3">
        <Accordion.Header># 네번째 질문</Accordion.Header>
        <Accordion.Body>
        hello worldhello worldhello world
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
    </Style2>
    </>



    
  );
}

export default AllCollapseExample;