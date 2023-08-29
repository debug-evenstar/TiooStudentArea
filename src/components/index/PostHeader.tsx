import React from 'react'
import { BsCheckLg } from 'react-icons/bs';
import { useAppSelector } from '../../redux/store';

const PostHeader = () => {
    const user = useAppSelector((state) => state.user.user);
    console.log(user);
  return (
    <div className="w-full lg:h-[206px] bg-dash lg:bg-fit lg:rounded-b-[16px] px-2 py-4 lg:py-0  lg:px-7 flex items-center justify-between">
            <div className="">
              {user.school && <div className="flex items-center gap-x-1">
                <img
                  src="https://res.cloudinary.com/dic7regoe/image/upload/v1689193684/praxeum/Frame_1000003519_1_odn9t3.png"
                  alt="school"
                  className="w-6"
                />
                <p className="text-[#00000080] fs-500 fw-600 poppin">
                  {user.schoolName}
                </p>
              </div>}
              <div className="mt-2">
                <div className="flex items-center gap-x-2">
                  <p className="nue text-[#00000080] fw-700 text-xl lg:text-4xl">
                    Welcome,
                  </p>
                  <p className="nue fw-700 text-xl lg:text-4xl">{user.name}</p>
                  <img
                    src="https://res.cloudinary.com/dic7regoe/image/upload/v1689195430/praxeum/Emoji_nubac1.png"
                    alt="school"
                    className="w-4 lg:w-7"
                  />
                </div>
              </div>
              {user.school &&  <div className="mt-4 grid grid-cols-2 lg:flex gap-x-4 fw-600">
                <div className="flex gap-x-2">
                  <p className="text-[#00000080] nue">Class:</p>
                  <p className="nue">{user.studentClassArm}</p>
                </div>
                <div className="flex gap-x-2">
                  <p className="text-[#00000080] nue">Subject:</p>
                  <p className="nue">{user.subjectsCount}</p>
                </div>
                <div className="flex gap-x-2">
                  <p className="text-[#00000080] nue">Term:</p>
                  <p className="nue">2nd</p>
                </div>
              </div>}
            </div>
            <div className="w-[100px] h-[100px] lg:h-auto lg:w-[400px] bg-primary p-3 pt-4 lg:p-6 circle lg:rounded-xl">
              <div className="text-center text-white">
                <p className="nue fs-500">STATUS</p>
                <p className="fs-500 lg:text-4xl fw-700 uppercase">{user.status}</p>
                <p className="w-6 lg:w-10 h-6 lg:h-10 mx-auto bg-[#28AE5E] place-center circle">
                  <BsCheckLg className="text-xl lg:text-3xl" />
                </p>
                <p className="hidden lg:block fs-500">Keep up the good work!</p>
              </div>
            </div>
          </div>
  )
}

export default PostHeader