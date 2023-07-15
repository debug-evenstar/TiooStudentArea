import React from 'react'
import DashLayout from '../../components/layouts/DashLayout'
import { BsCheckLg } from 'react-icons/bs'
import ComingUp from '../../components/dashboard/comingUp'
import MeetClass from '../../components/dashboard/meetClass'
import SubjectContainer from '../../components/dashboard/subjectContainer'

const DashboardHomePage = () => {
  return (
    <>
        <DashLayout>
            <div className='nue bg-[#FAFAFA] h-full pb-16'>
                <div className='w-full h-[206px] bg-dash lg:bg-fit rounded-b-[16px] px-7 flex items-center justify-between'>
                    <div className=''>
                        <div className='flex items-center gap-x-1'>
                            <img src='https://res.cloudinary.com/dic7regoe/image/upload/v1689193684/praxeum/Frame_1000003519_1_odn9t3.png' alt='school' className='w-6' />
                            <p className='text-[#00000080] fs-500 fw-600 poppin'>Flowinton Montessori School</p>
                        </div>
                        <div className='mt-2'>
                            <div className='flex items-center gap-x-2'>
                                <p className='nue text-[#00000080] fw-700 lg:text-4xl'>Welcome,</p>
                                <p className='nue fw-700 lg:text-4xl'>Charity</p>
                                <img src='https://res.cloudinary.com/dic7regoe/image/upload/v1689195430/praxeum/Emoji_nubac1.png' alt='school' className='w-7' />
                            </div>
                        </div>
                        <div className='mt-4 flex gap-x-4 fw-600'>
                            <div className='flex gap-x-2'>
                                <p className='text-[#00000080] nue'>Class:</p>
                                <p className='nue'>Primary 3A</p>
                            </div>
                            <div className='flex gap-x-2'>
                                <p className='text-[#00000080] nue'>Subject:</p>
                                <p className='nue'>5</p>
                            </div>
                            <div className='flex gap-x-2'>
                                <p className='text-[#00000080] nue'>Term:</p>
                                <p className='nue'>2nd</p>
                            </div>
                        </div>
                    </div>
                    <div className='w-[300px] lg:w-[400px] bg-primary p-6 rounded-xl'>
                        <div className='text-center text-white'>
                            <p className='nue fs-500'>STATUS</p>
                            <p className='text-4xl fw-700'>ON TRACK</p>
                            <p className='w-10 h-10 mx-auto bg-[#28AE5E] place-center circle'><BsCheckLg className='text-3xl'/></p>
                            <p className='fs-500'>Keep up the good work!</p>
                        </div>
                    </div>
                </div>
                <div className='lg:flex justify-between mt-12 gap-x-8 lg:px-7'>
                    <div className='lg:w-[72%]'>
                        <SubjectContainer/>
                    </div>
                    <div className='lg:w-[28%]'>
                        <div>
                            <ComingUp/>
                        </div>
                        <div className='mt-12'>
                            <MeetClass/>
                        </div>
                    </div>
                </div>
            </div>
        </DashLayout>
    </>
  )
}

export default DashboardHomePage