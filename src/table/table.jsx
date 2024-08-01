import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import EditButton from './ButtonEdit';
import DeleteButton from './ButtonDelete';
import AddButton from './ButtonCreate';

const ProductTable = () => {
  const [products, setProducts] = useState([
    { code: '001', name: 'Producto A', price: 10.0, category: 'Categoría 1' },
    { code: '002', name: 'Producto B', price: 20.0, category: 'Categoría 2' },
    { code: '003', name: 'Producto C', price: 30.0, category: 'Categoría 1' },
    { code: '004', name: 'Producto D', price: 40.0, category: 'Categoría 3' },
  ]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentProductIndex, setCurrentProductIndex] = useState(null);
  const [currentProduct, setCurrentProduct] = useState({ code: '', name: '', price: '', category: '' });
  const [newProduct, setNewProduct] = useState({ code: '', name: '', price: '', category: '' });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentProduct({ ...currentProduct, [name]: value });
  };

  const handleNewProductChange = (event) => {
    const { name, value } = event.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleEditProduct = (index) => {
    setCurrentProductIndex(index);
    setCurrentProduct(products[index]);
    setShowEditModal(true);
  };

  const saveProductChanges = () => {
    const updatedProducts = [...products];
    updatedProducts[currentProductIndex] = currentProduct;
    setProducts(updatedProducts);
    setShowEditModal(false);
  };

  const handleDeleteProduct = (index) => {
    setCurrentProductIndex(index);
    setShowDeleteModal(true);
  };

  const confirmDeleteProduct = () => {
    const updatedProducts = products.filter((_, i) => i !== currentProductIndex);
    setProducts(updatedProducts);
    setShowDeleteModal(false);
  };

  const handleAddProduct = () => {
    setProducts([...products, newProduct]);
    setNewProduct({ code: '', name: '', price: '', category: '' });
    setShowAddModal(false);
  };

  return (
    <div className="product-table-container">
      <div className="d-flex justify-content-end ">
        <AddButton onClick={() => setShowAddModal(true)} />
      </div>
      <div className="table-container">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Código</th>
              <th>Nombre</th>
              <th>Precio de Venta</th>
              <th>Categoría</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td>{product.code}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>
                  <EditButton onClick={() => handleEditProduct(index)} />
                  <DeleteButton onClick={() => handleDeleteProduct(index)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Editar Producto */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            name="code"
            placeholder="Código"
            value={currentProduct.code}
            onChange={handleInputChange}
            className="form-control mb-2"
          />
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            value={currentProduct.name}
            onChange={handleInputChange}
            className="form-control mb-2"
          />
          <input
            type="number"
            name="price"
            placeholder="Precio de Venta"
            value={currentProduct.price}
            onChange={handleInputChange}
            className="form-control mb-2"
          />
          <input
            type="text"
            name="category"
            placeholder="Categoría"
            value={currentProduct.category}
            onChange={handleInputChange}
            className="form-control mb-2"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={saveProductChanges}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Eliminar Producto */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Estás seguro de que deseas eliminar este producto?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={confirmDeleteProduct}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Agregar Producto */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            name="code"
            placeholder="Código"
            value={newProduct.code}
            onChange={handleNewProductChange}
            className="form-control mb-2"
          />
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            value={newProduct.name}
            onChange={handleNewProductChange}
            className="form-control mb-2"
          />
          <input
            type="number"
            name="price"
            placeholder="Precio de Venta"
            value={newProduct.price}
            onChange={handleNewProductChange}
            className="form-control mb-2"
          />
          <input
            type="text"
            name="category"
            placeholder="Categoría"
            value={newProduct.category}
            onChange={handleNewProductChange}
            className="form-control mb-2"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Cancelar
          </Button>
          <Button variant="success" onClick={handleAddProduct}>
            Agregar Producto
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProductTable;