import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Announcement from '../components/Announcement';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Newsletter from '../components/Newsletter';
//material-ui
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
//responsive
import { mobile } from '../responsive';

const Container = styled.div`
    height:100%;
    width: 100%;
`;

const Wrapper = styled.div`
    padding: 20px;
`;
const Title = styled.h2``;
const Products = styled.div``;
const Product = styled.div`
    display:flex;
    justify-content:flex-start;
    margin-top: 20px;
    ${mobile({ flexDirection: "column" })};   
`;
const Image = styled.img`
    width:200px;
`;
const Details = styled.div`
    padding:20px;
    display:flex;
    flex-direction:column;
    justify-content:space-around;
`;
const ProductName = styled.span``;
const ProductId = styled.span``;
const ProductColor = styled.div`
    width:20px;
    height:20px;
    border-radius:50%;
    background-color:${(props) => props.color};
    cursor:pointer;
`;
const ProductSize = styled.span``;
const EmptyWrapper = styled.div`
    height: 70vh;
    display:flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;
const Empty = styled.span`
    font-weight: 400;
`;
const Button = styled.button`
    margin-top: 20px;
    padding: 15px;
    background-color:black;
    color:white;
    cursor:pointer;

`;



const Wishlist = () => {
    const wishlist = useSelector(state => state.wishlist);
    return (
        <Container>
            <Navbar />
            <Announcement />
            <Wrapper>
                <Title>Wishlist</Title>
                <Products>
                    {
                        wishlist.products.length ?
                            wishlist.products.map((product) => (
                                <Product key={product.id}>
                                    <Image src={product.img} />
                                    <Details>
                                        <ProductName><b>Product:</b> {product.title}</ProductName>
                                        <ProductId><b>ID:</b> 932131255</ProductId>
                                        <ProductColor color={product.color[1] ? product.color[0] : product.color} />
                                        <ProductSize><b>Size:</b> {product.size[1] ? product.size.join(', ') : product.size}</ProductSize>
                                    </Details>
                                </Product>
                            )) :
                            (<EmptyWrapper>
                                <HeartBrokenIcon style={{ width: '60px', height: '60px', marginBottom: '20px' }} />
                                <Empty>You have no items on your wish list.</Empty>
                                <Button>Back to shop</Button>
                            </EmptyWrapper>
                            )
                    }
                </Products>
            </Wrapper>
            <Newsletter />
            <Footer />
        </Container>
    )
}

export default Wishlist