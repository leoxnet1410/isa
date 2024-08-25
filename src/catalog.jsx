import React, { useState, useEffect } from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { ApiClient } from './api/ApiClient';

const Catalog = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await ApiClient.products.getAll();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <Container className="catalog-container">
      <Row className="catalog-row">
        {products.map((product, index) => (
          <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <Card className="catalog-card">
              <Card.Img
                variant="top"
                src={product.image_url} // Asegúrate de que el atributo image_url está siendo enviado correctamente desde el backend
                alt={product.name}
                className="catalog-card-img"
              />
              <Card.Body>
                <Card.Text><strong>Nombre:</strong> {product.name}</Card.Text>
                <Card.Text><strong>Código:</strong> {product.code}</Card.Text>
                <Card.Text><strong>Descripción:</strong> {product.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Catalog;