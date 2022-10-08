import React from 'react'
import { Link } from 'react-router-dom';

export const ItemCard = ( { title, price, description, image} ) => {

  const formatedPrice = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'USD' }).format(price);

  return (
    <div className="card w-80 bg-base-100 shadow-lg max-h-min">
      <figure className="px-10 pt-10 h-50"><img className='max-h-40' src={image} alt={title} /></figure>
      <div className="card-body">
        <h2 className="truncate font-bold text-lg text-center">{title}</h2>
        <p className='truncate text-stone-500'>{description}</p>
        <div className="card-actions items-center mt-4">
          <p className='font-semibold text-lg'>{formatedPrice}</p>
          <Link to><button className="btn btn-primary">Ver más</button></Link>
        </div>
      </div>
    </div>
  )
}
