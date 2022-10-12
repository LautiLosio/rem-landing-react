import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ItemCard } from "./ItemCard";

const ItemListContainer = () => {

  const { categoryId } = useParams();

  const [products, setProducts] = useState([]);
  const [title, setTitle] = useState("Mis Productos");  
  
  useEffect( () => {
    setTitle("Cargando productos...");
    categoryId ? loadProductsByCategory() : loadProducts();
  }, [categoryId])

  const loadProducts = async () => {
    const response = await fetch('https://fakestoreapi.com/products')
    const data = await response.json();
    setProducts(data);
    setTitle("Mis Productos");
  }

  const loadProductsByCategory = async () => {
    const categoriesResponse = await fetch('https://fakestoreapi.com/products/categories')
    const categoryArr = await categoriesResponse.json();
    const response = await fetch(`https://fakestoreapi.com/products/category/${categoryArr[categoryId]}`)
    const data = await response.json();
    setProducts(data);
    setTitle(categoryArr[categoryId]);
  }

  return (
    <div className="flex flex-col w-full bg-gray-100 pb-12 items-center">
      <h1 className="text-center text-4xl font-bold py-20 px-4 bg-primary mb-8 shadow w-full capitalize rounded-b-2xl"> {title}</h1>
      <ul className="flex flex-row flex-wrap gap-10 justify-center lg:w-4/5">
        {products.map(product => ( <ItemCard key={product.id} {...product}/> ))}
      </ul>
    </div>
  )
}
export default ItemListContainer