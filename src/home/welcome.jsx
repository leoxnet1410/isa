import React from 'react';
import { Card, Button } from 'react-bootstrap';
import fondoImage from '../img/fondo.jpg';
import catalogo1Image from '../img/catalogo1.jpg';
import fondo6Image from '../img/fondo6.jpg';
import imagenImage from '../img/imagen.jpg';

const Cuadro = ({ imagenSrc, descripcion, ruta }) => {
  return (
    <Card style={{ margin: '10px', width: '15rem' }}>
      <div className="image-container">
        <Card.Img variant="top" src={imagenSrc} className="card-image" />
      </div>
      <Card.Body>
        <Card.Text>{descripcion}</Card.Text>
        <div className="button-container">
          <Button href={ruta} className="ir-button">Avanzar</Button>
        </div>
      </Card.Body>
    </Card>
  );
};

const Cuadros = () => {
  const cuadrosData = [
    {
      imagenSrc: fondoImage,
      descripcion: 'Ventas',
      ruta: 'sales',
    },
    {
      imagenSrc: fondo6Image,
      descripcion: 'Inventario',
      ruta: '/table',
    },
    {
      imagenSrc: imagenImage,
      descripcion: 'Historial de Ventas',
      ruta: 'salesList',
    },
    {
      imagenSrc: catalogo1Image,
      descripcion: 'Catalogo',
      ruta: 'catalog',
    },
  ];

  return (
    <div className="cuadros-container-wrapper">
      <div className="cuadros-container">
        {cuadrosData.map((cuadro, index) => (
          <Cuadro
            key={index}
            imagenSrc={cuadro.imagenSrc}
            descripcion={cuadro.descripcion}
            ruta={cuadro.ruta}
          />
        ))}
      </div>
    </div>
  );
};

export default Cuadros;