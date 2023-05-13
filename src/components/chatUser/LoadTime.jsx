import React from 'react'
import styled from 'styled-components'

function LoadTime({time, show, id}) {
  return (
    // <div className= {` absolute hidden bg-white p-5 border border-gray-300 rounded-md shadow-md z-50 left-[-100px] ${show? 'block' : 'none'} `}>LoadTime</div>
    <div>
        {show === id && <div> abc</div>}
    </div>
  )
}

const Container = styled.div`

`

export default LoadTime