import { Table, Button, Container, Modal, Form, InputGroup, FormControl } from 'react-bootstrap';
import { useState } from 'react';

import fondo from './home/img/fondo.jpg';

const initialProducts = [
  { id: 1, code: 'P001', name: 'Producto 1', image: fondo, units: 10, category: 'Categoría 1', price: 5.0 },
  { id: 2, code: 'P002', name: 'Producto 2', image: fondo, units: 20, category: 'Categoría 2', price: 10.0 },

];

const Sales= () => {
  const [products, setProducts] = useState(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sellUnits, setSellUnits] = useState(0);
  const [sellPrice, setSellPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const handleSellClick = (product) => {
    setSelectedProduct(product);
    setSellUnits(0);
    setSellPrice(product.price);
    setDiscount(0);
    setShowModal(true);
  };

  const handleSell = () => {
    const updatedProducts = products.map(product => 
      product.id === selectedProduct.id 
        ? { ...product, units: product.units - sellUnits } 
        : product
    );
    setProducts(updatedProducts);
    setFilteredProducts(updatedProducts.filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.code.toLowerCase().includes(searchTerm.toLowerCase())
    ));
    setShowModal(false);
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    setFilteredProducts(products.filter(product => 
      product.name.toLowerCase().includes(value) ||
      product.code.toLowerCase().includes(value)
    ));
  };

  const calculateTotal = () => {
    const totalBeforeDiscount = sellUnits * sellPrice;
    const totalAfterDiscount = totalBeforeDiscount - discount;
    return { totalBeforeDiscount, totalAfterDiscount };
  };

  const { totalBeforeDiscount, totalAfterDiscount } = calculateTotal();

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setShowImageModal(true);
  };

  return (
    <Container className="sales-table-container">
      <div className="header">
        <h2>Ventas de Productos</h2>
        <InputGroup className="search-box">
          <FormControl
            placeholder="Buscar producto"
            value={searchTerm}
            onChange={handleSearch}
          />
        </InputGroup>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Código</th>
            <th>Nombre</th>
            <th>Foto</th>
            <th>Unidades</th>
            <th>Categoría</th>
            <th>Precio por Unidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map(product => (
            <tr key={product.id}>
              <td>{product.code}</td>
              <td>{product.name}</td>
              <td>
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="product-image" 
                  onClick={() => handleImageClick(product.image)}
                  style={{ cursor: 'pointer' }}
                />
              </td>
              <td>{product.units}</td>
              <td>{product.category}</td>
              <td>${product.price.toFixed(2)}</td>
              <td>
                <Button variant="primary" onClick={() => handleSellClick(product)}>Vender</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Vender Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Unidades a vender</Form.Label>
              <Form.Control 
                type="tel" 
                value={sellUnits} 
                onChange={(e) => setSellUnits(Number(e.target.value))} 
                min="1"
                max={selectedProduct?.units || 1}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Precio por unidad</Form.Label>
              <Form.Control 
                type="tel" 
                value={sellPrice} 
                onChange={(e) => setSellPrice(Number(e.target.value))} 
                min="0"
                step="0.01"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Descuento</Form.Label>
              <Form.Control 
                type="tel" 
                value={discount} 
                onChange={(e) => setDiscount(Number(e.target.value))} 
                min="0"
                step="0.01"
              />
            </Form.Group>
            <div className="mt-3">
              <p>Total antes del descuento: ${totalBeforeDiscount.toFixed(2)}</p>
              <p>Total después del descuento: ${totalAfterDiscount.toFixed(2)}</p>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
          <Button variant="primary" onClick={handleSell}>Confirmar Venta</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showImageModal} onHide={() => setShowImageModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Imagen del Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <img src={selectedImage} alt="Producto" className="img-fluid" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowImageModal(false)}>Cerrar</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Sales;