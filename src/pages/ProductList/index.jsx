import React, { useEffect } from 'react';
//components
import Navbar from '../../components/Navbar';
import Announcement from '../../components/Announcement';
import Products from '../../components/Products';
import Newsletter from '../../components/Newsletter';
import Footer from '../../components/Footer';
//hooks
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

const ProductList = () => {
    const [filters, setFilters] = useState({});
    const [sort, setSort] = useState('newest');
    const location = useLocation();
    
    const cat = location.pathname.split('/')[2];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleFilters = (e) => {
        const value = e.target.value;
        setFilters({
            ...filters,
            [e.target.name]: value
        });
    }

    return (
        <Container>
            <Navbar />
            <Announcement />
            <Title>{cat}</Title>
            <FilterContainer>
                <Filter>
                    <FilterText>Filter Products:</FilterText>
                    <Select name="color" onChange={handleFilters}>
                        <Option disabled>
                            Color
                        </Option>
                        <Option>white</Option>
                        <Option>black</Option>
                        <Option>red</Option>
                        <Option>blue</Option>
                        <Option>yellow</Option>
                        <Option>green</Option>
                    </Select>
                    <Select name="size" onChange={handleFilters}>
                        <Option disabled>
                            Size
                        </Option>
                        <Option>xs</Option>
                        <Option>s</Option>
                        <Option>m</Option>
                        <Option>l</Option>
                        <Option>xl</Option>
                    </Select>
                </Filter>
                <Filter>
                    <FilterText>Sort Products:</FilterText>
                    <Select onChange={(e) => setSort(e.target.value)}>
                        <Option value="newest">Newest</Option>
                        <Option value="asc">Price (asc)</Option>
                        <Option value="desc">Price (desc)</Option>
                    </Select>
                </Filter>
            </FilterContainer>
            <Products cat={cat} filters={filters} sort={sort} />
            <Newsletter />
            <Footer />
        </Container>
    )
}


export default ProductList
