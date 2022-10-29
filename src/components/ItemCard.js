import React from 'react'
import { Link } from 'react-router-dom';

export const ItemCard = ({ id, title, price, description, image, category, delay }) => {

  const formatedPrice = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(price);
  const formatedCategory = category.charAt(0).toUpperCase() + category.slice(1);
  const formatedDescription = description.slice(0, 50) + '...';

  return (
    <Link to={`/item/${id}`} className="card w-80 bg-base-100 shadow-lg justify-between">
      <figure className='h-96' >
        <img src={image} alt={title} className="" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          <div className='truncate'>{title}</div>
        </h2>
        <p className='text-stone-500'>{formatedDescription}</p>
        <div className="card-actions justify-end">
          <div className="badge badge-outline badge-accent">{formatedCategory}</div>
          <div className="badge badge-secondary">{formatedPrice}</div>
        </div>
      </div>
    </Link>
  )
}
