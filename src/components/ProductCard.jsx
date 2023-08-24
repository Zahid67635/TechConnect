import React from 'react';

const ProductCard = () => {
    const features = [
        {
            fName: 'good',
            price: 20,
        },
        {
            fName: 'good2',
            price: 20,
        },
        {
            fName: 'good3',
            price: 20,
        },
        {
            fName: 'good4',
            price: 20,
        },
    ]
    return (
        <div className='shadow-lg rounded-3xl border p-3 flex flex-col text-indigo-900'>
            <div className='h-52 w-80 mx-auto'>
                {/* <img src={product.image} alt={product.model} /> */}
                <p>image</p>
            </div>
            <h1 className='font-bold text-center'>product.model</h1>
            <p className='text-center font-semibold mb-3'>Rating: product.rating</p>
            <div className=' flex-1'>
                <ul className='space-y-2'>
                    {features.map((feature, i) => {
                        return <li key={i} className='text-sm '>{feature.fName}</li>;
                    })}
                </ul>
            </div>
            <div className='flex gap-2 mt-5'>
                <button className='bg-indigo-500 rounded-full py-1 px-2 flex-1 text-white text-bold'>
                    Add to cart
                </button>
                <button className='bg-indigo-500 rounded-full py-1 px-2 flex-1 text-white text-bold'>
                    Remove
                </button>
                {/* <button
                    title='Add to wishlist'
                    className='bg-indigo-500 py-1 px-2 rounded-full'
                >
                    <p>icon</p>
                </button> */}
            </div>
        </div>
    );
};

export default ProductCard;