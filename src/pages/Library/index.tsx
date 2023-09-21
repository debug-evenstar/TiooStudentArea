import DashLayout from '../../components/layouts/DashLayout'
import PostHeader from '../../components/index/PostHeader'
import ComingUp from '../../components/dashboard/comingUp'
import MeetClass from '../../components/dashboard/meetClass'
import SyllabusContainer from '../../components/library/SyllabusCont'
import { useGetLibraryQuery, useGetNetworkQuery } from '../../services/api/librarySlice'
import MeetNetwork from '../../components/library/meetNetwork'

const LibraryHome = () => {
  const {data:library, isLoading:isBusy, refetch} = useGetLibraryQuery()
  const {data:network, isLoading:loading} = useGetNetworkQuery()
  return (
    <>
        <DashLayout>
        <div className="nue bg-[#FAFAFA] h-full pb-16">
          <PostHeader/>
          <div className="lg:flex justify-between mt-12 gap-x-8 lg:px-7">
            <div className="lg:w-[72%]">
              <SyllabusContainer/>
            </div>
            <div className="lg:w-[28%] mt-6 lg:mt-0">
              <div className='px-2 lg:px-0'>
                <ComingUp />
              </div>
              <div className="mt-12 px-2 lg:px-0">
                <MeetNetwork />
                <div className='mt-6 bg-frame2 w-full bg-fit'>
                    <p className='text-white fw-600 w-11/12 lg:text-[23px] py-12 mx-auto'>Explore our marketplace for exciting and amzing games, videos, and materials</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashLayout>
    </>
  )
}

export default LibraryHome