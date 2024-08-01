import React from 'react';
import { Button } from 'react-bootstrap';

const EditButton = ({ onClick }) => (
  <Button variant="warning" onClick={onClick} className="me-2">
    Editar
  </Button>
);

export default EditButton;