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
      console.log('Submitting product:', payload);

      let response;
      if (editingProduct) {
        response = await ApiClient.products.update(editingProduct.id, payload);
      } else {
        response = await ApiClient.products.add(payload);
      }
      console.log('Server response:', response);

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
      console.error('Error deleting product:', error.response ? error.response.data : error.message);
      alert('No se pudo eliminar el producto. Asegúrate de que no tenga ventas asociadas.');
    }
  };

  return (
    <>
      <Button variant="primary" onClick={() => handleShow()} className="button-custom">Crear Producto</Button>
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
                <Button variant="warning" onClick={() => handleShow(product)} className="button-custom">Editar</Button>{' '}
                <Button variant="danger" onClick={() => handleDelete(product.id)} className="button-custom">Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose} className="modal-custom">
        <Modal.Header closeButton>
          <Modal.Title>{editingProduct ? 'Editar Producto' : 'Crear Producto'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formProductCode">
              <Form.Label>Código</Form.Label>
              <Form.Control
                type="text"
                name="code"
                value={productData.code}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formProductName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={productData.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formProductPrice">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                name="price"
                value={productData.price}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formProductCategory">
              <Form.Label>Categoría</Form.Label>
              <Form.Control
                type="text"
                name="category"
                value={productData.category}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formProductQuantity">
              <Form.Label>Cantidad</Form.Label>
              <Form.Control
                type="text"
                name="quantity"
                value={productData.quantity}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formProductDescription">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={productData.description}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
          <Button variant="primary" onClick={handleSubmit}>
            {editingProduct ? 'Guardar Cambios' : 'Crear Producto'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProductTable;