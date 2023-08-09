import React, {FC} from 'react'

interface Props {
    num: number,
    active: number
}
const SlideIndicator:FC<Props> = ({num, active}) => {
    const indicator = num
  return (
    <div className='flex items-center justify-center gap-x-4'>
        {
            [...Array(indicator)].map((e, i) => <div key={i} className={`${i >= active? "bg-[#AEC0C9]" : "bg-white"} ${i === active? "rhombus w-5 h-5 !bg-white" : "w-4 h-4"}`}></div>)
        }
    </div>
  )
}

export default SlideIndicator