import React from 'react';
//components
import RemoveButton from '../../components/common/RemoveButton';
// MUI
import { Add, Remove } from '@mui/icons-material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
//styling
import {
    Info,
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
} from './Cart.style';

const CartProducts = ({ cart, deleteProduct, adjustQuantity }) => {
    return (
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
    )
}

export default CartProducts