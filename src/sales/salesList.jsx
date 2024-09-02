import React, { useEffect, useState } from 'react';
import { ApiClient } from '../api/ApiClient';

function SalesList() {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        // Obtener ventas y clientes
        const salesData = await ApiClient.sales.getAll();
        console.log('Sales Data:', salesData); // Verifica lo que devuelve la API
        const customersData = await ApiClient.customers.getAll();
        console.log('Customers Data:', customersData); // Verifica lo que devuelve la API
  
        // Crear un mapa de clientes para un acceso más rápido
        const customersMap = {};
        customersData.forEach(customer => {
          customersMap[customer.id] = `${customer.nombre} ${customer.apellido}`;
        });
  
        // Verificar y ajustar el nombre del cliente
        const salesWithCustomerNames = salesData.map(sale => {
          // Si customer_name ya existe y no es "No asociado", mantenerlo
          if (sale.customer_name && sale.customer_name !== 'No asociado') {
            return sale;
          }
  
          // Si no existe o es "No asociado", buscar el cliente por customer_id
          const customerName = customersMap[sale.customer_id];
          return {
            ...sale,
            customer_name: customerName || 'Cliente no encontrado',
          };
        });
  
        setSales(salesWithCustomerNames);
      } catch (err) {
        console.error('Error:', err); // Mostrar cualquier error
        setError('Error al cargar las ventas');
      } finally {
        setLoading(false);
      }
    };
  
    fetchSales();
  }, []);
  
  if (loading) return <p>Cargando ventas...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="card">
      <h1 className="card-title">Historial de Ventas</h1>
      <table className="sales-table">
        <thead>
          <tr>
            <th>Código de Producto</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Categoría</th>
            <th>Descripción</th>
            <th>Cantidad</th>
            <th>Descuento</th> {/* Nueva columna para descuento */}
            <th>Total</th>
            <th>Nombre del Cliente</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {sales.map(sale => (
            <tr key={sale.id}>
              <td>{sale.product_code}</td>
              <td>{sale.name}</td>
              <td>{sale.price}</td>
              <td>{sale.category}</td>
              <td>{sale.description}</td>
              <td>{sale.quantity}</td>
              <td>{sale.discount}</td> {/* Mostrar descuento */}
              <td>{sale.total}</td>
              <td>{sale.customer_name}</td>
              <td>{new Date(sale.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SalesList;
