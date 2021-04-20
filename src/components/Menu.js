import React from "react";
import { Navbar, NavDropdown, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import BotonCerrarSesion from "./../elements/BotonCerrarSesion";

const Menu = () => {
  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      style={{ marginBottom: "20px" }}
    >
      <Navbar.Brand>Riquelme Fotografías</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">
            Inicio
          </Nav.Link>
          <NavDropdown title="Eventos" id="basic-nav-dropdown">
            <NavDropdown.Item as={Link} to="/events/new-event">
              Nuevo Evento
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/events">
              Lista de Eventos
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Reportes" id="basic-nav-dropdown">
            <NavDropdown.Item as={Link} to="/eventsreports">
              Reporte de eventos
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <BotonCerrarSesion />
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Menu;
