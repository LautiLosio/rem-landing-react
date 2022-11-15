import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useCart } from '../context/cartContext';
import PlaceholderLoading from 'react-placeholder-loading'
import { CgTrash, CgArrowLeft } from "react-icons/cg";
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { toast } from 'react-toastify';

const ItemDetails = () => {

  const { products, addToCart, removeFormCart } = useCart();
  const { itemId } = useParams();
  const [product, setProduct] = useState({});
  const [formatedPrice, setFormatedPrice] = useState("");
  const [inCart, setInCart] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDetails = async () => {
      const db = getFirestore();
      const docRef = doc(db, "products", itemId);
      const docSnap = await getDoc(docRef);
      console.log(docSnap);
      if (docSnap.exists()) {
        const data = { id: docSnap.id, ...docSnap.data() };
        setProduct(data);
        setFormatedPrice(new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(data.price));
        setInCart(products.some(product => product.id === data.id));
        setLoading(false);
      } else {
        toast.error("No se encontró el producto", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
        });
        
        // redirect to home 
        new Promise((resolve) => {
          setTimeout(() => {
            resolve();
          }, 7000);
        }
        ).then(() => {
          window.location.href = "/";
        });
      }
    }

    loadDetails();

  }, [itemId, products]);


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
          <Link to='/cart' className='btn btn-primary grow md:grow-0'>Ir al carrito</Link>
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
        <div className='flex flex-col items-center p-12 md:flex-row gap-8 md:h-screen justify-around'>
          <Link to='/' className='hidden btn self-start md:flex'><CgArrowLeft size={24} /></Link>
          <figure className='flex justify-center md:w-1/2'>
            <PlaceholderLoading shape='rect' width='300' height='350' />
          </figure>
          <div className='flex flex-col md:w-1/2 gap-4 '>
            <PlaceholderLoading shape='rect' width='300' height='40' />
            <div className='flex flex-row gap-4 items-center'>
              <PlaceholderLoading shape='rect' width='100' height='30' />
              <PlaceholderLoading shape='rect' width='96' height='24' />
            </div>
            <PlaceholderLoading shape='rect' width='300' height='20' />
            <PlaceholderLoading shape='rect' width='300' height='20' />
            <PlaceholderLoading shape='rect' width='300' height='20' />
          </div>
        </div>
      ) : (
        <div className='flex flex-col items-center p-12 lg:flex-row gap-8 lg:h-screen justify-around'>
          <Link to='/' className='hidden btn self-start md:flex'><CgArrowLeft size={24} /></Link>
          <figure className='flex justify-center md:w-1/2'>
            <img src={product.image} alt={product.title} className="max-h-[500px] 2xl:max-h-[700px] rounded-xl" />
          </figure>
          <div className='flex flex-col md:w-1/2 gap-4'>
            <h1 className='text-3xl font-bold drop-shadow-sm'>{product.title}</h1>
            <div className='flex flex-row gap-4 items-center'>
              <div className='text-2xl'>{formatedPrice}</div>
              <div className='badge badge-outline capitalize'>{product.category}</div>
            </div>
            <div className='text-lg'>{product.description}</div>
            <div className=''>
              <p className='text-lg underline'>Medidas:</p>
              <ul className='text-sm'>
                <li className='ml-2'>Largo: {product.sizes[0]} cm</li>
                <li className='ml-2'>Ancho: {product.sizes[1]} cm</li>
                <li className='ml-2'>Profundidad: {product.sizes[2]} cm</li>
              </ul>
            </div>
            {showButton()}
          </div>
        </div>
      )}
    </div>
  )
}

export default ItemDetails