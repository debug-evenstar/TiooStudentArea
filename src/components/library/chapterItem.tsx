import React, {FC, useState} from 'react'
import { HiOutlineArrowPath } from 'react-icons/hi2'
import { formatLessonColor, formatLessonStatus } from '../../utils/format'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import dayjs from 'dayjs'
// var advancedFormat = require('dayjs/plugin/advancedFormat')
// dayjs.extend(advancedFormat)

interface Props {
    item: any
}
const ChapterItem:FC<Props> = ({item}) => {
    const [showWeek, setShowWeek] = useState(true)
    const navigate = useNavigate()
    const showTime = (e:any) => {
        e.preventDefault();
        setShowWeek(!showWeek)
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
        <div className='box-shade max-h-32 relative rounded-[8px] p-5 hover:scale-105 duration-100 cursor-pointer' onClick={() => openLesson(item)}>
            <div className='flex items-center gap-x-1'>
                <p className='fw-600'>{showWeek && `${item.week}`}</p>
                <p className='fw-400'>{!showWeek && <span>{dayjs(item.start_date).format('Do')} - {dayjs(item.end_date).format('Do')}</span>}</p>
                <div onClick={(e: any) => e.stopPropagation()}>
                <HiOutlineArrowPath className='text-xl text-[#87909E]' onClick={showTime}/>
                </div>
            </div>
            <div>
                <p className='fw-600'>{formatLessonColor(item.topic, item.status)}</p>
                <p className='mt-3 text-[#87909E]'>{item.LessonSlides?.length} Slides</p>
            </div>
            <div className='absolute top-2 right-2'>
                {formatLessonStatus(item.status)}
            </div>
        </div>
    </>
  )
}

export default ChapterItem