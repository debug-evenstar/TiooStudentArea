import Skeleton from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css'

export const SubjectSkelLoader = () => {
    return (
        <div className="bg-white grid lg:grid-cols-3 p-8 gap-12">
            <Skeleton className='h-48 !rounded-[8px] box-shade'/>
            <Skeleton className='hidden md:block h-48 rounded-[8px] box-shade'/>
            <Skeleton className='hidden lg:block h-48 rounded-[8px] box-shade'/>
        </div>
    )
}