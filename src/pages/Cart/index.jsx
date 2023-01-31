import React, { useState } from 'react';
//components
import Navbar from '../../components/Navbar';
import Announcement from '../../components/Announcement';
import Footer from '../../components/Footer';
import RemoveButton from '../../components/common/RemoveButton';
// MUI
import { Add, Remove } from '@mui/icons-material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import SimpleAccordion from '../../components/MUI/Accordion';
//state
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { incrProdQuantity, removeProduct } from '../../redux/cartRedux';
//payment
import StripeCheckout from 'react-stripe-checkout';
//styling
import {
    Container,
    Wrapper,
    Title,
    Heading,
    TopButton,
    TopTexts,
    TopText,
    Bottom,
    LeftSection,
    RightSection,
    Info,
    AccordionWrapper,
    Product,
    ProductDetail,
    Image,
    Details,
    ProductName,
    ProductId,
    ProductColor,
    ProductSize,
    PriceDetail,
    ProductAmountContainer,
    ProductAmount,
    ProductPrice,
    Hr,
    Warning,
    NotReserved,
    Summary,
    SummaryTitle,
    SummaryItem,
    SummaryItemText,
    SummaryItemPrice,
    SummaryButton
} from './Cart.style';

const KEY = process.env.REACT_APP_STRIPE;

const Cart = () => {
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();
    
    const [stripeToken, setStripeToken] = useState(null)

    const adjustQuantity = (type, id) => {
        if (type === 'increase') {
            dispatch(incrProdQuantity({ type: 'increase', id }));
        } else if (type === 'decrease') {
            dispatch(incrProdQuantity({ type: 'decrease', id }));
        }
    }
    const deleteProduct = (product) => {
        dispatch(removeProduct(product));
    }

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
                    <LeftSection>
                        <Info>
                            {cart.products.map((product, index) => (<React.Fragment key={index}>
                                <Product key={product.id}>
                                    <ProductDetail>
                                        <Image src={product.img} />
                                        <Details>
                                            <ProductName><b>Product:</b> {product.title}</ProductName>
                                            <ProductId><b>ID:</b> 932131255</ProductId>
                                            <ProductColor color={product.color} />
                                            <ProductSize><b>Size:</b> {product.size}</ProductSize>
                                            <RemoveButton handleClick={() => deleteProduct(product)} />
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
                            <Warning className='warning'>
                                <ErrorOutlineIcon />
                                <NotReserved>PRODUCTS ARE NOT RESERVED</NotReserved>
                            </Warning>
                        </Info>
                        <AccordionWrapper>
                            <SimpleAccordion />
                        </AccordionWrapper>
                    </LeftSection>
                    <RightSection>
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
                    </RightSection>
                </Bottom>
            </Wrapper>
            <Footer />
        </Container>
    )
}

export default Cart