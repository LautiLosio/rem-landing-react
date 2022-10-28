import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { useCart } from "../context/cartContext"
import { CgShoppingCart } from "react-icons/cg";

const Navbar = () => {

  const [cartTotal, setCartTotal] = useState(0);
  const { products, count } = useCart();

  useEffect(() => {
    
    const total = products.reduce((acc, product) => {
      return acc + product.price
    }, 0)

    const formatedTotal = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(total);

    setCartTotal(formatedTotal);
  }, [products]);

  function showBadge() {
    if (count > 0) {
      return <span className="badge badge-sm indicator-item">{count}</span>
    }
  }
  
  return (
    <div className="navbar bg-primary auto top-0">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </label>
          <ul tabIndex={0} className="menu dropdown-content p-2 mt-3 shadow bg-base-100 rounded-box">
            <li tabIndex={0}>
              <a className="justify-between">
                Productos
                <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" /></svg>
              </a>
              <ul className="menu rounded-box bg-base-100 p-2 mx-3 shadow-md">
                <li><Link to={'/'}>Todos</Link></li>
                <li><Link to={'/category/0'}>Electronics</Link></li>
                <li><Link to={'/category/1'}>Jewelery</Link></li>
                <li><Link to={'/category/2'}>Men's Clothing</Link></li>
                <li><Link to={'/category/3'}>Women's Clothing</Link></li>
              </ul>
            </li>
            <li><a>Preguntas</a></li>
            <li><a>Contacto</a></li>
          </ul>
        </div>
        <Link to={'/'} className="btn btn-ghost normal-case text-xl">REM by Bel</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0 ">
          <li tabIndex={0}>
            <a>
              Productos
              <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg>
            </a>
            <ul className="rounded-box bg-base-100 p-2 mt-3 shadow-md z-50">
              <li><Link to={'/'}>Todos</Link></li>
              <li><Link to={'/category/0'}>Electronics</Link></li>
              <li><Link to={'/category/1'}>Jewelery</Link></li>
              <li><Link to={'/category/2'}>Men's Clothing</Link></li>
              <li><Link to={'/category/3'}>Women's Clothing</Link></li>
            </ul>
          </li>
          <li><a>Preguntas</a></li>
          <li><a>Contacto</a></li>
        </ul>
      </div>
      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <div className="indicator">
              <CgShoppingCart size={24}/>
              {showBadge()}
            </div>
          </label>
          <div tabIndex={0} className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow-md">
            <div className="card-body">
              <span className="font-bold text-lg">{count} Items</span>
              <span className="text-info">Subtotal: {cartTotal}</span>
              <div className="card-actions">
                <Link to={'/cart'} className="btn btn-primary btn-block">Ver carrito</Link> 
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Navbar