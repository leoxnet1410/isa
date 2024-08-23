// Sales.js
import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Card } from 'react-bootstrap';
import { ApiClient } from './api/ApiClient';

const Sales = () => {
  const [products, setProducts] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [saleQuantity, setSaleQuantity] = useState('');
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const data = await ApiClient.products.getAll();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleShow = (product) => {
    setSelectedProduct(product);
    setSaleQuantity('');
    setDiscount(0);
    setTotal(0);
    setShow(true);
  };

  const handleClose = () => setShow(false);

  const handleQuantityChange = (e) => {
    const quantity = e.target.value;
    setSaleQuantity(quantity);
    calculateTotal(quantity, discount, selectedProduct.price);
  };

  const handleDiscountChange = (e) => {
    const discount = e.target.value;
    setDiscount(discount);
    calculateTotal(saleQuantity, discount, selectedProduct.price);
  };

  const calculateTotal = (quantity, discount, price) => {
    const total = (quantity * price) * (1 - discount / 100);
    setTotal(total.toFixed(2));
  };

  const handleSell = async () => {
    if (selectedProduct && saleQuantity > 0 && saleQuantity <= selectedProduct.quantity) {
      try {
        // Crear la venta
        await ApiClient.sales.create({
          product_id: selectedProduct.id,
          quantity: saleQuantity,
          discount: parseFloat(discount),
          total: parseFloat(total)
        });
  
        // Actualizar el producto
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
  
        // Refrescar la lista de productos y cerrar el modal
        getProducts();
        handleClose();
      } catch (error) {
        console.error('Error selling product:', error);
      }
    } else {
      console.error('Invalid quantity or product');
    }
  };


  return (
    <div className="sales-table-container">
      <Card className="p-4">
        <Card.Header className="d-flex justify-content-between align-items-center">
          <h2>Ventas</h2>
        </Card.Header>
        <Card.Body>
          <Table striped bordered hover className="table-custom">
            <thead>
              <tr>
                <th>Código</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Categoría</th>
                <th>Descripción</th>
                <th>Cantidad</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td>{product.code}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
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
            <Form.Group controlId="formSaleQuantity">
              <Form.Label>Unidades a Vender</Form.Label>
              <Form.Control
                type="number"
                name="quantity"
                value={saleQuantity}
                onChange={handleQuantityChange}
                min="1"
                max={selectedProduct ? selectedProduct.quantity : ''}
              />
            </Form.Group>
            <Form.Group controlId="formDiscount">
              <Form.Label>Descuento (%)</Form.Label>
              <Form.Control
                type="number"
                name="discount"
                value={discount}
                onChange={handleDiscountChange}
                min="0"
                max="100"
              />
            </Form.Group>
            <Form.Group controlId="formTotal">
              <Form.Label>Total</Form.Label>
              <Form.Control
                type="text"
                name="total"
                value={total}
                readOnly
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
          <Button variant="primary" onClick={handleSell}>Vender</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Sales;
