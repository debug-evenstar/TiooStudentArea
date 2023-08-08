import React from 'react'
import { MdArrowBack } from 'react-icons/md'
import { Link } from 'react-router-dom'
import RenderComponent from './renderComp'

const LessonComponent = () => {
  return (
    <>
        <div className='bg-compbg bg-cover nue w-full h-screen lg:px-12'>
            <div className='text-white flex justify-between'>
                <div className='lg:w-3/12 pt-6'>
                    <Link to='/home' className='flex gap-x-2 item-center'>
                        <MdArrowBack className='text-4xl'/><span className='fw-600 text-2xl mt-1'>EXIT</span>
                    </Link>
                    <p className='mt-4'>Basic science: Primary 3</p>
                </div>
                <div className='w-6/12 relative'>
                    <img src='https://res.cloudinary.com/dic7regoe/image/upload/v1691443460/praxeum/Group_12598_mkbyg0.png' alt='board' className='w-full absolute'/>
                    <div className='mt-[9%] text-center relative'>
                        <p className='fw-600 text-black'>Lesson 1</p>
                        <p className='fw-600 text-[#FA14D5] text-lg'>Living and Non-Living Things</p>
                    </div>
                </div>
                <div className='lg:w-3/12 pt-6'>
                    <p className='mt-8 lg:pl-8'>Chapter 1: Introduction to Basic science Lesson 3 of 5</p>
                </div>
            </div>
            <div className='mt-24 w-full'>
                <RenderComponent/>
            </div>
        </div>
    </>
  )
}

export default LessonComponent