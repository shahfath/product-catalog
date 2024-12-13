"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/ProductList.module.css';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/products');
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/products/${id}`);
      setProducts(products.filter(product => product.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <>
      <input
        type="text"
        placeholder="Search Products"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className={styles["search-field"]}
      />
      
      {filteredProducts.length == 0 ? (        
        <div className={styles["no-products-container"]}>
          <p>No products found.</p>
        </div>
      ): (
        <div className={styles["product-list"]}>
        {filteredProducts.map((product) => (
            <div key={product.id} className={styles["product-card"]}>
              {product.image && (
                <img
                  src={product.image}
                  alt={product.name}
                  className={styles["product-image"]}
                />
              )}
              <div style={{ flexGrow: 1 }}>
                <h3>{product.name}</h3>
                <p className={styles["product-price"]}>${product.price}</p>
                <p className={styles["product-description"]}>{product.description}</p>
              </div>
              <button onClick={() => handleDelete(product.id)}>Delete</button>
            </div>))}
        </div>
      )}
    </>
  );
};

export default ProductList;
