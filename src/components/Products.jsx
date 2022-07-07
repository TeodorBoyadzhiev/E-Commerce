import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { categories, popularProducts } from '../data';
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
        console.log(filteredProducts)
    }, [products, cat, filters]);
    // useEffect(() => {
    //     if (filteredProducts) {
    //         if (sort === 'newest') {
    //             setFilteredProducts((prevState) => {
    //                 [...prevState].sort((a, b) => a.createdAt - b.createdAt);
    //             });
    //         } else if (sort === 'asc') {
    //             setFilteredProducts((prevState) => {
    //                 [...prevState].sort((a, b) => a.price - b.price);
    //             });
    //         } else {
    //             setFilteredProducts((prevState) => {
    //                 [...prevState].sort((a, b) => b.price - a.price);
    //             });
    //         }
    //     }
    // }, [sort]);
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


