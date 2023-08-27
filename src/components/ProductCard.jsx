import Image from 'next/image';
import React from 'react';

const ProductCard = ({ product }) => {
    const { image, model, price, keyFeature, rating } = product
    return (
        <div className='shadow-lg rounded-3xl border p-3 flex flex-col text-indigo-900'>
            <div className='h-72 w-80 mx-auto'>
                <Image src={image} alt={product.model} width={320} height={208} />
            </div>
            <h1 className='font-bold text-center'>{model}</h1>
            <p className='text-center font-semibold mb-3'>Rating: {rating}</p>
            <div className=' flex-1'>
                <ul className='space-y-2'>
                    {keyFeature.map((feature, i) => {
                        return <li key={i} className='text-sm '>{feature}</li>;
                    })}
                </ul>
            </div>
            <div className='flex gap-2 mt-5'>
                <button className='bg-indigo-500 rounded-full py-1 px-2 flex-1 text-white text-bold'>
                    Details
                </button>
            </div>
        </div>
    );
};

export default ProductCard;