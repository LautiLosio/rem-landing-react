import { Link } from "react-router-dom"


const NotFound = () => {

  const notFound = "/undraw_page_not_found_re_e9o6.svg"
  
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4 p-4 text-center">
      <img src={notFound} alt="404" className=" md:h-1/2" />
      <h2 className="text-2xl font-bold">No pudimos encontrar la pagina que buscas</h2>
      <Link to="/" className="btn btn-primary mt-4">
        Volver al inicio
      </Link>
    </div>
  )
}
export default NotFound