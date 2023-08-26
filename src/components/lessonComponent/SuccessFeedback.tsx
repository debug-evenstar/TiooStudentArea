import React, {FC} from 'react'
import { MdOutlineCancelPresentation } from 'react-icons/md'
interface Props {
    close: () => void
    message: string
}
const SuccessFeedback:FC<Props> = ({close, message}) => {
  return (
    <>
        <div className=''>
            <div className='h-[80vh] w-[270px] absolute bottom-0 -right-3 bg-bgsuccess bg-fit flex items-center justify-end showfeed'>
                <div className='text-center text-white fw-600 w-11/12 pr-4 mb-6'>
                    <p className='lg:text-xl'>{message}</p>
                </div>
                <MdOutlineCancelPresentation className='text-white text-3xl absolute top-10 right-10 cursor-pointer' onClick={close}/>
            </div>
        </div>
    </>
  )
}

export default SuccessFeedback