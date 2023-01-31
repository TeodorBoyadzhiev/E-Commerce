//styling
import styled from 'styled-components';
//responsive
import { mobile } from '../../responsive';

const Container = styled.div`
width:100vw;
height:100vh;
background: linear-gradient(
  rgba(255,255,255,0.5), 
  rgba(255,255,255,0.5)
), 
url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940") 
center;
background-size:cover;
display:flex;
align-items:center;
justify-content:center;
`;
const Wrapper = styled.div`
position: relative;
width:25%;
padding:40px 20px 20px 30px;
background-color:white;
border-radius: 40px 0px;
${mobile({ width: "75%" })};   

`;
const Title = styled.h1`
position: absolute;
top: -37px;
font-size:24px;
font-weight:300;
`;
const Form = styled.form`
display:flex;
flex-direction:column;
align-items: center;
justify-content: center;
`;
const InputField = styled.div`
display: flex;
flex-wrap: wrap;
flex-direction: column;
position: relative;
flex-basis: 37%;
margin: 0px 10px 20px 0px;
`;
const Input = styled.input`
min-width:40%;
padding: 10px 40px 10px 10px;
height: fit-content;
border: ${props => props.hasError && '2px solid red'};
outline: ${props => props.hasError && 'red'};
&:focus + Label,
&:valid + Label {
  transform: translate(5px, -7px);
  color: ${props => props.hasError ? 'red' : 'black'};
  font-size: 0.75em;
  background-color: white;
  transition: 0.2s ease-in-out;
}
`;
const Label = styled.label`
position: absolute;
cursor: text;
transform: translate(11px, 3px);
color: rgb(155, 155, 155);
transition: 0.2s ease-in-out;
`;
const Recaptcha = styled.div`
margin: 20px;
display: ${props => props.showRecaptcha ? 'block' : 'none'};
`;
const Button = styled.button`
width:40%;
border:none;
padding:15px 20px;
background-color:teal;
color:white;
cursor:pointer;
margin-bottom:10px;
&:disabled{
  color:green;
  cursor:not-allowed;
}
`;
const Error = styled.span`
color:red;
`;

const LinkStyles = {
    margin: '5px 0px',
    fontSize: '12px',
    textDecoration: 'none',
    color: 'rgb(155,155,155)',
    cursor: 'pointer'
};

export {
    Container,
    Wrapper,
    Title,
    Form,
    InputField,
    Input,
    Label,
    Recaptcha,
    Button,
    Error,
    LinkStyles
}