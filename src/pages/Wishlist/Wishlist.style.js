//style
import styled from 'styled-components';
//responsive
import { mobile } from '../../responsive';

const Container = styled.div`
    height:100%;
    width: 100%;
`;
const Wrapper = styled.div`
    padding: 20px;
`;
const Title = styled.h2``;
const Products = styled.div``;
const Product = styled.div`
    display:flex;
    justify-content:flex-start;
    margin-top: 20px;
    ${mobile({ flexDirection: "column" })};
`;
const Image = styled.img`
    width:200px;
`;
const Details = styled.div`
    padding:20px;
    display:flex;
    flex-direction:column;
    justify-content:space-around;
`;
const ProductName = styled.span``;
const ProductId = styled.span``;
const ProductColor = styled.div`
    width:20px;
    height:20px;
    border-radius:50%;
    background-color:${(props) => props.color};
    cursor:pointer;
`;
const ProductSize = styled.span``;
const EmptyWrapper = styled.div`
    height: 70vh;
    display:flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;
const Empty = styled.span`
    font-weight: 400;
`;
const Button = styled.button`
    margin-top: 20px;
    padding: 15px;
    background-color:black;
    color:white;
    cursor:pointer;
`;

export {
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
}