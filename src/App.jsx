import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import ProductTable from './table/table';
import Login from './home/form';
import Cuadros from './home/welcome';
import Sales from './sales/sales';
import Navegation from './home/navbar';
import SalesList from './sales/salesList';
import ProductCard from './catalog';
import './App.scss';

const AppContent = () => {
  const location = useLocation();

  // La navegación no se mostrará en las rutas "/" y "/welcome"
  const shouldShowNavigation = location.pathname !== '/' && location.pathname !== '/welcome';

  return (
    <>
      {shouldShowNavigation && <Navegation />}
      <Routes>
        <Route path="table" element={<ProductTable />} />
        <Route path="/" element={<Login />} />
        <Route path="welcome" element={<Cuadros />} />
        <Route path="sales" element={<Sales />} />
        <Route path="salesList" element={<SalesList />} />
        <Route path="catalog" element={<ProductCard />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Container fluid className="main">
        <Row>
          <Col xs={12} className="px-0">
            <AppContent />
          </Col>
        </Row>
      </Container>
    </BrowserRouter>
  );
}

export default App;