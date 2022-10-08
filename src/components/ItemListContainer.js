import { useEffect, useState } from "react";
import { ItemCard } from "./ItemCard";

const ItemListContainer = () => {

  const [products, setProducts] = useState([]);

  useEffect( () => {
    getProducts();
  }, [])

  const getProducts = async () => {
    const response = await fetch('https://fakestoreapi.com/products')
    const data = await response.json()
    console.log(data)
    setProducts(data)
  }

  return (
    <div className="flex flex-col w-full bg-gray-100 pb-12 items-center">
      <h1 className="text-center text-4xl font-bold py-32 bg-primary mb-8 shadow w-full"> Mis Productos</h1>
      <ul className="flex flex-row flex-wrap gap-10 justify-center lg:w-4/5">
        {products.map(product => ( <ItemCard key={product.id} {...product}/> ))}
      </ul>
    </div>
  )
}
export default ItemListContainer