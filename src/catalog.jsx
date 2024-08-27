import React, { useState, useEffect } from 'react';
import { Container, Card, Row, Col, Modal } from 'react-bootstrap';
import { ApiClient } from './api/ApiClient';

const Catalog = () => {
  const [products, setProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageModalShow, setImageModalShow] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await ApiClient.products.getAll();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setImageModalShow(true);
  };

  const closeImageModal = () => setImageModalShow(false);

  return (
    <Container className="catalog-container">
      <Row className="catalog-row">
        {products.map((product, index) => (
          <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <Card className="catalog-card">
              <Card.Img
                variant="top"
                src={`http://localhost:3000${product.image_url}`}
                alt={product.name}
                className="catalog-card-img"
                onClick={() => handleImageClick(`http://localhost:3000${product.image_url}`)}
                style={{ width: '100%', height: '200px', objectFit: 'cover', cursor: 'pointer' }}
              />
              <Card.Body>
                <Card.Text><strong>Código:</strong> {product.code}</Card.Text>
                <Card.Text><strong>Nombre:</strong> {product.name}</Card.Text>
                <Card.Text><strong>Descripción:</strong> {product.description}</Card.Text>
                <Card.Text><strong>Cantidad:</strong> {product.quantity}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal para mostrar la imagen en grande */}
      <Modal show={imageModalShow} onHide={closeImageModal} size="lg">
        <Modal.Header closeButton>
    
        </Modal.Header>
        <Modal.Body>
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Producto"
              style={{ width: '100%', height: 'auto' }}
            />
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Catalog;
