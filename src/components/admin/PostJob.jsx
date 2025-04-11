
import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useSelector } from 'react-redux';
import axios from 'axios';
// import { JOB_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
// import JobsApi from "../../data/Api"

const categories = [
  "Software_Development", "Engineering", "Design", "Marketing", "Sales", "Other"
];
const jobTypes = ["Full-Time", "Part-Time", "Contract", "Internship", "Freelance"];
const jobStates = ["Remote", "On-Site", "Hybrid"];
const payPeriods = ["Hourly", "Daily", "Weekly", "Monthly", "Yearly"];

const PostJob = () => {
    const postedBy=localStorage.getItem("userId")
  const [input, setInput] = useState({
    companyName: '',
    title: '',
    description: '',
    requirements: '',
    role: '',
    openTo: '',
    category: '',
    jobType: '',
    jobState: '',
    payPeriod: '',
    country: '',
    state: '',
    city: '',
    fixedSalary: '',
    minSalary: '',
    maxSalary: '',
    address: '',
    contactNumber: '',
    deadline: '',
    duration: '',
    postedBy
    // imageUrl: ''
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useSelector(store => store.auth);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectHandler = (field) => (value) => {
    setInput({ ...input, [field]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(
        "https://jobportalapp-g2ll.onrender.com/api/postjob",
    // JobsApi,
         input,  {
        headers: { 'Content-Type': 'application/json' },
        // withCredentials: true
      });
      if (res.data) {
        toast.success(res.data.message);
        // navigate("/admin/jobs");
        navigate("/");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div style={{width:"100%", marginRight:"auto", marginLeft:"auto"}}>
        <h2 className='text-center mt-5 mb-4'>*Pls You must be a login user before you post a job*</h2>
      <div className='flex items-center justify-center w-screen my-5'>
        <form 
        onSubmit={submitHandler} 
        className='p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md w-full'>
          <div className='grid grid-cols-2 gap-4'>


             <InputBlock label="Company Name" name="companyName" value={input.companyName} onChange={changeEventHandler} />
            <InputBlock label="Title" name="title" value={input.title} onChange={changeEventHandler} />
            <InputBlock label="Role" name="role" value={input.role} onChange={changeEventHandler} />
            <InputBlock label="Open To" name="openTo" value={input.openTo} onChange={changeEventHandler} />
            <InputBlock label="Description" name="description" value={input.description} onChange={changeEventHandler} />
            <InputBlock label="Requirements" name="requirements" value={input.requirements} onChange={changeEventHandler} />

            <SelectBlock label="Category" value={input.category} onChange={selectHandler("category")} options={categories} />
            <SelectBlock label="Job Type" value={input.jobType} onChange={selectHandler("jobType")} options={jobTypes} />
            <SelectBlock label="Job State" value={input.jobState} onChange={selectHandler("jobState")} options={jobStates} />
            <SelectBlock label="Pay Period" value={input.payPeriod} onChange={selectHandler("payPeriod")} options={payPeriods} />

            <InputBlock label="Fixed Salary" name="fixedSalary" value={input.fixedSalary} onChange={changeEventHandler} />
            <InputBlock label="Min Salary" name="minSalary" value={input.minSalary} onChange={changeEventHandler} />
            <InputBlock label="Max Salary" name="maxSalary" value={input.maxSalary} onChange={changeEventHandler} />
            <InputBlock label="Country" name="country" value={input.country} onChange={changeEventHandler} />
            <InputBlock label="State" name="state" value={input.state} onChange={changeEventHandler} />
            <InputBlock label="City" name="city" value={input.city} onChange={changeEventHandler} />
            <InputBlock label="Address" name="address" value={input.address} onChange={changeEventHandler} />
            <InputBlock label="Contact Number" name="contactNumber" value={input.contactNumber} onChange={changeEventHandler} />
            <InputBlock label="Deadline" name="deadline" type="date" value={input.deadline} onChange={changeEventHandler} />
            <InputBlock label="Duration" name="duration" value={input.duration} onChange={changeEventHandler} />
            {/* <InputBlock label="Image URL" name="imageUrl" value={input.imageUrl} onChange={changeEventHandler} /> */}

          </div>

          {
            loading ? (
              <Button className="w-full mt-6" disabled>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Posting...
              </Button>
            ) : (
              <Button type="submit" className="w-full mt-6">Post Job</Button>
            )
          }
        </form>
      </div>
      </div>
 
    </div>
  );
};

const InputBlock = ({ label, name, value, onChange, type = "text" }) => (
  <div>
    <Label>{label}</Label>
    <Input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="focus-visible:ring-0 focus-visible:ring-offset-0 my-1"
    />
  </div>
);

const SelectBlock = ({ label, value, onChange, options }) => (
  <div>
    <Label>{label}</Label>
    <Select onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={`Select ${label}`} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((option) => (
            <SelectItem key={option} value={option}>{option}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>
);

export default PostJob;
