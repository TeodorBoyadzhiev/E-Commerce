import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { categories, popularProducts } from '../data';
import Product from './Product';

const Container = styled.div`
    padding:20px;
    display:flex;
    flex-wrap:wrap;
    justify-content:space-between;
`;
const Products = ({ cat, filters, sort }) => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    console.log(filters)
    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await axios.get(cat
                    ? `http://localhost:5000/api/products?category=${cat}`
                    : "http://localhost:5000/api/products",
                    {
                        id: 1,
                        img: "https://d3o2e4jr3mxnm3.cloudfront.net/Mens-Jake-Guitar-Vintage-Crusher-Tee_68382_1_lg.png"
                    });
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
    return (
        <Container>
            {filteredProducts.map((item) => (
                <Product item={item} key={item.id} />
            ))}
        </Container>
    )
}

export default Products


