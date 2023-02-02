//styling
import styled from 'styled-components';
//responsive
import { mobile } from '../../responsive';

const Container = styled.div``;
const Wrapper = styled.div`
    padding:30px;
    ${mobile({ padding: "10px" })};   

`;
const Title = styled.h2`
    display: inline-block;
`;
const TopSection = styled.div`
    display:flex;
    align-items:center;
    justify-content:flex-end;
    margin-right: 80px;
`;
const TopButton = styled.button`
    padding:10px;
    font-weight:600;
    cursor:pointer;
    border: filled;
    background-color:transparent;
`;
const TopTexts = styled.div`
  ${mobile({ display: "none" })};   

`;
const TopText = styled.span`
    cursor:pointer;
    margin:0px 10px;
`;
const Bottom = styled.div`
    display:flex;
    gap: 150px;
    padding: 20px;
    ${mobile({ flexDirection: "column" })};   
`;
const LeftSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 50px;
`;
const RightSection = styled.div`  
`;
const Info = styled.div`
    height: fit-content;
    background-color: white;
    border-radius: 10px;
`;
const AccordionWrapper = styled.div`
`;
const LastSeenProductsWrapper = styled.div``;
const Product = styled.div`
    display:flex;
    justify-content:space-between;
    margin-top: 20px;
    ${mobile({ flexDirection: "column" })};   
`;
const ProductDetail = styled.div`
    flex:2;
    display:flex;
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
    background-color:${(props) => props.color};
    cursor:pointer;
`;
const ProductSize = styled.span``;
const PriceDetail = styled.div`
    flex:1;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
`;
const ProductAmountContainer = styled.div`
    display:flex;
    align-items:center;
    margin-bottom:20px;
`;
const ProductAmount = styled.div`
    font-size:24px;
    margin:5px;
    ${mobile({ margin: "5px 15px" })};   

`;
const ProductPrice = styled.div`
    font-size:30px;
    font-weight:200;
    color: green;
    font-weight: bold;
    ${mobile({ marginBottom: "20px" })};   

`;
const Hr = styled.hr`
    background-color: black;
    border:none;
    height:1px;
    width: 30%;
`;
const Warning = styled.div`
    display: flex;
    padding: 10px;
`;
const NotReserved = styled.div`
    margin-left: 5px;
`;
const Summary = styled.div`
    position: sticky;
    top: 20px;
    border-radius: 10px;
    padding:20px;
    height: fit-content;
    background-color: white;
    flex-basis: 30%;
`;
const SummaryTitle = styled.h1`
    font-weight:200;
    margin-top: 0;
`;
const SummaryItem = styled.div`
    margin:30px 0px;
    display:flex;
    justify-content:space-between;
    font-weight: ${props => props.type === "total" && "500"};
    font-size: ${props => props.type === "total" && "24px"};
`;
const SummaryItemText = styled.span``;
const SummaryItemPrice = styled.span``;
const SummaryButton = styled.button`
    width:100%;
    padding:10px;
    background-color:black;
    color:white;
    cursor:pointer;

`;
const EmptyWrapper = styled.div`
    padding: 100px 0;
    display:flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;
const Empty = styled.span`
    font-weight: 700;
    font-size: 20px;
    margin-bottom: 20px;
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
    TopSection,
    TopButton,
    TopTexts,
    TopText,
    Bottom,
    LeftSection,
    RightSection,
    Info,
    AccordionWrapper,
    LastSeenProductsWrapper,
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
    Summary,
    SummaryTitle,
    SummaryItem,
    SummaryItemText,
    SummaryItemPrice,
    SummaryButton,
    EmptyWrapper,
    Empty,
    Button
}
