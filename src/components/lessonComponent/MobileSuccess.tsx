import React, {FC} from 'react'
import { MdOutlineCancelPresentation } from 'react-icons/md'

interface Props {
    message:string
    close: () => void
}
const MobileSuccessFeedback:FC<Props> = ({message, close}) => {
  return (
    <>
        <div className='fixed top-0 left-0 w-full h-full z-20'>
            <div className='h-[270px] w-full absolute top-0 left-0 bg-mobilesuccess bg-fit flex items-center justify-center showfeel'>
                <div className='text-center text-white fw-600 w-11/12 mb-6'>
                    <p className=''>{message}</p>
                </div>
                <MdOutlineCancelPresentation className='text-white text-3xl absolute bottom-10 left-2/4 cursor-pointer' onClick={close}/>
            </div>
        </div>
    </>
  )
}

export default MobileSuccessFeedback