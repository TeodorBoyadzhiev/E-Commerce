import React from 'react'
import styled from 'styled-components'
import { useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from '@mui/icons-material';

const Button = styled.button`
    background-color: white;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: black;
    position: absolute;
    bottom:50%;
    left:-200px;
    padding: 15px;
    border: none;
    font-size: inherit;
    border: 1px solid white;

    &:hover{
        cursor: pointer;
        border: 1px solid gray;
    }
`;


const BackButton = () => {
    const navigate = useNavigate();
    return (
        <Button onClick={() => navigate(-1)}>
            <ArrowLeftOutlined />Back
        </Button>
    )
}

export default BackButton