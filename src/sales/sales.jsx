import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Card, InputGroup } from 'react-bootstrap';
import { ApiClient } from '../api/ApiClient';

const Sales = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [saleQuantity, setSaleQuantity] = useState('');
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageModalShow, setImageModalShow] = useState(false);
  const [customerId, setCustomerId] = useState('');

  useEffect(() => {
    getProducts();
    getCustomers();
  }, []);

  const getProducts = async () => {
    try {
      const data = await ApiClient.products.getAll();
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const getCustomers = async () => {
    try {
      const data = await ApiClient.customers.getAll();
      setCustomers(data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const handleShow = (product) => {
    setSelectedProduct(product);
    setSaleQuantity('');
    setDiscount(0);
    setTotal(0);
    setCustomerId('');
    setShow(true);
  };

  const handleClose = () => setShow(false);

  const handleQuantityChange = (e) => {
    const quantity = e.target.value;
    setSaleQuantity(quantity);
    calculateTotal(quantity, discount, selectedProduct?.price || 0);
  };
  const handleDiscountChange = (e) => {
    const discountValue = e.target.value;
    const parsedDiscount = discountValue === '' ? 0 : parseInt(discountValue, 10);  
    calculateTotal(saleQuantity, parsedDiscount, selectedProduct?.price || 0);
  };

  const handleCustomerChange = (e) => {
    setCustomerId(e.target.value);
  };

  const calculateTotal = (quantity, discount, price) => {
    const parsedQuantity = parseInt(quantity, 10) || 0;
    const parsedDiscount = parseFloat(discount) || 0;
    const parsedPrice = parseFloat(price) || 0;
  
    const totalValue = parsedQuantity * parsedPrice - parsedDiscount;
    
    setTotal(totalValue > 0 ? totalValue.toFixed(2) : 0);
  };
  const handleSell = async () => {
    if (selectedProduct && saleQuantity > 0 && saleQuantity <= selectedProduct.quantity && customerId) {
      try {
        await ApiClient.sales.create({
          product_id: selectedProduct.id,
          quantity: saleQuantity,
          discount: parseFloat(discount),
          total: parseFloat(total),
          customer_id: customerId
        });

        const updatedData = {
          product: {
            code: selectedProduct.code,
            name: selectedProduct.name,
            price: parseFloat(selectedProduct.price) || 0,
            quantity: selectedProduct.quantity - saleQuantity,
            category: selectedProduct.category,
            description: selectedProduct.description
          }
        };

        await ApiClient.products.update(selectedProduct.id, updatedData);

        getProducts();
        handleClose();
      } catch (error) {
        console.error('Error selling product:', error);
      }
    } else {
      console.error('Invalid quantity, product or customer');
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = products.filter(product =>
      product.code.toLowerCase().includes(term) ||
      product.name.toLowerCase().includes(term)
    );
    setFilteredProducts(filtered);
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setImageModalShow(true);
  };

  return (
    <div className="sales-table-container">
      <Card className="p-4">
        <Card.Header className="d-flex justify-content-between align-items-center">
          <h2>Ventas</h2>
          <InputGroup className="w-50">
            <Form.Control
              type="text"
              placeholder="Buscar por código o nombre"
              value={searchTerm}
              onChange={handleSearch}
            />
          </InputGroup>
        </Card.Header>
        <Card.Body>
          <Table striped bordered hover className="table-custom">
            <thead>
              <tr>
                <th>Código</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Categoría</th>
                <th>Imagen</th>
                <th>Descripción</th>
                <th>Cantidad</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map(product => (
                <tr key={product.id}>
                  <td>{product.code}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>
                    {product.image_url ? (
                      <img
                        src={`http://localhost:3000${product.image_url}`}
                        alt={product.name}
                        style={{ width: '100px', height: '100px', cursor: 'pointer' }}
                        onClick={() => handleImageClick(`http://localhost:3000${product.image_url}`)}
                      />
                    ) : (
                      'Sin imagen'
                    )}
                  </td>
                  <td>{product.description}</td>
                  <td>{product.quantity}</td>
                  <td>
                    <Button variant="success" onClick={() => handleShow(product)}>Vender</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Vender Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formCustomerName">
              <Form.Label>Cliente</Form.Label>
              <Form.Control
                as="select"
                value={customerId}
                onChange={handleCustomerChange}
              >
                <option value="">Seleccionar cliente</option>
                {customers.map(customer => (
                  <option key={customer.id} value={customer.id}>
                    {customer.nombre} {customer.apellido}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formProductName">
              <Form.Label>Producto</Form.Label>
              <Form.Control type="text" readOnly value={selectedProduct?.name || ''} />
            </Form.Group>
            <Form.Group controlId="formProductPrice">
              <Form.Label>Precio</Form.Label>
              <Form.Control type="number" readOnly value={selectedProduct?.price || 0} />
            </Form.Group>
            <Form.Group controlId="formProductQuantity">
              <Form.Label>Cantidad</Form.Label>
              <Form.Control
                type="number"
                value={saleQuantity}
                onChange={handleQuantityChange}
                max={selectedProduct?.quantity || 0}
                min="1"
              />
            </Form.Group>
            <Form.Group controlId="formProductDiscount">
              <Form.Label>Descuento </Form.Label>
              <Form.Control
                type="number"
                value={discount}
                onChange={handleDiscountChange}
                min="0"
                max="100"
                step="1"  
              />
            </Form.Group>
            <Form.Group controlId="formTotalPrice">
              <Form.Label>Total</Form.Label>
              <Form.Control type="number" readOnly value={total} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSell}>
            Confirmar Venta
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal para mostrar la imagen en tamaño completo */}
      <Modal show={imageModalShow} onHide={() => setImageModalShow(false)} centered>
        <Modal.Body className="text-center">
          <img src={selectedImage} alt="Producto" className="img-fluid" />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Sales;
