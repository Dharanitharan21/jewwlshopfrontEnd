import React, { useEffect, useState } from "react";

import Sellform from "./Sellform";
import "../Styles/sellpage.css";
import axios from "axios";
import {Typography } from "@mui/material";
import { Button, Card } from "react-bootstrap";
import Category from './Category';
import MyNavbar from "./MyNavbar";

function Sellpage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [userProducts, setUserProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const loggedInUserId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const [selectedCategory, setSelectedCategory] = useState([]); 
  const [selectedTypes, setSelectedTypes] = useState([]);


  const fetchUserProducts = () => {
    if (!token) {
      alert("Authentication required. Please log in.");
      return;
    }

    axios
      .get(`https://jewellaryshop.onrender.com/productapi/getbyuser/${loggedInUserId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUserProducts(response.data.data);
        
      })
      .catch((error) => {
        console.error("Error fetching user products:", error);
        alert("Failed to load products.");
      });
  };
  useEffect(() => {
    fetchUserProducts();
  }, [loggedInUserId])

  const handleAddClick = () => {
    setSelectedProduct(null); // ✅ Ensure product is reset
    setIsFormOpen(true)
  };
  const handleDelete = (productId) => {
    if (!token) {
      alert("Authentication required. Please log in.");
      return;
    }

    axios.delete(`https://jewellaryshop.onrender.com/productapi/delete/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        fetchUserProducts();
        alert("Product deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
        alert("Failed to delete product. Please try again.");
      });
  };
  const handleEdit = (property) => {
    setSelectedProduct(property);
    setIsFormOpen(true);
  };
  const filteredProducts = userProducts.filter((product) => {
    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(product.materialtype);
    const matchesCategory = selectedCategory.length === 0 || selectedCategory.includes(product.category);
    return matchesType && matchesCategory;
  });
  return (
    <div>
      <MyNavbar />
      <div className="search"> <Category 
      onFilterChange={(filterType, values) => {
            if (filterType === "types") setSelectedTypes(values);
            if (filterType === "categories") setSelectedCategory(values);
          }}/></div>
     
      <div className="sell-container">


        <div className="product-grid" >
          {filteredProducts.length !== 0 ? (
            filteredProducts.map((product) => (
              <Card key={product._id} className="product-card">
                <Card.Img variant="top" src={`https://jewellaryshop.onrender.com${product.image}` } className="cardimg" />
                <Card.Body className="card-content">
                 
                  <Card.Title>{product.name}</Card.Title>
                  <div className="sellcard-cate">
                  <Card.Text>{product.materialtype}</Card.Text>
                  <Card.Text>{product.category}</Card.Text></div>
                  <Card.Text>{product.description}</Card.Text>
                  <div className="cardprice">
                  <Card.Text>Price: Rs:{product.price}</Card.Text>
                  <Card.Text>Stock: {product.stock}</Card.Text></div>
                  <Button  color="secondary" onClick={() => handleEdit(product)}>Edit</Button>
                  <Button  color="secondary" onClick={() => handleDelete(product._id)}>
                    Delete
                  </Button>
                </Card.Body>
              </Card>

            ))
          ) : (
            <Typography>No products found</Typography>
          )}
          <div className="add-card" onClick={handleAddClick}>
            <div className="add-icon">+</div>
          </div>
        </div>
      </div>

      <Sellform open={isFormOpen} onHide={() => setIsFormOpen(false)}
        onSuccess={fetchUserProducts}
        product={selectedProduct || {}} />
    </div>
  );
}

export default Sellpage;
