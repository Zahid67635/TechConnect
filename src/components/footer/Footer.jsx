import React from 'react';
import styles from './page.module.css'
const Footer = () => {
    return (
        <div className={`text-lg bg-teal-200 w-full ${styles.foot}`}>
            <p className='text-center font-semibold py-8'>&copy;Copywrite-2023</p>
        </div>
    );
};

export default Footer;