import React, {FC} from 'react'
import { FaGreaterThan, FaLessThan } from 'react-icons/fa'

interface Props{
    data: any
}
const ViewImgDoc:FC<Props> = ({data}) => {
  return (
    <>
        <div>
            <div className='flex justify-center'>
                <img src="https://res.cloudinary.com/dic7regoe/image/upload/v1696359495/praxeum/COVER_PAGE_1_2_1_yz4i2f.png" alt="cover" className='lg:w-[350px] xl:w-[400px]' />
            </div>
            <div>
                <FaGreaterThan className='absolute cursor-pointer text-white top-[50%] right-10 text-5xl'/>
                <FaLessThan className='absolute cursor-pointer text-white top-[50%] left-10 text-5xl'/>
            </div>
        </div>
    </>
  )
}

export default ViewImgDoc