import React from 'react'

const Wind = ({speed,deg,gust}) => {
  return (
    <>
    <span className='flex justify-between'>
        <p>Wind Speed</p>
        <p>{speed}m/s</p>
    </span>
     <span className='flex justify-between'>
        <p>Wind degree</p>
        <p>{deg}&deg;</p>
    </span>


    </>
  )
}

export default Wind