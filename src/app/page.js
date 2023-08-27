"use client"
import ProductCard from '@/components/ProductCard';
import MyQuery from '@/hooks/myQuery';
export default function Home() {
  const [data, isLoading, error] = MyQuery('https://64e45121c55563802913014d.mockapi.io/user/v1/products',)
  return (
    <main className="flex flex-col px-4">
      <div className='grid md:grid-cols-3 grid-cols-1 gap-10 p-10'>
        {
          data?.map(product => <ProductCard key={product.id} product={product} />)
        }
      </div>
    </main>
  )
}
