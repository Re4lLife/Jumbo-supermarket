import React from 'react';
import useProfile from '../../hooks/useProfile';
import Loading from '../../components/Loading';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/Modal';
import UpdateProfileForm from '../../components/UpdateProfileForm';


const Profile = () => {
    const { profile, isLoading } = useProfile();
    
    const navigate = useNavigate();

    if (isLoading) return <Loading />;

    const { email, fullName, imageUrl, number, address } = profile;

    console.log(imageUrl, email, fullName)

    return (
        <div>
            <button
                className='text-blue-800'
                onClick={() => navigate(-1)}> &larr; Back</button>

            <h1 className="text-4xl font-bold my-20 text-red-300">Profile</h1>

            <div className="flex items-center gap-6 mb-10">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200">
                    {
                        imageUrl ?
                            (<img src={imageUrl} alt={fullName} className="w-full h-full object-cover" />)
                            :
                            (<img src='./default_image.jpeg' alt='Default user image' className="w-full h-full object-cover" />)
                    }
                </div>
                <div>
                    <h2 className="text-xl font-semibold">{fullName}</h2>
                    <p className="text-gray-500">{email}</p>
                </div>
            </div>

            <div className="space-y-32 pb-14">
                <div className='flex items-center gap-6'>
                    <label className="text-sm font-bold text-gray-700">Phone Number:</label>
                    <p className="mt-1 text-gray-900">{number}</p>
                </div>
                <div className='flex items-center gap-6'>
                    <label className="block text-sm font-bold text-gray-700">Address:</label>
                    <p className="mt-1 text-gray-900">{address}</p>
                </div>
            </div>


            <Modal>
                <Modal.Open name='edit-profile'>
                    <div className="flex justify-end pr-6">
                        <Button type='primary'>
                            Edit Profile
                        </Button>
                    </div>
                </Modal.Open>

                <Modal.Window name='edit-profile'>
                    <UpdateProfileForm />
                </Modal.Window>

            </Modal>
        </div>
    );
};

export default Profile;