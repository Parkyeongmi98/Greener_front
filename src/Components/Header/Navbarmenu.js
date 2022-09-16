import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import './Navbarmenu.css'
import axios from 'axios';

function Navbarmenu() {

  const logout = () => {
    axios.defaults.headers.common['accessToken'] = `Bearer ${accessToken}`
    axios.get('/auth/logout')
      .then(response => {
        console.log(response);	
      }).then((response) => {
        localStorage.removeItem("access");
        localStorage.removeItem("id");
        window.location.href = "/login";
        alert('로그아웃 되었습니다.');
      }
      )
  }
 

  const accessToken = localStorage.getItem("access");

  return (
    <>
      {['md'].map((expand) => (
        <Navbar key={expand} bg="light" expand={expand} className="mb-3">
          <Container fluid>
            <Navbar.Brand id="title" href="/"><i class="fa-solid fa-seedling" />Greener</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                <i class="fa-solid fa-seedling" />Greener
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <NavDropdown                     
                    title="검색"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item href="/plantsinfo">식물검색</NavDropdown.Item>
                    <NavDropdown.Item href="/map">수목원검색</NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown
                    title="커뮤니티"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item href="/market">식물마켓</NavDropdown.Item>
                    <NavDropdown.Item href="/talk">소통마당</NavDropdown.Item>
                  </NavDropdown>

                  <NavDropdown
                    title="마이페이지"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item href="#action3">회원정보 조회</NavDropdown.Item>
                    <NavDropdown.Item href="/myplants">내 식물</NavDropdown.Item>
                  </NavDropdown>
                  {/* <Nav.Link href="/plantsnotice">공지사항</Nav.Link> */}
                  <Nav.Link href="/faq">FAQ</Nav.Link>

                  {localStorage.access === accessToken ? (
            
                   <Button onClick={logout}>로그아웃</Button>)  : (
                   <Nav.Link id="loginbtn" href="/login">로그인</Nav.Link> )}
                   
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>            
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default Navbarmenu;