import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FaOpencart } from "react-icons/fa6";
import { RiHome3Fill } from "react-icons/ri";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './slice/loginslice';
import SearchBar from './SearchBar';

const Header = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.login.userInfo);

  const handlelogout = () => {
    dispatch(logout());
  }
  return (
    <Navbar expand="lg" className="bg-body-dark top-0 position-sticky opacity-100 w-100" style={{zIndex: 9999}}> 
      <Container>
        <Navbar.Brand as={Link} to={'/'}>EShop</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to={'/'} ><RiHome3Fill />Home </Nav.Link>
            <Nav.Link as={Link} to={'/Cart'}> <FaOpencart  />Cart </Nav.Link>
            {/* {userInfo ? (
              <Nav.Link as={Link} to={'/profile'}> {userInfo.name} </Nav.Link>
            ) : null} */}
            {!userInfo ? (
              <Nav.Link as={Link} to={'/login'}> Login </Nav.Link>
            ) : null}
            {userInfo ? (
            <NavDropdown title={userInfo.name} id="basic-nav-dropdown" >
              <NavDropdown.Item  as={Link} to={'/profile'} className='text-dark'>Profile</NavDropdown.Item>
              {/* <NavDropdown.Item as={Link} to={'/login'} className='text-dark'>logout</NavDropdown.Item> */}
              <NavDropdown.Item as={Link} to={'/listorder'} className='text-dark'>My Orders</NavDropdown.Item>
              <NavDropdown.Divider className='bg-dark'/>
              <NavDropdown.Item as={Link} to={'/'} onClick={() => handlelogout()} className='text-dark'>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
            ) : null}
            {userInfo?.is_staff ? (
              <NavDropdown title="Admin" id="basic-nav-dropdown_forAdmin" >
              <NavDropdown.Item  as={Link} to={'/listuser'} className='text-dark'>users</NavDropdown.Item>
              <NavDropdown.Item  as={Link} to={'/admin/listproduct'} className='text-dark'>Products</NavDropdown.Item>
              <NavDropdown.Item  as={Link} to={'/admin/allorders'} className='text-dark'>Orders</NavDropdown.Item>
            </NavDropdown>
            ):null}
          </Nav>
           <SearchBar />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
