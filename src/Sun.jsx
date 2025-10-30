import React, { useEffect, useState } from 'react'
import { IoSunny } from "react-icons/io5";

const Sun = ({rise,set,time,data}) => {
  const [hour,setHour] = useState(12)
  const[curTime,setCurTime] = useState('--')
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


useEffect(()=>{
    const now = new Date();
  const utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
  const cityTime = new Date(utcMs + data.timezone * 1000);
  const finalHour = cityTime.getHours()

  const normalHour = finalHour >12 ? finalHour-12 : finalHour
  const finalMinits = cityTime.getMinutes()
  const AmOrBm = finalHour>12 ? 'PM' : 'AM'
  const finalTime = `${normalHour} : ${finalMinits} ${AmOrBm}`
setCurTime(finalTime)
  
     const rotateRadius = Math.round((finalHour/24)*100)
   setHour((rotateRadius/100)*360)
},[data])



   
  
    
    
  return (
    <div className=' py-2 mt-4 backdrop-blur-xl text-black bg-white/60 rounded'>
      <label className='flex items-center gap-1 ml-2 mt-2'><IoSunny /> Sun</label>
        <div className='relative  pt-10 h-[110px]  w-[220px] mx-auto overflow-hidden '>
          <div className='w-[200px] -rotate-86 top-2 absolute rounded-[50%] border-dashed h-[200px] left-2.5  border-2'>
               <div className={`w-[200px]   absolute  rounded-[50%]  h-[200px] `} style={{transform:`rotate(${hour}deg) translate(-2px,-1px)`}} >
            <img className='absolute w-7.5  -left-3 top-[50%]' src="./sunlogo.webp" style={{transform:'translate(0,-50%)'}}/>
            <img className='absolute w-7  -right-3.5 top-[50%]' src="moon.png" style={{transform:'translate(0,-50%)'}}/>
        </div>         
        </div>
      
            <div className='  absolute z-40 left-[34%] top-[40%]' >{curTime}</div>

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