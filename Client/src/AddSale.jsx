import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddSale.css';
import { useNavigate } from 'react-router-dom';

const createNewSaleItem = () => ({
  productId: '',
  productDetails: { price: '', stock: '' },
  salePrice: '',
  quantity: '',
  itemTotal: 0,
});

const AddSale = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [customerId, setCustomerId] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [saleItems, setSaleItems] = useState([createNewSaleItem()]);
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [orderDiscount, setOrderDiscount] = useState(0);
  const [deliveryDate, setDeliveryDate] = useState('');
  const [paid, setPaid] = useState('');
  const [orderTotal, setOrderTotal] = useState(0);
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [recentSaleId, setRecentSaleId] = useState(null);
  const [canPrint, setCanPrint] = useState(false); // New state variable for print button

  useEffect(() => {
    axios.get('http://localhost:3000/shalacustomers')
      .then(response => {
        setCustomers(response.data);
      })
      .catch(error => {
        console.error('Error fetching customers:', error);
      });

    axios.get('http://localhost:3000/shalaproducts')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  useEffect(() => {
    calculateTotals(saleItems);
  }, [orderDiscount, saleItems]);

  const handleCustomerChange = async (event) => {
    const id = event.target.value;
    setCustomerId(id);
    try {
      const response = await axios.get(`http://localhost:3000/shalacustomers/${id}`);
      const { phone } = response.data;
      setCustomerPhone(phone);
    } catch (error) {
      console.error('Error fetching customer details:', error);
      setCustomerPhone('');
    }
  };

  const handleProductChange = async (index, event) => {
    const id = event.target.value;
    const newSaleItems = [...saleItems];
    newSaleItems[index].productId = id;
    try {
      const response = await axios.get(`http://localhost:3000/shalaproducts/${id}`);
      const { price, stock } = response.data;
      if (stock === 0) {
        alert('Stock is not available. Select another product.');
        newSaleItems[index] = createNewSaleItem();
      } else {
        newSaleItems[index].productDetails = { price, stock };
        newSaleItems[index].salePrice = '';
        newSaleItems[index].quantity = '';
        newSaleItems[index].itemTotal = 0;
      }
      setSaleItems(newSaleItems);
      calculateTotals(newSaleItems);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  const handleSaleItemChange = (index, field, value) => {
    const newSaleItems = [...saleItems];
    
    if (field === 'quantity') {
      const quantity = parseFloat(value) || 0;
      const stock = parseFloat(newSaleItems[index].productDetails.stock) || 0;
  
      if (quantity > stock) {
        alert('Quantity exceeds available stock. Please adjust.');
        return;
      }
    }
    
    newSaleItems[index][field] = value;
    calculateItemTotal(index, newSaleItems);
    setSaleItems(newSaleItems);
  };

  const calculateItemTotal = (index, saleItems) => {
    const price = parseFloat(saleItems[index].salePrice) || 0;
    const quantity = parseFloat(saleItems[index].quantity) || 0;
    saleItems[index].itemTotal = price * quantity;
    calculateTotals(saleItems);
  };

  const calculateTotals = (saleItems) => {
    const total = saleItems.reduce((sum, item) => sum + item.itemTotal, 0);
    const totalAfterDiscount = total - orderDiscount;
    setOrderTotal(total);
    setTotalAfterDiscount(totalAfterDiscount);
  };

  const handleAddProduct = () => {
    setSaleItems([...saleItems, createNewSaleItem()]);
  };

  const handleRemoveProduct = (index) => {
    const newSaleItems = saleItems.filter((_, i) => i !== index);
    setSaleItems(newSaleItems);
    calculateTotals(newSaleItems);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const saleData = saleItems.map(item => ({
      product_id: item.productId,
      sale_price: item.salePrice,
      quantity: item.quantity,
    }));

    axios.post('http://localhost:3000/shalasales', {
      customer_id: customerId,
      customer_phone: customerPhone,
      sale_data: saleData,
      delivery_date: deliveryDate, // Ensure deliveryDate is included here
      payment_method: paymentMethod,
      order_discount: orderDiscount,
      paid,
    })
    .then(response => {
      alert(response.data.message);
      setRecentSaleId(response.data.sale_id);
      setCanPrint(true); // Enable the print button
    })
    .catch(error => console.error('Error submitting sale:', error));
  };

  const handlePrintBill = () => {
    if (recentSaleId) {
      navigate(`/saledetails/${recentSaleId}`);
    } else {
      alert('No sale to print.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-sale-form">
      <h2>Sale Order</h2>
      <div className="customer-info">
        <div className="input-group-row">
          <div className="input-group">
            <label>Customer:</label>
            <select value={customerId} onChange={handleCustomerChange} required>
              <option value="">Select Customer</option>
              {customers.map((customer) => (
                <option key={customer.customer_id} value={customer.customer_id}>
                  {customer.name}
                </option>
              ))}
            </select>
          </div>
          <div className="input-group">
            <label>Customer Phone Number:</label>
            <input type="text" value={customerPhone} readOnly />
          </div>
          <div className="input-group">
            <label>Delivery Date:</label>
            <input 
              type="date" 
              value={deliveryDate} 
              onChange={(e) => setDeliveryDate(e.target.value)} 
              required
            />
          </div>
        </div>
      </div>

      <button type="button" className="new-row-btn" onClick={handleAddProduct}>+ New Row</button>
      <table className="sale-items-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th>Product MRP</th>
            <th>Sale Price</th>
            <th>Quantity</th>
            <th>Stock</th>
            <th>Item Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {saleItems.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <select value={item.productId} onChange={(e) => handleProductChange(index, e)} required>
                  <option value="">Select Product</option>
                  {products.map(product => (
                    <option key={product.id} value={product.id}>{product.name}</option>
                  ))}
                </select>
              </td>
              <td className='MRP'>{item.productDetails.price}</td>
              <td>
                <input
                  type="number"
                  value={item.salePrice}
                  onChange={(e) => handleSaleItemChange(index, 'salePrice', e.target.value)}
                  required
                />
              </td>
              <td>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleSaleItemChange(index, 'quantity', e.target.value)}
                  required
                />
              </td>
              <td>{item.productDetails.stock}</td>
              <td>{item.itemTotal.toFixed(2)}</td>
              <td>
                <button type="button" onClick={() => handleRemoveProduct(index)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="totals-container">
        <div className="input-group">
          <label>Order Total:</label>
          <input type="text" value={orderTotal.toFixed(2)} readOnly />
        </div>
        <div className="input-group">
          <label>Discount:</label>
          <input
            type="number"
            value={orderDiscount}
            onChange={(e) => setOrderDiscount(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Total After Discount:</label>
          <input type="text" value={totalAfterDiscount.toFixed(2)} readOnly />
        </div>
        <div className="input-group">
          <label>Payment Method:</label>
          <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} required>
            <option value="Cash">Cash</option>
            <option value="UPI">UPI</option>
            
          </select>
        </div>
        <div className="input-group">
          <label>Paid:</label>
          <input
            type="number"
            value={paid}
            onChange={(e) => setPaid(e.target.value)}
            required
          />
        </div>
      </div>

      <button type="submit" className="submit-btn">Submit</button>
      {canPrint && <button type="button" className="print-btn" onClick={handlePrintBill}>Print Bill</button>}
    </form>
  );
};

export default AddSale;
