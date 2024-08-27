import React, { useState } from "react";
import { Offcanvas, Button, Nav } from "react-bootstrap";


const Navegation = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button className="menu-button" onClick={handleShow}>
        Menu
      </Button>

      <Offcanvas show={show} onHide={handleClose} placement="end" className="navigation-offcanvas">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link href="sales">Ventas</Nav.Link>
            <Nav.Link href="table">Inventario</Nav.Link>
            <Nav.Link href="salesList">Historial de ventas</Nav.Link>
            <Nav.Link href="catalog">Catalogo</Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Navegation;

