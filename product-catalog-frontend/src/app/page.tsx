'use client';
import React, { useState } from 'react';
import ProductList from '../components/ProductList';
import AddProductForm from '../components/AddProductForm';
import styles from "../styles/PageLayout.module.css";

const Home = () => {
  const [refresh, setRefresh] = useState(false);

  const handleAddProduct = () => {
    setRefresh(!refresh); 
  };

  return (
    <div>

      <div className={styles.bannerContainer}>
        <img src="/images/banner.jpg" alt="Banner" className={styles.bannerImage}/>
        <h1 className={styles.bannerHeading}>PRODUCT CATALOG</h1>
      </div>

      <div className={styles.container}>

        <div className={styles.productListContainer}>
          <h2 className={styles.formListHeading}>Product List</h2>
          <ProductList key={refresh ? "refresh" : "initial"} />
        </div>

        <div className={styles.formContainer}>
          <h2 className={styles.formListHeading}>Add Product</h2>
          <AddProductForm onAdd={handleAddProduct} />
        </div>

      </div>

    </div>
  );
};

export default Home;
