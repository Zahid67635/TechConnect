"use client"
import About from '@/components/home/About';
import Categories from '@/components/home/Categories';
import Header from '@/components/home/Header';
import Hero from '@/components/home/Hero';
import ImageSlider from '@/components/slider/ImageSlider';
export default function Home() {
  return (
    
    <main className="flex flex-col gap-20 mb-10">
      <Header/>
      <div className='md:px-8 mx-2'>
        <Categories />
      </div>
      <Hero/>
      <About/>
      <ImageSlider/>
    </main>
  )
}
