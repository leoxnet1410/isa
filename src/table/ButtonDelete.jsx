import React from 'react';
import { Button } from 'react-bootstrap';

const DeleteButton = ({ onClick }) => (
  <Button variant="danger" onClick={onClick}>
    Eliminar
  </Button>
);

export default DeleteButton;