import React from "react";
import Header from "../Header/Header";
import Navigation from "./Navigation/Navigation";
import TopProduct from "./TopProduct/TopProduct";
import FilterAllProduct from "../FilterAllProduct/FilterAllProduct";
import ProductSkeleton from "./Product/ProductSkeleton";
import Product from "./Product/Product";
import { useProducts, useTopProducts } from "../../hooks/useProducts";

import styles from "./HomePage.module.scss";

const HomePage = () => {
  const { items, isLoading } = useProducts();
  const { topItems, topIsLoading } = useTopProducts();

  return (
    <div>
      <Header />
      <Navigation />
      {!topIsLoading && <TopProduct items={topItems} />}
      <FilterAllProduct />
      <h2 className={styles.content__title}>All the pizzas</h2>
      <div className={styles.content__items}>
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <ProductSkeleton key={index} />
            ))
          : items.map((obj) => <Product key={obj.id} {...obj} />)}
      </div>
    </div>
  );
};

export default HomePage;
