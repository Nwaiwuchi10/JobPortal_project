// import React, { useEffect, useState } from 'react'
// import LatestJobCards from './LatestJobCards';
// import { useSelector } from 'react-redux'; 
// import axios from 'axios';
// import { JobsApi } from '../data/Api';
// import "./LatestCard.css"
// // const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];

// const LatestJobs = () => {
//     // const {allJobs} = useSelector(store=>store.job);
//         const [allJobs, setAllJobs]=useState([])
        
        
//         // const [allJobs, setAllJobs] = useState(data);
//         console.log("alljobs", allJobs)
//         useEffect(() => {
//             const fetchPosts = async () => {
//               const { data } = await axios.get(JobsApi);
//               console.log(data);
             
//               setAllJobs(data);
//             };
        
//             fetchPosts();
//           }, []);
    
   
//     return (
//         <div className='max-w-7xl mx-auto my-20'>
//             <h1 className="text-3xl font-bold text-center mb-10 md:text-3xl lg:text-4xl"><span className='text-[#6A38C2]'>Latest & Top </span> Job Openings</h1>
//             <div 
//             className='data-div-display'
//             // className='grid grid-cols-3 gap-4 my-5 data-div-display'
//             >
//                 {
//                     allJobs.length <= 0 ? <span>No Job Available</span> : allJobs?.slice(0,6).map((job) => <LatestJobCards key={job._id} job={job}/>)
//                 }
//             </div>
//         </div>
//     )
// }

// export default LatestJobs
import React, { useEffect, useState } from 'react';
import LatestJobCards from './LatestJobCards';
import axios from 'axios';
import { JobsApi } from '../data/Api';
import "./LatestCard.css";

const filterData = [
    {
        filterType: "jobType",
        array: ["Full-Time", "Part-Time", "Contract", "Internship", "Freelance"]
    },
    {
        filterType: "jobState",
        array: ["Remote", "On-Site", "Hybrid"]
    },
    {
        filterType: "category",
        array: ["Software_Development", "Engineering", "Design", "Marketing", "Sales", "Other"
]
    },
];

const LatestJobs = () => {
    const [allJobs, setAllJobs] = useState([]);
    const [selectedFilters, setSelectedFilters] = useState({
        jobType: '',
        jobState: '',
        category: ''
    });

    useEffect(() => {
        const fetchPosts = async () => {
            const { data } = await axios.get(JobsApi);
            setAllJobs(data);
        };
        fetchPosts();
    }, []);

    const handleFilterChange = (filterType, value) => {
        setSelectedFilters(prev => ({
            ...prev,
            [filterType]: value
        }));
    };

    // Filter jobs based on selected filters
    const filteredJobs = allJobs.filter(job => {
        const locationMatch = selectedFilters.jobType? job.jobType === selectedFilters.jobType : true;
        const industryMatch = selectedFilters.jobState? job.jobState === selectedFilters.jobState : true;
        const salaryMatch = selectedFilters.category? job.category === selectedFilters.category : true;
        return locationMatch && industryMatch && salaryMatch;
    });

    const displayJobs = filteredJobs.length > 0 ? filteredJobs : [];

    return (
        <div className='max-w-7xl mx-auto my-20'>
            <h1 className="text-3xl font-bold text-center mb-10 md:text-3xl lg:text-4xl">
                <span className='text-[#6A38C2]'>Latest & Top </span> Job Openings
            </h1>

            {/* Filter UI */}
            <div style={{width:"80%", marginLeft:"auto", marginRight:"auto"}}>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                {filterData.map(filter => (
                    <div key={filter.filterType}>
                        <label className="block font-semibold mb-1">{filter.filterType}</label>
                        <select
                            className="w-full border px-3 py-2 rounded"
                            value={selectedFilters[filter.filterType]}
                            onChange={(e) => handleFilterChange(filter.filterType, e.target.value)}
                        >
                            <option value="">All</option>
                            {filter.array.map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>
                ))}
            </div>
            </div>
        

            {/* Jobs display */}
            <div className='data-div-display'>
                {displayJobs.length === 0
                    ? <span>No Job Available</span>
                    : displayJobs.slice(0, 10).map(job => (
                        <LatestJobCards key={job._id} job={job} />
                    ))
                }
            </div>
        </div>
    );
};

export default LatestJobs;
