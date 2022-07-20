import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container, NavDropdown, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const userData = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;
  const name = userData ? userData.user.firstName : "Sign In";
  const role = userData ? userData.user.role[0].roleName : null;
  const userId = userData ? userData.user.id : null;

  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Bazar</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              {role == "Admin" && (
                <LinkContainer to="/addProduct">
                  <Nav.Link>
                    {/* <i className="fas fa-shopping-cart"></i>*/}Add Product
                  </Nav.Link>
                </LinkContainer>
              )}
              <LinkContainer to="/orders">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i>My Orders
                </Nav.Link>
              </LinkContainer>

              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i>Cart
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/login">
                <Nav.Link>
                  <i className="fas fa-user"></i>
                  {`${name}`}
                </Nav.Link>
              </LinkContainer>

              <Button onClick={logoutHandler} disabled={userData == null}>
                <i className="fas fa-user"></i>Sign Out
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
