"use client"
import React from 'react';

const page = ({ params }) => {
    console.log(params.id);
    return (
        <div>
            this is blog id
        </div>
    );
};

export default page;