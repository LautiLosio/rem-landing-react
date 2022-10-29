import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useCart } from '../context/cartContext';
import PlaceholderLoading from 'react-placeholder-loading'
import { CgTrash, CgArrowLeft } from "react-icons/cg";

const ItemDetails = () => {

  const { products, addToCart, removeFormCart } = useCart();
  const { itemId } = useParams();
  const [product, setProduct] = useState({});
  const [formatedPrice, setFormatedPrice] = useState("");
  const [inCart, setInCart] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDetails();
  }, [itemId])

  const loadDetails = async () => {
    const response = await fetch(`https://fakestoreapi.com/products/${itemId}`);
    const data = await response.json();
    const formatedPrice = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'USD' }).format(data.price);
    setProduct(data);
    setFormatedPrice(formatedPrice);
    setInCart(products.find(p => p.id === data.id));
    setLoading(false);
  }

  const addHandler = () => {
    addToCart(product)
    setInCart(true)
  }

  const removeHandler = () => {
    removeFormCart(product)
    setInCart(false)
  }

  const showButton = () => {
    if (inCart) {
      return (
        <div className='flex gap-4  md:justify-start md:grow-0'>
          <button className="btn btn-primary grow md:grow-0" disabled>En el carrito</button>
          <button className="btn btn-error" onClick={removeHandler}>
            <CgTrash size={24} />
          </button>
        </div>
      )
    } else {
      return <button className="btn btn-primary md:self-start" onClick={addHandler}>Agregar al carrito</button>
    }
  }


  return (
    <div>
      {loading ? (
        <div className='flex flex-col items-center md:items-start p-12 md:flex-row md:p-24 gap-8'>
          <figure className='flex justify-center md:w-1/2 max-h-96'>
            <PlaceholderLoading shape='rect' width='300' height='300'/>
          </figure>
          <div className='flex flex-col md:w-1/2 gap-4 '>
            <PlaceholderLoading shape='rect' width='300' height='40' />
            <div className='flex flex-row gap-4 items-center'>
              <PlaceholderLoading shape='rect' width='100' height='30' />
              <PlaceholderLoading shape='rect' width='96' height='24'/>
            </div>
            <PlaceholderLoading shape='rect' width='300' height='20' />
            <PlaceholderLoading shape='rect' width='300' height='20' />
            <PlaceholderLoading shape='rect' width='300' height='20' />
          </div>
        </div>
      ) : (
        <div className='flex flex-col items-center p-12 md:flex-row gap-8 md:h-screen justify-around'>
          <Link to='/' className='hidden btn self-start md:flex'><CgArrowLeft size={24}/></Link>
          <figure className='flex justify-center md:w-1/3'>
            <img src={product.image} alt={product.title} className="max-h-[500px]" />
          </figure>
          <div className='flex flex-col md:w-1/2 gap-4'>
            <h1 className='text-3xl font-bold drop-shadow-sm'>{product.title}</h1>
            <div className='flex flex-row gap-4 items-center'>
              <div className='text-2xl'>{formatedPrice}</div>
              <div className='badge badge-outline capitalize'>{product.category}</div>
            </div>
            <div className='text-lg'>{product.description}</div>
            {showButton()}
          </div>
        </div>
      )}
    </div>
  )
}

export default ItemDetails