import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { fetchProducts, fetchTopProducts } from "../api/productsApi";

export const useProducts = () => {
  const categoriesId = useSelector((state) => state.filter.categoriesId);
  const sortId = useSelector((state) => state.sort.sortId);
  const sortOptions = useSelector((state) => state.sort.sortOptions);

  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState([]);

  const loadProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      const { sortBy, order } = sortOptions[sortId] || {};
      const data = await fetchProducts(categoriesId, sortBy, order);
      setItems(data);
    } catch (error) {
      console.error("Ошибка загрузки данных:", error);
    } finally {
      setIsLoading(false);
    }
  }, [categoriesId, sortId, sortOptions]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return { items, isLoading };
};

export const useTopProducts = () => {
  const [topIsLoading, setTopIsLoading] = useState(true);
  const [topItems, setTopItems] = useState([]);

  const loadTopProducts = useCallback(async () => {
    try {
      setTopIsLoading(true);
      const data = await fetchTopProducts();
      setTopItems(data);
    } catch (error) {
      console.error("Ошибка загрузки данных:", error);
    } finally {
      setTopIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTopProducts();
  }, [loadTopProducts]);

  return { topItems, topIsLoading };
};
