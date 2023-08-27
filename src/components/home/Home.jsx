
import React from 'react';

const Header = () => {

    return (
        <div>
            This is home, users: {data?.length || 0}
        </div>
    );
};

export default Header;