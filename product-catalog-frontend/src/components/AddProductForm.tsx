"use client";
import React, { useState } from 'react';
import axios from 'axios';
import styles from '../styles/AddProductForm.module.css'; 

interface Product {
    name: string;
    description: string;
    price: number | string;
    image: string;
  }

const AddProductForm = ({ onAdd }: { onAdd: () => void }) => {
    const [formData, setFormData] = useState<Product>({
        name: "",
        description: "",
        price: "",
        image: "",
      });


  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    }

    // Price validation
    if (!formData.price ) {
      newErrors.price = "Price is required." 
    }
    else if (Number(formData.price) <= 0) {
      newErrors.price = "Price must be a positive number.";
    }

    // Image URL validation
    const urlPattern = new RegExp(
      "^(https?:\\/\\/)?([\\w\\-~]+\\.)+([\\w\\-~]{2,})((\\/[^\\s]*)?)?$",
      "i"
    );

    if(formData.image.trim() && !urlPattern.test(formData.image)) {
      newErrors.image = "Image URL must be valid.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
    ...prevFormData, 
    [name]: value,   
  }));
  if (value.trim() !== "") {
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[name]; 
      return newErrors;
    });
  }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        await axios.post('http://localhost:8080/products', formData);
        onAdd(); 
      } catch (error) {
        console.error('Error adding product:', error);
      }

      setFormData({ name: "", description: "", price: "", image: "" });
      setErrors({});
    }
  };


  return (
    <form onSubmit={handleSubmit} className={styles.formModal}>
      <div>
      <label htmlFor="name" className={styles.label}>Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleInputChange}
          className={styles.inputField}
        />
        {errors.name && <p className={styles.errorMessage}>{errors.name}</p>}
      </div>

      <div>
      <label htmlFor="description" className={styles.label}>Description</label>
        <input
          type="text"
          name="description"
          id="description"
          value={formData.description}
          onChange={handleInputChange}
          className={styles.inputField}
        />
      </div>

      <div>
      <label htmlFor="price" className={styles.label}>Price</label>
        <input
          type="number"
          name="price"
          id="price"
          value={formData.price}
          onChange={handleInputChange}
          className={styles.inputField}
        />
        {errors.price && <p className={styles.errorMessage}>{errors.price}</p>}
      </div>

      <div>
      <label htmlFor="image" className={styles.label}>Image URL</label>
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleInputChange}
          className={styles.inputField}
        />
        {errors.image && <p className={styles.errorMessage}>{errors.image}</p>}
      </div>

      <button type="submit" className={styles.submitButton}>Add Product</button>
    </form>
  );
};

export default AddProductForm;
