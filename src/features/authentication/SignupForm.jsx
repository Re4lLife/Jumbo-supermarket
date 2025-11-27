import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import FormRow from '../../components/FormRow';
import Button from '../../components/Button';
import { signUp } from './apiAuth';

const SignupForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit,
  } = useForm();


  async function onSubmit({ email, password }) {
    setIsLoading(true);

    try {
      const user = await signUp({ email, password });

      console.log('Sign up successful!', user);
      navigate('/login/sign-in');

    } catch (err) {
      console.log(err.message);

    } finally {
      setIsLoading(false);
    }
  }


  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col items-center'>
      <FormRow lebel='Email' id='email' error={errors?.email?.message}>
        <input
          type='email'
          disabled={isLoading}
          placeholder='Enter your email here.'
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

      <FormRow lebel='Password' id='password' error={errors?.password?.message}>
        <input
          type='password'
          disabled={isLoading}
          placeholder='Enter your password here.'
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

      <FormRow lebel='Confirm password' id='confirmPassword' error={errors?.confirmPassword?.message}>
        <input
          type='password'
          disabled={isLoading}
          placeholder='Confirm your password.'
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
        Sign up
      </Button>
    </form>
  );
};

export default SignupForm;