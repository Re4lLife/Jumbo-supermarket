import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useClickOut from '../../hooks/useClickOut';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import { MdOutlineExpandMore, MdClose } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import useProfile from '../../hooks/useProfile';

const ProfileDropDown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const { isLoading, isAuthenticated, error, profile } = useProfile();

    // Close dropdown when clicking outside
    const close = () => setIsOpen(false);
    const el = useClickOut(close);

    if (isLoading) return <Loading />;
    if (error) return (
        <div className='mt-[-200px] w-[100px]'>
            <Error />
        </div>
    );
    if (!isAuthenticated) return null;


    const { email, fullName, imageUrl } = profile;

    return (
        <div className="relative flex items-center" ref={el}>
            <div
                onClick={() => setIsOpen((open) => !open)}
                className="flex items-center gap-2 p-2 rounded-full shadow-2xl max-w-[180px] lg:max-w-[250px] bg-slate-100">


                <span className="hidden sm:block text-sm font-medium text-gray-600 max-w-[150px] truncate">
                    {email}
                </span>


                <div className=" h-9 rounded-full overflow-hidden border border-gray-300 flex items-center justify-center">
                    {imageUrl ? (
                        <img src={imageUrl} alt={fullName} className="w-full h-full object-cover min-w-[50px]" />
                    ) : (
                        <FaRegUserCircle className="text-2xl text-gray-400 min-w-[60px]" />
                    )}
                </div>

                <MdOutlineExpandMore strokeWidth={2} className={`text-xl font-bold transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </div>



            {/* === Dropdown Menu === */}

            {isOpen && (
                <div className="absolute top-12 right-0 w-64 bg-white border border-gray-200 rounded-xl shadow-xl z-50 p-4 flex flex-col gap-4 animate-in fade-in zoom-in duration-200">
                    <div className="flex justify-between items-center border-b pb-2">
                        <span className="font-bold text-gray-800">My Account</span>

                        <button
                            onClick={close}
                            className="p-1 hover:bg-gray-100 rounded-full transition">
                            <MdClose className="text-xl text-gray-600" />
                        </button>
                    </div>



                    {/* Small Profile Info Section */}

                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200 shrink-0">

                            {imageUrl ? (
                                <img src={imageUrl} alt={fullName} className="w-full h-full object-cover" />
                            ) : (
                                <FaRegUserCircle className="w-full h-full p-1 text-gray-400" />
                            )}
                        </div>

                        <div className="flex flex-col min-w-0">
                            <p className="text-sm font-bold text-gray-900 truncate">{fullName}</p>
                            <p className="text-xs text-gray-500 truncate">{email}</p>
                        </div>
                    </div>


                    <button
                        onClick={() => {
                            navigate('/profile');
                            close();
                        }}
                        className="w-full bg-red-50 text-sm font-semibold py-2 rounded-lg hover:bg-slate-300 transition">
                        View Profile
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProfileDropDown;







