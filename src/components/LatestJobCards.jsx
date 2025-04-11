import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const LatestJobCards = ({job}) => {
    const navigate = useNavigate();
    return (
        <div>
            <div 
  onClick={() => navigate(`/description/${job._id}`)} 
  className='p-5 md:p-4 sm:p-3 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer w-full max-w-md md:max-w-sm mb-5 sm:max-w-full '
>
    <div>
        <h1 className='font-medium text-lg md:text-base sm:text-sm'>{job?.companyName}</h1>
        <p className='text-sm text-gray-500'>{job?.country}</p>
    </div>
    <div>
        <h1 className='font-bold text-lg my-2 md:text-base sm:text-sm'>{job?.title}</h1>
        <p className='text-sm text-gray-600'>{job?.jobState}</p>
    </div>
    <div className='flex flex-wrap items-center gap-2 mt-4'>
        <Badge className='text-blue-700 font-bold' variant="ghost">
            {job?.role} Position
        </Badge>
        <Badge className='text-[#F83002] font-bold' variant="ghost">
            {job?.jobType}
        </Badge>
        <Badge className='text-[#7209b7] font-bold' variant="ghost">
            {job?.maxSalary}
        </Badge>
    </div>
</div>
        </div>
        

    )
}

export default LatestJobCards