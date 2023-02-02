import React from 'react'
//payment
import StripeCheckout from 'react-stripe-checkout';
//styling
import {
    Summary,
    SummaryTitle,
    SummaryItem,
    SummaryItemText,
    SummaryItemPrice,
    SummaryButton
} from './Cart.style';

const KEY = process.env.REACT_APP_STRIPE;

const PaymentSection = ({cart, tokenHandler}) => {
    return (
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
                token={tokenHandler}
                stripeKey={KEY}
            >
                <SummaryButton>CHECKOUNT NOW</SummaryButton>
            </StripeCheckout>
        </Summary>
    )
}

export default PaymentSection