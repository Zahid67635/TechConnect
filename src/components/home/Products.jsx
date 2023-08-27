import React from 'react';
import ProductCard from '../ProductCard';

const Products = () => {
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-7xl gap-14 mx-auto my-10">
                <ProductCard />
            </div>
        </div>
    );
};

export default Products;