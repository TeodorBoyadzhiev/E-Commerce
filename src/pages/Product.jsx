import React, { useEffect, useState } from 'react';
//api
import axios from 'axios';
//styling
import styled from 'styled-components';
//responsive
import { mobile } from '../responsive';
//mui
import { Add, Remove } from '@mui/icons-material';
//react hooks
import { useDispatch } from 'react-redux';
import { useRef } from 'react';
//router
import { useLocation } from 'react-router-dom';
//redux
import { addProduct } from '../redux/cartRedux';
//components
import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';

const Container = styled.div``;
const Wrapper = styled.div`
  padding:50px;
  display:flex;
  ${mobile({ padding: "10px", flexDirection: "column" })};   

`;
const ImgContainer = styled.div`
  flex:1;
`;
const Image = styled.img`
  width:100%;
  height:90vh;
  object-fit:cover;
  ${mobile({ height: "40%" })};   

`;
const InfoContainer = styled.div`
  flex:1;
  padding:0px 50px;
  ${mobile({ padding: "10px" })};   

`;
const Title = styled.h1`
  font-weight:200;
`;
const Desc = styled.p`
  margin:20px 0px;
`;
const Price = styled.span`
  font-weight:100;
  font-size:40px;
`;
const FilterContainer = styled.div`
  display:flex;
  justify-content:space-between;
  flex-wrap: wrap;
  gap: 20px;
  width:50%;
  margin:30px 0px;
  ${mobile({ width: "100%" })};   

`;
const Filter = styled.div`
  display:flex;
  align-items:center;
  gap: 7px;
`;
const FilterTitle = styled.span`
  font-size:20px;
  font-weight:200;
`;
const FilterColor = styled.div`
  width:20px;
  height:20px;
  border-radius:50%;
  background-color: ${props => props.color};
  cursor:pointer;
  &.active {
    border:${props => props.color === 'black' ? '2px solid gray' : '2px solid black'};
    padding: 2px;
  };
`;
const FilterSizeOption = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 50px;
  background: white;
  box-sizing: border-box;
  &:hover {
    border: 1px solid black;
    cursor: pointer;
  }
  &.active {
    border: 1px solid black;
    background: papayawhip;
  }
`;
const AddContainer = styled.div`
  width:50%;
  margin-top:100px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  ${mobile({ width: "100%" })};   

`;
const AmountContainer = styled.div`
  display:flex;
  align-items:center;
  font-weight:700;
`;
const Amount = styled.span`
  width:30px;
  height:30px;
  border-radius:10px;
  border:1px solid teal;
  display:flex;
  align-items:center;
  justify-content:center;
  margin:0 5px;
`;
const Button = styled.button`
  padding:15px;
  border:1.5px solid teal;
  background-color:white;
  cursor:pointer;
  font-weight:500;

  &:hover{
    background-color:#f8f4f4;
  }
`;


const Product = () => {
  const location = useLocation();
  const id = location.pathname.split('/')[2];
  const [product, setProduct] = useState({ color: [], size: 's' });
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState(product.color[0]);
  const [size, setSize] = useState(product.size[0]);
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

  const colorRef = useRef();
  let cls = ' ';
  const activeColor = (color, index) => {
    const colors = colorRef.current.children;
    for (let i = 1; i < colors.length; i += 1) {
      colors[i].className = '' + colors[i].className.replace('active', '');
      cls = ' ';
    }
    colors[index + 1].className += 'active';
    cls = colors[index + 1].className;
    setColor(color);
  }

  const sizeRef = useRef();
  let sls = ' ';
  const activeSize = (size, index) => {
    const sizes = sizeRef.current.children;
    for (let i = 1; i < sizes.length; i += 1) {
      sizes[i].className = '' + sizes[i].className.replace('active', '');
      sls = ' ';
    }
    sizes[index + 1].className += 'active';
    sls = sizes[index + 1].className;
    setSize(size.toUpperCase());
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

export default Product