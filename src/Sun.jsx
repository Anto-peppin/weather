import React from 'react'
import { IoSunny } from "react-icons/io5";

const Sun = ({rise,set,time,data}) => {
const localOffset = new Date().getTimezoneOffset() * 60;
const sunRise = new Date(
  (data?.sys?.country == 'IN' ? rise : rise + time - localOffset) * 1000
).toLocaleTimeString([], {
  hour: '2-digit',
  minute: '2-digit',
});
const sunSet= new Date(
  (data?.sys?.country == 'IN' ? set : set + time - localOffset) * 1000
).toLocaleTimeString([], {
  hour: '2-digit',
  minute: '2-digit',
});
    const date = new Date()
    const hour = date.getHours()
    const rotateRadius = (hour/12)*100

    
  return (
    <div className=' py-2 mt-4 backdrop-blur-xl text-black bg-white/60 rounded'>
      <label className='flex items-center gap-1 ml-2 mt-2'><IoSunny /> Sun</label>
        <div className='relative  pt-10 h-[110px]  w-[220px] mx-auto overflow-hidden '>
          <div className='w-[200px] -rotate-18 top-2 absolute rounded-[50%] border-dashed h-[200px] left-2.5  border-2'>
               <div className={`w-[200px]   absolute  rounded-[50%]  h-[200px] `} style={{transform:`rotate(${rotateRadius}deg) translate(-2px,-1px)`}} >
            <img className='absolute w-7  -left-3.5 top-[50%]' src="./sunlogo.webp" style={{transform:'translate(0,-50%)'}}/>
            <img className='absolute w-7  -right-3.5 top-[50%]' src="moon.png" style={{transform:'translate(0,-50%)'}}/>
        </div>         
        </div>
      

        </div>
        <hr className='border border-gray-400 '/>
        <div className='w-[260px] flex justify-between mx-auto mt-1  '>
            <span>
                {sunRise}
            </span>

                  <span>
                {sunSet}
            </span>

        </div>
    </div>
  )
}

export default Sun