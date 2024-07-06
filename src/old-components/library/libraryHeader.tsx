import React from 'react'
import { BsCheckLg } from 'react-icons/bs';
import { useAppSelector } from '../../redux/store';

const LibraryHeader = () => {
    const user = useAppSelector((state) => state.user.user);
    const nameRow = user.name?.split(' ')
    const firstname = nameRow[0]
  return (
    <div className="w-full lg:h-[206px] bg-dash lg:bg-fit lg:rounded-b-[16px] px-2 py-4 lg:py-0  lg:px-7 flex items-center justify-between">
            <div className="">
              <div className="mt-2">
                <div className="flex items-center gap-x-2">
                  <p className="nue text-[#00000080] fw-700 text-xl lg:text-4xl">
                    Welcome,
                  </p>
                  <p className="nue fw-700 text-xl lg:text-4xl">{firstname}</p>
                </div>
              </div>
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

export default LibraryHeader