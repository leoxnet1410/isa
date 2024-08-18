import React, { useState, useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { ApiClient } from '../api/ApiClient';

const ProductForm = ({ show, onClose, product, onSave }) => {
    const [formData, setFormData] = useState({ code: '', name: '', price: '', category: '', quantity: '' });

    useEffect(() => {
        if (product) {
            setFormData({ ...product });
        } else {
            setFormData({ code: '', name: '', price: '', category: '', quantity: '' });
        }
    }, [product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        if (product) {
            await ApiClient.Products.update(product.id, formData);
        } else {
            await ApiClient.Products.add(formData);
        }
        onSave();
        onClose();
    };

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>{product ? 'Editar Producto' : 'Agregar Producto'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formCode">
                        <Form.Label>Código</Form.Label>
                        <Form.Control
                            type="text"
                            name="code"
                            value={formData.code}
                            onChange={handleChange}
                            placeholder="Código"
                        />
                    </Form.Group>
                    <Form.Group controlId="formName">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Nombre"
                        />
                    </Form.Group>
                    <Form.Group controlId="formPrice">
                        <Form.Label>Precio</Form.Label>
                        <Form.Control
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="Precio"
                        />
                    </Form.Group>
                    <Form.Group controlId="formCategory">
                        <Form.Label>Categoría</Form.Label>
                        <Form.Control
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            placeholder="Categoría"
                        />
                    </Form.Group>
                    <Form.Group controlId="formQuantity">
                        <Form.Label>Cantidad</Form.Label>
                        <Form.Control
                            type="number"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            placeholder="Cantidad"
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    {product ? 'Guardar Cambios' : 'Agregar Producto'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ProductForm;