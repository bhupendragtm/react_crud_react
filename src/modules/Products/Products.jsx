import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';

import { getAllProducts } from 'shared/services/products-api';

import { setFilter } from 'redux/filter/filter-slice';
import { getFilter } from 'redux/filter/filter-selectors';
import { fetchDeleteProduct } from 'redux/products/products-operations';

import ProductList from './ProductList/ProductList';
import ProductsSearch from './ProductsSearch/ProductsSearch';

import styles from './Products.module.scss';

const Products = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
        setLoading(true);
        const data = await getAllProducts();
        setItems(data.products);
    };
    fetchProducts();
  }, [setLoading, loading]);

  const filter = useSelector(getFilter);
  const handleFilter = ({ target }) => dispatch(setFilter(target.value));

  const dispatch = useDispatch();

  const onDeleteProduct = id => {
    const action = fetchDeleteProduct(id);
    dispatch(action);
  }


  return (
    <div className={styles.mainWrapper}>
      <ProductsSearch value={filter} handleChange={handleFilter} />
      <ProductList deleteProduct={onDeleteProduct} products={items} />
    </div>
  );
};
export default Products;
