import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';
import Layout from './Layout';
import ProductList from './ProductList';
import AddProduct from './AddProduct';
import EditProduct from './EditProduct';
import CustomerList from './CustomerList';
import AddCustomer from './AddCustomer';
import SaleList from './SaleList';
import AddSale from './AddSale';
import SupplierList from './SupplierList';
import AddSupplier from './AddSupplier';
import PurchaseList from './PurchaseList';
import AddPurchase from './AddPurchase';
import TransactionList from './TransactionList';
import BarcodeScanner from './BarcodeScanner';
import SaleDetails from './SaleDetails';
import PurchaseDetails from './PurchaseDetails';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/dashboard' element={<Layout><Dashboard /></Layout>} />
          <Route path='/productlist' element={<Layout><ProductList /></Layout>} />
          <Route path='/addproduct' element={<Layout><AddProduct /></Layout>} />
          <Route path='/editproduct/:id' element={<Layout><EditProduct /></Layout>} />
          <Route path='/customerlist' element={<Layout><CustomerList /></Layout>} />
          <Route path='/addcustomer' element={<Layout><AddCustomer /></Layout>} />
          <Route path='/salelist' element={<Layout><SaleList /></Layout>} />
          <Route path='/addsale' element={<Layout><AddSale /></Layout>} />
          <Route path='/supplierlist' element={<Layout><SupplierList /></Layout>} />
          <Route path='/addsupplier' element={<Layout><AddSupplier /></Layout>} />
          <Route path='/purchaselist' element={<Layout><PurchaseList /></Layout>} />
          <Route path='/addpurchase' element={<Layout><AddPurchase /></Layout>} />
          <Route path='/transactionlist' element={<Layout><TransactionList /></Layout>} />
          <Route path='/barcodescanner' element={<Layout><BarcodeScanner /></Layout>} />
          <Route path='/saledetails/:id' element={<SaleDetails />} />
          <Route path='/purchasedetails/:id' element={<PurchaseDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
