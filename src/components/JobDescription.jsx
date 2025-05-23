import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import Navbar from './shared/Navbar';
import { JobsApi } from '../data/Api';

const JobDescription = () => {
    const navigate=useNavigate()
    const {singleJob} = useSelector(store => store.job);
    const userId=localStorage.getItem("userId")
    const token=localStorage.getItem("token")
    const {user} = useSelector(store=>store.auth);
    const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);

    const params = useParams();
    const jobId = params.id;
    const [singleJobData, setSingleJobData]=useState({})
    useEffect(() => {
        const fetchPosts = async () => {
          const { data } = await axios.get(JobsApi + jobId);
          console.log(data);
        
          setSingleJobData(data);
        };
    
        fetchPosts();
      }, [jobId]);
    const dispatch = useDispatch();

    const applyJobHandler = async () => {
        const data={
jobId:jobId,
applicant:userId
        }
        try {
            const res = await axios.post("https://jobportalapp-g2ll.onrender.com/api/applyJob",
                data, {
               headers: {
                Authorization: `Bearer ${token}`,
                   "Content-Type": "application/json"
               },
               // withCredentials: true,
           })
            
            if(res.data){
                 navigate("/myjobs")
                setIsApplied(true); // Update the local state
                const updatedSingleJob = {...singleJob, applications:[...singleJob.applications,{applicant:user?._id}]}
                dispatch(setSingleJob(updatedSingleJob)); // helps us to real time UI update
                toast.success(res.data.message);

            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    useEffect(()=>{
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`,{withCredentials:true});
                if(res.data.success){
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application=>application.applicant === user?._id)) // Ensure the state is in sync with fetched data
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleJob(); 
    },[jobId,dispatch, user?._id]);

    return (
        <><Navbar/>
        <div style={{width:"95%", marginLeft:"auto", marginRight:"auto"}}>


        <div className='max-w-7xl mx-auto my-10'>
            
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='font-bold text-xl'>{singleJobData?.title}</h1>
                    <div className='flex items-center gap-2 mt-4'>
                        <Badge className={'text-blue-700 font-bold'} variant="ghost">{singleJobData?.role} Positions</Badge>
                        <Badge className={'text-[#F83002] font-bold'} variant="ghost">{singleJobData?.jobType}</Badge>
                        <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{singleJobData?.maxSalary} </Badge>
                    </div>
                </div>
                <Button
                onClick={isApplied ? null : applyJobHandler}
                    disabled={isApplied}
                    className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5f32ad]'}`}>
                    {isApplied ? 'Already Applied' : 'Apply Now'}
                </Button>
            </div>
            <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>Job Description</h1>
            <div className='my-4'>
                <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>{singleJobData?.title}</span></h1>
                <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>{singleJobData?.address}</span></h1>
                <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-800'>{singleJobData?.description}</span></h1>
                <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-800'>{singleJobData?.role} Position</span></h1>
                <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-800'>{singleJobData?.maxSalary || singleJobData?.fixedSalary}</span></h1>
                <h1 className='font-bold my-1'>Total Applicants: <span className='pl-4 font-normal text-gray-800'>{singleJobData?.applications?.length}</span></h1>
                {/* <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal text-gray-800'>{singleJobData?.createdAt.split("T")[0]}</span></h1> */}
            </div>
        </div>
        </div>
      
        
        </>
        
    )
}

export default JobDescription