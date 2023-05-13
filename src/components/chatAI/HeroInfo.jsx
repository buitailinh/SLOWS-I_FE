import React from 'react'
import styled from 'styled-components'


function HeroInfo({ info }) {
  return (
    <Container>
    <div className="hero-info-container">
      <p className="hero-info-text">{info}</p>
    </div>
    </Container>
  )
}

const Container = styled.div`
.hero-info-container {
    border: 1px solid hsla(0, 0%, 100%, 0.05);
    border-radius: 10px;
    background-color: hsla(0, 0%, 100%, 0.05);
    margin-bottom: 10px;
    max-width: 250px;
  }
  
  .hero-info-text {
    padding-left: 10px;
    padding-right: 10px;
    font-size: 0.9em;
  }
  
  @media (min-width: 1024px) {
    .hero-info-container {
      margin: 8px;
    }
  }

`

export default HeroInfo