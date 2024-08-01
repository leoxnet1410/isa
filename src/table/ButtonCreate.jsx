import React from 'react';
import { Button } from 'react-bootstrap';

const AddButton = ({ onClick }) => (
  <Button className="mb-3" onClick={onClick}>
    Agregar Producto
  </Button>
);

export default AddButton;