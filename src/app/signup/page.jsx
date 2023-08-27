import SignUpForm from '@/components/signup/SignUpForm';
import React from 'react';

const page = () => {
    return (
        <div className="flex justify-center items-center bg-[url('/back.jpg')] min-h-screen">
            <SignUpForm />
        </div>
    );
};

export default page;