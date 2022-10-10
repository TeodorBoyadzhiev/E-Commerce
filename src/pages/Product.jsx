import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import { Add, Remove } from '@mui/icons-material';
import { mobile } from '../responsive';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { addProduct } from '../redux/cartRedux';
import { useDispatch } from 'react-redux';
import { useRef } from 'react';

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
  width:50%;
  margin:30px 0px;
  display:flex;
  justify-content:space-between;
  ${mobile({ width: "100%" })};   

`;
const Filter = styled.div`
  display:flex;
  align-items:center;
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
  margin:0px 5px;
  cursor:pointer;
  &.active {
    border:${props => props.color === 'black' ? '2px solid gray' : '2px solid black'};
    padding: 2px;
  };
`;
const FilterSize = styled.select`
  margin-left:10px;
  padding:5px;
`;
const FilterSizeOption = styled.option``;
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
  const [product, setProduct] = useState({ color: ['blue'], size: 's' });
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

  const ref = useRef();
  let cls = ' ';
  const activeColor = (color, index) => {
    const colors = ref.current.children;
    for (let i = 0; i < colors.length; i += 1) {
      colors[i].className = '' + colors[i].className.replace('active', '');
      cls = ' ';
    }
    colors[index + 1].className += 'active';
    cls = colors[index + 1].className;
    setColor(color);
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
                <Filter ref={ref}>
                  <FilterTitle>Color</FilterTitle>
                  {product.color.map((color, index) => {
                    return <FilterColor className={cls} color={color} key={index} onClick={() => activeColor(color, index)} />
                  })}
                </Filter>
                <Filter>
                  <FilterTitle>Size</FilterTitle>
                  <FilterSize onChange={(e) => setSize(e.target.value)}>
                    {Object.values(product.size).map((size) => {
                      return <FilterSizeOption>{size}</FilterSizeOption>
                    })}
                  </FilterSize>
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