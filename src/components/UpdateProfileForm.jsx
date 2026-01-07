import React, { useState } from 'react';
import useUpdateProfile from '../hooks/useUpdateProfile';
import { useForm } from 'react-hook-form';
import useProfile from '../hooks/useProfile';
import Loading from './Loading';
import Button from './Button';
import Modal from './Modal';
import { CiCirclePlus } from "react-icons/ci";

const UpdateProfileForm = ({ onCloseModal }) => {
    const { profile, isLoading } = useProfile();
    const { updateProfile, isUpdating } = useUpdateProfile();

    const { imageUrl } = profile

    //This state holds the newly selected image as preview just before user saves.
    const [previewUrl, setPreviewUrl] = useState(imageUrl);

    const handlePreview = (e) => {
        const file = e.target.files[0];
        if (file) setPreviewUrl(URL.createObjectURL(file));
    };


    const { register, handleSubmit } = useForm({
        defaultValues: profile,
    });


    if (isLoading) return <Loading />


    function onSubmit(data) {
        console.log(data)
        updateProfile(data, {
            onSuccess: () => {
                onCloseModal?.(); // 🎯 Closes the modal only if save succeeds
            }
        });
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6 bg-white rounded-lg shadow">
            <div className="w-full flex flex-col items-center py-4">
                <div className="relative inline-block">
                    <img
                        src={previewUrl || './default_image.jpeg'}
                        alt='Profile'
                        className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
                    />

                    <label
                        className="absolute -bottom-4 -right-4 cursor-pointer text-white rounded-full p-1 shadow-lg hover:bg-blue-200 transition-colors border-2 border-white"
                    >
                        <CiCirclePlus size="3rem" className='text-black' />
                        <input
                            type="file"
                            accept="image/*"
                            {...register("avatarFile", {
                                onChange: (e) => handlePreview(e)
                            })}
                            className="hidden"
                        />
                    </label>
                </div>
            </div>
            

            <div className="flex flex-col gap-2">
                <label>Full Name</label>
                <input
                    {...register("fullName")}
                    className="inputs"
                    placeholder="Enter full name"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label>Phone Number</label>
                <input
                    {...register("number")}
                    className="inputs"
                    placeholder="Enter phone number"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label>Address</label>
                <textarea
                    {...register("address")}
                    className="inputs"
                    placeholder="Enter address"
                />
            </div>

            <div className="flex justify-end items-center gap-12 mt-6">

                <Modal.Close>
                    <Button htmlType="button" type="primary">
                        Cancel
                    </Button>
                </Modal.Close>


                <button className='bg-green-600 tracking-wide text-white py-2 px-6 rounded-md' disabled={isUpdating}>
                    {isUpdating ? <Loading size='small' /> : "Save"}
                </button>
            </div>
        </form >
    );
};

export default UpdateProfileForm;