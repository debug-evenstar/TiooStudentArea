import React, {useState} from 'react'
import CompButton from '../../components/Ui/CompButton'
import SlideIndicator from '../../components/lessonComponent/slideIndicator'
import SuccessFeedback from '../../components/lessonComponent/SuccessFeedback'
import FailureFeedback from '../../components/lessonComponent/FailureFeedback'

const RenderComponent = () => {
    const [SuccessFeed, setSuccessFeed] = useState(false)
    const [FailureFeed, setFailureFeed] = useState(false)
  return (
    <>
        <div className='flex justify-between items-center'>
            <div className='w-[120px]' onClick={() => setFailureFeed(true)}>
                <CompButton title='Previous' prev/>
            </div>
            <div className='lg:w-9/12 xl:w-8/12 2xl:w-7/12 '>
                <SlideIndicator num={5} active={1}/>
                <div className='h-[400px] mt-4 w-full bg-bgcomp bg-cover rounded-lg'>

                </div>
            </div>
            <div className='w-[120px]' onClick={() => setSuccessFeed(true)} >
            <CompButton title='Continue'/>
            </div>
        </div>
        <div>
            {SuccessFeed && <SuccessFeedback close={() => setSuccessFeed(false)} message={'We are sending a success feeback to you to start up this slides'}/>}
            {FailureFeed && <FailureFeedback close={() => setFailureFeed(false)} message={'We are sending a failure feeback to you to start up this slides'}/>}
        </div>
    </>
  )
}

export default RenderComponent