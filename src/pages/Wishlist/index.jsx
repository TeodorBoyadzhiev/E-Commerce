import React from 'react';
//redux
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
//state
import { removeProduct } from '../../redux/wishlistRedux';
//components
import Announcement from '../../components/Announcement';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import Newsletter from '../../components/Newsletter';
import RemoveButton from '../../components/common/RemoveButton';
//material-ui
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
//styling
import {
    Container,
    Wrapper,
    Title,
    Products,
    Product,
    Image,
    Details,
    ProductName,
    ProductId,
    ProductColor,
    ProductSize,
    EmptyWrapper,
    Empty,
    Button
} from './Wishlist.style';

const Wishlist = () => {
    const wishlist = useSelector(state => state.wishlist);
    const dispatch = useDispatch();

    const deleteProduct = (id) => {
        dispatch(removeProduct(id));
    }

    return (
        <Container>
            <Navbar />
            <Announcement />
            <Wrapper>
                <Title>Wishlist</Title>
                <Products>
                    {
                        wishlist.products.length ?
                            wishlist.products.map((product, index) => (
                                <Product key={index}>
                                    <Image src={product.img} />
                                    <Details>
                                        <ProductName><b>Product:</b> {product.title}</ProductName>
                                        <ProductId><b>ID:</b> 932131255</ProductId>
                                        <ProductColor color={product.color[1] ? product.color[0] : product.color} />
                                        <ProductSize><b>Size:</b> {product.size[1] ? product.size.join(', ') : product.size}</ProductSize>
                                        <RemoveButton handleClick={() => deleteProduct(product._id)} />
                                    </Details>
                                </Product>
                            )) :
                            (<EmptyWrapper>
                                <HeartBrokenIcon style={{ width: '60px', height: '60px', marginBottom: '20px' }} />
                                <Empty>You have no items on your wishlist.</Empty>
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