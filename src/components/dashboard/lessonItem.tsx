import React, {FC, useState} from 'react'
import { HiOutlineArrowPath } from 'react-icons/hi2'
import { formatLessonColor, formatLessonStatus } from '../../utils/format'
import { useNavigate } from 'react-router-dom'

interface Props {
    item: any
}
const LessonItem:FC<Props> = ({item}) => {
    const [showWeek, setShowWeek] = useState(true)
    const navigate = useNavigate()
  return (
    <>
        <div className='box-shade relative rounded-[8px] p-5 hover:scale-105 duration-100 cursor-pointer' onClick={() => navigate(`/lesson/${item.week}`)}>
            <div className='flex items-center gap-x-1'>
                <p className='fw-600'>{showWeek && `Week ${item.week}`}</p>
                <p className='fw-400'>{!showWeek && item.time_frame}</p>
                <HiOutlineArrowPath className='text-xl text-[#87909E]' onClick={() => setShowWeek(!showWeek)}/>
            </div>
            <div>
                <p className='fw-600'>{formatLessonColor(item.name, item.status)}</p>
                <p className='mt-3 text-[#87909E]'>5 Slides</p>
            </div>
            <div className='absolute top-2 right-2'>
                {formatLessonStatus(item.status)}
            </div>
        </div>
    </>
  )
}

export default LessonItem