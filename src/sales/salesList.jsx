import React, { useEffect, useState } from 'react';
import { ApiClient } from '../api/ApiClient';

function SalesList() {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const data = await ApiClient.sales.getAll();
        console.log('Data from API:', data); // Verifica los datos aquí
        setSales(data);
      } catch (err) {
        setError('Failed to load sales');
      } finally {
        setLoading(false);
      }
    };

    fetchSales();
  }, []);

  if (loading) return <p>Loading sales...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="card">
      <h1 className="card-title">Historial de ventas</h1>
      <table className="sales-table">
        <thead>
          <tr>
            <th>Codigo de Producto</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Categoria</th>
            <th>Descripcion</th>
            <th>Cantidad</th>
            <th>Total</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {sales.map(sale => (
            <tr key={sale.product_code}>
              <td>{sale.product_code}</td>
              <td>{sale.name}</td>
              <td>{sale.price}</td>
              <td>{sale.category}</td>
              <td>{sale.description}</td>
              <td>{sale.quantity}</td>
              <td>{sale.total}</td>
              <td>{new Date(sale.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SalesList;