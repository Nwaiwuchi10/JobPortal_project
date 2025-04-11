import React, { useEffect, useState } from 'react'
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux'; 
import axios from 'axios';
import { JobsApi } from '../data/Api';
import "./LatestCard.css"
// const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];

const LatestJobs = () => {
    // const {allJobs} = useSelector(store=>store.job);
        const [allJobs, setAllJobs]=useState([])
        
        
        // const [allJobs, setAllJobs] = useState(data);
        console.log("alljobs", allJobs)
        useEffect(() => {
            const fetchPosts = async () => {
              const { data } = await axios.get(JobsApi);
              console.log(data);
             
              setAllJobs(data);
            };
        
            fetchPosts();
          }, []);
    
   
    return (
        <div className='max-w-7xl mx-auto my-20'>
            <h1 className='text-4xl font-bold'><span className='text-[#6A38C2]'>Latest & Top </span> Job Openings</h1>
            <div className='grid grid-cols-3 gap-4 my-5 data-div-display'>
                {
                    allJobs.length <= 0 ? <span>No Job Available</span> : allJobs?.slice(0,6).map((job) => <LatestJobCards key={job._id} job={job}/>)
                }
            </div>
        </div>
    )
}

export default LatestJobs