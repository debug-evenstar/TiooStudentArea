import React, {useState} from 'react'
import SlideIndicator from './slideIndicator'
import MobileSuccessFeedback from './MobileSuccess'

const MobileComponent = () => {
    const [SuccessFeed, setSuccessFeed] = useState(false)
    // const [FailureFeed, setFailureFeed] = useState(false)
    const [prevBtn, setPrevBtn] = useState(true)
    const [nextBtn, setNextBtn] = useState(true)

    const showSuccess = () => {
        setSuccessFeed(true)
        setNextBtn(true)
    }
  return (
    <>
        <div className='flex justify-between items-center mt-8'>
            <div className='w-full'>
                <SlideIndicator num={5} active={1}/>
                <div className='h-[400px] border mt-4 w-full bg-bgcomp bg-cover rounded-lg'>

                </div>
            </div>
            {/* nav buttons */}
            <div>
                {
                    nextBtn &&
                    <p className='fixed bottom-0 right-0 p-5 py-3 rounded-tl-[30px] text-center fw-600 text-xl text-white bg-[#86A94B] w-5/12'>
                        Continue
                    </p>
                }
                {
                    prevBtn &&
                    <p className='fixed bottom-0 left-0 p-5 py-3 rounded-tr-[30px] text-center fw-700 text-xl text-[#27397A] bg-[#E3E2FF] w-5/12' onClick={showSuccess}>
                        Previous
                    </p>
                }
            </div>
        </div>
        <div>
            {SuccessFeed && <MobileSuccessFeedback close={() => setSuccessFeed(false)} message={'We are sending a success feeback to you to start up this slides'}/>}
            {/* {FailureFeed && <FailureFeedback close={() => setFailureFeed(false)} message={'We are sending a failure feeback to you to start up this slides'}/>} */}
        </div>
    </>
  )
}

export default MobileComponent