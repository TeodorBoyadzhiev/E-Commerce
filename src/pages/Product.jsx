import React, { useEffect, useState } from 'react';
//api
import axios from 'axios';
//mui
import { Add, Remove } from '@mui/icons-material';
//react hooks
import { useDispatch } from 'react-redux';
//router
import { useLocation } from 'react-router-dom';
//redux
import { addProduct } from '../redux/cartRedux';
//components
import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import SizeColorHOC from '../components/HOC/SizeColorHOC';
//styling
import {
  Container, 
  Wrapper, 
  ImgContainer, 
  Image, 
  InfoContainer, 
  Title, 
  Desc, 
  Price, 
  FilterContainer, 
  Filter, 
  FilterTitle, 
  FilterColor, 
  FilterSizeOption, 
  AddContainer, 
  AmountContainer, 
  Amount, 
  Button
} from './Product.style';


const Product = ({size, color, activeColor, activeSize, colorRef, sizeRef, cls, sls}) => {
  const location = useLocation();
  const id = location.pathname.split('/')[2];
  const [product, setProduct] = useState({ color: [], size: 's' });
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
    const getProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/find/${id}`);
        setProduct(res.data);
      } catch (err) { }
    }
    getProduct();
  }, [id]);

  const handleQuantity = (type) => {
    if (type === 'decrease') {
      quantity > 1 && setQuantity(quantity - 1);
    } else if (type === 'increase') {
      setQuantity(quantity + 1);
    }
  }

  const handleClick = () => {
    dispatch(addProduct({ ...product, color, quantity, size }));
  }
  return (
    <>
      {product &&
        <Container>
          <Announcement />
          <Navbar />
          <Wrapper>
            <ImgContainer>
              <Image src={product.img} />
            </ImgContainer>
            <InfoContainer>
              <Title>{product.title}</Title>
              <Desc>
                {product.desc}
              </Desc>
              <Price>$ {product.price * quantity}</Price>
              <FilterContainer>
                <Filter ref={colorRef}>
                  <FilterTitle>Color: </FilterTitle>
                  {product.color.map((color, index) => {
                    return <FilterColor key={color} className={index === 0 ? 'active' : cls} color={color} onClick={() => activeColor(color, index)} />
                  })}
                </Filter>
                <Filter ref={sizeRef}>
                  <FilterTitle>Size: </FilterTitle>
                  {Object.values(product.size).map((size, index) => {
                    return <FilterSizeOption key={size} className={index === 0 ? 'active' : sls} onClick={() => activeSize(size, index)}>{size.toUpperCase()}</FilterSizeOption>
                  })}
                </Filter>
              </FilterContainer>
              <AddContainer>
                <AmountContainer>
                  <Remove onClick={() => handleQuantity('decrease')} style={{ cursor: "pointer" }} />
                  <Amount>{quantity}</Amount>
                  <Add onClick={() => handleQuantity('increase')} style={{ cursor: "pointer" }} />
                </AmountContainer>
                <Button onClick={handleClick}>ADD TO CART</Button>
              </AddContainer>
            </InfoContainer>
          </Wrapper>
          <Newsletter />
          <Footer />
        </Container>
      }
    </>
  )
}

export default SizeColorHOC(Product)