import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Box, TextField, Typography, Button, FormControl, InputLabel, Select, MenuItem, Autocomplete } from "@mui/material";
import '../Styles/sellform.css'
const jewelryOptions = [
    { materialtype: "diamond", category: ["bangles", "chains", "necklaces", "rings", "bracelets", "earrings"] },
    { materialtype: "platinum", category: ["bangles", "chains", "necklaces", "rings", "bracelets", "earrings"] },
    { materialtype: "gold", category: ["bangles", "chains", "necklaces", "rings", "bracelets", "earrings"] },
    { materialtype: "silver", category: ["bangles", "chains", "necklaces", "rings", "bracelets", "earrings"] },
    { materialtype: "pearl", category: ["bangles", "chains", "necklaces", "rings", "bracelets", "earrings"] },
];

function Sellform({ open, onHide, product, onSuccess }) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        stock: "",
        description: "",
        materialtype: "",
        category: "",
        manufacturingDate: "",
        image: null,
        userId: "",
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        const storedUserId = localStorage.getItem("userId");
        if (storedUserId) {
            setFormData((prevData) => ({ ...prevData, userId: storedUserId }));
        }

        if (product) {
            setFormData({
                name: product.name || "",
                price: product.price || "",
                stock: product.stock || "",
                description: product.description || "",
                materialtype: product.materialtype || "",
                category: product.category || "",
                manufacturingDate: product.manufacturingDate || "",
                image: product.image || null,
                userId: storedUserId || "",
            });
        } else if(open) {
            resetForm();
        }
    }, [product, open])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0]; // Only take the first file
        if (file) {
            setSelectedFile(file);
            setFormData((prevData) => ({
                ...prevData,
                image: file,
            }));
        }
    };

    const validateForm = () => {
        let newErrors = {};
        if (!formData.name) newErrors.name = "Product name is required";
        if (!formData.price || formData.price <= 0) newErrors.price = "Valid price is required";
        if (!formData.stock || formData.stock < 0) newErrors.stock = "Stock must be 0 or more";
        if (!formData.description) newErrors.description = "Description is required";
        if (!formData.materialtype) newErrors.materialtype = "Material type is required";
        if (!formData.category) newErrors.category = "Category is required";
        if (!formData.manufacturingDate) newErrors.manufacturingDate = "Manufacturing date is required";
        if (!selectedFile) newErrors.image = "Product image is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("Authentication error: No token found.");
                return;
            }

            const formDataToSend = new FormData();

            // Append form fields except image
            for (const key in formData) {
                if (key !== "image") {
                    formDataToSend.append(key, formData[key]);
                }
            }

            // Append the single image file
            if (selectedFile) {
                formDataToSend.append("image", selectedFile);
            }

            console.log("Sending Data:", formDataToSend);

            const apiUrl = product?._id
                ? `https://jewellaryshop.onrender.com/productapi/update/${product._id}`
                : `https://jewellaryshop.onrender.com/productapi/create`;

            const requestMethod = product?._id ? axios.put : axios.post;

            const response = await requestMethod(apiUrl, formDataToSend, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            console.log("Response:", response.data);
            alert(product?._id ? "Product updated successfully!" : "Product listed successfully!");
            resetForm();
            onSuccess(); // Refresh the product list
            onHide();
        } catch (error) {
            console.error("Error:", error.response?.data || error.message);
            alert(error.response?.data?.error || "Failed to process request. Try again.");
        }
    };

    const resetForm = () => {
        setFormData({
            name: "",
            price: "",
            stock: "",
            description: "",
            materialtype: "",
            category: "",
            manufacturingDate: "",
            image: null,
            userId: localStorage.getItem("userId") || "",
        });
        setSelectedFile(null);
    };
    const selectedType = jewelryOptions.find((option) => option.materialtype === formData.materialtype);
    const categoryOptions = selectedType ? selectedType.category : [];
    return (
        <Modal open={open} onClose={onHide}>
            <Box className="selbox"
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 400,
                    minWidth: 800,
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                }}
            >
                <Typography variant="h6" mb={2}>
                    {product?._id ? "Update Product" : "Create Product"}
                </Typography>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="selldiv"> <TextField
                        label="Name"
                        name="name"
                        fullWidth
                        margin="normal"
                        value={formData.name}
                        onChange={handleChange}
                        error={!!errors.name}
                        helperText={errors.name}
                        
                    />
                    <TextField
                        label="Price"
                        name="price"
                        type="number"
                        fullWidth
                        margin="normal"
                        value={formData.price}
                        onChange={handleChange}
                        error={!!errors.price}
                        helperText={errors.price}
                        
                    />
                    <TextField
                        label="Stock"
                        name="stock"
                        type="number"
                        fullWidth
                        margin="normal"
                        value={formData.stock}
                        onChange={handleChange}
                        error={!!errors.stock}
                        helperText={errors.stock}
                        
                    /></div>
                    <TextField
                        label="Description"
                        name="description"
                        fullWidth
                        margin="normal"
                        value={formData.description}
                        onChange={handleChange}
                        error={!!errors.description}
                        helperText={errors.description}
                        
                    />
                    <div className="selldiv">
                    <Autocomplete
                        options={jewelryOptions.map((option) => option.materialtype)}
                        value={formData.materialtype}
                        onChange={(_, newValue) => setFormData({ ...formData, materialtype: newValue, category: null })}
                        renderInput={(params) => <TextField {...params} label="Type" margin="normal" fullWidth  className="selltxt" />}
                    />
                    <Autocomplete
                        options={categoryOptions || []}
                        value={formData.category || null}
                        onChange={(_, newValue) => setFormData({ ...formData, category: newValue })}
                        renderInput={(params) => <TextField {...params} label="Category" margin="normal" fullWidth className="selltxt" />}
                        disabled={!formData.materialtype}
                    /></div>
                    <div className="selldiv"><TextField
                        label="Manufacturing Date"
                        name="manufacturingDate"
                        type="date"
                        fullWidth
                        margin="normal"
                        value={formData.manufacturingDate}
                        onChange={handleChange}
                        error={!!errors.manufacturingDate}
                        helperText={errors.manufacturingDate}
                        
                        InputLabelProps={{ shrink: true }}
                    />

                    <input type="file" accept="image/*" onChange={handleFileChange} className="custom-file-input" />
                    {errors.image && <Typography color="error">{errors.image}</Typography>} </div>

                    <div style={{ marginTop: "15px", textAlign: "right" }}>
                        <Button variant="outlined" color="secondary" onClick={onHide} sx={{ marginRight: "10px" }}>
                            Cancel
                        </Button>
                        <Button variant="contained" color="primary" type="submit">
                            {product?._id ? "Update" : "Submit"}
                        </Button>
                    </div>
                </form>
            </Box>
        </Modal>
    );
}

export default Sellform;
