import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Modal, Card } from 'react-bootstrap';
import { ApiClient } from "../api/ApiClient"; // Ajusta la ruta según tu estructura de archivos.

const CustomerTable = () => {
  const [customers, setCustomers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    ubicacion: '',
  });
  const [editCustomer, setEditCustomer] = useState(null);

  // Obtiene la lista de clientes usando ApiClient
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const data = await ApiClient.customers.getAll();
        setCustomers(data);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    fetchCustomers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer({ ...newCustomer, [name]: value });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditCustomer({ ...editCustomer, [name]: value });
  };

  const handleAddCustomer = async () => {
    if (!newCustomer.nombre || !newCustomer.apellido || !newCustomer.telefono || !newCustomer.ubicacion) {
      alert("Por favor complete todos los campos.");
      return;
    }

    try {
      const data = await ApiClient.customers.add(newCustomer);
      setCustomers([...customers, data]);
      setNewCustomer({ nombre: '', apellido: '', telefono: '', ubicacion: '' });
      setShowModal(false);
    } catch (error) {
      console.error('Error adding customer:', error);
    }
  };

  const handleEditCustomer = async () => {
    if (!editCustomer.nombre || !editCustomer.apellido || !editCustomer.telefono || !editCustomer.ubicacion) {
      alert("Por favor complete todos los campos.");
      return;
    }

    try {
      // Asegúrate de que el endpoint para editar esté configurado en tu backend
      const data = await ApiClient.customers.update(editCustomer.id, editCustomer);
      setCustomers(customers.map(c => c.id === data.id ? data : c));
      setEditCustomer(null);
      setShowEditModal(false);
    } catch (error) {
      console.error('Error updating customer:', error);
    }
  };

  const handleDeleteCustomer = async (id) => {
    try {
      // Asegúrate de que el endpoint para eliminar esté configurado en tu backend
      await ApiClient.customers.delete(id);
      setCustomers(customers.filter(c => c.id !== id));
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  return (
    <div className="container mt-4">
      <Card>
        <Card.Header>
          <h2>Lista de Clientes</h2>
          <Button variant="primary" onClick={() => setShowModal(true)}>
            Agregar Cliente
          </Button>
        </Card.Header>
        <Card.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Teléfono</th>
                <th>Ubicación</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id}>
                  <td>{customer.nombre}</td>
                  <td>{customer.apellido}</td>
                  <td>{customer.telefono}</td>
                  <td>{customer.ubicacion}</td>
                  <td>
                    <Button variant="warning" onClick={() => { setEditCustomer(customer); setShowEditModal(true); }}>Editar</Button>
                    <Button variant="danger" className="ml-2" onClick={() => handleDeleteCustomer(customer.id)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Modal para agregar cliente */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={newCustomer.nombre}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                type="text"
                name="apellido"
                value={newCustomer.apellido}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                type="text"
                name="telefono"
                value={newCustomer.telefono}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Ubicación</Form.Label>
              <Form.Control
                type="text"
                name="ubicacion"
                value={newCustomer.ubicacion}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleAddCustomer}>
            Agregar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal para editar cliente */}
      {editCustomer && (
        <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Editar Cliente</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="nombre"
                  value={editCustomer.nombre}
                  onChange={handleEditInputChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Apellido</Form.Label>
                <Form.Control
                  type="text"
                  name="apellido"
                  value={editCustomer.apellido}
                  onChange={handleEditInputChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Teléfono</Form.Label>
                <Form.Control
                  type="text"
                  name="telefono"
                  value={editCustomer.telefono}
                  onChange={handleEditInputChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Ubicación</Form.Label>
                <Form.Control
                  type="text"
                  name="ubicacion"
                  value={editCustomer.ubicacion}
                  onChange={handleEditInputChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEditModal(false)}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleEditCustomer}>
              Guardar Cambios
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default CustomerTable;