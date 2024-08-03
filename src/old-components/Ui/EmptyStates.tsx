import React, {FC} from 'react'

interface Props {
    size: number
    msg: string
}
export const EmptyState1:FC<Props> = ({size, msg}) => {
  return (
    <div className='w-full'>
        <img src="https://res.cloudinary.com/dic7regoe/image/upload/v1695322371/praxeum/emptybook_srhzjo.png" alt="empty" width={size} height={size} className='mx-auto' />
        <p className='mt-5 text-center'>{msg}</p>
    </div>
  )
}
