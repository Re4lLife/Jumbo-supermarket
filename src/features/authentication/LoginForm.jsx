import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import FormRow from '../../components/FormRow';
import { login } from './apiAuth';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Loading from '../../components/Loading';

const LoginForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();



    async function onSubmit({ email, password }) {
        setIsLoading(true);

        try {
            const user = await login({ email, password });
            console.log('Login successful!', user);

            toast.success(`Welcome back, ${user.email.split('@')[0]}!`);

            setTimeout(() => {
                navigate('/products', { replace: true });

            }, 3000); //  3 seconds (matches default toast duration)

        } catch (err) {
            setIsLoading(false);
            console.log(err.message);

            toast.error('Please check your credentials or network connection');


        } finally {
            setIsLoading(false);

        }
    }


    
    return (
        <form
            className='w-full max-w-6xl text-center rounded-2xl shadow-2xl py-5 px-10 flex flex-col items-center'
            onSubmit={handleSubmit(onSubmit)}>
            <h1
                className='text-2xl pb-32 font-semibold tracking-wide'
            >--&gt; LOG IN TO YOUR ACCOUNT &lt;--</h1>

            <FormRow id='email' error={errors?.email?.message}>
                <input
                    className='inputs'
                    type='email'
                    disabled={isLoading}
                    placeholder='Enter your email here'
                    {...register('email', {
                        required: "This field is required",
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "Please provide a valid email address",
                        }
                    })}
                />
            </FormRow>

            <FormRow id='password' error={errors?.password?.message}>
                <input
                    type='password'
                    className='inputs'
                    disabled={isLoading}
                    placeholder='Enter your email here'
                    {...register('password', {
                        required: "This field is required",
                    })}
                />
            </FormRow>

            <Button
                type='primary'
                disabled={isLoading}>
                {isLoading ? <Loading size='small' /> : 'Login'}
            </Button>
        </form>

    );
};

export default LoginForm;