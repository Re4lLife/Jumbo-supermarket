import React from 'react';
import Header from './Header';
import Logo from './Logo';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

const HeaderMain = () => {
    const navigate = useNavigate();

    return (
        <div>
            {/* This is for the header in the landing page - Home.jsx  */}
            <div className='px-3 flex-1'>
                <Header>

                    {/* This div acts as a spacer to push the Logo to the exact center. */}
                    <div className='flex items-center'>
                        {/* We use an empty div with no content */}
                    </div>


                    <div className='flex justify-center grow'>
                        <Logo />
                    </div>


                    <div className='flex items-center gap-4 md:gap-14'>
                        <Button type='primary' onClick={() => navigate('/auth/sign-in')}>
                            Login
                        </Button>

                        <Button type='primary' onClick={() => navigate('/auth/sign-up')}>
                            Sign up
                        </Button>
                    </div>
                </Header>
            </div>
        </div>
    );
};

export default HeaderMain;