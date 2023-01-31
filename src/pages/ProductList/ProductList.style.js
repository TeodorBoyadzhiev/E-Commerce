//styling
import styled from "styled-components";
//responsive
import { mobile } from '../../responsive';


const Container = styled.div`
`;
const Title = styled.h1`
    margin:20px;
`;
const FilterContainer = styled.div`
    display:flex;
    justify-content:space-between;
`;
const Filter = styled.div`
    margin:20px;
    ${mobile({ margin: "0px 20px", display: "flex", flexDirection: "column" })};   
    
`;
const FilterText = styled.span`
    font-size:20px;
    font-weight:600;
    margin-right:20px;
    ${mobile({ marginRight: "0px" })};   

`;
const Select = styled.select`
    padding:10px;
    margin-right:20px;
    background-color: rgb(244, 244, 245);
    cursor: pointer;
    border: none;
    border-radius: 50%;
    :hover {
        background-color: rgb(219, 219, 220);
    }
    ${mobile({ margin: "10px 0px" })};   

`;
const Option = styled.option`
    background-color: white;
`;

export {
    Container,
    Title,
    FilterContainer,
    Filter,
    FilterText,
    Select,
    Option
}