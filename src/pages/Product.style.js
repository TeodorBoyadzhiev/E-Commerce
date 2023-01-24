//styling
import styled from 'styled-components';
//responsive
import { mobile } from '../responsive';

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

export {
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
}