import React, { useEffect, useState } from 'react';
//api
import axios from 'axios';
//styling
import styled from 'styled-components';
// import { categories, popularProducts } from '../data';
//components
import Product from './Product';

const Container = styled.div`
    padding:30px;
    display:flex;
    flex-wrap:wrap;
    justify-content:space-between;
`;
const Products = ({ cat, filters, sort }) => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
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
    return (
        <Container>
            {cat ? filteredProducts.map((item) => (
                <Product item={item} key={item._id} />
            )) : products
                .slice(0, 8)
                .map((item) => (
                    <Product item={item} key={item._id} />
                ))}
        </Container>
    )
}

export default Products


