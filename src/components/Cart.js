import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useCart } from '../context/cartContext'
import CartItem from './CartItem'
import { addDoc, collection, getFirestore } from 'firebase/firestore'
import { CgClose } from 'react-icons/cg';
import { toast } from 'react-toastify';


const Cart = () => {

  const { products, clearCart, count } = useCart();
  const [subtotal, setSubtotal] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let sub = 0;
    products.forEach(p => sub += p.price);
    let formatedSub = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(sub);
    setSubtotal(formatedSub);

    let ship = 0;
    if (sub > 0) {
      ship = 500;
    }
    let formatedShip = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(ship);
    setShipping(formatedShip);

    let tot = sub + ship;
    let formatedTot = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(tot);
    setTotal(formatedTot);
  }, [products])

  const placeOrder = (e) => {
    e.preventDefault();
    const target = e.target;
    target.submit.disabled = true;
    

    // get buyer info
    const buyer = {
      name: target.name.value,
      phone: target.phone.value,
      email: target.email.value
    }

    // get products
    const items = products.map(p => {
      return {
        id: p.id,
        title: p.title,
        price: p.price,
        quantity: 1
      }
    })

    // create order
    const order = {
      buyer,
      items,
      date: new Date(),
      total
    }

    // send order to firebase
    const db = getFirestore();
    const ordersCollection = collection(db, 'orders');
    addDoc(ordersCollection, order).then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
      notify(docRef.id);
    })

    // clear cart after 6 seconds
    new Promise((resolve) => { setTimeout(() => resolve(), 6000) })
      .then(() => {
        clearCart(); 
      })
  }

  const notify = (id) => toast.success(
    `Orden realizada con éxito!\n 
    Id de orden: ${id}\n`, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
  })



  return (
    <div className='flex flex-col w-full gap-4'>
      {count > 0 ? (
        <div className='flex flex-col w-full p-4 gap-4 md:p-8'>
          <h1 className='text-4xl font-bold py-4'>Carrito de compras</h1>
          <hr className='w-full md:w-3/5 mb-4' />
          <section className='flex flex-col md:flex-row gap-8'>
            <ul className='flex flex-col md:w-3/5 gap-10'>
              {products.map(product => (<CartItem key={product.id} product={product} />))}
            </ul>
            <div className='flex flex-col md:w-2/5 card bg-gray-100 p-8 gap-4 h-min'>
              <h1 className='text-xl font-bold'>Resumen de la compra</h1>
              <hr className='w-full' />
              <div className='flex flex-col gap-4'>
                <div className='flex flex-row justify-between items-center gap-4'>
                  <p className='text-lg font-light'>Subtotal</p>
                  <hr className='flex grow' />
                  <p className='text-lg font-light'>{subtotal}</p>
                </div>
                <div className='flex flex-row justify-between items-center gap-4'>
                  <p className='text-lg font-light'>Costo de envio</p>
                  <hr className='flex grow' />
                  <p className='text-lg font-light'>{shipping}</p>
                </div>
                <hr className='w-full' />
                <div className='flex flex-row justify-between items-center gap-4'>
                  <p className='text-lg font-bold'>Total</p>
                  <hr className='flex grow' />
                  <p className='text-lg font-bold'>{total}</p>
                </div>
                <label htmlFor="my-modal-1" className="btn btn-primary modal-button">Comprar</label>
                <input type="checkbox" id="my-modal-1" className="modal-toggle" />
                <label htmlFor="my-modal-1" className="modal modal-bottom sm:modal-middle cursor-pointer">
                  <label className="modal-box relative">
                    <div className="modal-header flex justify-between items-center">
                      <h1 className="text-2xl font-bold">Confirmar compra</h1>
                      <label htmlFor="my-modal-1" className="modal-close cursor-pointer"><CgClose size={24}/></label>
                    </div>
                    <h3 className="text-lg py-4">Estas por realizar una orden de compra</h3>
                    <p className="">Por favor completa tus datos y confirma la orden de compra</p>
                    <form className='form-control gap-4 py-4' onSubmit={placeOrder} data-netlify="true">
                      <input placeholder='Nombre' type="text" name="name" className='input outline outline-2 outline-base-200' required />
                      <input placeholder='Telefono' type="text" name="phone" className='input outline outline-2 outline-base-200' required />
                      <input placeholder='Email' type="email" name="email" className='input outline outline-2 outline-base-200' required />
                      <input name='submit' className='btn btn-ghost btn-outline self-end' type="submit" value="Confirmar"/>
                    </form>
                    {/* <div className="modal-action">
                      <label htmlFor="my-modal-1" className="btn btn-outline" onClick={placeOrder}>Confimar</label>
                    </div> */}
                  </label>
                </label>

                <label htmlFor="my-modal-2" className="btn btn-ghost btn-outline modal-button">Vaciar Carrito</label>
                <input type="checkbox" id="my-modal-2" className="modal-toggle" />
                <label htmlFor="my-modal-2" className="modal modal-bottom sm:modal-middle cursor-pointer">
                  <label className="modal-box relative">
                    <h3 className="font-bold text-lg">Vaciar Carrito</h3>
                    <p className="py-4">¿Desea borrar todos los productos del carrito?</p>
                    <div className="modal-action">
                      <label htmlFor="my-modal-2" className="btn btn-ghost btn-outline" onClick={clearCart}>Si</label>
                      <label htmlFor="my-modal-2" className="btn btn-error btn-outline">No</label>
                    </div>
                  </label>
                </label>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <div className='flex flex-col w-full p-4 gap-4 md:p-8 h-screen'>
          <img src='/undraw_relaxing_walk_re_7fko.svg' alt='empty cart' className='md:w-1/2 mx-auto' />
          <h1 className='text-4xl font-bold py-4 text-center'>Tu carrito está vacío</h1>
          <p className='text-xl font-light text-center'>Agrega productos para comenzar a comprar</p>
          <Link to='/' className='btn btn-primary mx-auto'>Ir a la tienda</Link>
        </div>
      )}
    </div>

  )
}

export default Cart