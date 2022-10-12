import React from 'react'
import { Link } from 'react-router-dom';

export const ItemCard = ( { id, title, price, description, image, category} ) => {

  const formatedPrice = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'USD' }).format(price);
  const formatedCategory = category.charAt(0).toUpperCase() + category.slice(1);
  const formatedDescription = description.slice(0, 50) + '...';

  return (
    <Link to={`/item/${id}`} className="card w-80 bg-base-100 shadow-lg max-h-min">
      {/* <div >
        <figure className="px-10 pt-10 h-50"><img className='max-h-40' src={image} alt={title} /></figure>
        <div className="card-body">
          <h2 className="font-bold text-lg text-center">{title}</h2>
          <div className="card-actions justify-center ">
            <div className='badge badge-secondary font-semibold text-lg p-4'>{formatedPrice}</div>
          </div>
        </div>
      </div> */}
      <div className="card bg-base-100 shadow-xl">
        <figure><img src={image} alt={title} className="p-4 px-8 h-52" /></figure>
        <div className="card-body">
          <h2 className="card-title">
            <div className='truncate'>{title}</div>
            <div className="badge badge-secondary">{formatedPrice}</div>
          </h2>
          <p className='text-stone-500'>{formatedDescription}</p>
          <div className="card-actions justify-end">
            <div className="badge badge-outline badge-accent">{formatedCategory}</div>
          </div>
        </div>
      </div>
    </Link>

  )
}
