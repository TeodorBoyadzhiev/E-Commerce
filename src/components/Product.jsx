import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";

// styles
import styled from 'styled-components';

//material-ui
import { FavoriteBorderOutlined, SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material';

//redux
import { addProduct } from '../redux/cartRedux';
import { addProductWishlist } from '../redux/wishlistRedux';

const Info = styled.div`
    opacity:0;
    width:100%;
    height:100%;
    position:absolute;
    top:0;
    left:0;
    background-color:rgba(0,0,0,0.2);
    z-index:3;
    display:flex;
    align-items:center;
    justify-content:center;
    transition:all 0.5s ease;
    cursor:pointer;

`;
const Container = styled.div`
    flex:1;
    margin:5px;
    min-width:280px;
    height:350px;
    display:flex;
    align-items:center;
    justify-content:center;
    background-color:#f5fbfd;
    position:relative;

    &:hover ${Info} {
        opacity:1;
    }
`;
const Circle = styled.div`
    width:200px;
    height:200px;
    border-radius:50%;
    background-color:white;
    position:absolute;
`;
const Image = styled.img`
    height:75%;
    z-index:2;
`;
const Icon = styled.div`
    width:40px;
    height:40px;
    border-radius:50%;
    background-color:white;
    display:flex;
    align-items:center;
    justify-content:center;
    margin:10px;
    transition:all 0.5s ease;

    &:hover{
        background-color:#e9f5f5;
        transform:scale(1.1);
        cursor:pointer;
    }
`;

const Product = ({ item, addToStorage }) => {
    const dispatch = useDispatch();

    const addToCart = () => {
        dispatch(addProduct({ ...item, quantity: 1, color: item.color[0], size: item.size[0] }));
    }

    const addToWishlist = () => {
        dispatch(addProductWishlist({ ...item }))
    }
    return (
        <Container>
            <Circle />
            <Image src={item.img} />
            <Info>
                <Icon>
                    <ShoppingCartOutlined onClick={addToCart} />
                </Icon>
                <Icon>
                    <Link to={`/product/${item._id}`} onClick={() => addToStorage(item)}>
                        <SearchOutlined style={{color: "black"}}/>
                    </Link>
                </Icon>
                <Icon>
                    <FavoriteBorderOutlined onClick={addToWishlist} />
                </Icon>
            </Info>
        </Container>
    )
}

export default Product
