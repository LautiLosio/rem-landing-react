import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const ItemDetails = () => {

  const { itemId } = useParams();

  const [product, setProduct] = useState({});
  const [formatedPrice, setFormatedPrice] = useState("");

  useEffect(() => {
    loadDetails();
  }, [itemId])

  const loadDetails = async () => {
    const response = await fetch(`https://fakestoreapi.com/products/${itemId}`);
    const data = await response.json();
    const formatedPrice = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'USD' }).format(data.price);
    setProduct(data);
    setFormatedPrice(formatedPrice);
  }


  return (
    <div className='flex flex-col items-center md:items-start p-12 md:flex-row md:p-24 gap-8'>
      <figure className='flex justify-center md:w-1/2'>
        <img src={product.image} alt={product.title} className="max-h-96" />
      </figure>
      <div className='flex flex-col md:w-1/2 gap-4'>
        <h1 className='text-3xl font-bold drop-shadow-sm'>{product.title}</h1>
        <div className='flex flex-row gap-4 items-center'>
          <div className='text-2xl'>{formatedPrice}</div>
          <div className='badge badge-outline capitalize'>{product.category}</div>
        </div>
        <div className='text-lg'>{product.description}</div>
        <button className='btn btn-primary shadow-md'>Agregar al carrito</button>
      </div>
    </div>
  )
}

export default ItemDetails