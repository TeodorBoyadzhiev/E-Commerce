import React, { useEffect, useState } from 'react';
//api
import axios from 'axios';
//styling
import styled from 'styled-components';
//components
import Product from './Product';
//utils
import { addToLocalStorageLastSeenProducts } from '../utils/productHelper';
//state
import { useDispatch } from 'react-redux';
import { addLastSeenProducts } from '../redux/cartRedux';

const Container = styled.div`
    padding:30px;
    display:flex;
    flex-wrap:wrap;
    justify-content:space-between;
`;

const Products = ({ cat, filters, sort }) => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await axios.get(cat
                    ? `http://localhost:5000/api/products?category=${cat}`
                    : "http://localhost:5000/api/products",
                );
                setProducts(res.data);
            } catch (err) {
                console.log(err.message)
            }
        }
        getProducts();
    }, [cat]);

    useEffect(() => {
        cat && setFilteredProducts(
            products.filter((item) =>
                Object.entries(filters).every(([key, value]) =>
                    item[key].includes(value)
                )
            )
        );
    }, [products, cat, filters, sort]);

    useEffect(() => {
        if (sort === 'newest') {
            setFilteredProducts((prevState) => {
                return prevState.length > 0 ? prevState.sort((a, b) => a.createdAt - b.createdAt) : [];
            });
        } else if (sort === 'asc') {
            setFilteredProducts((prevState) => {
                return prevState.length > 0 ? prevState.sort((a, b) => a.price - b.price) : [];
            });
        } else if (sort === 'desc') {
            setFilteredProducts((prevState) => {
                return prevState.length > 0 ? prevState.sort((a, b) => b.price - a.price) : [];
            });
        }
    }, [filters, sort]);

    const handleAddToStorage = (item) => {
        dispatch(addLastSeenProducts(item));
        addToLocalStorageLastSeenProducts(item);
    }

    return (
        <Container>
            {cat ? filteredProducts.map((item) => (
                <Product item={item} key={item._id} addToStorage={handleAddToStorage} />
            )) : products
                .slice(0, 8)
                .map((item) => (
                    <Product item={item} key={item._id} addToStorage={handleAddToStorage} />
                ))}
        </Container>
    )
}

export default Products


