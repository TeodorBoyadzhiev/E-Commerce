import React, { useState } from 'react';
//components
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import PaymentSection from './PaymentSection';
import CartProducts from './CartProducts';
// MUI
import SimpleAccordion from '../../components/MUI/Accordion';
//state
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { incrProdQuantity, removeProduct } from '../../redux/cartRedux';
//styling
import {
    Container,
    Wrapper,
    Title,
    Bottom,
    LeftSection,
    RightSection,
    AccordionWrapper,
    EmptyWrapper,
    Empty,
    Button
} from './Cart.style';
import Heading from './Heading';

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

    const tokenHandler = (token) => {
        setStripeToken(token);
    }

    return (
        <Container>
            <Navbar />
            <Wrapper>
                <Title>YOUR CART</Title>
                {cart.products.length ?
                    <>
                        <Heading />
                        <Bottom>
                            <LeftSection>
                                <CartProducts cart={cart} deleteProduct={deleteProduct} adjustQuantity={adjustQuantity} />
                                <AccordionWrapper>
                                    <SimpleAccordion />
                                </AccordionWrapper>
                                {/* <LastSeenProductsWrapper>
                            <LastSeenProducts />
                        </LastSeenProductsWrapper> */}
                            </LeftSection>
                            <RightSection>
                                <PaymentSection cart={cart} tokenHandler={tokenHandler} />
                            </RightSection>
                        </Bottom>
                    </>
                    :
                    <EmptyWrapper>
                        <Empty>You have no items in your Cart.</Empty>
                        <Button>Back to shop</Button>
                    </EmptyWrapper>
                }
            </Wrapper>
            <Footer />
        </Container>
    )
}

export default Cart