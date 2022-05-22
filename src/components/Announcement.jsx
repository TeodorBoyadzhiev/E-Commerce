import styled from '@emotion/styled'
import React from 'react'

const Container = styled.div`
    height:30px;
    background-color:teal;
    color:white;
`


export const Announcement = () => {
  return (
    <Container>
        Super Deal!Free Shipping on Orders Over $50
    </Container>
  )
}
