import React from 'react'
import styled from 'styled-components'
import { categories } from '../data'
import { mobile } from '../responsive';
import CategoryItem from './CategoryItem';


const Container = styled.div`
    display:flex;
    padding: 20px;
    justify-content:space-between;
    ${mobile({ padding: "0px", flexDirection: "column" })};   
`;

const Title = styled.h2`
  font-size: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration-line: underline;
  margin-top: 50px;
`;

const Categories = () => {
  return (
    <>
      <Title>Shop by category</Title>
      <Container>
        {categories.map((item) => (
          <CategoryItem item={item} key={item.id} />
        ))}
      </Container>
    </>
  )
}

export default Categories

