//styling
import styled from 'styled-components';
//responsive
import { mobile } from '../responsive';

export const Container = styled.div``;
export const Wrapper = styled.div`
  padding:50px;
  display:flex;
  ${mobile({ padding: "10px", flexDirection: "column" })};   

`;
export const ImgContainer = styled.div`
  flex:1;
`;
export const Image = styled.img`
  width:100%;
  height:90vh;
  object-fit:cover;
  ${mobile({ height: "40%" })};   

`;
export const InfoContainer = styled.div`
  flex:1;
  padding:0px 50px;
  ${mobile({ padding: "10px" })};   

`;
export const Title = styled.h1`
  font-weight:200;
`;
export const Desc = styled.p`
  margin:20px 0px;
`;
export const Price = styled.span`
  font-weight:100;
  font-size:40px;
`;
export const FilterContainer = styled.div`
  display:flex;
  justify-content:space-between;
  flex-wrap: wrap;
  gap: 20px;
  width:50%;
  margin:30px 0px;
  ${mobile({ width: "100%" })};   

`;
export const Filter = styled.div`
  display:flex;
  align-items:center;
  gap: 7px;
`;
export const FilterTitle = styled.span`
  font-size:20px;
  font-weight:200;
`;
export const FilterColor = styled.div`
  width:20px;
  height:20px;
  background-color: ${props => props.color};
  cursor:pointer;
  &.active {
    border:${props => props.color === 'black' ? '2px solid gray' : '2px solid black'};
    padding: 2px;
  };
`;
export const FilterSizeOption = styled.div`
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
export const AddContainer = styled.div`
  width:50%;
  margin-top:100px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  ${mobile({ width: "100%" })};   

`;
export const AmountContainer = styled.div`
  display:flex;
  align-items:center;
  font-weight:700;
`;
export const Amount = styled.span`
  width:30px;
  height:30px;
  border-radius:10px;
  border:1px solid teal;
  display:flex;
  align-items:center;
  justify-content:center;
  margin:0 5px;
`;
export const Button = styled.button`
  padding:15px;
  border:1.5px solid teal;
  background-color:white;
  cursor:pointer;
  font-weight:500;

  &:hover{
    background-color:#f8f4f4;
  }
`;