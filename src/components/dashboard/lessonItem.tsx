import React, {FC, useState} from 'react'
import { HiOutlineArrowPath } from 'react-icons/hi2'
import { formatLessonColor, formatLessonStatus, nthNumber } from '../../utils/format'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

interface Props {
    item: any
}
const LessonItem:FC<Props> = ({item}) => {
    const [showWeek, setShowWeek] = useState(true)
    const navigate = useNavigate()
    const showTime = (e:any) => {
        e.preventDefault();
        setShowWeek(!showWeek)
    }

    const getTimeFrame = () => {
        const start = new Date(item.start_date);
        const end = new Date(item.end_date);
        const timeFrameStart = Number.parseInt( start.toLocaleDateString().split("/")[0] );
        const timeFrameEnd = Number.parseInt( end.toLocaleDateString().split("/")[0] );
        return `${timeFrameStart}${nthNumber(timeFrameStart)}-${timeFrameEnd}${nthNumber(timeFrameEnd)}`;
    }

    const openLesson = (item:any) => {
        if(item.status === "Locked"){
            toast.info("Lesson is Locked")
        }else{
            navigate(`/lesson/${item.id}`)
        }
    }

  return (
    <>
        <div className='box-shade relative rounded-[8px] p-5 hover:scale-105 duration-100 cursor-pointer' onClick={() => openLesson(item)}>
            <div className='flex items-center gap-x-1'>
                <p className='fw-600'>{showWeek && `${item.week}`}</p>
                <p className='fw-400'>{!showWeek && getTimeFrame()}</p>
                <div onClick={(e: any) => e.stopPropagation()}>
                <HiOutlineArrowPath className='text-xl text-[#87909E]' onClick={showTime}/>
                </div>
            </div>
            <div>
                <p className='fw-600'>{formatLessonColor(item.topic, item.status)}</p>
                <p className='mt-3 text-[#87909E]'>{item.LessonSlides.length} Slides</p>
            </div>
            <div className='absolute top-2 right-2'>
                {formatLessonStatus(item.status)}
            </div>
        </div>
    </>
  )
}

export default LessonItem