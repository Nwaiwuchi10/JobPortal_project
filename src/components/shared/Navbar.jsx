import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Avatar, AvatarImage } from '../ui/avatar';
import { LogOut, Menu, User2, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';

const Navbar = () => {
    // const { user } = useSelector((store) => store.auth);
    const user=localStorage.getItem("userId")
    const firstName=localStorage.getItem("firstName")
    const lastName=localStorage.getItem("lastName")
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate('/');
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || 'Logout failed');
        }
    };
const logoutHandlers=()=>{
    localStorage.setItem("userId", "")
    localStorage.setItem("token", "")
    localStorage.setItem("firstName","")
    window.location.reload();
    navigate("/")
}
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="bg-white shadow-md">
            <div className="flex items-center justify-between mx-auto max-w-7xl px-4 py-4">
                {/* Logo */}
                <div>
                 
                <Link to="/" ><h1 className="text-2xl font-bold">  Job<span className="text-[#F83002]">Hunt</span>
                </h1></Link>   
                </div>

                {/* Hamburger Icon */}
                <div className="md:hidden">
                    <button onClick={toggleMenu}>
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Links & Avatar */}
                <div className="hidden md:flex items-center gap-12">
                    <ul className="flex font-medium items-center gap-5">
                        {user  ? (
                            <>
                                <li><Link to="/admin/companies">Companies</Link></li>
                                <li><Link to="/admin/jobs">Jobs</Link></li>
                               <li>{firstName}-{lastName} </li>
                                <li> <div className="flex items-center gap-2">
                                            {/* <LogOut /> */}
                                            <Button onClick={logoutHandlers} variant="link">
                                                Logout
                                            </Button>
                                        </div></li>
                            </>
                        ) : (
                            <>
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/jobs">Jobs</Link></li>
                                <li><Link to="/browse">Browse</Link></li>
                            </>
                        )}
                    </ul>

                    {!user ? (
                        <div className="flex items-center gap-2">
                            <Link to="/login">
                                <Button variant="outline">Login</Button>
                            </Link>
                            <Link to="/signup">
                                <Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">Signup</Button>
                            </Link>
                        </div>
                    ) : (
                        <Popover>
                            {/* <PopoverTrigger asChild>
                                <Avatar className="cursor-pointer">
                                    <AvatarImage src={user?.profile?.profilePhoto} alt="@user" />
                                </Avatar>
                            </PopoverTrigger> */}
                            <PopoverContent className="w-80">
                                <div className="space-y-2">
                                    <div className="flex gap-2">
                                        {/* <Avatar>
                                            <AvatarImage src={user?.profile?.profilePhoto} alt="@user" />
                                        </Avatar> */}
                                        <div>
                                            <h4 className="font-medium">{firstName}-{lastName}</h4>
                                            <p className="text-sm text-muted-foreground">{user?.profile?.bio}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col text-gray-600">
                                        {/* {user.role === 'student' && (
                                            <div className="flex items-center gap-2">
                                                <User2 />
                                                <Link to="/profile">
                                                    <Button variant="link">View Profile</Button>
                                                </Link>
                                            </div>
                                        )} */}
                                        <div className="flex items-center gap-2">
                                            {/* <LogOut /> */}
                                            <Button onClick={logoutHandlers} variant="link">
                                                Logout
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden px-4 pb-4">
                    <ul className="flex flex-col gap-4 font-medium">
                        {user && user.role === 'recruiter' ? (
                            <>
                                <li><Link to="/admin/companies">Companies</Link></li>
                                <li><Link to="/admin/jobs">Jobs</Link></li>
                            </>
                        ) : (
                            <>
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/jobs">Jobs</Link></li>
                                <li><Link to="/browse">Browse</Link></li>
                            </>
                        )}
                    </ul>
                    <div className="mt-4">
                        {!user ? (
                            <div className="flex flex-col gap-2">
                                <Link to="/login">
                                    <Button variant="outline" className="w-full">Login</Button>
                                </Link>
                                <Link to="/signup">
                                    <Button className="bg-[#6A38C2] hover:bg-[#5b30a6] w-full">Signup</Button>
                                </Link>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-2 mt-2">
                                {user.role === 'student' && (
                                    <Link to="/profile">
                                        <Button variant="ghost" className="w-full flex gap-2 items-center justify-start">
                                            <User2 size={18} /> View Profile
                                        </Button>
                                    </Link>
                                )}
                                <Button
                                    variant="ghost"
                                    className="w-full flex gap-2 items-center justify-start"
                                    onClick={logoutHandler}
                                >
                                    <LogOut size={18} /> Logout
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;
