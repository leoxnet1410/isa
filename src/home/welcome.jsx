import React from 'react';
import { Card, Button } from 'react-bootstrap';
import fondoImage from './img/fondo.jpg';


const Cuadro = ({ imagenSrc, descripcion, ruta }) => {
  return (
    <Card style={{ margin: '10px', width: '15rem' }}>
      <Card.Img variant="top" src={imagenSrc} />
      <Card.Body>
        <Card.Text>{descripcion}</Card.Text>
        <Button href={ruta}>Ir</Button>
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
      imagenSrc: fondoImage,
      descripcion: 'Inventario',
      ruta: '/table',
    },
    {
      imagenSrc: fondoImage,
      descripcion: 'Pedidos',
      ruta: '/componente3',
    },
    {
      imagenSrc: fondoImage,
      descripcion: 'catalogo',
      ruta: '/componente4',
    },
    {
      imagenSrc: fondoImage,
      descripcion: 'Descripción 5',
      ruta: '/componente5',
    },
    {
      imagenSrc: fondoImage,
      descripcion: 'Descripción 6',
      ruta: '/componente6',
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