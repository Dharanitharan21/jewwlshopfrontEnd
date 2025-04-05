import React, { useState, useEffect, useReducer } from 'react';
import {  Row, Col, Button, Card, Modal } from 'react-bootstrap';
import Category from './Category';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavbar from './MyNavbar';
import axios from 'axios';
import '../Styles/buypage.css';
import { useLocation } from 'react-router-dom';
import cart from '../Icons/cart.png'

function reducer(state, action) {
    switch (action.type) {
        case "addtocart":
            if (!action.item || !action.item._id) return state;

            const existItem = state.cart.find(item => item._id === action.item._id);
            if (existItem) {
                const updatedCart = state.cart.map(item =>
                    item._id === action.item._id ? { ...item, quantity: item.quantity + 1 } : item
                );
                return {
                    ...state,
                    cart: updatedCart,
                    totalprice: state.totalprice + action.item.price,
                    count: state.count + 1
                };
            } else {
                return {
                    ...state,
                    cart: [...state.cart, { ...action.item, quantity: 1 }],
                    totalprice: state.totalprice + action.item.price,
                    count: state.count + 1
                };
            }

        case "removefromcart":
            const itemToRemove = state.cart.find(item => item._id === action.item._id);
            if (!itemToRemove) return state; 

            if (itemToRemove.quantity > 1) {
                const updatedCart = state.cart.map(item =>
                    item._id === action.item._id ? { ...item, quantity: item.quantity - 1 } : item
                );
                return {
                    ...state,
                    cart: updatedCart,
                    totalprice: state.totalprice - action.item.price,
                    count: state.count - 1
                };
            } else {
                return {
                    ...state,
                    cart: state.cart.filter(item => item._id !== action.item._id),
                    totalprice: state.totalprice - action.item.price,
                    count: state.count - 1
                };
            }

        default:
            return state;
    }
}

function Buypage() {
    const [sitedata, setsitedata] = useState([]);  
    const [state, dispatch] = useReducer(reducer, { cart: [], totalprice: 0, count: 0 });
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState([]); 
    const [selectedTypes, setSelectedTypes] = useState([]);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const categoryFromURL = queryParams.get("category"); 

    useEffect(() => {
        if (categoryFromURL) {
            setSelectedCategory(categoryFromURL);
        }
    }, [categoryFromURL]); 

    useEffect(() => {
        axios.get("https://jewellaryshop.onrender.com/productapi/getall")
            .then((response) => {
                if (response.data && Array.isArray(response.data)) {
                    setsitedata(response.data); 
                } else {
                    console.error("Unexpected API response format:", response);
                }
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
                setsitedata([]);  
            })
            .finally(() => setLoading(false));  
    }, []);

    function addToCart(item) {
        dispatch({ type: "addtocart", item });
    }

    function removeFromCart(item) {
        dispatch({ type: "removefromcart", item });
    }
    const filteredProducts = sitedata.filter((product) => {
        const matchesType = selectedTypes.length === 0 || selectedTypes.includes(product.materialtype);
        const matchesCategory = selectedCategory.length === 0 || selectedCategory.includes(product.category);
        return matchesType && matchesCategory;
      });
    return (
        <div className="buypage-container">
            <MyNavbar />
            <div className='search'>
            <Category
              onFilterChange={(filterType, values) => {
                if (filterType === "types") setSelectedTypes(values);
                if (filterType === "categories") setSelectedCategory(values);
              }} /></div>
            <div >
                {/* Cart Button */}
                <div className="cart-button">
                    <Button variant="primary" onClick={() => setShow(true)}>
                       View cart <img src={cart} className='buypage-cart'/>
                    </Button>
                </div>

                {/* Cart Modal */}
                <Modal show={show} fullscreen onHide={() => setShow(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Shopping Cart</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {state.cart.length === 0 ? (
                            <p>Your cart is empty.</p>
                        ) : (
                            <Row className="cart-modal-row">
                                {state.cart.map((item) => (
                                    <Col key={item._id} xs={12} sm={6} md={4} lg={3}>
                                        <Card className="cart-card">
                                            <Card.Img 
                                                variant="top" 
                                                alt={item.name || "product image"}
                                                src={`https://jewellaryshop.onrender.com${item.image}`} 
                                                className="cart-card-img"
                                            />
                                            <Card.Body className='buycrdbody'>
                                                <Card.Title>{item.name}</Card.Title>
                                                <Card.Text>Price: Rs{item.price}</Card.Text>
                                                <Card.Text>Quantity: {item.quantity}</Card.Text>
                                                <Button variant="danger" onClick={() => removeFromCart(item)}>Remove</Button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <h5>Total Items: {state.count}</h5>
                        <h5>Total Amount: Rs{state.totalprice.toFixed(2)}</h5>
                    </Modal.Footer>
                </Modal>

                {/* Product Grid */}
                {loading ? (
                    <p>Loading products...</p>
                ) : (
                    <Row className="buypage-grid">
                        {filteredProducts.length === 0 ? (
                            <p>No products available.</p>
                        ) : (
                            filteredProducts.map((item) => (
                               
                                <Col key={item._id} xs={12} sm={6} md={4} lg={3}>
                                    <Card className="product-card">
                                        <Card.Img 
                                        alt={item.name || "product image"}
                                            variant="top" 
                                            src={`https://jewellaryshop.onrender.com${item.image}`} 
                                            className="cart-card-img" 
                                        />
                                        <Card.Body>
                                            <div className='buycartdiv'><Card.Title>{item.name}</Card.Title>
                                             <Card.Text><strong>Price:</strong> Rs:{item.price}</Card.Text></div>
                                            <Card.Text>{item.description?.slice(0, 90)}...</Card.Text>
                                           
                                            <Button variant="primary" onClick={() => addToCart(item)}><img src={cart} className='buypage-cart'/>Add to cart</Button>
                                        </Card.Body>
                                       
                                    </Card>
                                </Col>
                               
                            ))
                        )}
                    </Row>
                )}
            </div>
        </div>
    );
}

export default Buypage;
