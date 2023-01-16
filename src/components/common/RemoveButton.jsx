import React from 'react'
import styled from 'styled-components';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

const RemoveProduct = styled.button`
    display:flex;
    align-items:center;
    padding:0;
    margin-top:30px;   
    cursor:pointer;
    border:none;
    background-color:transparent;
    color:black;
`;

const RemoveButton = ({handleClick}) => {
  return (
    <RemoveProduct onClick={handleClick}><DeleteOutlinedIcon />Remove</RemoveProduct>
  )
}

export default RemoveButton