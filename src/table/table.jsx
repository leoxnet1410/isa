// ProductTable.js
import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { ApiClient } from '../api/ApiClient';

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [show, setShow] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productData, setProductData] = useState({
    code: '',
    name: '',
    price: '',
    category: '',
    quantity: '',
    description: ''
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await ApiClient.products.getAll();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleShow = (product = null) => {
    setEditingProduct(product);
    if (product) {
      setProductData({
        ...product,
        price: product.price.toString()
      });
    } else {
      setProductData({
        code: '',
        name: '',
        price: '',
        category: '',
        quantity: '',
        description: ''
      });
    }
    setShow(true);
  };

  const handleClose = () => setShow(false);

  const handleChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        product: {
          ...productData,
          price: parseFloat(productData.price) || 0
        }
      };
  
      if (editingProduct) {
        await ApiClient.products.update(editingProduct.id, payload);
      } else {
        await ApiClient.products.add(payload);
      }
  
      await fetchProducts();
      handleClose();
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };
  const handleDelete = async (productId) => {
    try {
      await ApiClient.products.delete(productId);
      await fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
      <div className="product-table-container">
        <div className="button-container">
          <Button variant="primary" onClick={() => handleShow()}>Agregar Producto</Button>
        </div>
  
        <Table striped bordered hover className="table-custom">
          <thead>
            <tr>
              <th>Código</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Categoría</th>
              <th>Cantidad</th>
              <th>Descripción</th>
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
                <td>{product.quantity}</td>
                <td>{product.description}</td>
                <td>
                  <Button variant="warning" onClick={() => handleShow(product)}>Editar</Button>
                  <Button variant="danger" onClick={() => handleDelete(product.id)}>Eliminar</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{editingProduct ? 'Editar Producto' : 'Agregar Producto'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formCode">
                <Form.Label>Código</Form.Label>
                <Form.Control
                  type="text"
                  name="code"
                  value={productData.code}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formName">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={productData.name}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formPrice">
                <Form.Label>Precio</Form.Label>
                <Form.Control
                  type="text"
                  name="price"
                  value={productData.price}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formCategory">
                <Form.Label>Categoría</Form.Label>
                <Form.Control
                  type="text"
                  name="category"
                  value={productData.category}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formQuantity">
                <Form.Label>Cantidad</Form.Label>
                <Form.Control
                  type="text"
                  name="quantity"
                  value={productData.quantity}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formDescription">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  value={productData.description}
                  onChange={handleChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
            <Button variant="primary" onClick={handleSubmit}>{editingProduct ? 'Guardar Cambios' : 'Agregar Producto'}</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  };
  
  export default ProductTable;