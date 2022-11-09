import { BsInstagram } from "react-icons/bs";

const Footer = () => {

  const imgStyle = {
    height: '50px',
    
  }
  return (
    <div>
      <footer className="footer footer-center p-10 bg-primary text-primary-content">
        <div>
          <img src="/safari-pinned-tab.svg" alt="REM logo" style={imgStyle}/>
          <p className="font-bold">REM by Bel</p>
          <p>Copyright © 2022 - All right reserved</p>
        </div>
        <div>
          <div className="grid grid-flow-col gap-4">
            <a href="https://www.instagram.com/belen_pastorino/" target={"_blank"} rel="noreferrer"><BsInstagram size={24}/></a>
          </div>
        </div>
      </footer>
    </div>
  )
}
export default Footer