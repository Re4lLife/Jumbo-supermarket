import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import FormRow from '../../components/FormRow';
import Button from '../../components/Button';
import { signUp } from './apiAuth';
import toast from 'react-hot-toast';
import Loading from '../../components/Loading';
import { useLogOut } from '../../hooks/useLogOut';




const SignupForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { logout, isLoggingOut } = useLogOut()

  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit,
  } = useForm();


  async function onSubmit({ email, password }) {
    setIsLoading(true);

    try {
      await signUp({ email, password });

      logout();

      toast.success(`Account created! Please verify your email.`);

      setTimeout(() => {
        navigate('/auth/sign-in', { replace: true });

      }, 3000); //  3 seconds (matches default toast duration)

    } catch (err) {
      console.log(err.message);
      toast.error('There was an error signing up');

    } finally {
      setIsLoading(false);
    }
  }


  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='w-full text-center rounded-2xl shadow-2xl py-5 px-10 max-w-3xl flex flex-col items-center'>

      <h1
        className='text-2xl pb-32 font-semibold tracking-wide'
      >--&gt; CREATE AN ACCOUNT &lt;--</h1>

      <FormRow id='email' error={errors?.email?.message}>
        <input
          className='inputs'
          type='email'
          disabled={isLoading}
          placeholder='Enter email here.'
          {...register('email', {
            required: "This field is required.",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address",
            }
          }
          )}
        />
      </FormRow>

      <FormRow id='password' error={errors?.password?.message}>
        <input
          className='inputs'
          type='password'
          disabled={isLoading}
          placeholder='Enter password here.'
          {...register('password', {
            required: "This firld is required.",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters.",
            },
            pattern: {
              // Regex requires: 1) At least one letter, 2) At least one number, 3) At least one special character.
              value: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              message: "Your password must include a letter, a number, and a special character.",
            }
          }
          )}
        />
      </FormRow>

      <FormRow id='confirmPassword' error={errors?.confirmPassword?.message}>
        <input
          type='password'
          className='inputs'
          disabled={isLoading}
          placeholder='Confirm password.'
          {...register('confirmPassword', {
            required: "This field is required",
            validate: (value) =>
              value === getValues().password || "Passwords needs to match"
          }
          )}
        />
      </FormRow>


      <Button
        type='primary'
        disabled={isLoading}>
        {isLoading || isLoggingOut ? 'Loading...' : 'Sign Up'}
      </Button>
    </form>
  );
};

export default SignupForm;