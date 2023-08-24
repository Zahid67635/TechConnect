"use client"
import MyQuery from '@/hooks/myQuery';
import React from 'react';

const Header = () => {
    const [data, isLoading, error] = MyQuery('user', 'users')
    return (
        <div>
            This is home, users: {data?.length || 0}
        </div>
    );
};

export default Header;