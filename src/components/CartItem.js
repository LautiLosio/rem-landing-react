import { useCart } from '../context/cartContext'
import { CgTrash } from "react-icons/cg";
import { Link } from 'react-router-dom';

const CartItem = (product) => {
  const { removeFormCart } = useCart();
  const { id, image, title, price } = product.product;
  const formatedPrice = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'USD' }).format(price);

  const removeHandler = () => {
    removeFormCart(product.product)
  }

  return (
    <li className='flex flex-row w-full gap-4 items-center '>
      <figure className='flex md:flex-row w-full justify-center gap-4'>
        <div className='flex justify-center w-32 h-full'>
          <img src={image} alt={title} className='max-h-32'/>
        </div>
        <figcaption className='flex flex-col w-full justify-around'>
          <Link to={`/item/${id}`} className='text-xl font-semibold hover:underline hover:text-primary-focus'>{title}</Link>
          <p className='text-2xl font-light'>{formatedPrice}</p>
        </figcaption>
      <button className='btn btn-ghost btn-outline btn-error p-4' onClick={removeHandler}>
        <CgTrash size={20} />
      </button>
      </figure>
    </li>
  )
}

export default CartItem