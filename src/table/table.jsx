import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';


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
    description: '',
    image: null // Nueva propiedad para la imagen
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  // Obtener productos desde el backend
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/products', { withCredentials: true });
      console.log(response.data); // Verifica la respuesta en la consola
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  const handleShow = (product = null) => {
    setEditingProduct(product);
    if (product) {
      setProductData({
        ...product,
        price: product.price.toString(),
        image: null // Resetear la imagen cuando se edita un producto
      });
    } else {
      setProductData({
        code: '',
        name: '',
        price: '',
        category: '',
        quantity: '',
        description: '',
        image: null
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProductData({
      ...productData,
      image: file
    });
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      // Agrupar todos los datos bajo la clave 'product'
      formData.append('product[code]', productData.code);
      formData.append('product[name]', productData.name);
      formData.append('product[price]', parseFloat(productData.price) || 0);
      formData.append('product[category]', productData.category);
      formData.append('product[quantity]', productData.quantity);
      formData.append('product[description]', productData.description);

      if (productData.image) {
        formData.append('product[image]', productData.image, productData.image.name);
      }

      if (editingProduct) {
        // Editar producto existente
        await axios.put(`http://localhost:3000/products/${editingProduct.id}`, formData, { withCredentials: true });
      } else {
        // Agregar nuevo producto
        await axios.post('http://localhost:3000/products', formData, { withCredentials: true });
      }

      await fetchProducts(); // Recargar la lista de productos después de guardar
      handleClose(); // Cerrar el modal
    } catch (error) {
      console.error('Error saving product:', error.response?.data || error.message);
    }
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:3000/products/${productId}`, { withCredentials: true });
      await fetchProducts(); // Recargar la lista de productos después de eliminar
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="product-table-container">
      <div className="header-container">
        <h1 style={{ float: 'left' }}>INVENTARIO</h1>
        <div className="button-container" style={{ float: 'right' }}>
          <Button variant="primary" onClick={() => handleShow()}>Agregar Producto</Button>
        </div>
      </div>

      <Table striped bordered hover className="table-custom" style={{ clear: 'both' }}>
        <thead>
          <tr>
            <th>Imagen</th>
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
              <td>
                {product.image_url ? (
                  <img src={product.image_url} alt={product.name} style={{ width: '100px', height: 'auto' }} />
                ) : (
                  'Sin imagen'
                )}
              </td>
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
            <Form.Group controlId="formImage">
              <Form.Label>Imagen</Form.Label>
              <Form.Control
                type="file"
                name="image"
                onChange={handleFileChange}
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