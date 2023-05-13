import React from 'react'
import styled from "styled-components";
function ButtonHeader(nameButton) {
    return (
        <>
        <Container>
        <div className="center">
          <button className="btn">
            <svg width="45px" height="18px" viewBox="0 0 180 60" className="border">
              <polyline points="179,1 179,59 1,59 1,1 179,1" className="bg-line" />
              <polyline points="179,1 179,59 1,59 1,1 179,1" className="hl-line" />
            </svg>
            <span>{nameButton.nameButton}</span>
          </button>
        </div>
      </Container>
      </>
      )
}

const Container = styled.div`
.center {
  width: 45px;
  height: 18px;
  display: flex;
  justify-content: center;
  transform: translate(0, 8%);
  align-items: center;
  position: relative;
}
.btn {
  width: 45px;
  height: 17px;
  cursor: pointer;
  background: transparent;
  border: 0.5px solid #91C9FF;
  border-radius: 0.375rem
  outline: none;
  transition: 1s ease-in-out;
}

svg {
  position: absolute;
  left: 0;
  top: 0;
  fill: none;
  stroke: #fff;
  stroke-dasharray: 150 480;
  stroke-dashoffset: 150;
  transition: 1s ease-in-out;
}

.btn:hover {
  transition: 1s ease-in-out;
  background: #4F95DA;
}

.btn:hover svg {
  stroke-dashoffset: -480;
}

.btn span {
  color: white;
  font-size: 10px;
  font-family: Inter var, sans-serif;
  font-weight: 100;
}

`

export default ButtonHeader