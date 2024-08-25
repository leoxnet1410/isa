import { BrowserRouter, Routes,Route} from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import ProductTable from './table/table'
import Login from "./home/form";
import Cuadros from "./home/welcome";
import Sales from "./sales/sales";
import Navegation from "./navbar";
import SalesList from "./sales/salesList";
import ProductForm from "./table/ProductForm";
import ProductCard from "./catalog"

import './App.scss'



function App() {
  return (
    <BrowserRouter>
      <Container fluid className="main">
        <Row>
          <Col xs={12} className="px-0">
          <Navegation/>     
          </Col>
        </Row>
        <Routes>
      
        <Route path="table" element={<ProductTable/>} />
        <Route path="/" element={<Login />} />
        <Route path="welcome" element={<Cuadros />} />
        <Route path="sales" element={<Sales />} />
        <Route path="salesList" element={<SalesList />} />
        <Route path="form" element={<ProductForm/>} />
        <Route path="catalog" element={<ProductCard/>} />

        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;