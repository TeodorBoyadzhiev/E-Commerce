import React, { useState } from 'react';
//components
import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';
import Footer from '../components/Footer';
import RemoveButton from '../components/common/RemoveButton';
//styling
import styled from 'styled-components';
import { mobile } from '../responsive';
// MUI
import { Add, Remove } from '@mui/icons-material';
//state
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { incrProdQuantity, removeProduct } from '../redux/cartRedux';
//payment
import StripeCheckout from 'react-stripe-checkout';

const KEY = process.env.REACT_APP_STRIPE;

const Container = styled.div``;
const Wrapper = styled.div`
    padding:20px;
    ${mobile({ padding: "10px" })};   

`;
const Title = styled.h1`
    font-weight:300;
    text-align:center;
`;
const Heading = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-between;
    padding:20px;
`;
const TopButton = styled.button`
    padding:10px;
    font-weight:600;
    cursor:pointer;
    border: ${(props) => props.type === "filled" && "none"};
    background-color:${(props) => props.type === "filled" ? "black" : "transparent"};
    color:${(props) => props.type === "filled" && "white"};
`;
const TopTexts = styled.div`
  ${mobile({ display: "none" })};   

`;
const TopText = styled.span`
    cursor:pointer;
    margin:0px 10px;
`;
const Bottom = styled.div`
    display:flex;
    justify-content:space-between;
    padding: 20px;
    ${mobile({ flexDirection: "column" })};   
`;
const Info = styled.div`
    flex-basis: 60%;
    height: fit-content;
    background-color: white;
    border-radius: 10px;
`;
const Product = styled.div`
    display:flex;
    justify-content:space-between;
    margin-top: 20px;
    ${mobile({ flexDirection: "column" })};   
`;
const ProductDetail = styled.div`
    flex:2;
    display:flex;
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
    background-color:${(props) => props.color};
    cursor:pointer;
`;
const ProductSize = styled.span``;
const PriceDetail = styled.div`
    flex:1;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
`;
const ProductAmountContainer = styled.div`
    display:flex;
    align-items:center;
    margin-bottom:20px;
`;
const ProductAmount = styled.div`
    font-size:24px;
    margin:5px;
    ${mobile({ margin: "5px 15px" })};   

`;
const ProductPrice = styled.div`
    font-size:30px;
    font-weight:200;
    color: green;
    font-weight: bold;
    ${mobile({ marginBottom: "20px" })};   

`;
const Hr = styled.hr`
    background-color: black;
    border:none;
    height:1px;
    width: 30%;
`;
const Summary = styled.div`
    position: sticky;
    top: 20px;
    flex-basis: 30%;
    border-radius: 10px;
    padding:20px;
    height:50vh;
    background-color: white;
`;
const SummaryTitle = styled.h1`
    font-weight:200;
`;
const SummaryItem = styled.div`
    margin:30px 0px;
    display:flex;
    justify-content:space-between;
    font-weight: ${props => props.type === "total" && "500"};
    font-size: ${props => props.type === "total" && "24px"};
`;
const SummaryItemText = styled.span``;
const SummaryItemPrice = styled.span``;
const SummaryButton = styled.button`
    width:100%;
    padding:10px;
    background-color:black;
    color:white;
    cursor:pointer;

`;

const Cart = () => {
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const adjustQuantity = (type, id) => {
        if (type === 'increase') {
            dispatch(incrProdQuantity({ type: 'increase', id }));
        } else if (type === 'decrease') {
            dispatch(incrProdQuantity({ type: 'decrease', id }));
        }
    }
    const deleteProduct = (id) => {
        dispatch(removeProduct(id));
    }

    const [stripeToken, setStripeToken] = useState(null)
    const onToken = (token) => {
        setStripeToken(token);
    }

    return (
        <Container>
            <Navbar />
            <Announcement />
            <Wrapper>
                <Title>YOUR BAG</Title>
                <Heading>
                    <TopButton>CONTINUE SHOPPING</TopButton>
                    <TopTexts>
                        <TopText>Shopping Bag(2)</TopText>
                        <TopText>Your Wishlist(0)</TopText>
                    </TopTexts>
                    <TopButton type="filled">CHECKOUT NOW</TopButton>
                </Heading>
                <Bottom>
                    <Info>
                        {cart.products.map((product, index) => (<React.Fragment key={index}>
                            <Product key={product.id}>
                                <ProductDetail>
                                    <Image src={product.img} />
                                    <Details>
                                        <ProductName><b>Product:</b> {product.title}</ProductName>
                                        <ProductId><b>ID:</b> 932131255</ProductId>
                                        <ProductColor color={product.color} />
                                        <ProductSize><b>Size:</b> {product.size[1] ? product.size[0] : product.size}</ProductSize>
                                        <RemoveButton handleClick={() => deleteProduct(product._id)} />
                                    </Details>
                                </ProductDetail>
                                <PriceDetail>
                                    <ProductAmountContainer>
                                        <Add onClick={() => adjustQuantity('increase', product._id)} style={{ cursor: "pointer" }} />
                                        <ProductAmount>{product.quantity}</ProductAmount>
                                        <Remove onClick={() => adjustQuantity('decrease', product._id)} style={{ cursor: "pointer" }} />
                                    </ProductAmountContainer>
                                    <ProductPrice>$ {product.quantity ? product.price * product.quantity : product.price}</ProductPrice>
                                </PriceDetail>
                            </Product>
                            <Hr />
                        </React.Fragment>
                        ))
                        }
                    </Info>
                    <Summary>
                        <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                        <SummaryItem>
                            <SummaryItemText>Subtotal</SummaryItemText>
                            <SummaryItemPrice>$ {cart.total ? cart.total : 0}</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Estimated Shipping</SummaryItemText>
                            <SummaryItemPrice>$ 5.90</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Shipping Discount</SummaryItemText>
                            <SummaryItemPrice>$ -5.90</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem type="total">
                            <SummaryItemText>Total</SummaryItemText>
                            <SummaryItemPrice>$ {cart.total ? cart.total : 0}</SummaryItemPrice>
                        </SummaryItem>
                        <StripeCheckout
                            name="Tushiba Shop"
                            image="https://avatars.githubusercontent.com/u/1486366?v=4"
                            billingAddress
                            shippingAddress
                            description={`Your total is $${cart.total}`}
                            amount={cart.total * 100}
                            token={onToken}
                            stripeKey={KEY}
                        >
                            <SummaryButton>CHECKOUNT NOW</SummaryButton>
                        </StripeCheckout>
                    </Summary>
                </Bottom>
            </Wrapper>
            <Footer />
        </Container>
    )
}

export default Cart