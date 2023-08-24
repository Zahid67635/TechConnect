import Header from "@/components/Home";
import ProductCard from "@/components/ProductCard";

export default function Home() {
  return (
    <main className="flex flex-col px-4">
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-7xl gap-14 mx-auto my-10">
        <ProductCard />
        <ProductCard />

      </div>
    </main>
  )
}
