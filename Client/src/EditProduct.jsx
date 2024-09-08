import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import { FaProductHunt, FaDollarSign, FaBoxes, FaBarcode } from "react-icons/fa"; // Import icons
import './EditProduct.css';

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate(); // Initialize the useNavigate hook
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [productId, setProductId] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/apiproducts/${id}`);
                if (response.data.Status) {
                    const product = response.data.Result;
                    setName(product.name);
                    setPrice(product.price);
                    setStock(product.stock);
                    setProductId(product.product_id);
                } else {
                    setMessage(`Error: ${response.data.Error}`);
                }
            } catch (error) {
                console.error('Error fetching product:', error);
                setMessage('Error fetching product. Please try again.');
            }
        };
        fetchProduct();
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const productData = { name, price, stock, product_id: productId };

        try {
            const response = await axios.put(`http://localhost:3000/apiproducts/${id}`, productData);

            if (response.data.Status) {
                setMessage('Product updated successfully!');
                navigate('/productlist'); // Navigate to the ProductList component
            } else {
                setMessage(`Error: ${response.data.Error}`);
            }
        } catch (error) {
            console.error('Error updating product:', error);
            setMessage('Error updating product. Please try again.');
        }
    };

    return (
        <div className="product-form-overlay">
            <div id="product-form-container">
                <h1 id="product-form-heading">Edit Product</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="input-group">
                            <label htmlFor="product-name">
                                <FaProductHunt /> Product Name
                            </label>
                            <input
                                type="text"
                                id="product-name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="product-price">
                                <FaDollarSign /> Price
                            </label>
                            <input
                                type="number"
                                id="product-price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                step="0.01"
                                required
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="input-group">
                            <label htmlFor="product-stock">
                                <FaBoxes /> Stock
                            </label>
                            <input
                                type="number"
                                id="product-stock"
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="product-id">
                                <FaBarcode /> Product ID
                            </label>
                            <input
                                type="text"
                                id="product-id"
                                value={productId}
                                onChange={(e) => setProductId(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <button type="submit" id="product-form-submit-button">
                        Update Product
                    </button>
                </form>
                {message && (
                    <p
                        id="product-form-message"
                        className={
                            message.includes("Error") ? "error-message" : "success-message"
                        }
                    >
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
};

export default EditProduct;
