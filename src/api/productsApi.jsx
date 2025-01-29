import axios from "axios";

const API_URL = "http://127.0.0.1:5000/api/";

export const fetchProducts = async (categoryId, sortBy, order) => {
  try {
    const categoryQuery = categoryId !== 0 ? `category=${categoryId}` : "";
    const sortQuery = sortBy ? `sortBy=${sortBy}&order=${order}` : "";

    const queryString = [categoryQuery, sortQuery].filter(Boolean).join("&");

    const { data } = await axios.get(`${API_URL}get_products?${queryString}`);
    return data;
  } catch (error) {
    console.error("Ошибка загрузки товаров:", error);
    throw error;
  }
};

export const fetchTopProducts = async () => {
  try {
    const { data } = await axios.get(`${API_URL}get_top_products`);
    return data;
  } catch (error) {
    console.error("Ошибка загрузки данных:", error);
    throw error;
  }
};
